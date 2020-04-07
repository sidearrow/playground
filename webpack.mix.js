const mix = require('laravel-mix');

mix
  .js('resources/js/app.js', 'public/js')
  .js('resources/js/pages/company/index.js', 'public/js/pages/company')
  .sass('resources/sass/app.scss', 'public/css');
