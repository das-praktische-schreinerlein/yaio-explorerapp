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

        $scope.rootNodeHierarchy = [];
        $scope.rootNodeChildren = [];

        $scope.searchOptions = {
            flgRenderMinimum: false,
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
            arrMetaNodeSubTypeFilter: [],
            praefix: '',
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

        var routeFields = ['curPage', 'pageSize', 'searchSort', 'baseSysUID', 'fulltext'];
        var routeField;
        for (var idx = 0; idx < routeFields.length; idx++) {
            routeField = routeFields[idx];
            if ($routeParams.hasOwnProperty(routeField)) {
                $scope.searchOptions[routeField] = decodeURI($routeParams[routeField]);
            }
        }

        // extract additional-Searchfilter
        var additionalSearchFilter = yaioUtils.parseAdditionalParameters($routeParams.additionalFilters);
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

        var additionalSearchFields = ['istStartGE', 'istStartLE', 'istEndeGE', 'istEndeLE',
            'planStartGE', 'planStartLE', 'planEndeGE', 'planEndeLE',
            'istStartIsNull', 'istEndeIsNull', 'planStartIsNull', 'planEndeIsNull',
            'flgConcreteToDosOnly'
        ];
        var additionalSearchField;
        for (idx = 0; idx < additionalSearchFields.length; idx++) {
            additionalSearchField = additionalSearchFields[idx];
            if (additionalSearchFilter.hasOwnProperty(additionalSearchField)) {
                $scope.searchOptions[additionalSearchField] = decodeURI(additionalSearchFilter[additionalSearchField]);
            }
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
                $scope.loadRootNodeHierarchy();
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
     * @param {int} pageSize          optional pageSize (if not set searchOptions.pageSize will be used)
     * @param {int} baseSysUID        optional baseSysUID (if not set searchOptions.baseSysUID will be used)
     * @returns {String}              new search-uri
     */
    $scope.createSearchUri = function(searchOptions, page, pageSize, baseSysUID) {
        var newSearchOptions = {};
        Object.keys(searchOptions).map(function (element) {
            newSearchOptions[element] = searchOptions[element];
        });
        newSearchOptions.strClassFilter = searchOptions.arrClassFilter.join(',');
        newSearchOptions.strWorkflowStateFilter = searchOptions.arrWorkflowStateFilter.join(',');
        newSearchOptions.strMetaNodeSubTypeFilter = searchOptions.arrMetaNodeSubTypeFilter.join(',');

        return yaioUtils.getService('YaioNodeSearch').createSearchUri(newSearchOptions, page, pageSize, baseSysUID);
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
     * load node-hierarchy into form
     */
    $scope.loadRootNodeHierarchy = function() {
        yaioUtils.getService('YaioNodeRepository').getNodeById($scope.searchOptions.baseSysUID, {})
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
     * @param {String} idPrefix      html-prefix for html-id
     */
    $scope.renderNodeLine = function(node, idPrefix) {
        // we need a timeout to put the tr into DOM
        setTimeout(function(){
            yaioUtils.renderSearchNodeLine(node, idPrefix, $scope.searchOptions);
        }, 10);
    };

    /**
     * render nodeCard for node (adds it as '#tr' + node.sysUID to fancytree)
     * @param {Object} node          node to render
     * @param {String} idPrefix      html-prefix for html-id
     */
    $scope.renderNodeCard = function(node, idPrefix) {
        // we need a timeout to put the div into DOM
        setTimeout(function(){
            yaioUtils.renderSearchNodeCard(node, idPrefix, $scope.searchOptions);
        }, 10);
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

    /**
     * switch to tableview (hide cardview)
     */
    $scope.showTableView = function() {
        $('div.container-yaio-search-nodecards').css('display', 'none');
        $('div.container-yaio-search-table').css('display', 'block');
    };

    /**
     * switch to cardview (hide tableview)
     */
    $scope.showCardView = function() {
        $('div.container-yaio-search-nodecards').css('display', 'block');
        $('div.container-yaio-search-table').css('display', 'none');
    };

    // init
    $scope._init();
});
