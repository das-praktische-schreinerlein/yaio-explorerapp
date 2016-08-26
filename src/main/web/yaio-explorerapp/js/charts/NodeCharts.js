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
        me._chartIdx = 1;
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

        me.generateLineDateChartFull(chartDivSelector, chartConfigs, filters, {
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

        me.generateLineDateChartFull(chartDivSelector, chartConfigs, filters, {
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

        me.generateLineDateChartFull(chartDivSelector, chartConfigs, filters, {
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

        me.generateLineDateChartFull(chartDivSelector, chartConfigs, filters, {
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
     * @param {Array} dateFilters         filters to call the server with [germanDate, start, ende, axis-date in ISO)
     * @param {function|string} xFormat   callback-function or formatstring for x-axis of c3.generate
     * @param {Object} options            additional options (interval...)
     * @param {Object} searchOptions      nodefilter for YaioNodeRepository.searchNode
     */
    me.generateLineDateChartFull = function(chartDivSelector, chartConfigs, dateFilters, xFormat, options, searchOptions) {
        // configure columns
        var dataColumns = me._prepareDataColumns(chartConfigs, dateFilters);
        var chartLines = me._prepareChartLineConfigs(chartConfigs, dateFilters, options, searchOptions, dataColumns);
        me.generateLineDateChart(chartDivSelector, dataColumns[0], chartLines, xFormat, options);
    };

    /**
     * generate a chart with (planned start, planned end, started and done) for chartLines
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} dateDataColumns     preconfigured dataColumns for date-line: start with label
     * @param {Array} chartLines          array of objects with fields: dataColumn, chartConfig, dataPointState,
     *                                    dataPointSearchOptions, timeOut, maxTries, cur, done
     * @param {function|string} xFormat   callback-function or formatstring for x-axis of c3.generate
     * @param {Object} options            additional options (interval...)
     */
    me.generateLineDateChart = function(chartDivSelector, dateDataColumns, chartLines, xFormat, options) {
        // configure
        var dataColumns = [dateDataColumns];
        var chartConfigs = [];
        Object.keys(chartLines).map(function (chartLineKey) {
            var chartLine = chartLines[chartLineKey];
            var chartConfig = chartLine.chartConfig;
            var dataColumn = chartLine.dataColumn;
            dataColumns.push(dataColumn);
            chartConfigs.push(chartConfig);
        });

        var chartId = 'dateChart' + new Date().getTime() + '_' + (me._chartIdx++);
        $(chartDivSelector).children().remove();
        $(chartDivSelector).append('<div class="workboard-chart-instance" id="' + chartId + '"></div>');

        var chart = c3.generate({
            bindto: ('#' + chartId),
            data: {
                x: 'dates',
                type: 'area',
                columns: dataColumns,
                onclick: function (d) {
                    var idx = d.index;
                    var lineName = d.id;
                    var chartLine = this.chartLines[lineName];
                    var url = '#' + me._createSearchUri(chartLine.dataPointSearchOptions[idx]);
                    window.open(url);
                }
            },
            axis: {
                x: xFormat
            }
        });
        chart.chartLines = chartLines;
        chart.chartConfigs = chartConfigs;

        chart.failed = false;
        chart.done = false;
        chart.timeOut = 2000;
        chart.maxTries = 30;
        chart.cur = 0;

        chart.spinner = me.appBase.YaioLayout.showDiagramSpinner(document.getElementById(chartId));

        for (var ci = 0; ci < chartConfigs.length; ci++) {
            var chartConfig = chartConfigs[ci];
            var chartLine = chartLines[chartConfig.label];
            chartLine.done = false;
            chartLine.failed = false;

            if (!me.appBase.DataUtils.isUndefinedStringValue(chartConfig.calltypes.statistic) &&
                me.appBase.YaioAccessManager.getAvailiableNodeAction('statistics', null, false) &&
                options.interval === 'day') {
                me._doLineChartStatisticCall(chart, chartLine);
            } else if (chartConfig.calltypes.search === true) {
                me._doLineChartSearch(chart, chartLine);
            } else {
                console.error('unknown calltype:', chartConfig);
                return;
            }
            me._updateLineChartLine(chart, chartLine);
        }
        me._updateLineChart(chart);
    };

    /**
     * execute statistic-call to get value of chartpoints: callback sets chartLine.dataColumn and chartLine.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartLine   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    me._doLineChartStatisticCall = function (chart, chartLine) {
        var dataPointSearchOptions = chartLine.dataPointSearchOptions[0];
        var chartConfig = chartLine.chartConfig, value, idx;
        me.appBase.YaioNodeRepository.callStatistics(chartConfig.calltypes.statistic, chartLine.start, chartLine.end, dataPointSearchOptions)
            .then(function(angularResponse) {
                // success handler
                var values = angularResponse.data.values;
                // set values
                values.map(function (element) {
                    idx = element[0]-1;
                    value = element[chartConfig.statisticReturnIdx];
                    value = (value === null ? 0 : Math.round(value * 100) / 100);
                    chartLine.dataColumn[idx+1] = value; // because of label as first element
                });
                // set all points to true
                for (var di = 0; di < chartLine.dataPointSearchOptions.length; di++) {
                    chartLine.dataPointState[di] = 1;
                }
                me._checkForLineChartUpdate(chart, chartLine);
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
     * execute search to get values of all chartpoints in chartLine.dataPointSearchOptions
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartLine   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    me._doLineChartSearch = function (chart, chartLine) {
        for (var di = 0; di < chartLine.dataPointSearchOptions.length; di++) {
            me._doLineChartPointSearch(chart, chartLine, di);
        }
    };

    /**
     * execute search to get value of a chartpoint: callback sets chartLine.dataColumn and chartLine.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartLine   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     * @param {number} idx           idx of the chartLine.dataPointSearchOptions to call
     */
    me._doLineChartPointSearch = function (chart, chartLine, idx) {
        var dataPointSearchOptions = chartLine.dataPointSearchOptions[idx];
        me.appBase.YaioNodeRepository.searchNode(dataPointSearchOptions)
            .then(function(angularResponse) {
                // success handler
                chartLine.dataColumn[dataPointSearchOptions.curIdx + 1] = angularResponse.data.count;  // because of label as first element
                chartLine.dataPointState[dataPointSearchOptions.curIdx] = 1;
                me._checkForLineChartUpdate(chart, chartLine);
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
     * check if chart timed out chartLine.failed or chart.fauled is set -> recall updateFunctions
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartLine   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    me._checkForLineChartUpdate = function (chart, chartLine) {
        // restart update for failed charts
        if (chartLine.failed) {
            me._updateLineChartLine(chart, chartLine);
        }
        if (chart.failed) {
            me._updateLineChart(chart);
        }
    };

    /**
     * update chartline of chart with chartLine.dataColumn
     * recall itself every chartLine.timeOut ms till all chartLine.dataPointState == 1 or
     * chartLine.cur >= chartLine.maxTries
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartLine     object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur, done
     */
    me._updateLineChartLine = function (chart, chartLine) {
        chartLine.failed = false;

        var ready = true;
        for (var di = 0; di < chartLine.dataPointSearchOptions.length; di++) {
            if (chartLine.dataPointState[di] !== 1) {
                ready = false;
                di = chartLine.dataPointSearchOptions.length + 1;
            }
        }

        // update chart
        chart.load({
            columns: [
                chartLine.dataColumn
            ]
        });

        //
        chartLine.cur++;
        if (!ready && chartLine.cur < chartLine.maxTries) {
            // retry
            setTimeout(function() {
                me._updateLineChartLine(chart, chartLine);
            }, chartLine.timeOut);
        } else if (ready) {
            // we are ready
            chartLine.done = true;
        } else {
            // failed: stop
            chartLine.failed = true;
        }
    };

    /**
     * update chart
     * recall itself every chart.timeOut ms till all chartLine.dome == true or
     * chart.cur >= chart.maxTries
     * @param {Object} chart         chat-object generated by c3.generate
     */
    me._updateLineChart = function (chart) {
        chart.failed = false;

        var ready = true;
        for (var ci = 0; ci < chart.chartConfigs.length; ci++) {
            var chartConfig = chart.chartConfigs[ci];
            var chartLine = chart.chartLines[chartConfig.label];
            if (!chartLine.done) {
                ready = false;
                ci = chart.chartConfigs.length +1;
            }
        }

        chart.cur++;
        if (!ready && chart.cur < chart.maxTries) {
            // retry
            setTimeout(function() {
                me._updateLineChart(chart);
            }, chart.timeOut);
        } else if (ready) {
            // we are ready
            chart.done = true;
            me.appBase.YaioLayout.hideDiagramSpinner(chart.spinner);
        } else {
            // failed: stop
            chart.failed = true;
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

        me.generateCalendarChartFull(chartDivSelector, filters, chartConfig, searchOptions);
    };

    /**
     * generate a calendar-chart (like github-commit-chart) for full years
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Array} dateFilters         dateFilters array
     * @param {Object} chartConfig        chartConfig from me.chartDataConfigs
     * @param {Object} searchOptions      nodefilter for YaioNodeRepository.searchNode
     */
    me.generateCalendarChartFull = function(chartDivSelector, dateFilters, chartConfig, searchOptions) {
        // configure columns
        var dataColumns = me._prepareDataColumns([chartConfig], dateFilters);
        var chartLines = me._prepareChartLineConfigs([chartConfig], dateFilters, {}, searchOptions, dataColumns);
        var chartLine = chartLines[chartConfig.label];

        me.generateCalendarChart(chartDivSelector, chartLine);
    };

    /**
     * generate a calendar-chart (like github-commit-chart) for full years
     * @param {String} chartDivSelector   jquery-selector to add the chart on
     * @param {Object} chartLine          object with fields: dataColumn, chartConfig, dataPointState,
     *                                    dataPointSearchOptions, timeOut, maxTries, cur
     */
    me.generateCalendarChart = function(chartDivSelector, chartLine) {
        var chartConfig = chartLine.chartConfig;

        var width = 960,
            height = 136,
            cellSize = 17; // cell size
        me.cellSize = cellSize;

        var format = d3.time.format('%d.%m.%Y');

        var startYear = me.appBase.YaioBase.parseGermanDate(chartLine.start).getFullYear();
        var endYear = me.appBase.YaioBase.parseGermanDate(chartLine.end).getFullYear();

        var chartId = 'calendarChart' + new Date().getTime() + '_' + (me._chartIdx++);
        $(chartDivSelector).children().remove();
        $(chartDivSelector).append('<div class="workboard-chart-instance" id="' + chartId + '" style="position: relative;"></div>');

        var svg = d3.select('#' + chartId).selectAll('svg')
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

        rect.chartLine = chartLine;

        rect.done = false;
        rect.failed = false;
        rect.timeOut = 2000;
        rect.maxTries = 30;
        rect.cur = 0;
        chartLine.done = false;
        chartLine.failed = false;

        rect.spinner = me.appBase.YaioLayout.showDiagramSpinner(document.getElementById(chartId));

        // search data
        if (!me.appBase.DataUtils.isUndefinedStringValue(chartConfig.calltypes.statistic) &&
            me.appBase.YaioAccessManager.getAvailiableNodeAction('statistics', null, false)) {
            me._doCalendarChartStatisticCall(rect, chartLine);
        } else if (chartConfig.calltypes.search === true) {
            me._doCalendarChartSearch(rect, chartLine);
            me._updateCalendarChartLine(rect, chartLine);
        } else {
            console.error('unknown calltype:', chartConfig);
            return;
        }
        me._updateCalendarChart(rect);
    };

    /**
     * execute statistic-call to get value of chartpoints: callback sets chartLine.dataColumn and chartLine.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartLine   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    me._doCalendarChartStatisticCall = function (chart, chartLine) {
        var dataPointSearchOptions;
        chartLine.dataPointSearchOptions.map(function (dataPointSearchOptions) {
            chart.filter(function(d) { return d === dataPointSearchOptions.date; })
                .attr('class', function(d) { return 'day ' + me._getColorStyle(0); });
        });

        dataPointSearchOptions = chartLine.dataPointSearchOptions[0];
        var chartConfig = chartLine.chartConfig, value, idx, date, dateParts;
        me.appBase.YaioNodeRepository.callStatistics(chartConfig.calltypes.statistic, chartLine.start, chartLine.end, dataPointSearchOptions)
            .then(function(angularResponse) {
                // success handler
                var values = angularResponse.data.values;
                values.map(function (element) {
                    idx = element[0]-1;
                    dateParts = element[1].split('-');
                    date = dateParts[2] + '.' + dateParts[1] + '.' + dateParts[0];
                    value = element[chartConfig.statisticReturnIdx];
                    value = (value === null ? 0 : Math.round(value * 100) / 100);
                    chartLine.dataColumn[idx+1] = value; // because of label as first element
                    chartLine.dataPointState[idx] = 1;
                    var url = '#' + me._createSearchUri(chartLine.dataPointSearchOptions[idx]);

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
                    chartLine.done = true;
                });
                // set all points to true
                for (var di = 0; di < chartLine.dataPointSearchOptions.length; di++) {
                    chartLine.dataPointState[di] = 1;
                }
                me._checkForCalendarChartUpdate(chart, chartLine);
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
     * execute search to get values of all chartpoints in chartLine.dataPointSearchOptions
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartLine   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    me._doCalendarChartSearch = function (chart, chartLine) {
        for (var di = 0; di < chartLine.dataPointSearchOptions.length; di++) {
            me._doCalendarChartPointSearch(chart, chartLine, di);
        }
    };

    /**
     * execute search to get value of a chartpoint: callback sets chartLine.dataColumn and chartLine.dataPointState
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartLine   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     * @param {number} idx           idx of the chartLine.dataPointSearchOptions to call
     */
    me._doCalendarChartPointSearch = function (chart, chartLine, idx) {
        var dataPointSearchOptions = chartLine.dataPointSearchOptions[idx];
        me.appBase.YaioNodeRepository.searchNode(dataPointSearchOptions)
            .then(function(angularResponse) {
                // success handler
                chartLine.dataColumn[dataPointSearchOptions.curIdx + 1] = angularResponse.data.count;  // because of label as first element
                chartLine.dataPointState[dataPointSearchOptions.curIdx] = 1;
                chart.filter(function(d) { return d === dataPointSearchOptions.date; })
                    .attr('class', function(d) { return 'day ' + me._getColorStyle(angularResponse.data.count); })
                    .select('title')
                    .text(function(d) { return d + ': ' + angularResponse.data.count + ' ' + dataPointSearchOptions.label; });
                me._checkForCalendarChartUpdate(chart, chartLine);
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
     * check if chart timed out chartLine.failed or chart.fauled is set -> recall updateFunctions
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartLine   object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur
     */
    me._checkForCalendarChartUpdate = function (chart, chartLine) {
        // restart update for failed charts
        if (chartLine.failed) {
            me._updateCalendarChartLine(chart, chartLine);
        }
        if (chart.failed) {
            me._updateCalendarChart(chart);
        }
    };

    /**
     * update chartline of chart with chartLine.dataColumn
     * recall itself every chartLine.timeOut ms till all chartLine.dataPointState == 1 or
     * chartLine.cur >= chartLine.maxTries
     * @param {Object} chart         chat-object generated by c3.generate
     * @param {Object} chartLine     object with fields: dataColumn, chartConfig, dataPointState,
     *                               dataPointSearchOptions, timeOut, maxTries, cur, done
     */
    me._updateCalendarChartLine = function (chart, chartLine) {
        chartLine.failed = false;

        var ready = true;
        for (var di = 0; di < chartLine.dataPointSearchOptions.length; di++) {
            if (chartLine.dataPointState[di] !== 1) {
                ready = false;
                di = chartLine.dataPointSearchOptions.length + 1;
            }
        }

        chartLine.cur++;
        if (!ready && chartLine.cur < chartLine.maxTries) {
            // retry
            setTimeout(function() {
                me._updateCalendarChartLine(chart, chartLine);
            }, chartLine.timeOut);
        } else if (ready) {
            // we are ready
            chartLine.done = true;
        } else {
            // failed: stop
            chartLine.failed = true;
        }
    };

    /**
     * update chart
     * recall itself every chart.timeOut ms till all chartLine.dome == true or
     * chart.cur >= chart.maxTries
     * @param {Object} chart         chat-object generated by c3.generate
     */
    me._updateCalendarChart = function (chart) {
        chart.failed = false;
        var ready = chart.chartLine.done;

        chart.cur++;
        if (!ready && chart.cur < chart.maxTries) {
            // retry
            setTimeout(function() {
                me._updateCalendarChart(chart);
            }, chart.timeOut);
        } else if (ready) {
            // we are ready
            chart.done = true;
            me.appBase.YaioLayout.hideDiagramSpinner(chart.spinner);
        } else {
            // failed: stop
            chart.failed = true;
        }
    };

    /**
     * prepare datacolumns for chartConfig and filters
     * @param {Array} chartConfigs        chartConfigs from me.chartDataConfigs
     * @param {Array} dateFilters         filters to call the server with [germanDate, start, ende, axis-date in ISO)
     * @returns {Array}                   the preconfigured dataColumns: first is date-line/ all arrays start with label
     */
    me._prepareDataColumns = function(chartConfigs, dateFilters) {
        // configure columns
        var dataColumns = [], filter;
        dataColumns.push(['dates']);
        for (var ci = 0; ci < chartConfigs.length; ci++) {
            dataColumns.push([chartConfigs[ci].label]);
        }

        for (var di = 0; di < dateFilters.length; di++) {
            filter = dateFilters[di];
            dataColumns[0].push(filter[3]);
            for (ci = 0; ci < chartConfigs.length; ci++) {
                dataColumns[ci+1].push(0);
            }
        }

        return dataColumns;
    };

    /**
     * prpeare chart
     * @param {Array} chartConfigs        chartConfigs from me.chartDataConfigs
     * @param {Array} dateFilters         filters to call the server with [germanDate, start, ende, axis-date in ISO)
     * @param {Object} options            additional options (interval...)
     * @param {Object} searchOptions      nodefilter for YaioNodeRepository.searchNode
     * @param {Array} dataColumns         preconfigured dataColumns: first is date-line/ all arrays start with label
     * @returns {Object}                  Object with preconfigured chartLineConfigs
     */
    me._prepareChartLineConfigs = function(chartConfigs, dateFilters, options, searchOptions, dataColumns) {

        var chartLines = {}, ci, di, filter;
        for (ci = 0; ci < chartConfigs.length; ci++) {
            var chartConfig = chartConfigs[ci];
            var chartLine = {};
            chartLine.dataColumn = dataColumns[ci + 1];
            chartLine.chartConfig = chartConfig;
            chartLine.dataPointState = [];
            chartLine.dataPointSearchOptions = [];
            chartLine.timeOut = 2000;
            chartLine.maxTries = 30;
            chartLine.cur = 0;
            chartLine.interval = options.interval;
            chartLine.start = dateFilters[0][1];
            chartLine.end = dateFilters[dateFilters.length-1][2];

            // add to chartLines
            chartLines[chartConfig.label] = chartLine;

            for (di = 0; di < dateFilters.length; di++) {
                filter = dateFilters[di];
                var dataPointSearchOptions = me._createSearchOptions(searchOptions);
                dataPointSearchOptions.strWorkflowStateFilter = chartConfig.strWorkflowStateFilter;
                dataPointSearchOptions[chartConfig.dateFilterGE] = filter[1];
                dataPointSearchOptions[chartConfig.dateFilterLE] = filter[2];
                dataPointSearchOptions.curIdx = di;
                dataPointSearchOptions.date = filter[0];
                dataPointSearchOptions.label = chartConfig.label;

                chartLine.dataPointState[di] = 0;
                chartLine.dataPointSearchOptions[di] = dataPointSearchOptions;
            }
        }

        return chartLines;
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