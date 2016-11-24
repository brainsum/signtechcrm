<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Helpers\Contracts\SignTechApiContract;
use \Firebase\JWT\JWT;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, SignTechApiContract $api)
    {
        $params = [
            'function' => 'login',
            'name' => $request->input('name'),
            'password' => $request->input('password')
        ];

        $response = json_decode($api->request($params), true);

        if (is_array($response)) {
            $userData = JWT::decode($response['token'], config('signtechapi.jwt_secret'), ['HS256']);

            if ($userData->company == config('signtechapi.company_id')) {
                return [
                    'success' => true,
                    'token' => $response['token']
                ];
            }
            else {
                return response(['success' => false, 'message' => 'You are not part of the SQR company.'], 404);
            }
        }
        else {
            switch ($response) {
                case -1:
                    $message = 'Parameter failed.';;
                    break;
                case -3:
                    $message = 'User doesn\'t exists.';
                    break;
                case -8:
                    $message = 'Your user account has not been activated yet.';
                    break;
                case -9:
                    $message = 'Login failed, you provided a wrong e-mail or password.';
                    break;
                case 0:
                default:
                    $message = 'Unexcepted error.';
                    break;
            }

            return response(['success' => false, 'message' => $message], 400);
        }
    }
}
