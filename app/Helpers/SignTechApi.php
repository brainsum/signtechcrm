<?php

namespace App\Helpers;

use App\Helpers\Contracts\SignTechApiContract;
use GuzzleHttp\Client;

class SignTechApi implements SignTechApiContract
{
    public function request($params)
    {
        $client = new Client;
        $data = ['form_params' => $params];

        $http_auth_credentials = config('signtechapi.http_auth_credentials');
        if ($http_auth_credentials) {
            $data['auth'] = explode(':', $http_auth_credentials);
        }

        $response = $client->post(config('signtechapi.url'), $data);

        return $response->getBody();
    }
}