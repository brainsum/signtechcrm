<?php

namespace App\Http\Middleware;

use Closure;
use Response;
use \Firebase\JWT\JWT;
use Request;

class ValidateJwt
{
    /**
     * Handle an incoming request, validate JWT
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $authorization = $request->header('Authorization');

        // Do we have an authorization header?
        if (!$authorization) {
            return Response::make([
                'error' => 'Missing token.'
            ], 403);
        }

        try {
            $exploded = explode(' ', $authorization);
            $jwt = $exploded[1];
            $decoded = JWT::decode($jwt, config('signtechapi.jwt_secret'), ['HS256']);
        } catch(\Exception $exception) {
            return Response::make([
                'error' => 'Invalid token.'
            ], 403);
        }

        Request::merge([
            'jwt' => $decoded
        ]);

        return $next($request);
    }
}
