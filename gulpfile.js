require('dotenv').config();

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
        .sass('app.scss', null, null, {
            includePaths: [
                './node_modules/normalize.css',
                './node_modules/bootstrap/scss',
                './node_modules'
            ]
        })
        .webpack('app.js')
        .version([
            'css/app.css',
            'js/app.js'
        ]);

    if (elixir.isWatching()) {
        const browserSyncConfig = {};

        if (process.env.BROWSERSYNC_PROXY) {
            browserSyncConfig.proxy = process.env.BROWSERSYNC_PROXY;
        }

        mix.browserSync(browserSyncConfig);
    }
});
