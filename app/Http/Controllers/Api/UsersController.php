<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Helpers\Contracts\SignTechApiContract;
use App\Models\User;

class UsersController extends Controller
{
    /**
     * Get list of users associated to a company
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, SignTechApiContract $api)
    {
        $jwt = $request->input('jwt');

        $params = [
            'function' => 'user_list_by_company',
            'token' => $jwt
        ];

        $response = json_decode($api->request($params), true);

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
     * Transform response received from SignTech API. Only the neccesary fields goes to our clients.
     * Also updates our users cache.
     */
    private function transformResponse($users) {
        $response = [];

        foreach($users as $user) {
            $id = (int)$user['uid'];

            // Update user cache
            User::updateOrCreate($id, [
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name']
            ]);

            $response[] = [
                'id' => $id,
                'firstName' => $user['first_name'],
                'lastName' => $user['last_name'],
                'email' => $user['mail'],
                'phone' => $user['phone'],
                'isActive' => (int)$user['status'] === 1
            ];
        }

        return $response;
    }

    /**
     * Toggle user is active status
     */
    public function toggleIsActive(Request $request, SignTechApiContract $api) {
        $jwt = $request->input('jwt');
        $id = $request->input('id');
        $isActive = $request->input('isActive');

        $params = [
            'function' => 'modify_user_by_admin',
            'token' => $jwt,
            'uid' => $id,
            'status' => (int)$isActive,
            'from_mail' => config('signtechapi.from_mail'),
            'base_url' => config('signtechapi.base_url'),
            'site_name' => config('signtechapi.site_name')
        ];

        $response = json_decode($api->request($params), true);

        // -12 is SIGNTECH_API_1_1_USER_STATUS_UNMODIFIED, which is also good for us
        if ($response === 1 || $response === -11) {
            return ['success' => true];
        }
        else {
            $messages = [
                0 => 'Unexcepted error.',
                -1 => 'Parameter failed.',
                -3 => 'User doesn\'t exists.',
                -7 => 'You are not authorized to do this operation.',
                -12 => 'Failed to send e-mail to the user about the activation.'
            ];

            if (in_array($response, $messages)) {
                return response(['error' => $messages[$response]], 400);
            }
            else {
                return response(['error' => $messages[0]], 400);
            }
        }
    }
}
