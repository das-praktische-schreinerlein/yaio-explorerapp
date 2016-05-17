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
 * angular-controller for serving page-element: charts
 * @controller
 */
yaioApp.controller('NodeChartCtrl', function($rootScope, $scope, $routeParams, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        $scope.chartOptions = {
            baseSysUID: yaioUtils.getConfig().masterSysUId,
            baseDate: yaioUtils.now(),
            mode: 'day'
        };

        var routeFields = ['baseSysUID'];
        var routeField;
        for (var idx = 0; idx < routeFields.length; idx++) {
            routeField = routeFields[idx];
            if ($routeParams.hasOwnProperty(routeField)) {
                $scope.chartOptions[routeField] = decodeURI($routeParams[routeField]);
            }
        }

        // extract additional-Searchfilter
        var additionalSearchFilter = yaioUtils.parseAdditionalParameters($routeParams.additionalFilters);
        if (additionalSearchFilter.hasOwnProperty('baseDate')) {
            $scope.chartOptions.baseDate =
                yaioUtils.getService('YaioBase').parseGermanDate(decodeURI(additionalSearchFilter.baseDate));
        }
        $scope.chartOptions.baseDateStr = yaioUtils.getService('DataUtils').formatGermanDate($scope.dashboardOptions.baseDate);
    };

    $scope.doDayChart = function(chartDivSelector) {
        var filters = [], date, dateStr;
        for (var di = -15; di <= 15; di++) {
            date = new Date($scope.chartOptions.baseDate);
            date.setDate(date.getDate() + di);
            dateStr = yaioUtils.getService('DataUtils').formatGermanDate(date);
            filters.push([dateStr, dateStr, dateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        $scope.doDateChart(chartDivSelector, filters);
    };

    $scope.doWeekChart = function(chartDivSelector) {
        var filters = [], date, dateStr, startDateStr, endDateStr;
        for (var di = -4; di <= 4; di++) {
            date = new Date($scope.chartOptions.baseDate);
            date.setDate(date.getDate() + (di * 7));
            dateStr = yaioUtils.getService('DataUtils').formatGermanDate(date);
            startDateStr = yaioUtils.getService('DataUtils').formatGermanDate($scope.yaioUtils.getDayOfWeek(date, 1));
            endDateStr = yaioUtils.getService('DataUtils').formatGermanDate($scope.yaioUtils.getDayOfWeek(date, 7));
            filters.push([dateStr, startDateStr, endDateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        $scope.doDateChart(chartDivSelector, filters);
    };

    $scope.doMonthChart = function(chartDivSelector) {
        var filters = [], date, dateStr, startDateStr, endDateStr;
        for (var di = -6; di <= 5; di++) {
            date = new Date($scope.chartOptions.baseDate);
            date.setMonth(date.getMonth() + di);
            dateStr = yaioUtils.getService('DataUtils').formatGermanDate(date);
            startDateStr = yaioUtils.getService('DataUtils').formatGermanDate($scope.yaioUtils.getFirstDayOfMonth(date));
            endDateStr = yaioUtils.getService('DataUtils').formatGermanDate($scope.yaioUtils.getLastDayOfMonth(date));
            filters.push([dateStr, startDateStr, endDateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        $scope.doDateChart(chartDivSelector, filters);
    };

    $scope.doYearChart = function(chartDivSelector) {
        var filters = [], date, dateStr, startDateStr, endDateStr;
        for (var di = -5; di <= 1; di++) {
            date = new Date($scope.chartOptions.baseDate);
            date.setFullYear(date.getFullYear() + di);
            dateStr = yaioUtils.getService('DataUtils').formatGermanDate(date);
            startDateStr = '01.01.' + date.getFullYear();
            endDateStr = '31.12.' + date.getFullYear();
            filters.push([dateStr, startDateStr, endDateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        $scope.doDateChart(chartDivSelector, filters);
    };

    $scope.doDateChart = function(chartDivSelector, filters) {
        var chartId = 'dateChart' + new Date().getTime();
        console.error("xxx", chartId);
        $(chartDivSelector).children().remove();
        $(chartDivSelector).append('<div class="workboard-chart-instance" id="' + chartId + '"></div>');

        var filterConfigs = [
            //{ 'label': 'created', 'dateFilterGE': 'createdGE', 'dateFilterLE': 'createdLE', 'strWorkflowStateFilter': ''},
            { 'label': 'start planned', 'dateFilterGE': 'planStartGE', 'dateFilterLE': 'planStartLE', 'strWorkflowStateFilter': ''},
            { 'label': 'end planned', 'dateFilterGE': 'planEndeGE', 'dateFilterLE': 'planEndeLE', 'strWorkflowStateFilter': ''},
            { 'label': 'done', 'dateFilterGE': 'istEndeGE', 'dateFilterLE': 'istEndeLE', 'strWorkflowStateFilter': 'DONE'}
        ];

        // configure columns
        var dataColumns = [], filter;
        dataColumns.push(['dates']);
        for (var ci = 0; ci < filterConfigs.length; ci++) {
            dataColumns.push([filterConfigs[ci].label]);
        }

        for (var di = 0; di < filters.length; di++) {
            filter = filters[di];
            dataColumns[0].push(filter[3]);
            for (ci = 0; ci < filterConfigs.length; ci++) {
                dataColumns[ci+1].push(0);
            }
        }

        var chart = c3.generate({
            bindto: ('#' + chartId),
            data: {
                x: 'dates',
                type: 'bar',
                columns: dataColumns
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%d.%m.%Y'
                    }
                }
            }
        });

        console.error("init done", chartId);
        for (ci = 0; ci < filterConfigs.length; ci++) {
            var filterConfig = filterConfigs[ci];
            for (di = 0; di < filters.length; di++) {
                filter = filters[di];
                var chartSearchOptions = $scope.createSearchOptions();
                chartSearchOptions.strWorkflowStateFilter = filterConfig.strWorkflowStateFilter;
                chartSearchOptions[filterConfig.dateFilterGE] = filter[1];
                chartSearchOptions[filterConfig.dateFilterLE] = filter[2];
                chartSearchOptions.curIdx = di;

                // search data
                $scope.doChartSearch(chart, dataColumns[ci + 1], chartSearchOptions);
            }
        }
    };

    $scope.createSearchOptions = function (){
        var chartSearchOptions = {
            curIdx: 0,
            curPage: 1,
            pageSize: 1,
            searchSort: 'lastChangeDown',
            baseSysUID: $scope.chartOptions.baseSysUID,
            fulltext: '',
            total: 0,
            strNotNodePraefix: yaioUtils.getConfig().excludeNodePraefix,
            strWorkflowStateFilter: '',
            strClassFilter: '',
            strMetaNodeTypeTagsFilter: '',
            strMetaNodeSubTypeFilter: '',
            flgConcreteToDosOnly: 0,
            istStartGE: '',
            istStartLE: '',
            istEndeGE: '',
            istEndeLE: '',
            planStartGE: '',
            planStartLE: '',
            planEndeGE: '',
            planEndeLE: '',
            istStartIsNull: '',
            istEndeIsNull: '',
            planStartIsNull: '',
            planEndeIsNull: ''
        };

        return chartSearchOptions;
    };

    $scope.doChartSearch = function (chart, dataColumn, chartSearchOptions) {
        yaioUtils.getService('YaioNodeRepository').searchNode(chartSearchOptions)
            .then(function(angularResponse) {
                // success handler
                dataColumn[chartSearchOptions.curIdx + 1] = angularResponse.data.count;
                chart.load({
                    columns: [
                        dataColumn
                    ]
                });
            }, function(angularResponse) {
                // error handler
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading nodes with searchOptions: ' + chartSearchOptions;
                yaioUtils.getService('Logger').logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                yaioUtils.getService('Logger').logError(message, false);
            });
    };

    // init
    $scope._init();
});
