<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;

class UsersController extends Controller
{
    /**
     * Get list of users associated to a company
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $jwt = $request->input('jwt');

        $data = [
            'form_params' => [
                'function' => 'user_list_by_company',
                'token' => $jwt
            ]
        ];

        // @todo
        $http_auth_credentials = config('signtechapi.http_auth_credentials');
        if ($http_auth_credentials) {
            $data['auth'] = explode(':', $http_auth_credentials);
        }

        $client = new Client;
        $response = $client->post(config('signtechapi.url'), $data);
        $response = json_decode($response->getBody(), true);

        if (is_array($response)) {
            return $this->transformResponse($response);
        }
        else {
            // SIGNTECH_API_1_1_ACCESS_DENIED
            if ($response === -7) {
                return response(['error' => 'You are not authorized to list users.'], 403);
            }
            
            // SIGNTECH_API_1_1_PARAMETER_FAILED or something else
            return response(['error' => 'Unexcepted error.'], 400);
        }
    }

    /**
     * Transform response received from SignTech API. Only the neccesary fields goes to our clients
     */
    private function transformResponse($users) {
        $response = [];

        foreach($users as $user) {
            $response[] = [
                'id' => (int)$user['uid'],
                'firstName' => $user['first_name'],
                'lastName' => $user['last_name'],
                'email' => $user['mail'],
                'phone' => $user['phone'],
                'isActive' => (int)$user['status'] === 1
            ];
        }

        return $response;
    }

    private function respondWithError() {

    }
}
