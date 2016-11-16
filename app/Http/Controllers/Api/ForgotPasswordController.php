<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;

class ForgotPasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $client = new Client;

        $data = [
            'form_params' => [
                'function' => 'forgot_password',
                'mail' => $request->input('email'),
                'from_mail' => config('signtechapi.from_mail'),
                'base_url' => config('signtechapi.base_url'),
                'site_name' => config('signtechapi.site_name')
            ]
        ];

        $http_auth_credentials = config('signtechapi.http_auth_credentials');
        if ($http_auth_credentials) {
            $data['auth'] = explode(':', $http_auth_credentials);
        }

        $response = $client->post(config('signtechapi.url'), $data);

        return $response->getBody();
    }
}
