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

];
