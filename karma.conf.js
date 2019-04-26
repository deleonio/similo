// Karma configuration
// Generated on Tue Feb 16 2016 07:14:29 GMT+0100 (Mitteleuropäische Zeit)

var path = require('path');

let basePath = path.join(__dirname, ''),
  tempPath = path.join(basePath, 'tmp'),
  coveragePath = path.join(tempPath, 'coverage'),
  junitPath = path.join(tempPath, 'junit');

module.exports = config => {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: basePath,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-ajax', 'jasmine'],

    // list of files / patterns to load in the browser
    files: ['src/**/*.spec.js'],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['webpack'],
      'src/**/!(*bench|*mock|*spec).js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'coverage',
      // 'karma-remap-istanbul',
      'remap-coverage',
      'junit',
      'mocha'
    ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      // 'Chrome',
      // 'Firefox',
      // 'IE',
      // 'Opera',
      'PhantomJS'
      // 'Safari'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // Plug-ins
    plugins: [
      // frameworks
      'karma-jasmine',
      'karma-jasmine-ajax',
      // 'karma-source-map-support'

      // sourcemap
      // 'karma-sourcemap-loader',
      // 'karma-sourcemap-writer',

      // preprocessors
      'karma-coverage',
      'karma-remap-coverage',
      'karma-remap-istanbul',
      'karma-webpack',
      // reporters
      'karma-junit-reporter',
      'karma-mocha-reporter',
      // browsers
      'karma-chrome-launcher',
      // 'karma-firefox-launcher',
      // 'karma-ie-launcher',
      // 'karma-opera-launcher',
      'karma-phantomjs-launcher',
      // 'karma-safari-launcher'
    ],

    coverageReporter: {
      dir: coveragePath,
      reporters: [
        {
          type: 'cobertura',
        },
        {
          //   subdir: 'html/',
          //   type: 'html'
          // }, {
          type: 'in-memory',
        },
        {
          file: 'coverage-final.json',
          subdir: '.',
          type: 'json',
        },
        {
          //   type: 'json-summary'
          // }, {
          //   type: 'lcov'
          // }, {
          //   type: 'lcovonly'
          // }, {
          //   type: 'teamcity'
          // }, {
          //   type: 'text'
          // }, {
          type: 'text-summary',
        },
      ],
    },

    remapCoverageReporter: {
      'text-summary': null,
      cobertura: path.join(coveragePath, 'cobertura.xml'),
      html: path.join(coveragePath, 'html'),
    },
    remapIstanbulReporter: {
      reports: {
        cobertura: path.join(coveragePath, 'cobertura.xml'),
        html: path.join(coveragePath, 'html'),
      },
    },

    junitReporter: {
      outputDir: junitPath,
    },

    mochaReporter: {
      output: 'autowatch',
    },

    // https://github.com/karma-runner/karma/issues/598
    captureTimeout: 60000,
    browserDisconnectTimeout: 2000,
    browserDisconnectTolerance: 0,
    browserNoActivityTimeout: 30000,

    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          },
          {
            test: /\.js$/,
            enforce: 'post',
            exclude: [
              /\.bench\.js$/,
              /\.mock\.js$/,
              /\.spec\.js$/,
              /node_modules/
            ],
            loader: 'istanbul-instrumenter-loader',
          },
        ],
      },
    },
    webpackMiddleware: {
      stats: 'errors-only',
    },
  });
};
