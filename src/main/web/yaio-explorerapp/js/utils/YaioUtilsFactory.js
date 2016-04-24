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
 * angular-factory for serving yaioUtils-services - create yaioUtils with util-functions
 * @service
 */
yaioApp.factory('yaioUtils', ['$location', '$http', '$rootScope', '$q', function ($location, $http, $rootScope, $q) {
    'use strict';

    var appBase = yaioAppBase;
    var ganttRangeStart = appBase.get('DataUtils').formatGermanDate((new Date()).getTime() - 90*24*60*60*1000); 
    var ganttRangeEnd = appBase.get('DataUtils').formatGermanDate((new Date()).getTime() + 90*24*60*60*1000);

    // set angular to appbase
    appBase.configureService('Angular.$location', function() { return $location; });
    appBase.configureService('Angular.$http', function() { return $http; });
    appBase.configureService('Angular.$rootScope', function() { return $rootScope; });
    appBase.configureService('Angular.$q', function() { return $q; });

    var me = {
        now: function() {
            var date = new Date();
            return date;
        },

        getDayOfWeek: function(date, dayOfWeek) {
            date = new Date(date.getTime ());
            var weekDay = date.getDay();
            if (weekDay === 0) {
                weekDay = 7;
            }
            date.setDate(date.getDate() + (dayOfWeek - weekDay) % 7);
            return date;
        },

        getWithTime00: function(date) {
            date = new Date(date.getTime ());
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        },

        getWithTime24: function(date) {
            date = new Date(date.getTime ());
            date.setHours(23);
            date.setMinutes(59);
            date.setSeconds(59);
            date.setMilliseconds(999);
            return date;
        },

        getFirstDayOfMonth: function(date) {
            date = new Date(date.getTime ());
            date.setFullYear(date.getFullYear(), date.getMonth(), 1);
            return date;
        },

        getLastDayOfMonth: function(date) {
            date = new Date(date.getTime ());
            date.setFullYear(date.getFullYear(), date.getMonth()+1, 0);
            return date;
        },

        getLastMonth: function(date) {
            date = new Date(date.getTime ());
            date.setFullYear(date.getFullYear(), date.getMonth()-1, date.getDate());
            return date;
        },

        getNextMonth: function(date) {
            date = new Date(date.getTime ());
            date.setFullYear(date.getFullYear(), date.getMonth()+1, date.getDate());
            return date;
        },

        getStartOfTime: function() {
            var date = new Date();
            date.setFullYear('1976', '04', '28');
            return date;
        },


        /**
         * open helpsite
         * @param {String} url                    the url of the helpsite
         */
        showHelpSite: function(url) {
            console.log('showHelpSite:' + ' url:' + url);
            appBase.get('YaioLayout').yaioShowHelpSite(url);
            return false;
        },

        /**
         * toggle the sys-container for the node
         * @param {Object} node    node-data
         */
        toggleSysContainerForNode: function(node) {
            appBase.get('YaioExplorerCommands').toggleNodeSysContainerForNodeId(node.sysUID);
        },

        /**
         * toggle editor for the node
         * @param {Object} node     node-data
         * @param {String} mode     edit, create, createsymlink
         * @param {Object} newNode  optional node to copy data from (for mode createsnapshot...)
         */
        openNodeEditorForNode: function(node, mode, newNode) {
            appBase.get('YaioNodeEditor').openNodeEditorForNode(node, mode, newNode);
        },

        /**
         * download the content as file (create response and open in new window)
         * @param {String} domId     id of the link to add the action
         * @param {string} content   data to download
         * @param {string} fileName  filename for save-dialog of the browser
         * @param {string} mime      mimetype of the file
         * @param {string} encoding  encoding to set
         */
        downloadAsFile: function(domId, content, fileName, mime, encoding) {
            return appBase.getService('FileUtils').downloadAsFile(appBase.$(domId), content, fileName, mime, encoding);
        },

        /**
         * Renders the full block for corresponding basenode.
         * @param {Object} node           node-data to render
         * @param {String} trIdSelector   tr-selector to append the rendered data
         * @param {Boolean} flgMinimum    render only the minimal subset of data
         */
        renderNodeLine: function(node, trIdSelector, flgMinimum) {
            // load me
            var data = {
                 node: {
                     data: {
                         basenode: node
                     },
                     tr: trIdSelector
                 } 
            };
            
            console.log('renderNodeLine nodeId=' + node.sysUID + ' tr=' + $(trIdSelector).length);
            appBase.get('YaioNodeDataRenderer').renderColumnsForNode(null, data, true, flgMinimum);
        },

        /**
         * render nodeLine for node (adds it as '#tr' + node.sysUID to fancytree)
         * @param {Object} node          node to render
         * @param {String} idPrefix      html-prefix for html-id
         * @param {Object} searchOptions as the name says
         */
        renderSearchNodeLine: function(node, idPrefix, searchOptions) {
            var htmlId = '#tr' + idPrefix + node.sysUID;
            me.renderNodeLine(node, htmlId, searchOptions.flgRenderMinimum);

            // add parent+searchdata
            var $html = $(me.createParentHirarchyBlockForNode(node, 'tr' + idPrefix + '_') +
                me.createSearchWordsBlockForNode(node, 'tr' + idPrefix + '_', searchOptions));
            $(htmlId + ' #detail_sys_' + node.sysUID).after($html);
        },

        /**
         * render nodeCard for node (adds it as '#tr' + node.sysUID to fancytree)
         * @param {Object} node          node to render
         * @param {String} idPrefix      html-prefix for html-id
         * @param {Object} searchOptions as the name says
         */
        renderSearchNodeCard: function(node, idPrefix, searchOptions) {
            var htmlId = '#card' + idPrefix + node.sysUID;
            me.getService('YaioNodeDataRenderer').renderNodeCard(
                node, htmlId, searchOptions.baseSysUID);

            // add pareent+searchdata
            var $html = $(me.createParentHirarchyBlockForNode(node, 'card' + idPrefix + '_'));
            $(htmlId).find('div.container_data_row').eq(0).after($html);
        },

        /**
         * create parentHirarchy-Block for node
         * @param {Object} node          node to render
         * @param {String} idPrefix      prefix for html-id
         * @returns {String}
         */
        createParentHirarchyBlockForNode: function(node, idPrefix) {
            // render hierarchy
            var parentNode = node.parentNode;
            var parentStr = node.name;
            while (!me.getService('DataUtils').isEmptyStringValue(parentNode)) {
                parentStr = parentNode.name + ' --> ' + parentStr;
                parentNode = parentNode.parentNode;
            }
            parentStr = '<b>' + me.getService('DataUtils').htmlEscapeText(parentStr) + '</b>';

            // add hierarchy
            var html = '<div id="details_parent_' + idPrefix + node.sysUID + '"'
                + ' class="field_nodeParent">' + parentStr + '</div>';
            return html;
        },

        /**
         * create searchWords-Block for node
         * @param {Object} node          node to render
         * @param {String} idPrefix      html-prefix for html-id
         * @param {Object} searchOptions as the name says
         * @returns {String}
         */
        createSearchWordsBlockForNode: function(node, idPrefix, searchOptions) {
            // extract search words
            var searchExtract = '';
            if (searchOptions.fulltext
                && searchOptions.fulltext.length > 0
                && !me.getService('DataUtils').isUndefinedStringValue(node.nodeDesc)) {
                // split to searchwords
                var searchWords = searchOptions.fulltext.split(' ');
                var searchWord, searchResults, splitLength, splitText;

                var descText = node.nodeDesc;
                descText = descText.replace(/<WLBR>/g, '\n');
                descText = descText.replace(/<WLESC>/g, '\\');
                descText = descText.replace(/<WLTAB>/g, '\t');
                descText = descText.toLowerCase();

                for (var idx in searchWords) {
                    if (!searchWords.hasOwnProperty(idx)) {
                        continue;
                    }
                    searchWord = me.getService('DataUtils').escapeRegExp(searchWords[idx]);

                    // split by searchwords
                    searchResults = descText.toLowerCase().split(searchWord.toLowerCase());

                    // add dummy-element if desc start/ends with searchWord
                    if (descText.search(searchWord.toLowerCase()) === 0) {
                        searchResults.insert(' ');
                    }
                    if (descText.search(searchWord.toLowerCase()) === (descText.length - searchWord.length)) {
                        searchResults.push(' ');
                    }

                    // iterate and show 50 chars before and behind
                    for (var idx2 = 0; idx2 < searchResults.length; idx2++) {
    //                            console.log('found ' + searchWord + ' after ' + searchResults[idx2]);
                        if (idx2 > 0) {
                            splitLength = (searchResults[idx2].length > 50 ? 50 : searchResults[idx2].length);
                            splitText = searchResults[idx2].substr(0, splitLength);
                            console.log('found ' + searchWord + ' after use ' + splitLength + ' extracted:' + splitText);
                            searchExtract += '<b>'+ searchWord + '</b>'
                                + me.getService('DataUtils').htmlEscapeText(splitText) + '...';
                        }
                        if (idx2 < searchResults.length) {
                            splitLength = (searchResults[idx2].length > 50 ? 50 : searchResults[idx2].length);
                            splitText = searchResults[idx2].substr(
                                searchResults[idx2].length - splitLength,
                                searchResults[idx2].length);
                            console.log('found ' + searchWord + ' before use ' + splitLength + ' extracted:' + splitText);
                            searchExtract += '...'
                                + me.getService('DataUtils').htmlEscapeText(splitText);
                        }
                    }
                }
            }

            // add searchdata
            var html = '<div id="details_searchdata_' + idPrefix + node.sysUID + '"'
                + ' class="field_nodeSearchData">' + searchExtract + '</div>';
            return html;
        },



        ganttOptions: {
            ganttRangeStart: ganttRangeStart, 
            ganttRangeEnd: ganttRangeEnd
        },

        /**
         * return the current appBase
         * @returns {JsHelferlein.AppBase}   the current appBase
         */
        getAppBase: function() {
            return appBase;
        },

        /**
         * return the current instance of the service
         * @param {String} service               servicename
         * @returns {JsHelferlein.ServiceBase}   current instance of the service
         */
        getService: function(service) {
            return appBase.get(service);
        },

        /**
         * return the current appBase-config
         * @returns {JsHelferlein.ConfigBase}   current appBase-config
         */
        getConfig: function() {
            return appBase.config;
        }
        
    };

    return me;
}]);
