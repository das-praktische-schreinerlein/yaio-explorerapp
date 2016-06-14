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
            baseDate: yaioUtils.getService('YaioBase').now(),
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

    $scope.callChartGenerator = function(chartGenerator, args) {
        chartGenerator.apply($scope, args);
    };

    /**
     * generate a chart with (chartConfigKeys) for x days around $scope.chartOptions.baseDate
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigKeys     keys for chartConfig from $scope.chartDataConfigs
     * @param {Number} before             show x days before baseDate
     * @param {Number} after              show x days after baseDate
     */
    $scope.generateLineChartDay = function(chartDivSelector, chartConfigKeys, before, after) {
        var searchOptions = $scope._createSearchOptions();
        $scope.yaioUtils.getService('YaioNodeCharts').generateLineChartDay(
            chartDivSelector, chartConfigKeys, $scope.chartOptions.baseDate, before, after, searchOptions);
    };

    /**
     * generate a chart with (chartConfigKeys) for x weeks around $scope.chartOptions.baseDate
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigKeys     keys for chartConfig from $scope.chartDataConfigs
     * @param {Number} before             show x weeks before baseDate
     * @param {Number} after              show x weeks after baseDate
     */
    $scope.generateLineChartWeek = function(chartDivSelector, chartConfigKeys, before, after) {
        var searchOptions = $scope._createSearchOptions();
        $scope.yaioUtils.getService('YaioNodeCharts').generateLineChartWeek(
            chartDivSelector, chartConfigKeys, $scope.chartOptions.baseDate, before, after, searchOptions);
    };

    /**
     * generate a chart with (planned start, planned end, started and done) for x month around $scope.chartOptions.baseDate
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigKeys     keys for chartConfig from $scope.chartDataConfigs
     * @param {Number} before             show x months before baseDate
     * @param {Number} after              show x months after baseDate
     */
    $scope.generateLineChartMonth = function(chartDivSelector, chartConfigKeys, before, after) {
        var searchOptions = $scope._createSearchOptions();
        $scope.yaioUtils.getService('YaioNodeCharts').generateLineChartMonth(
            chartDivSelector, chartConfigKeys, $scope.chartOptions.baseDate, before, after, searchOptions);
    };

    /**
     * generate a chart with (planned start, planned end, started and done) for -5 +1 years around $scope.chartOptions.baseDate
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigKeys     keys for chartConfig from $scope.chartDataConfigs
     * @param {Number} before             show x years before baseDate
     * @param {Number} after              show x years after baseDate
     */
    $scope.generateLineChartYear = function(chartDivSelector, chartConfigKeys, before, after) {
        var searchOptions = $scope._createSearchOptions();
        $scope.yaioUtils.getService('YaioNodeCharts').generateLineChartYear(
            chartDivSelector, chartConfigKeys, $scope.chartOptions.baseDate, before, after, searchOptions);
    };

    /**
     * generate a calendar-chart (like github-commit-chart) for full years
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {String} chartConfigKey     key for chartConfig from $scope.chartDataConfigs
     * @param {Number} before             show x days before baseDate
     * @param {Number} after              show x days after baseDate
     */
    $scope.generateCalendarChartYear = function(chartDivSelector, chartConfigKey, before, after) {
        var searchOptions = $scope._createSearchOptions();
        $scope.yaioUtils.getService('YaioNodeCharts').generateCalendarChartYear(
            chartDivSelector, chartConfigKey, $scope.chartOptions.baseDate, before, after, searchOptions);
    };

    /**
     * create search-options to call YaioNodeRepository.searchNode
     * @returns {Object}      searchOptions for YaioNodeRepository.searchNode
     */
    $scope._createSearchOptions = function (){
        var dataPointSearchOptions = {
            searchSort: 'lastChangeDown',
            baseSysUID: $scope.chartOptions.baseSysUID,
            fulltext: '',
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

        return dataPointSearchOptions;
    };

    // init
    $scope._init();
});
