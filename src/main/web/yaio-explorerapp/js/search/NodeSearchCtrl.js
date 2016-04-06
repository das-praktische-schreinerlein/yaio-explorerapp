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
 * angular-controller for serving page: node-search
 * @controller
 */
yaioApp.controller('NodeSearchCtrl', function($rootScope, $scope, $location, $routeParams,
                                              setFormErrors, authorization, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        // create search
        $scope.nodes = [];

        $scope.searchOptions = {
            curPage: 1,
            pageSize: 20,
            searchSort: 'lastChangeDown',
            baseSysUID: yaioUtils.getConfig().masterSysUId,
            fulltext: '',
            total: 0,
            strNotNodePraefix: yaioUtils.getConfig().excludeNodePraefix,
            strWorkflowStateFilter: '',
            arrWorkflowStateFilter: [],
            strClassFilter: '',
            arrClassFilter: [],
            strMetaNodeTypeTagsFilter: '',
            strMetaNodeSubTypeFilter: '',
            arrMetaNodeSubTypeFilter: []
        };
        if ($routeParams.curPage) {
            $scope.searchOptions.curPage = decodeURI($routeParams.curPage);
        }
        if ($routeParams.pageSize) {
            $scope.searchOptions.pageSize = decodeURI($routeParams.pageSize);
        }
        if ($routeParams.searchSort) {
            $scope.searchOptions.searchSort = decodeURI($routeParams.searchSort);
        }
        if ($routeParams.baseSysUID) {
            $scope.searchOptions.baseSysUID = decodeURI($routeParams.baseSysUID);
        }
        if ($routeParams.fulltext) {
            $scope.searchOptions.fulltext = decodeURI($routeParams.fulltext);
        }

        // extract additional-Searchfilter
        var additionalSearchFilter = $scope.parseAdditionalParameters($routeParams.additionalFilters);
        if (additionalSearchFilter.notNodePraefix) {
            $scope.searchOptions.strNotNodePraefix = decodeURI(additionalSearchFilter.notNodePraefix);
        }
        if (additionalSearchFilter.workflowStateFilter) {
            $scope.searchOptions.strWorkflowStateFilter = decodeURI(additionalSearchFilter.workflowStateFilter);
            $scope.searchOptions.arrWorkflowStateFilter = $scope.searchOptions.strWorkflowStateFilter.split(',');
        }
        if (additionalSearchFilter.classFilter) {
            $scope.searchOptions.strClassFilter = decodeURI(additionalSearchFilter.classFilter);
            $scope.searchOptions.arrClassFilter = $scope.searchOptions.strClassFilter.split(',');
        }
        if (additionalSearchFilter.metaNodeTypeTagsFilter) {
            $scope.searchOptions.strMetaNodeTypeTagsFilter = decodeURI(additionalSearchFilter.metaNodeTypeTagsFilter);
        }
        if (additionalSearchFilter.metaNodeSubTypeFilter) {
            $scope.searchOptions.strMetaNodeSubTypeFilter = decodeURI(additionalSearchFilter.metaNodeSubTypeFilter);
            $scope.searchOptions.arrMetaNodeSubTypeFilter = $scope.searchOptions.strMetaNodeSubTypeFilter.split(',');
        }
        console.log('NodeSearchCtrl - processing');

        // pagination has to wait for event
        $scope.NodeListReady = false;

        // call authentificate
        authorization.authentificate(function () {
            // check authentification
            if (! $rootScope.authenticated) {
                $location.path(yaioUtils.getConfig().appLoginUrl);
                $scope.error = false;
            } else {
                // do Search
                $scope.doFulltextSearch();
            }
        });
    };

    /** 
     * pagination: do load next page - changes $location
     * @param {String} text                 page text
     * @param {int} page                    new pagenumber
     */
    $scope.nextPageAct = function(text, page){
        console.log(text, page);
        var newUrl = $scope.createSearchUri($scope.searchOptions, page);
        
        // save lastLocation for login
        $rootScope.lastLocation = newUrl;

        // no cache!!!
        console.log('load new Url:' + newUrl);
        $location.path(newUrl);
    };

    /**
     * parse additionalParameters from String (split by ; and split name=value)
     * @param additionalParametersStr     source to parse for additionFilter
     * @returns {Object}                  object with additionalParameters-Strings
     */
    $scope.parseAdditionalParameters = function(additionalParametersStr){
        var additionalParameters = {};
        if (additionalParametersStr) {
            var params = additionalParametersStr.split(';');
            for (var idx = 0; idx < params.length; idx++) {
                var param = params[idx];
                var paramData = param.split('=', 2);
                additionalParameters[paramData[0]] = paramData[1];
            }
        }
        return additionalParameters;
    };

    /** 
     * callbackhandler for fulltextsearch if keyCode=13 (Enter) start doNewFulltextSearch
     * @param {Event} event                  key-pressed event
     */
    $scope.checkEnterFulltextSearch = function(event) {
        if (event.keyCode === 13) {
            $scope.doNewFulltextSearch();
        }
        
        return event;
    };
    
    /** 
     * do fulltextsearch - set page=1 and start doFulltextSearch
     */
    $scope.doNewFulltextSearch = function() {
        $scope.searchOptions.curPage = 1;
        var newUrl = $scope.createSearchUri($scope.searchOptions, $scope.searchOptions.curPage);

        // save lastLocation for login
        $rootScope.lastLocation = newUrl;

        // no cache!!!
        console.log('load new Url:' + newUrl);
        $location.path(newUrl);
    };

    /**
     * create the search-uri to use
     * @param {Object} searchOptions  current searchoptions (filter..) to use
     * @param {int} page              pagenumber to load
     * @returns {String}              new search-uri
     */
    $scope.createSearchUri = function(searchOptions, page) {
        var additionalFilter = 'classFilter=' + searchOptions.arrClassFilter.join(',') + ';' +
            'workflowStateFilter=' + searchOptions.arrWorkflowStateFilter.join(',') + ';' +
            'notNodePraefix=' + searchOptions.strNotNodePraefix + ';' +
            'metaNodeTypeTagsFilter=' + searchOptions.strMetaNodeTypeTagsFilter + ';' +
            'metaNodeSubTypeFilter=' + searchOptions.arrMetaNodeSubTypeFilter.join(',') + ';';
        return '/search'
            + '/' + encodeURI(page)
            + '/' + encodeURI(searchOptions.pageSize)
            + '/' + encodeURI(searchOptions.searchSort)
            + '/' + encodeURI(searchOptions.baseSysUID)
            + '/' + encodeURI(searchOptions.fulltext)
            + '/' + encodeURI(additionalFilter)
            + '/';
    };
    
    /** 
     * do fulltextsearch and add result to $scope.nodes
     * calls doFulltextSearchSuccessHandler when succeeded
     */
    $scope.doFulltextSearch = function() {
        // save lastLocation for login
        $scope.searchOptions.strClassFilter = $scope.searchOptions.arrClassFilter.join(',');
        $scope.searchOptions.strWorkflowStateFilter = $scope.searchOptions.arrWorkflowStateFilter.join(',');
        $scope.searchOptions.strMetaNodeSubTypeFilter = $scope.searchOptions.arrMetaNodeSubTypeFilter.join(',');
        $rootScope.lastLocation = $scope.createSearchUri($scope.searchOptions, $scope.searchOptions.curPage);

        // search data
        var searchOptions = $scope.searchOptions;
        return yaioUtils.getService('YaioNodeRepository').searchNode(searchOptions)
            .then(function(angularResponse) {
                // success handler
                $scope.doFulltextSearchSuccessHandler(searchOptions, angularResponse.data);
            }, function(angularResponse) {
                // error handler
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading nodes with searchOptions: ' + searchOptions;
                yaioUtils.getService('Logger').logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                yaioUtils.getService('Logger').logError(message, false);
            });
    };

    /**
     * sends broadcast NodeListReady when result is ready
     * @param {Object} searchOptions           searchoptions with filter...
     * @param {Object} yaioNodeSearchResponse  server-response with data and state
     */
    $scope.doFulltextSearchSuccessHandler = function(searchOptions, yaioNodeSearchResponse) {
        // check response
        var state = yaioNodeSearchResponse.state;
        if (state === 'OK') {
            // all fine
            console.log('NodeSearchCtrl - OK loading nodes:' + yaioNodeSearchResponse.stateMsg + ' searchOptions=' + searchOptions);
            
            // add nodes to scope
            $scope.nodes = yaioNodeSearchResponse.nodes;
            
            // set count
            $scope.searchOptions.total = yaioNodeSearchResponse.count;
            
            // set event for pagination
            $scope.NodeListReady = true;
            $scope.$broadcast('NodeListReady');
        } else {
            // error
            yaioUtils.getService('Logger').logError('error loading nodes:' + yaioNodeSearchResponse.stateMsg + ' details:' + yaioNodeSearchResponse, true);
        }
    };

    /** 
     * render nodeLine for node (adds it as '#tr' + node.sysUID to fancytree)
     * @param {Object} node          node to render
     */
    $scope.renderNodeLine = function(node) {
        // we need a timeout to put the tr into DOM
        setTimeout(function(){
                $scope.yaioUtils.renderNodeLine(node, '#tr' + node.sysUID, false);
                console.log('renderNodeLine: done to:' + '#tr' + node.sysUID + $('#detail_sys_' + node.sysUID).length);

                // add pareent+searchdata
                var $html = $($scope.createParentHirarchyBlockForNode(node, 'tr_') + $scope.createSearchWordsBlockForNode(node));
                $('#detail_sys_' + node.sysUID).after($html);
                console.log('renderNodeLine: added parent+searchdata to:' + '#detail_sys_' + node.sysUID + $('#detail_sys_' + node.sysUID).length);

            }, 10);
    };

    /**
     * render nodeCard for node (adds it as '#tr' + node.sysUID to fancytree)
     * @param {Object} node          node to render
     */
    $scope.renderNodeCard = function(node) {
        // we need a timeout to put the tr into DOM
        setTimeout(function(){
            $scope.yaioUtils.renderNodeCard(node, '#card' + node.sysUID);
            console.log('renderNodeLine: done to:' + '#card' + node.sysUID + $('#detail_sys_' + node.sysUID).length);

            // add pareent+searchdata
            var $html = $($scope.createParentHirarchyBlockForNode(node, 'card_'));
            $('#card' + node.sysUID).find('div.container_data_row').eq(0).after($html);
            console.log('renderNodeLine: added parent+searchdata to:' + '#card' + node.sysUID + $('#card' + node.sysUID).length);

        }, 10);
    };

    /**
     * create parentHirarchy-Block for node
     * @param {Object} node          node to render
     * @param {String} idPrefix      prefix for html-id
     * @returns {String}
     */
    $scope.createParentHirarchyBlockForNode = function(node, idPrefix) {
        // render hierarchy
        var parentNode = node.parentNode;
        var parentStr = node.name;
        while (!yaioUtils.getService('DataUtils').isEmptyStringValue(parentNode)) {
            parentStr = parentNode.name + ' --> ' + parentStr;
            parentNode = parentNode.parentNode;
        }
        parentStr = '<b>' + yaioUtils.getService('DataUtils').htmlEscapeText(parentStr) + '</b>';

        // add hierarchy
        var html = '<div id="' + idPrefix + 'details_parent_' + node.sysUID + '"'
            + ' class="field_nodeParent">'
            + parentStr
            + '</div>';
        return html;
    };

    /**
     * create searchWords-Block for node
     * @param {Object} node          node to render
     * @returns {String}
     */
    $scope.createSearchWordsBlockForNode = function(node) {
        // extract search words
        var searchExtract = '';
        if ($scope.searchOptions.fulltext
            && $scope.searchOptions.fulltext.length > 0
            && !yaioUtils.getService('DataUtils').isUndefinedStringValue(node.nodeDesc)) {
            // split to searchwords
            var searchWords = $scope.searchOptions.fulltext.split(' ');
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
                searchWord = yaioUtils.getService('DataUtils').escapeRegExp(searchWords[idx]);

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
                            + yaioUtils.getService('DataUtils').htmlEscapeText(splitText) + '...';
                    }
                    if (idx2 < searchResults.length) {
                        splitLength = (searchResults[idx2].length > 50 ? 50 : searchResults[idx2].length);
                        splitText = searchResults[idx2].substr(
                            searchResults[idx2].length - splitLength,
                            searchResults[idx2].length);
                        console.log('found ' + searchWord + ' before use ' + splitLength + ' extracted:' + splitText);
                        searchExtract += '...'
                            + yaioUtils.getService('DataUtils').htmlEscapeText(splitText);
                    }
                }
            }
        }

        // add searchdata
        var html = '<div id="details_searchdata_' + node.sysUID + '"'
            + ' class="field_nodeSearchData">'
            + searchExtract
            + '</div>';
        return html;
    };


    /** 
     * recalc ganttblocks for all $scope.nodes
     */
    $scope.recalcGanttBlocks = function() {
        for (var idx in $scope.nodes) {
            if (!$scope.nodes.hasOwnProperty(idx)) {
                continue;
            }
            var node = $scope.nodes[idx];
            yaioUtils.getService('YaioNodeGanttRenderer').recalcGanttBlockForNode(node);
        }
    };

    // init
    $scope._init();
});
