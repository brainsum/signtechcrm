<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Psr\Http\Message\ServerRequestInterface;
use GuzzleHttp\Client;
use Proxy\Proxy;
use Proxy\Adapter\Guzzle\GuzzleAdapter;
use Proxy\Filter\RemoveEncodingFilter;

class ForwardController extends Controller
{
    /**
     * Proxy all API requests to Signtechforms's API
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ServerRequestInterface $request)
    {
        $guzzle = new Client();
        $proxy = new Proxy(new GuzzleAdapter($guzzle));
        $response = $proxy
            ->forward($request)
            ->filter(function ($request, $response, $next) {
                // HTTP auth if needed
                $http_auth_credentials = config('signtechapi.http_auth_credentials');

                if ($http_auth_credentials) {
                    $request = $request->withHeader(
                        'Authorization',
                        'Basic ' . base64_encode($http_auth_credentials)
                    );
                }
                
                $response = $next($request, $response);
                return $response;
            })
            ->to(config('signtechapi.url'));

        return $response;
    }
}
