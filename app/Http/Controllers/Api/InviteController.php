<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Helpers\Contracts\SignTechApiContract;
use Mail;

class InviteController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, SignTechApiContract $api)
    {
        $users = $request->input('users');
        $jwt = $request->input('jwt');

        // @todo - do some basic validation on users here?

        $response = array_map(function($user) use ($api, $jwt) {
            return $this->registrate($api, $user, $jwt);
        }, $users);

        return $response;
    }

    private function registrate($api, $user, $jwt) {
        $password = str_random(12);

        $params = [
            'function' => 'registration',
            'pass' => $password,
            'mail' => $user['email'],
            'language' => 'en',
            'company' => config('signtechapi.company_id'),
            'last_name' => $user['lastName'],
            'first_name' => $user['firstName'],
            'phone' => !empty($user['phone']) ? $user['phone'] : '',
            'token' => $jwt
        ];

        $response = json_decode($api->request($params), true);

        if ($response === 1) {
            $name = sprintf('%s %s', $user['firstName'], $user['lastName']);

            Mail::send('emails.invite', [
                'name' => $name,
                'siteName' => config('signtechapi.site_name'),
                'baseUrl' => config('signtechapi.base_url'),
                'password' => $password
            ], function($message)  use($name, $user) {
                $message->subject('Invitation');
                $message->to($user['email'], $name);
            });
        }

        return $response;
    }
}
