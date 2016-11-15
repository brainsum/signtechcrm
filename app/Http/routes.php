<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// API calls
Route::group([
    'namespace' => 'Api',
    'prefix' => 'api'
], function () {
    // Own API functions, protected by JWT validation middleware
    Route::group(['middleware' => 'validate-jwt'], function () {
        Route::get('/completed-forms', 'CompletedFormsController@index');
    });

    // All other API calls forwarded to the SignTech API
    Route::any('/', 'ForwardController@index');
    Route::post('/post', 'PostController@index');
    Route::get('/test', 'TestController@index');
});

// All other routes to the SPA, that will handle 404 too
Route::any('{all?}', 'IndexController@index')->where('all', '.+');