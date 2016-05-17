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
 * angular-controller for serving page: dashboard-page
 * @controller
 */
yaioApp.controller('DashboardCtrl', function($rootScope, $scope, $location, $routeParams, setFormErrors,
                                             OutputOptionsEditor, authorization, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        $scope.rootNodeHierarchy = [];
        $scope.rootNodeChildren = [];

        $scope.dashboardOptions = {
            baseSysUID: yaioUtils.getConfig().masterSysUId,
            baseDate: yaioUtils.now(),
            mode: 'dashboard'
        };

        if ($location.path().split('/')[1] === 'workboard') {
            $scope.dashboardOptions.mode = 'workboard';
        } else if ($location.path().split('/')[1] === 'chartboard') {
            $scope.dashboardOptions.mode = 'chartboard';
        }


        var routeFields = ['baseSysUID'];
        var routeField;
        for (var idx = 0; idx < routeFields.length; idx++) {
            routeField = routeFields[idx];
            if ($routeParams.hasOwnProperty(routeField)) {
                $scope.dashboardOptions[routeField] = decodeURI($routeParams[routeField]);
            }
        }
        // extract additional-Searchfilter
        var additionalSearchFilter = yaioUtils.parseAdditionalParameters($routeParams.additionalFilters);
        if (additionalSearchFilter.hasOwnProperty('baseDate')) {
            $scope.dashboardOptions.baseDate =
                yaioUtils.getService('YaioBase').parseGermanDate(decodeURI(additionalSearchFilter.baseDate));
        }
        $scope.dashboardOptions.baseDateStr = yaioUtils.getService('DataUtils').formatGermanDate($scope.dashboardOptions.baseDate);

        // call authentificate
        authorization.authentificate(function () {
            // check authentification
            if (!$rootScope.authenticated) {
                $location.path(yaioUtils.getConfig().appLoginUrl);
                $scope.error = false;
            } else {
                // do Search
                $scope.loadRootNodeHierarchy();
            }
        });
    };

    /**
     * load node-hierarchy into form
     */
    $scope.loadRootNodeHierarchy = function() {
        yaioUtils.getService('YaioNodeRepository').getNodeById($scope.dashboardOptions.baseSysUID, {})
            .then(function sucess(angularResponse) {
                // handle success
                $scope.rootNodeHierarchy = yaioUtils.getNodeHierarchy(angularResponse.data.node);
                $scope.rootNodeHierarchy.push(angularResponse.data.node);
                $scope.rootNodeChildren = angularResponse.data.childNodes;
            }, function error(angularResponse) {
                // handle error
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading rootNodeHierarchy';
                yaioUtils.getService('Logger').logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                yaioUtils.getService('Logger').logError(message, false);
            });
    };

    /**
     * do dashboard
     */
    $scope.doNewDashboardSearch = function() {
        var newUrl = $scope.createDashboardUri($scope.dashboardOptions);

        // save lastLocation for login
        $rootScope.lastLocation = newUrl;

        // no cache!!!
        console.log('load new Url:' + newUrl);
        $location.path(newUrl);
    };

    /**
     * create the dashboard-uri to use
     * @param {Object} dashboardOptions  current dashboardOptions (filter..) to use
     * @param {int} baseSysUID           optional baseSysUID (if not set dashboardOptions.baseSysUID will be used)
     * @returns {String}                 new dashboard-uri
     */
    $scope.createDashboardUri = function(dashboardOptions, baseSysUID) {
        var additionalFilter = '';
        var additionalSearchFields = ['baseDate'];
        var additionalSearchField;
        for (var idx = 0; idx < additionalSearchFields.length; idx++) {
            additionalSearchField = additionalSearchFields[idx];
            additionalFilter += additionalSearchField + '=' +
                yaioUtils.getService('DataUtils').formatGermanDate(dashboardOptions[additionalSearchField]) +
                ';';
        }

        return '/' + $scope.dashboardOptions.mode
            + '/' + encodeURI(!yaioUtils.getService('DataUtils').isEmptyStringValue(baseSysUID) ? baseSysUID : dashboardOptions.baseSysUID)
            + '/' + encodeURI(additionalFilter)
            + '/';
    };


    // init
    $scope._init();
});
