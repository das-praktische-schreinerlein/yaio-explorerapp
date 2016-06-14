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


        $scope.chartDataConfigs = {
            istAufwandPerDay: { 'label': 'istAufwandPerDay', 'calltypes': {'statistic': 'istAufwandPerDay'}, 'dateFilterGE': 'start', 'dateFilterLE': 'end', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 3},
            planAufwandPerDay: { 'label': 'planAufwandPerDay', 'calltypes': {'statistic': 'planAufwandPerDay'}, 'dateFilterGE': 'start', 'dateFilterLE': 'end', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 3},
            created: { 'label': 'created', 'calltypes': {'search': true}, 'dateFilterGE': 'createdGE', 'dateFilterLE': 'createdLE', 'strWorkflowStateFilter': ''},
            startPlanned: { 'label': 'start planned', 'calltypes': {'statistic': 'planStartPerDay', 'search': true}, 'dateFilterGE': 'planStartGE', 'dateFilterLE': 'planStartLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 2},
            started: { 'label': 'started', 'calltypes': {'statistic': 'istStartPerDay', 'search': true}, 'dateFilterGE': 'istStartGE', 'dateFilterLE': 'istStartLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 2},
            endPlanned: { 'label': 'end planned', 'calltypes': {'statistic': 'planEndPerDay', 'search': true}, 'dateFilterGE': 'planEndeGE', 'dateFilterLE': 'planEndeLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 2},
            done: { 'label': 'done', 'calltypes': {'statistic': 'istDonePerDay', 'search': true}, 'dateFilterGE': 'istEndeGE', 'dateFilterLE': 'istEndeLE', 'strWorkflowStateFilter': 'DONE', 'statisticReturnIdx': 2},
            planned: { 'label': 'planned', 'calltypes': {'statistic': 'planRunningPerDay', 'search': true}, 'dateFilterGE': 'planEndeGE', 'dateFilterLE': 'planStartLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 2},
            running: { 'label': 'running', 'calltypes': {'statistic': 'istRunningPerDay', 'search': true}, 'dateFilterGE': 'istEndeGE', 'dateFilterLE': 'istStartLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 2}
        };
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
        var chartConfigs = chartConfigKeys.map($scope._getChartDataConfig);

        var filters = [], date, dateStr;
        for (var di = -before; di <= after; di++) {
            date = new Date($scope.chartOptions.baseDate);
            date.setDate(date.getDate() + di);
            dateStr = yaioUtils.getService('DataUtils').formatGermanDate(date);
            filters.push([dateStr, dateStr, dateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        $scope._generateLineChartDate(chartDivSelector, chartConfigs, filters, {
            type: 'timeseries',
                tick: {
                format: '%d.%m.%Y'
            }
        }, { 'interval': 'day'});
    };

    /**
     * generate a chart with (chartConfigKeys) for x weeks around $scope.chartOptions.baseDate
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigKeys     keys for chartConfig from $scope.chartDataConfigs
     * @param {Number} before             show x weeks before baseDate
     * @param {Number} after              show x weeks after baseDate
     */
    $scope.generateLineChartWeek = function(chartDivSelector, chartConfigKeys, before, after) {
        var chartConfigs = chartConfigKeys.map($scope._getChartDataConfig);

        var filters = [], date, dateStr, startDateStr, endDateStr;
        for (var di = -before; di <= after; di++) {
            date = new Date($scope.chartOptions.baseDate);
            date.setDate(date.getDate() + (di * 7));
            dateStr = yaioUtils.getService('DataUtils').formatGermanDate(date);
            startDateStr = yaioUtils.getService('DataUtils').formatGermanDate($scope.yaioUtils.getDayOfWeek(date, 1));
            endDateStr = yaioUtils.getService('DataUtils').formatGermanDate($scope.yaioUtils.getDayOfWeek(date, 7));
            filters.push([dateStr, startDateStr, endDateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        $scope._generateLineChartDate(chartDivSelector, chartConfigs, filters, {
            type: 'timeseries',
            tick: {
                format: '%d.%m.%Y'
            }
        }, { 'interval': 'week'});
    };

    /**
     * generate a chart with (planned start, planned end, started and done) for x month around $scope.chartOptions.baseDate
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigKeys     keys for chartConfig from $scope.chartDataConfigs
     * @param {Number} before             show x months before baseDate
     * @param {Number} after              show x months after baseDate
     */
    $scope.generateLineChartMonth = function(chartDivSelector, chartConfigKeys, before, after) {
        var chartConfigs = chartConfigKeys.map($scope._getChartDataConfig);

        var filters = [], date, dateStr, startDateStr, endDateStr;
        for (var di = -before; di <= after; di++) {
            date = new Date($scope.chartOptions.baseDate);
            date.setMonth(date.getMonth() + di);
            dateStr = yaioUtils.getService('DataUtils').formatGermanDate(date);
            startDateStr = yaioUtils.getService('DataUtils').formatGermanDate($scope.yaioUtils.getFirstDayOfMonth(date));
            endDateStr = yaioUtils.getService('DataUtils').formatGermanDate($scope.yaioUtils.getLastDayOfMonth(date));
            filters.push([dateStr, startDateStr, endDateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        $scope._generateLineChartDate(chartDivSelector, chartConfigs, filters, {
            type: 'timeseries',
                tick: {
                format: '%m.%Y'
            }
        }, { 'interval': 'month'});
    };

    /**
     * generate a chart with (planned start, planned end, started and done) for -5 +1 years around $scope.chartOptions.baseDate
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigKeys     keys for chartConfig from $scope.chartDataConfigs
     * @param {Number} before             show x years before baseDate
     * @param {Number} after              show x years after baseDate
     */
    $scope.generateLineChartYear = function(chartDivSelector, chartConfigKeys, before, after) {
        var chartConfigs = chartConfigKeys.map($scope._getChartDataConfig);

        var filters = [], date, dateStr, startDateStr, endDateStr;
        for (var di = -before; di <= after; di++) {
            date = new Date($scope.chartOptions.baseDate);
            date.setFullYear(date.getFullYear() + di);
            dateStr = yaioUtils.getService('DataUtils').formatGermanDate(date);
            startDateStr = '01.01.' + date.getFullYear();
            endDateStr = '31.12.' + date.getFullYear();
            filters.push([dateStr, startDateStr, endDateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        $scope._generateLineChartDate(chartDivSelector, chartConfigs, filters, {
            type: 'timeseries',
            tick: {
                format: '%Y'
            }
        }, { 'interval': 'year'});
    };

    /**
     * generate a chart with (planned start, planned end, started and done) for filters
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigs        chartConfigs from $scope.chartDataConfigs
     * @param {Array} filters             filters to call the server with [germanDate, start, ende, axis-date in ISO)
     * @param {function|string} xFormat   callback-function or formatstring for x-axis of c3.generate
     * @param {Object} options            additional options (interval...)
     */
    $scope._generateLineChartDate = function(chartDivSelector, chartConfigs, filters, xFormat, options) {
        var chartId = 'dateChart' + new Date().getTime();

        $(chartDivSelector).children().remove();
        $(chartDivSelector).append('<div class="workboard-chart-instance" id="' + chartId + '"></div>');

        // configure columns
        var dataColumns = [], filter;
        dataColumns.push(['dates']);
        for (var ci = 0; ci < chartConfigs.length; ci++) {
            dataColumns.push([chartConfigs[ci].label]);
        }

        for (var di = 0; di < filters.length; di++) {
            filter = filters[di];
            dataColumns[0].push(filter[3]);
            for (ci = 0; ci < chartConfigs.length; ci++) {
                dataColumns[ci+1].push(0);
            }
        }

        var chart = c3.generate({
            bindto: ('#' + chartId),
            data: {
                x: 'dates',
                type: 'area',
                columns: dataColumns
            },
            axis: {
                x: xFormat
            }
        });

        for (ci = 0; ci < chartConfigs.length; ci++) {
            var chartConfig = chartConfigs[ci];
            var chartColumn = {};
            chartColumn.dataColumn = dataColumns[ci + 1];
            chartColumn.chartConfig = chartConfig;
            chartColumn.dataPointState = [];
            chartColumn.dataPointSearchOptions = [];
            chartColumn.timeOut = 2000;
            chartColumn.maxTries = 30;
            chartColumn.cur = 0;
            chartColumn.interval = options.interval;
            chartColumn.start = filters[0][1];
            chartColumn.end = filters[filters.length-1][2];

            for (di = 0; di < filters.length; di++) {
                filter = filters[di];
                var dataPointSearchOptions = $scope._createSearchOptions();
                dataPointSearchOptions.strWorkflowStateFilter = chartConfig.strWorkflowStateFilter;
                dataPointSearchOptions[chartConfig.dateFilterGE] = filter[1];
                dataPointSearchOptions[chartConfig.dateFilterLE] = filter[2];
                dataPointSearchOptions.curIdx = di;

                chartColumn.dataPointState[di] = 0;
                chartColumn.dataPointSearchOptions[di] = dataPointSearchOptions;
            }

            // search data
            if (!yaioUtils.getService('DataUtils').isUndefinedStringValue(chartConfig.calltypes.statistic) &&
                options.interval === 'day') {
                $scope._doLineChartStatisticCall(chart, chartColumn);
            } else if (chartConfig.calltypes.search === true) {
                $scope._doLineChartSearch(chart, chartColumn);
            } else {
                console.error('unknown calltype:', chartConfig);
                return;
            }
            $scope._updateLineChart(chart, chartColumn);
        }
    };

    /**
     * create search-options to call YaioNodeRepository.searchNode
     * @returns {Object}      searchOptions for YaioNodeRepository.searchNode
     */
    $scope._createSearchOptions = function (){
        var dataPointSearchOptions = {
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

        return dataPointSearchOptions;
    };

    /**
     * execute statistic-call to get value of a chartpoint: callback sets chartColumn.dataColumn and chartColumn.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    $scope._doLineChartStatisticCall = function (chart, chartColumn) {
        var dataPointSearchOptions = chartColumn.dataPointSearchOptions[0];
        var chartConfig = chartColumn.chartConfig, value, idx, url;
        yaioUtils.getService('YaioNodeRepository').callStatistics(chartConfig.calltypes.statistic, chartColumn.start, chartColumn.end, dataPointSearchOptions)
            .then(function(angularResponse) {
                // success handler
                var values = angularResponse.data.values;
                values.map(function (element) {
                    idx = element[0];
                    value = element[chartConfig.statisticReturnIdx];
                    value = (value === null ? 0 : Math.round(value * 100) / 100);
                    chartColumn.dataColumn[idx] = value;
                    chartColumn.dataPointState[idx] = 1;
                    url = $scope._createSearchUri(chartColumn.dataPointSearchOptions[idx]);
                });
            }, function(angularResponse) {
                // error handler
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading nodes with searchOptions: ' + dataPointSearchOptions;
                yaioUtils.getService('Logger').logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                yaioUtils.getService('Logger').logError(message, false);
            });
    };

    /**
     * execute search to get values of all chartpoints in chartColumn.dataPointSearchOptions
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    $scope._doLineChartSearch = function (chart, chartColumn) {
        for (var di = 0; di < chartColumn.dataPointSearchOptions.length; di++) {
            $scope._doLineChartPointSearch(chart, chartColumn, di);
        }
    };

    /**
     * execute search to get value of a chartpoint: callback sets chartColumn.dataColumn and chartColumn.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     * @param {number} idx           idx of the chartColumn.dataPointSearchOptions to call
     */
    $scope._doLineChartPointSearch = function (chart, chartColumn, idx) {
        var dataPointSearchOptions = chartColumn.dataPointSearchOptions[idx];
        yaioUtils.getService('YaioNodeRepository').searchNode(dataPointSearchOptions)
            .then(function(angularResponse) {
                // success handler
                chartColumn.dataColumn[dataPointSearchOptions.curIdx + 1] = angularResponse.data.count;
                chartColumn.dataPointState[dataPointSearchOptions.curIdx] = 1;
            }, function(angularResponse) {
                // error handler
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading nodes with searchOptions: ' + dataPointSearchOptions;
                yaioUtils.getService('Logger').logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                yaioUtils.getService('Logger').logError(message, false);
            });
    };

    /**
     * update chart with chartColumn.dataColumn
     * recall itself every chartColumn.timeOut ms till all chartColumn.dataPointState == 1 or
     * chartColumn.cur >= chartColumn.maxTries
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    $scope._updateLineChart = function (chart, chartColumn) {
        var ready = true;
        for (var di = 0; di < chartColumn.dataPointSearchOptions.length; di++) {
            if (chartColumn.dataPointState[di] !== 1) {
                ready = false;
            }
        }

        // update chart
        chart.load({
            columns: [
                chartColumn.dataColumn
            ]
        });

        //
        chartColumn.cur++;
        if (!ready && chartColumn.cur < chartColumn.maxTries) {
            setTimeout(function() {
                $scope._updateLineChart(chart, chartColumn);
            }, chartColumn.timeOut);
        }
    };

    /**
     * TODO
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {String} chartConfigKey     key for chartConfig from $scope.chartDataConfigs
     * @param {Number} before             show x days before baseDate
     * @param {Number} after              show x days after baseDate
     */
    $scope.generateCalendarChartYear = function(chartDivSelector, chartConfigKey, before, after) {
        var chartConfig = $scope._getChartDataConfig(chartConfigKey);

        if (yaioUtils.getService('DataUtils').isEmptyStringValue(before)) {
            before = 184;
        }
        if (yaioUtils.getService('DataUtils').isEmptyStringValue(after)) {
            after = 184;
        }

        var filters = [], date, dateStr;
        for (var di = -before; di <= after; di++) {
            date = new Date($scope.chartOptions.baseDate);
            date.setDate(date.getDate() + di);
            dateStr = yaioUtils.getService('DataUtils').formatGermanDate(date);
            filters.push([dateStr, dateStr, dateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        $scope._generateCalendarChart(chartDivSelector, filters, chartConfig);
    };

    /**
     * TODO
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} filters             dateFilters array
     * @param {Object} chartConfig        chartConfig from $scope.chartDataConfigs
     */
    $scope._generateCalendarChart = function(chartDivSelector, filters, chartConfig) {
        // configure columns
        var dataColumns = [], filter;
        dataColumns.push(['dates']);
        dataColumns.push([chartConfig.label]);

        for (var di = 0; di < filters.length; di++) {
            filter = filters[di];
            dataColumns[0].push(filter[3]);
            dataColumns[1].push(0);
        }

        var width = 960,
            height = 136,
            cellSize = 17; // cell size
        $scope.cellSize = cellSize;

        var format = d3.time.format('%d.%m.%Y');

        var startYear = yaioUtils.getService('YaioBase').parseGermanDate(filters[0][1]).getFullYear();
        var endYear = yaioUtils.getService('YaioBase').parseGermanDate(filters[filters.length-1][2]).getFullYear();

        var svg = d3.select(chartDivSelector).selectAll('svg')
            .data(d3.range(startYear, endYear+1))
            .enter().append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'RdYlGn')
            .append('g')
            .attr('transform',
                'translate(' + ((width - cellSize * 53) / 2) + ',' + (height - cellSize * 7 - 1) + ')');

        svg.append('text')
            .attr('transform', 'translate(-6,' + cellSize * 3.5 + ')rotate(-90)')
            .style('text-anchor', 'middle')
            .text(function(d) { return d; });

        var rect = svg.selectAll('.day')
            .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
            .enter().append('rect')
            .attr('class', 'day')
            .attr('width', cellSize)
            .attr('height', cellSize)
            .attr('x', function(d) { return d3.time.weekOfYear(d) * cellSize; })
            .attr('y', function(d) { return d.getDay() * cellSize; })
            .datum(format);

        rect.append('title')
            .text(function(d) { return d; });

        svg.selectAll('.month')
            .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
            .enter().append('path')
            .attr('class', 'month')
            .attr('d', $scope._monthPath);

        var chartColumn = {};
        chartColumn.dataColumn = dataColumns[1];
        chartColumn.chartConfig = chartConfig;
        chartColumn.dataPointState = [];
        chartColumn.dataPointSearchOptions = [];
        chartColumn.timeOut = 2000;
        chartColumn.maxTries = 10;
        chartColumn.cur = 0;
        chartColumn.start = filters[0][1];
        chartColumn.end = filters[filters.length-1][2];

        for (di = 0; di < filters.length; di++) {
            filter = filters[di];
            var dataPointSearchOptions = $scope._createSearchOptions();
            dataPointSearchOptions.strWorkflowStateFilter = chartConfig.strWorkflowStateFilter;
            dataPointSearchOptions[chartConfig.dateFilterGE] = filter[1];
            dataPointSearchOptions[chartConfig.dateFilterLE] = filter[2];
            dataPointSearchOptions.curIdx = di;
            dataPointSearchOptions.date = filter[0];
            dataPointSearchOptions.label = chartConfig.label;

            chartColumn.dataPointState[di] = 0;
            chartColumn.dataPointSearchOptions[di] = dataPointSearchOptions;
        }

        // search data
        if (!yaioUtils.getService('DataUtils').isUndefinedStringValue(chartConfig.calltypes.statistic)) {
            $scope._doCalendarChartStatisticCall(rect, chartColumn);
        } else if (chartConfig.calltypes.search === true) {
            $scope._doCalendarChartSearch(rect, chartColumn);
        } else {
            console.error('unknown calltype:', chartConfig);
            return;
        }
    };

    /**
     * execute statistic-call to get value of a chartpoint: callback sets chartColumn.dataColumn and chartColumn.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    $scope._doCalendarChartStatisticCall = function (chart, chartColumn) {
        var dataPointSearchOptions;
        chartColumn.dataPointSearchOptions.map(function (dataPointSearchOptions) {
            chart.filter(function(d) { return d === dataPointSearchOptions.date; })
                .attr('class', function(d) { return 'day ' + $scope._getColorStyle(0); });
        });

        dataPointSearchOptions = chartColumn.dataPointSearchOptions[0];
        var chartConfig = chartColumn.chartConfig, value, idx, date, dateParts;
        yaioUtils.getService('YaioNodeRepository').callStatistics(chartConfig.calltypes.statistic, chartColumn.start, chartColumn.end, dataPointSearchOptions)
            .then(function(angularResponse) {
                // success handler
                var values = angularResponse.data.values;
                values.map(function (element) {
                    idx = element[0]-1;
                    dateParts = element[1].split('-');
                    date = dateParts[2] + '.' + dateParts[1] + '.' + dateParts[0];
                    value = element[chartConfig.statisticReturnIdx];
                    value = (value === null ? 0 : Math.round(value * 100) / 100);
                    chartColumn.dataColumn[idx+1] = value; // because of label as first element
                    chartColumn.dataPointState[idx] = 1;
                    var url = '#' + $scope._createSearchUri(chartColumn.dataPointSearchOptions[idx]);

                    var rect = chart.filter(function(d) {
                        return d === date;
                    });
                    rect.attr('class', function(d) {
                            return 'day ' + $scope._getColorStyle(value);
                        })
                        .on('click', function () {
                            window.open(url);
                        });
                    rect.select('title')
                        .text(function(d) {
                            return d + ': ' + value + ' ' + dataPointSearchOptions.label + ' [click to search]';
                        });
                });
            }, function(angularResponse) {
                // error handler
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading nodes with searchOptions: ' + dataPointSearchOptions;
                yaioUtils.getService('Logger').logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                yaioUtils.getService('Logger').logError(message, false);
            });
    };


    /**
     * execute search to get values of all chartpoints in chartColumn.dataPointSearchOptions
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    $scope._doCalendarChartSearch = function (chart, chartColumn) {
        for (var di = 0; di < chartColumn.dataPointSearchOptions.length; di++) {
            $scope._doCalendarChartPointSearch(chart, chartColumn, di);
        }
    };

    /**
     * execute search to get value of a chartpoint: callback sets chartColumn.dataColumn and chartColumn.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     * @param {number} idx           idx of the chartColumn.dataPointSearchOptions to call
     */
    $scope._doCalendarChartPointSearch = function (chart, chartColumn, idx) {
        var dataPointSearchOptions = chartColumn.dataPointSearchOptions[idx];
        yaioUtils.getService('YaioNodeRepository').searchNode(dataPointSearchOptions)
            .then(function(angularResponse) {
                // success handler
                chartColumn.dataColumn[dataPointSearchOptions.curIdx + 1] = angularResponse.data.count;  // because of label as first element
                chartColumn.dataPointState[dataPointSearchOptions.curIdx] = 1;
                chart.filter(function(d) { return d === dataPointSearchOptions.date; })
                    .attr('class', function(d) { return 'day ' + $scope._getColorStyle(angularResponse.data.count); })
                    .select('title')
                    .text(function(d) { return d + ': ' + angularResponse.data.count + ' ' + dataPointSearchOptions.label; });
            }, function(angularResponse) {
                // error handler
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading nodes with searchOptions: ' + dataPointSearchOptions;
                yaioUtils.getService('Logger').logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                yaioUtils.getService('Logger').logError(message, false);
            });
    };

    $scope._getChartDataConfig = function (key) {
        return $scope.chartDataConfigs[key];
    };

    $scope._monthPath = function (t0) {
        var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
            d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
            d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1),
            cellSize = $scope.cellSize;
        return 'M' + (w0 + 1) * cellSize + ',' + d0 * cellSize
            + 'H' + w0 * cellSize + 'V' + 7 * cellSize
            + 'H' + w1 * cellSize + 'V' + (d1 + 1) * cellSize
            + 'H' + (w1 + 1) * cellSize + 'V' + 0
            + 'H' + (w0 + 1) * cellSize + 'Z';
    };

    $scope._getColorStyleForRange = d3.scale.quantize()
        .domain([1, 20])
        .range(d3.range(5).map(function(d) { return 'q' + d; }));

    $scope._getColorStyle = function (value, chartConfig) {
        if (value === 0) {
            return 'qempty';
        }
        return $scope._getColorStyleForRange(value);
    };

    /**
     * create the search-uri to use
     * @param {Object} searchOptions  current searchoptions (filter..) to use
     * @returns {String}              new search-uri
     */
    $scope._createSearchUri = function(searchOptions) {
        var newSearchOptions = {};
        Object.keys(searchOptions).map(function (element) {
            newSearchOptions[element] = searchOptions[element];
        });

        return yaioUtils.getService('YaioNodeSearch').createSearchUri(newSearchOptions, 1, 20, newSearchOptions.baseSysUID);
    };


    // init
    $scope._init();
});
