<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CompletedForm;

class CompletedFormsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $jwt = $request->input('jwt');
        $page = $request->input('page');
        $filters = $request->input('filters');

        $completedForms = CompletedForm
            ::orderBy('id', 'desc')
            ->where('user_id', '=', $jwt->uid);

        if ($filters) {
            $filters = json_decode($filters, TRUE);

            foreach ($filters as $key => $value) {
                switch ($key) {
                    case 'title':
                        $completedForms = $completedForms->where('title', 'like', sprintf('%%%s%%', $value));
                        break;
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
