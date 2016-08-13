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
 * angular-controller for serving page-element: datasource-selector json-upload
 * @controller
 */
yaioApp.controller('SourceJsonFileCtrl', function($rootScope, $scope, $location, $routeParams, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;
    };

    $scope.initForm = function() {
        var fileDialog = document.getElementById('inputfileSourceSelectorJsonFile');
        fileDialog.addEventListener('change', function (evt) {
            var files = evt.target.files;
            if (files.length === 1) {
                $('#inputfileSourceSelectorJsonFile').data('file', files[0]);
            }
        }, true);
    };

    $scope.doUploadFile = function () {
        var file = $('#inputfileSourceSelectorJsonFile').data('file');
        var fileDriver = yaioUtils.getAppBase().YaioFileNodeDBDriver;
        fileDriver.loadFile(file).done(function success() {
            // activate editor
            if (fileDriver.$('#inputcheckboxSourceSelectorLoadJSONFileActivateEditor').prop('checked')) {
                fileDriver.getAccessManager().activateEditor();
            } else {
                fileDriver.getAccessManager().deactivateEditor();
            }
            yaioUtils.getAppBase().UIToggler.toggleElement('#containerFormYaioSourceSelectorJsonFile');
        });
    };

    $scope.discardUploadFile = function () {
        yaioUtils.getAppBase().UIToggler.toggleElement('#containerFormYaioSourceSelectorJsonFile');
    };

    // init
    $scope._init();
});
