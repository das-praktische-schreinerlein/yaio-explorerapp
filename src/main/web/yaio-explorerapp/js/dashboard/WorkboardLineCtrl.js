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
 * angular-controller for serving page: dashoard-page
 * @controller
 */
yaioApp.controller('WorkboardLineCtrl', function($rootScope, $scope, $location, $routeParams, setFormErrors,
                                             OutputOptionsEditor, authorization, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        $scope.boardOptions = {
            baseDate: yaioUtils.now(),
            pageSize: 5
        };

        // extract additional-Searchfilter
        var additionalSearchFilter = yaioUtils.parseAdditionalParameters($routeParams.additionalFilters);
        if (additionalSearchFilter.hasOwnProperty('baseDate')) {
            $scope.boardOptions.baseDate =
                yaioUtils.getService('YaioBase').parseGermanDate(decodeURI(additionalSearchFilter.baseDate));
        }

        // call authentificate
        authorization.authentificate(function () {
            // check authentification
            if (!$rootScope.authenticated) {
                $location.path(yaioUtils.getConfig().appLoginUrl);
                $scope.error = false;
            }
        });
    };

    // init
    $scope._init();
});
