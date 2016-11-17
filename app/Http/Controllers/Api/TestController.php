<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;

class TestController extends Controller
{
    public function index(Request $request)
    {
        $client = new Client;

        $data = [
            'form_params' => [
                'function' => 'form_list'
            ]
        ];
        $http_auth_credentials = config('signtechapi.http_auth_credentials');
        if ($http_auth_credentials) {
            $data['auth'] = explode(':', $http_auth_credentials);
        }

        $response = $client->post(config('signtechapi.url'), $data);

        $forms = json_decode($response->getBody(), true);
        $form = $forms[array_rand($forms)];

        // Send to API
        $data = [
            'form_params' => [
                'json' => json_encode(['form_id' => $form['form_id']]),
                'file' => base64_encode('blabblalbal.com')
            ]
        ];

        $client = new Client;

        $response = $client->post($request->root() . '/api/post', $data);
        return $response->getBody();
    }
}
