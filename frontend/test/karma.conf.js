// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-10-22 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/material-design-lite/material.min.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/underscore/underscore.js',
      'bower_components/noty/js/noty/packaged/jquery.noty.packaged.js',
      'bower_components/blockui/jquery.blockUI.js',
      'bower_components/chosen/chosen.jquery.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/leaflet/dist/leaflet-src.js',
      'bower_components/leaflet-plugins/control/Distance.js',
      'bower_components/leaflet-plugins/control/Layers.Load.js',
      'bower_components/leaflet-plugins/control/Permalink.js',
      'bower_components/leaflet-plugins/control/Permalink.Layer.js',
      'bower_components/leaflet-plugins/control/Permalink.Line.js',
      'bower_components/leaflet-plugins/control/Permalink.Marker.js',
      'bower_components/leaflet-plugins/layer/Icon.Canvas.js',
      'bower_components/leaflet-plugins/layer/Layer.Deferred.js',
      'bower_components/leaflet-plugins/layer/Marker.Rotate.js',
      'bower_components/leaflet-plugins/layer/Marker.Text.js',
      'bower_components/leaflet-plugins/layer/OpenStreetBugs.js',
      'bower_components/leaflet-plugins/layer/vector/GPX.js',
      'bower_components/leaflet-plugins/layer/vector/GPX.Speed.js',
      'bower_components/leaflet-plugins/layer/vector/KML.js',
      'bower_components/leaflet-plugins/layer/vector/OSM.js',
      'bower_components/leaflet-plugins/layer/tile/Bing.js',
      'bower_components/leaflet-plugins/layer/tile/Google.js',
      'bower_components/leaflet-plugins/layer/tile/Yandex.js',
      'bower_components/Leaflet.awesome-markers/dist/leaflet.awesome-markers.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-simple-logger/dist/angular-simple-logger.js',
      'bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
      'bower_components/SHA-1/sha1.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/flow.js/dist/flow.js',
      'bower_components/crypto-js/index.js',
      'bower_components/angular-facebook/lib/angular-facebook.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
