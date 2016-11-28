<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CompletedForm;
use Carbon\Carbon;

class CompletedFormsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $userData = $request->input('userData');
        $page = $request->input('page');
        $filters = $request->input('filters');

        $completedForms = CompletedForm
            ::orderBy('id', 'desc');

        // Not admin users can see only their own forms
        if (!$userData->isAdmin) {
            $completedForms = $completedForms->where('user_id', '=', $userData->uid);
        }

        if ($filters) {
            $filters = json_decode($filters, TRUE);


            foreach ($filters as $key => $value) {
                if ($value) {
                    switch ($key) {
                        case 'title':
                            $completedForms = $completedForms->where('title', 'like', sprintf('%%%s%%', $value));
                            break;
                        case 'from':
                            $from = Carbon::parse($value);
                            $completedForms = $completedForms->where('created_at', '>=', $from->toDateString() . '00:00:00');
                            break;
                        case 'to':
                            $to = Carbon::parse($value);
                            $completedForms = $completedForms->where('created_at', '<=', $to->toDateString() . ' 25:59:59');
                            break;
                    }
                }
            }
        }

        $fields = ['id', 'title', 'created_at', 'file'];
        $result = $completedForms
            ->paginate(15, $fields, 'page', $request->input('page') + 1)
            ->toArray();

        foreach ($result['data'] as &$item) {
            $item['file'] = asset('pdfs/' . $item['file']);
        }

        return $result;
    }
}
