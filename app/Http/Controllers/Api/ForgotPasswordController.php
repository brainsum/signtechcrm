<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Helpers\Contracts\SignTechApiContract;

class ForgotPasswordController extends Controller
{
    /**
     * Send forgot password request to SignTech API
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, SignTechApiContract $api)
    {
        $params = [
            'function' => 'forgot_password',
            'mail' => $request->input('email'),
            'from_mail' => config('signtechapi.from_mail'),
            'base_url' => config('signtechapi.base_url'),
            'site_name' => config('signtechapi.site_name')
        ];

        return $api->request($params);
    }
}
