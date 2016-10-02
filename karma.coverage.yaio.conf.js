// Karma configuration
// Generated on Sat Apr 25 2015 10:40:30 GMT+0200 (Mitteleuropäische Sommerzeit)

(function () {
    'use strict';

    var packageConfig = require('./package.json');

    var distSrcPath = 'build/dist/';
    var srcBase = 'src/main/web/';
    var testSrcPath = 'src/test/javascript/';

    module.exports = function(config) {
        config.set({

            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: '',

            // frameworks to use
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['jasmine'], // jasmine, qunit


            // list of files / patterns to load in the browser
            files: [
                // vendors
                distSrcPath + 'vendors-full-' + packageConfig.vendorversion + '.js',
                // needs own script for loading plugins
                distSrcPath + 'vendors-' + packageConfig.vendorversion + '/fancytree/jquery.fancytree.js',
                distSrcPath + 'vendors-' + packageConfig.vendorversion + '/fancytree/jquery.fancytree.dnd.js',
                distSrcPath + 'vendors-' + packageConfig.vendorversion + '/fancytree/jquery.fancytree.edit.js',
                distSrcPath + 'vendors-' + packageConfig.vendorversion + '/fancytree/jquery.fancytree.gridnav.js',
                distSrcPath + 'vendors-' + packageConfig.vendorversion + '/fancytree/jquery.fancytree.table.js',
                distSrcPath + 'vendors-' + packageConfig.vendorversion + '/ace/ace.js',
                distSrcPath + 'vendors-' + packageConfig.vendorversion + '/ace/ext-spellcheck.js',
                distSrcPath + 'vendors-' + packageConfig.vendorversion + '/freemind-flash/flashobject.js',
                // yaio: files
                srcBase + 'yaio-explorerapp/js/jmat.js',
                srcBase + 'yaio-explorerapp/js/YaioAppBaseConfig.js',
                srcBase + 'yaio-explorerapp/js/YaioAppBase.js',
                srcBase + 'yaio-explorerapp/js/utils/PromiseHelper.js',
                srcBase + 'yaio-explorerapp/js/utils/Base.js',
                srcBase + 'yaio-explorerapp/js/utils/FileLoader.js',
                srcBase + 'yaio-explorerapp/js/editor/NodeEditor.js',
                srcBase + 'yaio-explorerapp/js/search/NodeSearch.js',
                srcBase + 'yaio-explorerapp/js/layout/Layout.js',
                srcBase + 'yaio-explorerapp/js/formatter/MarkdownRenderer.js',
                srcBase + 'yaio-explorerapp/js/utils/ExportedData.js',
                // services
                srcBase + 'yaio-explorerapp/js/datarenderer/*.js',
                srcBase + 'yaio-explorerapp/js/dataservices/*.js',
                srcBase + 'yaio-explorerapp/js/explorer/ExplorerCommands.js',
                srcBase + 'yaio-explorerapp/js/explorer/ExplorerConverter.js',
                srcBase + 'yaio-explorerapp/js/explorer/ExplorerTree.js',
                // angular
                srcBase + 'yaio-explorerapp/js/YaioApp.js',
                srcBase + 'yaio-explorerapp/js/utils/Constants.js',
                srcBase + 'yaio-explorerapp/js/utils/Directives.js',
                srcBase + 'yaio-explorerapp/js/utils/FormErrorHandlingUtils.js',
                srcBase + 'yaio-explorerapp/js/utils/YaioUtilsFactory.js',
                srcBase + 'yaio-explorerapp/js/auth/AuthFactory.js',
                srcBase + 'yaio-explorerapp/js/auth/AuthController.js',
                srcBase + 'yaio-explorerapp/js/lang/LanguageConfig.js',
                srcBase + 'yaio-explorerapp/js/lang/LanguageCtrl.js',
                srcBase + 'yaio-explorerapp/js/frontpage/FrontpageCtrl.js',
                srcBase + 'yaio-explorerapp/js/charts/*.js',
                srcBase + 'yaio-explorerapp/js/dashboard/*.js',
                srcBase + 'yaio-explorerapp/js/editor/NodeEditorCtrl.js',
                srcBase + 'yaio-explorerapp/js/importer/ImporterCtrl.js',
                srcBase + 'yaio-explorerapp/js/exporter/OutputOptionsCtrl.js',
                srcBase + 'yaio-explorerapp/js/exporter/OutputOptionsEditorFactory.js',
                srcBase + 'yaio-explorerapp/js/explorer/NodeShowCtrl.js',
                srcBase + 'yaio-explorerapp/js/search/NodeSearchCtrl.js',
                srcBase + 'yaio-explorerapp/js/sourceselector/*.js',
                srcBase + 'yaio-explorerapp/js/jmat.js',
                srcBase + 'yaio-explorerapp/js/YaioAppBaseConfig.js',
                srcBase + 'yaio-explorerapp/js/YaioAppBase.js',
                srcBase + 'yaio-explorerapp/js/utils/PromiseHelper.js',
                srcBase + 'yaio-explorerapp/js/utils/Base.js',
                srcBase + 'yaio-explorerapp/js/utils/FileLoader.js',
                srcBase + 'yaio-explorerapp/js/editor/NodeEditor.js',
                srcBase + 'yaio-explorerapp/js/layout/Layout.js',
                srcBase + 'yaio-explorerapp/js/formatter/MarkdownRenderer.js',
                srcBase + 'yaio-explorerapp/js/utils/ExportedData.js',
                testSrcPath + 'unit/resources/js/jasmine/jasmine-jquery.js',
                testSrcPath + 'unit/jasmine-config.js',

                // unit-tests
                testSrcPath + 'unit/yaio-explorerapp/**/*_test.js',

                // fixtures
                {
                    pattern: testSrcPath + 'unit/fixtures/**/*.html',
                    watched: true,
                    served: true,
                    included: false
                }
            ],


            // list of files to exclude
            exclude: [
            ],


            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {
                'src/main/web/yaio-explorerapp/js/**/*.js': 'coverage'
            },


            // test results reporter to use
            // possible values: 'dots', 'progress'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: ['coverage'],
            coverageReporter: {
                dir : 'coverage/',
                reporters: [
                    { type: 'html', subdir: 'report-html' },
                    // reporters supporting the `file` property, use `subdir` to directly
                    // output them in the `dir` directory
                    { type: 'lcov', subdir: 'report-lcov' },
                    { type: 'cobertura', subdir: '.', file: 'cobertura.xml' }
                ]
            },


            // web server port
            port: 9876,


            // enable / disable colors in the output (reporters and logs)
            colors: true,


            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_WARN,


            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,


            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            browsers: ['PhantomJS'], // 'PhantomJS', 'Chrome', 'Firefox', 'IE'


            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: false
        });
    };
})();
