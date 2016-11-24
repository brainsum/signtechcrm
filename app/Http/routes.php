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
        Route::post('/invite', 'InviteController@index');
        Route::get('/users', 'UsersController@index');
        Route::put('/users/toggleIsActive', 'UsersController@toggleIsActive');
        Route::get('/user', 'UserController@index');
        Route::put('/user', 'UserController@save');
    });

    Route::post('/login', 'LoginController@index');
    Route::post('/post', 'PostController@index');
    Route::post('/forgot-password', 'ForgotPasswordController@index');
    Route::post('/registration', 'RegistrationController@index');

    // All other API calls forwarded to the SignTech API
    Route::any('/', 'ForwardController@index');
});

// All other routes to the SPA, that will handle 404 too
Route::any('{all?}', 'IndexController@index')->where('all', '.+');