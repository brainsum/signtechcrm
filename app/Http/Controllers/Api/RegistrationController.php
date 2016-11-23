<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Helpers\Contracts\SignTechApiContract;

class RegistrationController extends Controller
{
    /**
     * Registrate a user. Forwards data to SignTech API with prefilled company id and language fields
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, SignTechApiContract $api)
    {
        $params = [
            // Call the API's registration function
            'function' => 'registration',
            // The user's language is english by default
            'language' => 'en',
            // Company id from the environment variables
            'company' => config('signtechapi.company_id')

        ];

        // Rename fields
        $renameFields = [
            'password' => 'pass',
            'email' => 'mail',
            'firstName' => 'first_name',
            'lastName' => 'last_name'
        ];
        foreach($renameFields as $from => $to) {
            $params[$to] = $request->input($from);
        }

        $response = json_decode($api->request($params), true);

        return $this->getResponse($response);
    }

    private function getResponse($responseCode) {
        switch ($responseCode) {
            case 1:
                return [
                    'success' => true,
                    'message' => 'Registration was successful. We should activate your account before you can start to use it. You will be notified via e-mail with further informations.'
                ];
            case -1:
                return [
                    'success' => false,
                    'message' => 'Parameter failed.'
                ];
            case -2:
                return [
                    'succcess' => false,
                    'message' => 'User already exists with this e-mail address.'
                ];
            case 0:
            default:
                return [
                    'success' => false,
                    'message' => 'Undefined error.'
                ];
        }
    }
}
