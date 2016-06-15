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
 * servicefunctions for charts
 *  
 * @FeatureDomain                WebGUI
 * @author                       Michael Schreiner <michael.schreiner@your-it-fellow.de>
 * @category                     collaboration
 * @copyright                    Copyright (c) 2014, Michael Schreiner
 * @license                      http://mozilla.org/MPL/2.0/ Mozilla Public License 2.0
 */


/**
 * service-functions to manage/control charts
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @returns {Yaio.NodeCharts}                      an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.NodeCharts = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
        me.chartDataConfigs = {
            istAufwandPerDay: { 'label': 'istAufwandPerDay', 'calltypes': {'statistic': 'istAufwandPerDay'}, 'dateFilterGE': 'istEndeGE', 'dateFilterLE': 'istStartLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 3},
            planAufwandPerDay: { 'label': 'planAufwandPerDay', 'calltypes': {'statistic': 'planAufwandPerDay'}, 'dateFilterGE': 'istEndeGE', 'dateFilterLE': 'istStartLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 3},
            created: { 'label': 'created', 'calltypes': {'search': true}, 'dateFilterGE': 'createdGE', 'dateFilterLE': 'createdLE', 'strWorkflowStateFilter': ''},
            startPlanned: { 'label': 'start planned', 'calltypes': {'statistic': 'planStartPerDay', 'search': true}, 'dateFilterGE': 'planStartGE', 'dateFilterLE': 'planStartLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 2},
            started: { 'label': 'started', 'calltypes': {'statistic': 'istStartPerDay', 'search': true}, 'dateFilterGE': 'istStartGE', 'dateFilterLE': 'istStartLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 2},
            endPlanned: { 'label': 'end planned', 'calltypes': {'statistic': 'planEndPerDay', 'search': true}, 'dateFilterGE': 'planEndeGE', 'dateFilterLE': 'planEndeLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 2},
            done: { 'label': 'done', 'calltypes': {'statistic': 'istDonePerDay', 'search': true}, 'dateFilterGE': 'istEndeGE', 'dateFilterLE': 'istEndeLE', 'strWorkflowStateFilter': 'DONE', 'statisticReturnIdx': 2},
            planned: { 'label': 'planned', 'calltypes': {'statistic': 'planRunningPerDay', 'search': true}, 'dateFilterGE': 'planEndeGE', 'dateFilterLE': 'planStartLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 2},
            running: { 'label': 'running', 'calltypes': {'statistic': 'istRunningPerDay', 'search': true}, 'dateFilterGE': 'istEndeGE', 'dateFilterLE': 'istStartLE', 'strWorkflowStateFilter': '', 'statisticReturnIdx': 2}
        };
    };

    /**
     * checks that all datasets are available
     * @param {Array} chartConfigKeys     keys for chartConfig from $scope.chartDataConfigs
     * returns {Boolean}                  true if min one dataset available
     */
    me.checkDataSetsAvailability = function(chartConfigKeys) {
        var availability = true;
        chartConfigKeys.map(function (key) {availability = availability && me.checkDataSetAvailability(key);} );
        return availability;
    };

    /**
     * checks that dataset are available
     * @param {String} chartConfigKey     key for chartConfig from me.chartDataConfigs
     * returns {Boolean}                  true if dataset available
     */
    me.checkDataSetAvailability = function(chartConfigKey) {
        var config = me._getChartDataConfig(chartConfigKey);
        if (me.appBase.DataUtils.isUndefined(config)) {
            return false;
        }

        if (config.calltypes.search === true) {
            return true;
        }

        if (!me.appBase.DataUtils.isUndefinedStringValue(config.calltypes.statistic)) {
            return me.appBase.YaioAccessManager.getAvailiableNodeAction('statistics', null, false);
        }

        return false;
    };

    /**
     * generate a chart with (chartConfigKeys) for x days around baseDate
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigKeys     keys for chartConfig from me.chartDataConfigs
     * @param {Date} baseDate             baseDate
     * @param {Number} before             show x days before baseDate
     * @param {Number} after              show x days after baseDate
     * @param {Object} searchOptions      nodefilter for YaioNodeRepository.searchNode
     */
    me.generateLineChartDay = function(chartDivSelector, chartConfigKeys, baseDate, before, after, searchOptions) {
        var chartConfigs = chartConfigKeys.map(me._getChartDataConfig);

        var filters = [], date, dateStr;
        for (var di = -before; di <= after; di++) {
            date = new Date(baseDate);
            date.setDate(date.getDate() + di);
            dateStr = me.appBase.DataUtils.formatGermanDate(date);
            filters.push([dateStr, dateStr, dateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        me._generateLineChartDate(chartDivSelector, chartConfigs, filters, {
            type: 'timeseries',
            tick: {
                format: '%d.%m.%Y'
            }
        }, { 'interval': 'day'}, searchOptions);
    };

    /**
     * generate a chart with (chartConfigKeys) for x weeks around baseDate
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigKeys     keys for chartConfig from me.chartDataConfigs
     * @param {Date} baseDate             baseDate
     * @param {Number} before             show x weeks before baseDate
     * @param {Number} after              show x weeks after baseDate
     * @param {Object} searchOptions      nodefilter for YaioNodeRepository.searchNode
     */
    me.generateLineChartWeek = function(chartDivSelector, chartConfigKeys, baseDate, before, after, searchOptions) {
        var chartConfigs = chartConfigKeys.map(me._getChartDataConfig);

        var filters = [], date, dateStr, startDateStr, endDateStr;
        for (var di = -before; di <= after; di++) {
            date = new Date(baseDate);
            date.setDate(date.getDate() + (di * 7));
            dateStr = me.appBase.DataUtils.formatGermanDate(date);
            startDateStr = me.appBase.DataUtils.formatGermanDate(me.appBase.YaioBase.getDayOfWeek(date, 1));
            endDateStr = me.appBase.DataUtils.formatGermanDate(me.appBase.YaioBase.getDayOfWeek(date, 7));
            filters.push([dateStr, startDateStr, endDateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        me._generateLineChartDate(chartDivSelector, chartConfigs, filters, {
            type: 'timeseries',
            tick: {
                format: '%d.%m.%Y'
            }
        }, { 'interval': 'week'}, searchOptions);
    };

    /**
     * generate a chart with (planned start, planned end, started and done) for x month around baseDate
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigKeys     keys for chartConfig from me.chartDataConfigs
     * @param {Date} baseDate             baseDate
     * @param {Number} before             show x months before baseDate
     * @param {Number} after              show x months after baseDate
     * @param {Object} searchOptions      nodefilter for YaioNodeRepository.searchNode
     */
    me.generateLineChartMonth = function(chartDivSelector, chartConfigKeys, baseDate, before, after, searchOptions) {
        var chartConfigs = chartConfigKeys.map(me._getChartDataConfig);

        var filters = [], date, dateStr, startDateStr, endDateStr;
        for (var di = -before; di <= after; di++) {
            date = new Date(baseDate);
            date.setMonth(date.getMonth() + di);
            dateStr = me.appBase.DataUtils.formatGermanDate(date);
            startDateStr = me.appBase.DataUtils.formatGermanDate(me.appBase.YaioBase.getFirstDayOfMonth(date));
            endDateStr = me.appBase.DataUtils.formatGermanDate(me.appBase.YaioBase.getLastDayOfMonth(date));
            filters.push([dateStr, startDateStr, endDateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        me._generateLineChartDate(chartDivSelector, chartConfigs, filters, {
            type: 'timeseries',
            tick: {
                format: '%m.%Y'
            }
        }, { 'interval': 'month'}, searchOptions);
    };

    /**
     * generate a chart with (planned start, planned end, started and done) for -5 +1 years around baseDate
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigKeys     keys for chartConfig from me.chartDataConfigs
     * @param {Date} baseDate             baseDate
     * @param {Number} before             show x years before baseDate
     * @param {Number} after              show x years after baseDate
     * @param {Object} searchOptions      nodefilter for YaioNodeRepository.searchNode
     */
    me.generateLineChartYear = function(chartDivSelector, chartConfigKeys, baseDate, before, after, searchOptions) {
        var chartConfigs = chartConfigKeys.map(me._getChartDataConfig);

        var filters = [], date, dateStr, startDateStr, endDateStr;
        for (var di = -before; di <= after; di++) {
            date = new Date(baseDate);
            date.setFullYear(date.getFullYear() + di);
            dateStr = me.appBase.DataUtils.formatGermanDate(date);
            startDateStr = '01.01.' + date.getFullYear();
            endDateStr = '31.12.' + date.getFullYear();
            filters.push([dateStr, startDateStr, endDateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        me._generateLineChartDate(chartDivSelector, chartConfigs, filters, {
            type: 'timeseries',
            tick: {
                format: '%Y'
            }
        }, { 'interval': 'year'}, searchOptions);
    };

    /**
     * generate a chart with (planned start, planned end, started and done) for filters
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} chartConfigs        chartConfigs from me.chartDataConfigs
     * @param {Array} filters             filters to call the server with [germanDate, start, ende, axis-date in ISO)
     * @param {function|string} xFormat   callback-function or formatstring for x-axis of c3.generate
     * @param {Object} options            additional options (interval...)
     * @param {Object} searchOptions      nodefilter for YaioNodeRepository.searchNode
     */
    me._generateLineChartDate = function(chartDivSelector, chartConfigs, filters, xFormat, options, searchOptions) {
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
                columns: dataColumns,
                onclick: function (d, element) {
                    var idx = d.index;
                    var columnName = d.id;
                    var chartColumn = this.chartColumns[columnName];
                    var url = '#' + me._createSearchUri(chartColumn.dataPointSearchOptions[idx]);
                    window.open(url);
                }
            },
            axis: {
                x: xFormat
            }
        });

        var chartColumns = {};
        chart.chartColumns = chartColumns;

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

            // add to chartColumns
            chartColumns[chartConfig.label] = chartColumn;

            for (di = 0; di < filters.length; di++) {
                filter = filters[di];
                var dataPointSearchOptions = me._createSearchOptions(searchOptions);
                dataPointSearchOptions.strWorkflowStateFilter = chartConfig.strWorkflowStateFilter;
                dataPointSearchOptions[chartConfig.dateFilterGE] = filter[1];
                dataPointSearchOptions[chartConfig.dateFilterLE] = filter[2];
                dataPointSearchOptions.curIdx = di;

                chartColumn.dataPointState[di] = 0;
                chartColumn.dataPointSearchOptions[di] = dataPointSearchOptions;
            }

            // search data
            if (!me.appBase.DataUtils.isUndefinedStringValue(chartConfig.calltypes.statistic) &&
                me.appBase.YaioAccessManager.getAvailiableNodeAction('statistics', null, false) &&
                options.interval === 'day') {
                me._doLineChartStatisticCall(chart, chartColumn);
            } else if (chartConfig.calltypes.search === true) {
                me._doLineChartSearch(chart, chartColumn);
            } else {
                console.error('unknown calltype:', chartConfig);
                return;
            }
            me._updateLineChart(chart, chartColumn);
        }
    };

    /**
     * execute statistic-call to get value of chartpoints: callback sets chartColumn.dataColumn and chartColumn.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    me._doLineChartStatisticCall = function (chart, chartColumn) {
        var dataPointSearchOptions = chartColumn.dataPointSearchOptions[0];
        var chartConfig = chartColumn.chartConfig, value, idx;
        me.appBase.YaioNodeRepository.callStatistics(chartConfig.calltypes.statistic, chartColumn.start, chartColumn.end, dataPointSearchOptions)
            .then(function(angularResponse) {
                // success handler
                var values = angularResponse.data.values;
                values.map(function (element) {
                    idx = element[0]-1;
                    value = element[chartConfig.statisticReturnIdx];
                    value = (value === null ? 0 : Math.round(value * 100) / 100);
                    chartColumn.dataColumn[idx+1] = value; // because of label as first element
                    chartColumn.dataPointState[idx] = 1;
                });
            }, function(angularResponse) {
                // error handler
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading nodes with searchOptions: ' + dataPointSearchOptions;
                me.appBase.Logger.logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                me.appBase.Logger.logError(message, false);
            });
    };

    /**
     * execute search to get values of all chartpoints in chartColumn.dataPointSearchOptions
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    me._doLineChartSearch = function (chart, chartColumn) {
        for (var di = 0; di < chartColumn.dataPointSearchOptions.length; di++) {
            me._doLineChartPointSearch(chart, chartColumn, di);
        }
    };

    /**
     * execute search to get value of a chartpoint: callback sets chartColumn.dataColumn and chartColumn.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     * @param {number} idx           idx of the chartColumn.dataPointSearchOptions to call
     */
    me._doLineChartPointSearch = function (chart, chartColumn, idx) {
        var dataPointSearchOptions = chartColumn.dataPointSearchOptions[idx];
        me.appBase.YaioNodeRepository.searchNode(dataPointSearchOptions)
            .then(function(angularResponse) {
                // success handler
                chartColumn.dataColumn[dataPointSearchOptions.curIdx + 1] = angularResponse.data.count;  // because of label as first element
                chartColumn.dataPointState[dataPointSearchOptions.curIdx] = 1;
            }, function(angularResponse) {
                // error handler
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading nodes with searchOptions: ' + dataPointSearchOptions;
                me.appBase.Logger.logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                me.appBase.Logger.logError(message, false);
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
    me._updateLineChart = function (chart, chartColumn) {
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
                me._updateLineChart(chart, chartColumn);
            }, chartColumn.timeOut);
        }
    };

    /**
     * generate a calendar-chart (like github-commit-chart) for full years
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {String} chartConfigKey     key for chartConfig from me.chartDataConfigs
     * @param {Date} baseDate             baseDate
     * @param {Number} before             show x days before baseDate
     * @param {Number} after              show x days after baseDate
     * @param {Object} searchOptions      nodefilter for YaioNodeRepository.searchNode
     */
    me.generateCalendarChartYear = function(chartDivSelector, chartConfigKey, baseDate, before, after, searchOptions) {
        var chartConfig = me._getChartDataConfig(chartConfigKey);

        if (me.appBase.DataUtils.isEmptyStringValue(before)) {
            before = 184;
        }
        if (me.appBase.DataUtils.isEmptyStringValue(after)) {
            after = 184;
        }

        var filters = [], date, dateStr;
        for (var di = -before; di <= after; di++) {
            date = new Date(baseDate);
            date.setDate(date.getDate() + di);
            dateStr = me.appBase.DataUtils.formatGermanDate(date);
            filters.push([dateStr, dateStr, dateStr, date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()]);
        }

        me._generateCalendarChart(chartDivSelector, filters, chartConfig, searchOptions);
    };

    /**
     * generate a calendar-chart (like github-commit-chart) for full years
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} filters             dateFilters array
     * @param {Object} chartConfig        chartConfig from me.chartDataConfigs
     * @param {Object} searchOptions      nodefilter for YaioNodeRepository.searchNode
     */
    me._generateCalendarChart = function(chartDivSelector, filters, chartConfig, searchOptions) {
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
        me.cellSize = cellSize;

        var format = d3.time.format('%d.%m.%Y');

        var startYear = me.appBase.YaioBase.parseGermanDate(filters[0][1]).getFullYear();
        var endYear = me.appBase.YaioBase.parseGermanDate(filters[filters.length-1][2]).getFullYear();

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
            .attr('d', me._monthPath);

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
            var dataPointSearchOptions = me._createSearchOptions(searchOptions);
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
        if (!me.appBase.DataUtils.isUndefinedStringValue(chartConfig.calltypes.statistic) &&
                me.appBase.YaioAccessManager.getAvailiableNodeAction('statistics', null, false)) {
            me._doCalendarChartStatisticCall(rect, chartColumn);
        } else if (chartConfig.calltypes.search === true) {
            me._doCalendarChartSearch(rect, chartColumn);
        } else {
            console.error('unknown calltype:', chartConfig);
            return;
        }
    };

    /**
     * execute statistic-call to get value of chartpoints: callback sets chartColumn.dataColumn and chartColumn.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    me._doCalendarChartStatisticCall = function (chart, chartColumn) {
        var dataPointSearchOptions;
        chartColumn.dataPointSearchOptions.map(function (dataPointSearchOptions) {
            chart.filter(function(d) { return d === dataPointSearchOptions.date; })
                .attr('class', function(d) { return 'day ' + me._getColorStyle(0); });
        });

        dataPointSearchOptions = chartColumn.dataPointSearchOptions[0];
        var chartConfig = chartColumn.chartConfig, value, idx, date, dateParts;
        me.appBase.YaioNodeRepository.callStatistics(chartConfig.calltypes.statistic, chartColumn.start, chartColumn.end, dataPointSearchOptions)
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
                    var url = '#' + me._createSearchUri(chartColumn.dataPointSearchOptions[idx]);

                    var rect = chart.filter(function(d) {
                        return d === date;
                    });
                    rect.attr('class', function(d) {
                        return 'day ' + me._getColorStyle(value);
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
                me.appBase.Logger.logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                me.appBase.Logger.logError(message, false);
            });
    };


    /**
     * execute search to get values of all chartpoints in chartColumn.dataPointSearchOptions
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    me._doCalendarChartSearch = function (chart, chartColumn) {
        for (var di = 0; di < chartColumn.dataPointSearchOptions.length; di++) {
            me._doCalendarChartPointSearch(chart, chartColumn, di);
        }
    };

    /**
     * execute search to get value of a chartpoint: callback sets chartColumn.dataColumn and chartColumn.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartColumn   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     * @param {number} idx           idx of the chartColumn.dataPointSearchOptions to call
     */
    me._doCalendarChartPointSearch = function (chart, chartColumn, idx) {
        var dataPointSearchOptions = chartColumn.dataPointSearchOptions[idx];
        me.appBase.YaioNodeRepository.searchNode(dataPointSearchOptions)
            .then(function(angularResponse) {
                // success handler
                chartColumn.dataColumn[dataPointSearchOptions.curIdx + 1] = angularResponse.data.count;  // because of label as first element
                chartColumn.dataPointState[dataPointSearchOptions.curIdx] = 1;
                chart.filter(function(d) { return d === dataPointSearchOptions.date; })
                    .attr('class', function(d) { return 'day ' + me._getColorStyle(angularResponse.data.count); })
                    .select('title')
                    .text(function(d) { return d + ': ' + angularResponse.data.count + ' ' + dataPointSearchOptions.label; });
            }, function(angularResponse) {
                // error handler
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading nodes with searchOptions: ' + dataPointSearchOptions;
                me.appBase.Logger.logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                me.appBase.Logger.logError(message, false);
            });
    };

    me._getChartDataConfig = function (key) {
        return me.chartDataConfigs[key];
    };

    me._monthPath = function (t0) {
        var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
            d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
            d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1),
            cellSize = me.cellSize;
        return 'M' + (w0 + 1) * cellSize + ',' + d0 * cellSize
            + 'H' + w0 * cellSize + 'V' + 7 * cellSize
            + 'H' + w1 * cellSize + 'V' + (d1 + 1) * cellSize
            + 'H' + (w1 + 1) * cellSize + 'V' + 0
            + 'H' + (w0 + 1) * cellSize + 'Z';
    };

    me._getColorStyleForRange = d3.scale.quantize()
        .domain([1, 20])
        .range(d3.range(5).map(function(d) { return 'q' + d; }));

    me._getColorStyle = function (value, chartConfig) {
        if (value === 0) {
            return 'qempty';
        }
        return me._getColorStyleForRange(value);
    };

    /**
     * create search-options to call YaioNodeRepository.searchNode
     * @param {Object} searchOptions      searchOptions for YaioNodeRepository.searchNode to override defaults
     * @returns {Object}                  searchOptions for YaioNodeRepository.searchNode
     */
    me._createSearchOptions = function (searchOptions){
        var dataPointSearchOptions = {
            curIdx: 0,
            curPage: 1,
            pageSize: 1,
            searchSort: 'lastChangeDown',
            baseSysUID: me.appBase.config.masterSysUId,
            fulltext: '',
            total: 0,
            strNotNodePraefix: '',
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

        Object.keys(searchOptions).map(function (element) {
            dataPointSearchOptions[element] = searchOptions[element];
        });

        return dataPointSearchOptions;
    };

    /**
     * create the search-uri to use
     * @param {Object} searchOptions  current searchoptions (filter..) to use
     * @returns {String}              new search-uri
     */
    me._createSearchUri = function(searchOptions) {
        var newSearchOptions = {};
        Object.keys(searchOptions).map(function (element) {
            newSearchOptions[element] = searchOptions[element];
        });

        return me.appBase.YaioNodeSearch.createSearchUri(newSearchOptions, 1, 20, newSearchOptions.baseSysUID);
    };

    me._init();
    
    return me;
};