/** 
 * software for projectmanagement and documentation
 * 
 * @FeatureDomain                Collaboration 
 * @author                       Michael Schreiner <michael.schreiner@your-it-fellow.de>
 * @category                     collaboration
 * @copyright                    Copyright (c) 2014, Michael Schreiner
 * @license                      http://mozilla.org/MPL/2.0/ Mozilla Public License 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * angular-controller for serving page-element: datasource-selector json-download
 * @controller
 */
yaioApp.controller('SourceJsonDownloadCtrl', function($rootScope, $scope, $location, $routeParams, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        $scope.$on('SourceSelect_Enable_YaioUrlDownloadNodeDBDriver', function() {
            yaioUtils.getAppBase().UIToggler.toggleElement('#containerFormYaioSourceSelectorJsonDownload');
        });
    };

    $scope.initForm = function() {
        $scope._initExampleDownloads();
    };

    $scope.doDownloadFile = function () {
        var url = $('#inputtextSourceSelectorJsonDownload').val();
        var downloadDriver = yaioUtils.getAppBase().YaioUrlDownloadNodeDBDriver;
        downloadDriver.downloadFile(url).done(function success() {
            // activate editor
            if (downloadDriver.$('#inputcheckboxSourceSelectorLoadJSONDownloadActivateEditor').prop('checked')) {
                downloadDriver.getAccessManager().activateEditor();
            } else {
                downloadDriver.getAccessManager().deactivateEditor();
            }

            yaioUtils.getAppBase().UIToggler.toggleElement('#containerFormYaioSourceSelectorJsonDownload');
        });
    };

    $scope.discardDownloadFile = function () {
        yaioUtils.getAppBase().UIToggler.toggleElement('#containerFormYaioSourceSelectorJsonDownload');
    };


    $scope._initExampleDownloads = function () {
        var indexUrl = yaioUtils.getAppBase().config.exampleDownloadUrl;
        if (indexUrl) {
            var lastSlash = indexUrl.lastIndexOf('/');
            var baseUrl = '';
            if (lastSlash >= 0) {
                baseUrl = indexUrl.substring(0, lastSlash+1);
            }
            $scope._readExampleDownloads(indexUrl).then(function () {
                $scope._initExampleDownloadUrlDialog(baseUrl);
            });
        }
    };

    $scope._readExampleDownloads = function (url) {
        // return promise
        var dfd = new $.Deferred();
        var res = dfd.promise();
        var svcLogger = yaioUtils.getAppBase().get('Logger');

        var msg = '_initExampleDownloadUrls';
        yaioUtils.getAppBase().$.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            xhrFields: {
                // for CORS
                withCredentials: true
            },
            url: url,
            type: 'GET',
            dataType: 'json',
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                svcLogger.logError('ERROR  ' + msg + ' The following error occured: ' + textStatus + ' ' + errorThrown, false);
                svcLogger.logError('cant load ' + msg + ' error:' + textStatus, true);
            },
            complete: function () {
                console.log('completed load ' + msg);
            },
            success: function (data) {
                $scope._exampleDownloadUrls = data;
                dfd.resolve('OK');
            }
        });

        return res;
    };

    $scope._initExampleDownloadUrlDialog = function (baseUrl) {
        var $select = $('#inputSelectSourceSelectorJsonDownloadUrl');
        $select.select2();

        Object.keys($scope._exampleDownloadUrls).forEach(function(id) {
            var url = $scope._exampleDownloadUrls[id].url;
            if (!url.startsWith('http') && !url.startsWith('/')) {
                url = baseUrl + url;
            }
            $select.append(
                new Option($scope._exampleDownloadUrls[id].name, url, false, false)
            ).trigger('change');
        });

        $select.on('select2:select', function (evt) {
            // How to select a value
            var current = $select.select2('val');
            $('#inputtextSourceSelectorJsonDownload').val(current);
        });
    };


    // init
    $scope._init();
});
