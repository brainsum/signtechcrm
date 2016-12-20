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

        // Admin users can see every submission by any user. Also the name of the users created them.
        if ($userData->isAdmin) {
            $completedForms = $completedForms->with(['user' => function($q) {
                $q->select('id', 'first_name', 'last_name');
            }]);
        }
        // Regular users only their own.
        else {
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

        $result = $completedForms
            ->paginate(15, NULL, 'page', $request->input('page') + 1)
            ->toArray();

        // Fields to send to client
        $fields = ['id', 'title', 'created_at', 'file'];
        if ($userData->isAdmin) {
            $fields = array_merge($fields, ['first_name', 'last_name']);
        }

        foreach ($result['data'] as &$item) {
            $item['file'] = asset('pdfs/' . $item['file']);

            // Add the name of the user who completed the form
            if ($userData->isAdmin) {
                $item['first_name'] = $item['user']['first_name'];
                $item['last_name'] = $item['user']['last_name'];
            }

            // Format date
            $date = Carbon::parse($item['created_at']);
            $item['created_at'] = $date->formatLocalized('%d %B %Y');

            // Remove not neccessary fields
            foreach ($item as $key => $value) {
                if (!in_array($key, $fields)) {
                    unset($item[$key]);
                }
            }
        }

        return $result;
    }
}
