const elixir = require('laravel-elixir');
const webpack = require('webpack');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
	mix
        .sass('app.scss')
        .webpack('app.js')
        .version([
            'css/app.css',
            'js/app.js'
        ]);

    elixir.isWatching() && mix.browserSync({
        proxy: 'http://signtechsqr.local'
    });
});
