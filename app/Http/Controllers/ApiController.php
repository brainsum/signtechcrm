<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Psr\Http\Message\ServerRequestInterface;
use GuzzleHttp\Client;
use Proxy\Proxy;
use Proxy\Adapter\Guzzle\GuzzleAdapter;
use Proxy\Filter\RemoveEncodingFilter;

class ApiController extends Controller
{
    /**
     * Proxy all API requests to Signtechforms's API
     *
     * @return \Illuminate\Http\Response
     */
    public function forward(ServerRequestInterface $request)
    {
        $api_url = env('SIGNTECHFORM_API_URL', 'http://signtechforms.com/communication/api/1.1');

        $guzzle = new Client();
        $proxy = new Proxy(new GuzzleAdapter($guzzle));
        $response = $proxy
            ->forward($request)
            ->filter(function ($request, $response, $next) {
                // HTTP auth if needed
                $http_auth_credentials = env('SIGNTECHFORM_API_HTTP_AUTH_CREDENTIALS', false);
                if ($http_auth_credentials) {
                    $request = $request->withHeader('Authorization', 'Basic ' . base64_encode($http_auth_credentials));
                }
                
                $response = $next($request, $response);
                return $response;
            })
            ->to($api_url);

        return $response;
    }
}
