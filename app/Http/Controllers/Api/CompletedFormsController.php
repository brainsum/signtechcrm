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
        $page = $request->input('page');
        $title = $request->input('title');

        $completedForms = CompletedForm::orderBy('id', 'desc');

        if ($title) {
            $completedForms = $completedForms->where('title', 'like', sprintf('%%%s%%', $title));
        }

        return $completedForms->paginate(15, ['*'], 'page', $request->input('page') + 1);
    }
}
