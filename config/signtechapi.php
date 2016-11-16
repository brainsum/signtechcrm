<?php

return [

    /*
    |--------------------------------------------------------------------------
    | SignTech API URL
    |--------------------------------------------------------------------------
    |
    | API requests will be proxied here
    |
    */

    'url' => env('SIGNTECH_API_URL', 'http://signtechforms.com/communication/api/1.1'),

    /*
    |--------------------------------------------------------------------------
    | SignTech API HTTP auth credentials
    |--------------------------------------------------------------------------
    |
    | Use HTTP authentication for proxied API calls.
    | A username and password seperated by a colon (username:password).
    |
    */

    'http_auth_credentials' => env('SIGNTECH_API_HTTP_AUTH_CREDENTIALS', null),

    /*
    |--------------------------------------------------------------------------
    | SignTech API's secret key that is use to sign JWT tokens
    |--------------------------------------------------------------------------
    |
    | To validate the token on our side
    |
    */

    'jwt_secret' => env('SIGNTECH_API_JWT_SECRET', null),

    /*
    |--------------------------------------------------------------------------
    | Data for e-mail sending through SignTech API
    |--------------------------------------------------------------------------
    */

    'from_mail' => env('SIGNTECH_API_FROM_MAIL', 'example@domain.tld'),
    'base_url' => env('SIGNTECH_API_BASE_URL', 'http://example.tld'),
    'site_name' => env('SIGNTECH_API_SITE_NAME', 'Example site'),
    'company_id' => env('SIGNTECH_API_COMPANY_ID', NULL),
];
