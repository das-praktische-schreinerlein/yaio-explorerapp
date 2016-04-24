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
 * angular-controller for serving page-element: dashboard-search-elements
 * @controller
 */
yaioApp.controller('DashBoardNodeSearchCtrl', function($rootScope, $scope, yaioUtils) {
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
            flgRenderMinimum: true,
            curPage: 1,
            pageSize: 10,
            searchSort: 'lastChangeDown',
            baseSysUID: yaioUtils.getConfig().masterSysUId,
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
    };

    /**
     * create the search-uri to use
     * @returns {String}              new search-uri
     */
    $scope.createSearchUri = function() {
        var additionalFilter = 'classFilter=' + $scope.searchOptions.strClassFilter + ';' +
            'workflowStateFilter=' + $scope.searchOptions.strWorkflowStateFilter + ';' +
            'notNodePraefix=' + $scope.searchOptions.strNotNodePraefix + ';' +
            'metaNodeTypeTagsFilter=' + $scope.searchOptions.strMetaNodeTypeTagsFilter + ';' +
            'metaNodeSubTypeFilter=' + $scope.searchOptions.strMetaNodeSubTypeFilter + ';';
        var additionalSearchFields = ['istStartGE', 'istStartLE', 'istEndeGE', 'istEndeLE',
            'planStartGE', 'planStartLE', 'planEndeGE', 'planEndeLE'
        ];
        var value, additionalSearchField;
        for (var idx = 0; idx < additionalSearchFields.length; idx++) {
            additionalSearchField = additionalSearchFields[idx];
            value = $scope.searchOptions[additionalSearchField];
            if (!yaioUtils.getService('DataUtils').isEmptyStringValue(value)) {
                value = yaioUtils.getService('DataUtils').formatGermanDate(value);
            } else {
                value = '';
            }
            additionalFilter += additionalSearchField + '=' + value + ';';
        }
        additionalSearchFields = ['flgConcreteToDosOnly', 'istStartIsNull', 'istEndeIsNull', 'planStartIsNull', 'planEndeIsNull'];
        for (idx = 0; idx < additionalSearchFields.length; idx++) {
            additionalSearchField = additionalSearchFields[idx];
            additionalFilter += additionalSearchField + '=' + $scope.searchOptions[additionalSearchField] + ';';
        }
        return '/search'
            + '/' + encodeURI('1')
            + '/' + encodeURI('20')
            + '/' + encodeURI($scope.searchOptions.searchSort)
            + '/' + encodeURI($scope.searchOptions.baseSysUID)
            + '/' + encodeURI($scope.searchOptions.fulltext)
            + '/' + encodeURI(additionalFilter)
            + '/';
    };
    
    /** 
     * send ajax-request for fulltextsearch to server and add reszult to scope
     */
    $scope.doFulltextSearch = function() {
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
     * callback-successhandler for fulltextsearch: sets $scope.nodes and $scope.searchOptions.total
     * @param {Object} searchOptions             searchOptions the fulltextsearch was done with
     * @param {Object} yaioNodeSearchResponse    SearchResponse
     */
    $scope.doFulltextSearchSuccessHandler = function(searchOptions, yaioNodeSearchResponse) {
        // check response
        var state = yaioNodeSearchResponse.state;
        if (state === 'OK') {
            // all fine
            console.log('NodeSearchCtrl - OK loading nodes:' + yaioNodeSearchResponse.stateMsg +
                ' searchOptions=' + searchOptions);
            
            // add nodes to scope
            $scope.nodes = yaioNodeSearchResponse.nodes;
            
            // set count
            $scope.searchOptions.total = yaioNodeSearchResponse.count;
        } else {
            // error
            yaioUtils.getService('Logger').logError('error loading nodes:' + yaioNodeSearchResponse.stateMsg
                + ' details:' + yaioNodeSearchResponse, true);
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
