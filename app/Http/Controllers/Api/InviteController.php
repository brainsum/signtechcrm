<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;

class InviteController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = $request->input('users');
        $jwt = $request->input('jwt');

        // @todo - do some basic validation on users here?

        $response = array_map(function($user) use ($jwt) {
            return $this->registrate($user, $jwt);
        }, $users);

        return $response;
    }

    private function registrate($user, $jwt) {
        $password = str_random(12);

        $data = [
            'form_params' => [
                'function' => 'registration',
                'pass' => $password,
                'mail' => $user['email'],
                'language' => 'en',
                'company' => config('signtechapi.company_id'),
                'last_name' => $user['lastName'],
                'first_name' => $user['firstName'],
                'phone' => !empty($user['phone']) ? $user['phone'] : '',
                'token' => $jwt
            ]
        ];

        $http_auth_credentials = config('signtechapi.http_auth_credentials');
        if ($http_auth_credentials) {
            $data['auth'] = explode(':', $http_auth_credentials);
        }

        $client = new Client;
        $response = $client->post(config('signtechapi.url'), $data);

        return json_decode($response->getBody(), TRUE);

        // @todo - if registrate was succcessful, send e-mail to the user with the password
    }
}
