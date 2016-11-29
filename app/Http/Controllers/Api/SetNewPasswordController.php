<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Helpers\Contracts\SignTechApiContract;

class SetNewPasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, SignTechApiContract $api)
    {
        $params = [
            'function' => 'modify_password',
            'uid' => $request->input('userId'),
            'timestamp' => $request->input('timestamp'),
            'hashed_pass' => $request->input('hashedPassword'),
            'password' => $request->input('password')
        ];

        return $api->request($params);
    }
}
