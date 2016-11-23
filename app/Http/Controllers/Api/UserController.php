<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Helpers\Contracts\SignTechApiContract;

class UserController extends Controller
{
    /**
     * Responds with currently logged in user's details
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, SignTechApiContract $api)
    {
        $params = [
            'function' => 'user_details',
            'token' => $request->input('jwt')
        ];

        $response = json_decode($api->request($params), true);

        if (is_array($response)) {
            return [
                'firstName' => $response['first_name'],
                'lastName' => $response['last_name'],
                'email' => $response['mail'],
                'phone' => $response['phone']
            ];
        }
        else {
            switch ($response) {
                case -1:
                    return response(['error' => 'Parameter failed'], 400);
                case -7:
                    return resposne(['error' => 'Access denied'], 400);
                case 0:
                default:
                    return response(['error' => 'Unexcepted error'], 400);
            }
        }
    }

    public function save(Request $request, SignTechApiContract $api) {
        $params = [
            'function' => 'modify_user',
            'token' => $request->input('jwt')
        ];

        // Rename fields
        $renameFields = [
            'password' => 'pass',
            'email' => 'mail',
            'firstName' => 'first_name',
            'lastName' => 'last_name',
            'phone' => 'phone'
        ];
        foreach($renameFields as $from => $to) {
            $value = $request->input($from);

            if ($value) {
                $params[$to] = $value;
            }
        }

        $response = json_decode($api->request($params), true);

        switch ($response) {
            case 1:
                return ['success' => true, 'message' => 'Your changes were saved successfully.'];
            case -1:
                return response(['error' => 'Parameter failed.'], 400);
            case -3:
                return response(['error' => 'User des not exists'], 400);
            case -7:
                return response(['error' => 'You are not authorized to do this operation.'], 400);
            case 0:
            default:
                return response(['error' => 'Unexcepted error.'], 400);
        }
    }
}
