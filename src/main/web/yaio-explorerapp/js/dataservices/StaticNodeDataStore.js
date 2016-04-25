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
 * service-functions to load/save... to node-data from a local static inmemory-datastore
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @param {JsHelferlein.ConfigBase} config         config to use
 * @param {JsHelferlein.ConfigBase} defaultConfig  default to merge with config
 * @returns {Yaio.StaticNodeDataStore}                   an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.StaticNodeDataStore = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase, config, defaultConfig);
    
    me.nodeList = [];
    me.curUId = 1;
    me.mapWorkflowStates = [];
    me.mapSorts = [];

    /**
     * initialize the object
     */
    me._init = function() {
        me.mapWorkflowStates.UNKNOWN = 'NOTPLANED';
        me.mapWorkflowStates.OPEN = 'OPEN';
        me.mapWorkflowStates.LATE = 'LATE';
        me.mapWorkflowStates.RUNNING = 'RUNNING';
        me.mapWorkflowStates.WARNING = 'WARNING';
        me.mapWorkflowStates.ERLEDIGT = 'DONE';
        me.mapWorkflowStates.VERWORFEN = 'CANCELED';
        me.mapWorkflowStates.EVENT_UNKNOWN = 'NOTPLANED';
        me.mapWorkflowStates.EVENT_PLANED = 'OPEN';
        me.mapWorkflowStates.EVENT_CONFIRMED = 'OPEN';
        me.mapWorkflowStates.EVENT_LATE = 'LATE';
        me.mapWorkflowStates.EVENT_RUNNING = 'RUNNING';
        me.mapWorkflowStates.EVENT_SHORT = 'WARNING';
        me.mapWorkflowStates.EVENT_ERLEDIGT = 'DONE';
        me.mapWorkflowStates.EVENT_VERWORFEN = 'CANCELED';

        me.mapSorts.default = 'ebene asc';
        me.mapSorts.createdUp = 'sysCreateDate asc';
        me.mapSorts.createdDown = 'sysCreateDate desc';
        me.mapSorts.istEndeUp = 'istChildrenSumEnde asc';
        me.mapSorts.istEndeDown = 'istChildrenSumEnde desc';
        me.mapSorts.istStartUp = 'istChildrenSumStart asc';
        me.mapSorts.istStartDown = 'istChildrenSumStart desc';
        me.mapSorts.lastChangeUp = 'sysChangeDate asc';
        me.mapSorts.lastChangeDown = 'sysChangeDate desc';
        me.mapSorts.nameUp = 'name asc';
        me.mapSorts.nameDown = 'name desc';
        me.mapSorts.nodeNumberUp = 'metaNodePraefix asc, metaNodeNummer asc';
        me.mapSorts.nodeNumberDown = 'metaNodePraefix desc, metaNodeNummer desc';
        me.mapSorts.planEndeUp = 'planEnde asc';
        me.mapSorts.planEndeDown = 'planEnde desc';
        me.mapSorts.planStartUp = 'planStart asc';
        me.mapSorts.planStartDown = 'planStart desc';
        me.mapSorts.planChildrenSumEndeUp = 'planChildrenSumEnde asc';
        me.mapSorts.planChildrenSumEndeDown = 'planChildrenSumEnde desc';
        me.mapSorts.planChildrenSumStartUp = 'planChildrenSumStart asc';
        me.mapSorts.planChildrenSumStartDown = 'planChildrenSumStart desc';
        me.mapSorts.typeUp = 'type asc';
        me.mapSorts.typeDown = 'type desc';
        me.mapSorts.workflowStateUp = 'workflowState asc';
        me.mapSorts.workflowStateDown = 'workflowState desc';
    };


    /**
     * reset the loaded nodelist
     */
    me.resetNodeList = function() {
        me.nodeList = [];
    };

    /**
     * load the static node-data (with all children) from node into storage
     * @param {Object} node             node-data with child-hierarchy
     */
    me.loadStaticNodeData = function (node) {
        if (! node) {
            return;
        }
        if (! node.sysUID) {
            return;
        }

        me.nodeList[node.sysUID] = node;
        me.nodeList.push(node.sysUID);

        me._cacheParentHierarchy(node);
        
        for (var i = 0; i < node.childNodes.length; i++) {
            var childNode = node.childNodes[i];
            childNode.parentId = node.sysUID;
            me.loadStaticNodeData(childNode);
            node.childNodes[i] = childNode.sysUID;
        }
    };

    /**
     * get node data fro nodeId from storage
     * @param {String} nodeId         nodeId to read data for
     * @param {Boolean} flgCopy       return a copy or origin
     * @returns {Object}              node-data for nodeid
     */
    me.getNodeDataById = function(nodeId, flgCopy) {
        var node;
        if (flgCopy) {
            node = me.getNodeDataById(nodeId, false);
            return JSON.parse(JSON.stringify(node));
        }
        node = me.nodeList[nodeId];
        if (node) {
            node.statChildNodeCount = node.childNodes.length;
        }

        return node;
    };

    /**
     * move node to newParentKey at position newPos
     * @param {String} nodeId                             nodeId to move
     * @param {String} newParentKey                       nodeId of the new parent
     * @param {int} newPos                                sort-position in parents childList
     * @returns {Object}                                  node with new data
     */
    me.moveNode = function(nodeId, newParentKey, newPos) {
        var msg = 'moveNode for nodeId:' + nodeId + ' newParentKey:' + newParentKey + ' newPos:' + newPos;
        var node = me.getNodeDataById(nodeId, false);
        var parent = me.getNodeDataById(newParentKey, false);
        var oldParent = me.getNodeDataById(node.parentId, false);
        
        if (node.parentId !== newParentKey) {
            // delete node form old parent and add to new with sortPos after last
            oldParent.childNodes.splice(oldParent.childNodes.indexOf(node.sysUID), 1);

            // update parentIdHierarchy
            console.log(msg + ' use newparent:' + newPos, parent);
            
            // set new parentId
            node.parentId = parent.sysUID;
        } else {
            // change sortPos
            
            // delete node from childList 
            parent.childNodes.splice(parent.childNodes.indexOf(node.sysUID), 1);
            console.log(msg + ' use oldparent:', parent);
        }

        // calc index where to add
        node.sortPos = newPos;
        var addIdx = -1;
        for (var idx = 0; idx < parent.childNodes.length; idx++) {
            var curNode = me.getNodeDataById(parent.childNodes[idx], false);
            if (addIdx >= 0) {
                // pos already found: add 5 to every following node
                curNode.sortPos = curNode.sortPos + 5;
            } else if (curNode.sortPos > node.sortPos) {
                // set id to add the node
                addIdx = idx;
                // pos found: add 5 to every following node
                curNode.sortPos = curNode.sortPos + 5;
            }
        }
        if (addIdx < 0) {
            addIdx = parent.childNodes.length;
        }
        // add node at addIdx
        console.log(msg + ' addNewNode at pos:' + addIdx);
        parent.childNodes.splice(addIdx, 0, node.sysUID);

        me._cacheParentHierarchy(node);

        return node;
    };

    /**
     * delete node fro storage
     * @param {String} nodeId                             nodeId to delete
     */
    me.removeNodeById = function(nodeId) {
        //var msg = 'removeNode node:' + nodeId;

        var node = me.getNodeDataById(nodeId, false);
        if (node) {
            // delete all children
            for (var i = 0; i < node.childNodes.length; i++) {
                var childNodeId = node.childNodes[i];
                me.removeNodeById(childNodeId);
            }
            
            // delete from parent
            var parent = me.getNodeDataById(node.parentId, false);
            if (parent) {
                parent.childNodes.splice(parent.childNodes.indexOf(nodeId), 1);
            }
        }

        // delete from list
        me.nodeList[nodeId] = null;
        me.nodeList.splice(me.nodeList.indexOf(nodeId), 1);
    };

    /**
     * save (create/update) node
     * @param {Object} nodeObj      node with values to save
     * @param {Object} options      options
     * @returns {Object}            node-obj
     */
    me.saveNode = function(nodeObj, options) {
        var svcLogger = me.appBase.get('Logger');

        var node = JSON.parse(JSON.stringify(nodeObj));
        var msg = '_saveNode node: ' + options.mode + ' ' + nodeObj.sysUID;
        var now = new Date();
        console.log(msg + ' START:', nodeObj);

        if (options.mode === 'edit') {
            // mode update
            
            // merge orig and new node
            var orig = me.getNodeDataById(node.sysUID, false);
            for (var prop in node){
                if (!node.hasOwnProperty(prop)) {
                    continue;
                }
                orig[prop] = node[prop];
            }
            node = orig;
        } else if (options.mode === 'create') {
            // mode create 
            
            // read parent
            var parent = me.getNodeDataById(options.sysUID, false);
            
            // set initial values
            node.sysUID = 'newDT' + now.toLocaleFormat('%y%m%d%H%M%S') + now.getMilliseconds() + me.curUId;
            me.curUId++;
            
            node.sysCreateDate = now.getTime();
            node.childNodes = [];
            node.className = options.className;
            node.metaNodePraefix = parent.metaNodePraefix;
            node.ebene = parent.ebene + 1;
            node.sortPos = 0;
            node.parentId = parent.sysUID;
            var parentChilds = me.getNodeDataById(parent.sysUID, false);
            if (parentChilds.length > 0) {
                node.sortPos = parentChilds[parentChilds.length].sortPos;
            }
            
            // add to parent
            parent.childNodes.push(node.sysUID);
            
            // add to nodeList
            me.nodeList.push(node.sysUID);

            me._cacheParentHierarchy(node);
        } else {
            // unknown mode
            svcLogger.logError('unknown mode=' + options.mode + ' form formName=' + options.formName, false);
            return null;
        }

        // set common values
        node.sysChangeDate = now.getTime();
        node.sysChangeCount = (node.sysChangeCount > 0 ? node.sysChangeCount+1 : 1);
        node.state = node.type;
        node.workflowState = me.mapWorkflowStates[node.state];
        
        // save node
        console.log(msg + ' save node:', node);
        me.nodeList[node.sysUID] = node;
        
        console.log(msg + ' response:', node);

        return node;
    };

    /**
     * search node
     * @param {Object} searchOptions  filters and sorts...
     * @returns {Object}              mocked yaioSearchResponse
     */
    me.fulltextSearch = function(searchOptions) {
        var msg = 'fulltextSearch searchOptions: ' + searchOptions;

        // search ids
        var nodeId;
        var staticSearchOptions = me._prepareSearchOptions(searchOptions);
        var searchResultIds =  me._filterNodes(staticSearchOptions);

        // read all data and sort
        var searchConfig = [];
        searchConfig.push(me.mapSorts[searchOptions.searchSort]);
        searchConfig.push('ebene asc');
        searchConfig.push('parentNode asc');
        searchConfig.push('sortPos asc');
        var tmpSearchResult = [];
        for (var idx = 0; idx < searchResultIds.length; idx++) {
            nodeId = searchResultIds[idx];
            tmpSearchResult.push(me.getNodeDataById(nodeId, true));
        }
        me._orderBy(tmpSearchResult, searchConfig);
        
        // paginate and read current searchresults
        var start = (searchOptions.curPage - 1) * searchOptions.pageSize;
        var ende = start + searchOptions.pageSize;
        if (ende >= tmpSearchResult.length) {
            ende = tmpSearchResult.length;
        }
        var searchResult = tmpSearchResult.slice((searchOptions.curPage - 1) * searchOptions.pageSize, ende);
        
        var searchResponse = { 
            state: 'OK',
            stateMsg: 'search done',
            nodes: searchResult,
            curPage: searchOptions.curPage,
            pageSize: searchOptions.pageSize,
            count: searchResultIds.length
        };
        console.log(msg + ' response:', searchResponse);

        return searchResponse;
    };

    /**
     * prepare the searchOptions (convert strings to arrays, dates to int...)
     * @param {Object} searchOptions       filters
     * @returns {Object}                   prepared filters
     */
    me._prepareSearchOptions = function (searchOptions) {
        var staticSearchOptions = {};
        var searchFields = ['strTypeFilter', 'strReadIfStatusInListOnly', 'maxEbene', 'strClassFilter', 'strWorkflowStateFilter',
            'strNotNodePraefix', 'flgConcreteToDosOnly', 'strMetaNodeTypeTagsFilter', 'strMetaNodeSubTypeFilter',
            'istStartGE', 'istStartLE', 'istEndeGE', 'istEndeLE',
            'planStartGE', 'planStartLE', 'planEndeGE', 'planEndeLE',
            'istStartIsNull', 'istEndeIsNull', 'planStartIsNull', 'planEndeIsNull',
            'baseSysUID'
        ];
        var searchField;
        for (var idx = 0; idx < searchFields.length; idx++) {
            searchField = searchFields[idx];
            if (searchOptions.hasOwnProperty(searchField)) {
                staticSearchOptions[searchField] = searchOptions[searchField];
            }
        }

        // map
        staticSearchOptions.suchworte = searchOptions.fulltext.toLowerCase().split(' ');
        staticSearchOptions.classes = searchOptions.strClassFilter.split(',');
        staticSearchOptions.states = searchOptions.strWorkflowStateFilter.split(',');
        staticSearchOptions.subTypes = searchOptions.strMetaNodeSubTypeFilter.split(',');
        staticSearchOptions.metaNodeTypeTags = searchOptions.strMetaNodeTypeTagsFilter.split(',');
        staticSearchOptions.notPraefix = searchOptions.strNotNodePraefix.split(' ');
        staticSearchOptions.flgConcreteToDosOnly = searchOptions.flgConcreteToDosOnly;

        // convert dateValues
        searchFields = ['istStartGE', 'istStartLE', 'istEndeGE', 'istEndeLE',
            'planStartGE', 'planStartLE', 'planEndeGE', 'planEndeLE'
        ];
        var value, lstDate, lstDateTime, strTime, newDateTimeStr, newDate;
        for (idx = 0; idx < searchFields.length; idx++) {
            searchField = searchFields[idx];
            value = searchOptions[searchField];
            if (searchOptions.hasOwnProperty(searchField) && !me.appBase.DataUtils.isEmptyStringValue(value)) {
                if (typeof value === 'string') {
                    lstDateTime = value.split(' ');
                    lstDate = lstDateTime[0].split('.');
                    strTime = '12:00:00';
                    if (searchField.match(/.*GE$/)) {
                        strTime = '00:00:00';
                    } else if (searchField.match(/.*LE$/)) {
                        strTime = '23:59:59';
                    }

                    if (lstDateTime.length > 1) {
                        strTime = lstDateTime[1] + ':00';
                    }
                    newDateTimeStr = lstDate[1] +'/' + lstDate[0] + '/' + lstDate[2] + ' ' + strTime;
                    newDate = new Date(newDateTimeStr);
                    value = newDate.getTime();
                } else if (typeof value === 'object') {
                    value = value.getTime();
                }
                staticSearchOptions[searchField] = value;
            }
        }

        return staticSearchOptions;
    };

    /**
     * filter all nodes
     * @param {Object} staticSearchOptions  prepared filters
     * @returns {Array}                     matching nodes
     */
    me._filterNodes = function (staticSearchOptions) {
        var searchResultIds = [];

        var flgFound, nodeId, node, content;
        for (var idx = 0; idx < me.nodeList.length; idx++) {
            nodeId = me.nodeList[idx];
            node = me.getNodeDataById(nodeId, true);
            content = node.nodeDesc + ' ' + node.name + ' ' + node.state;

            flgFound = true;
            // Fulltext
            if (staticSearchOptions.suchworte.length > 0 &&
                !me.appBase.get('YaioExportedData').VolltextTreffer(content.toLowerCase(), staticSearchOptions.suchworte)) {
                // words not found
                continue;
            }

            // Classfilter
            if (staticSearchOptions.classes.length > 0 &&
                !me.appBase.get('YaioExportedData').VolltextTreffer(node.className, staticSearchOptions.classes, false, true)) {
                // words not found
                continue;
            }
            // SubTypes-Filter
            if (staticSearchOptions.subTypes.length > 0 &&
                !me.appBase.get('YaioExportedData').VolltextTreffer(node.metaNodeSubType, staticSearchOptions.subTypes, false, true)) {
                // words not found
                continue;
            }
            // MetaNodeTypeTags-Filter
            if (staticSearchOptions.metaNodeTypeTags.length > 0 &&
                !me.appBase.get('YaioExportedData').VolltextTreffer(node.metaNodeTypeTags, staticSearchOptions.metaNodeTypeTags, false, true)) {
                // words not found
                continue;
            }
            // Workflowstate-Filter
            if (staticSearchOptions.states.length > 0 &&
                !me.appBase.get('YaioExportedData').VolltextTreffer(node.workflowState, staticSearchOptions.states, false, true)) {
                // words not found
                continue;
            }
            // baseSysUID-Filter
            if (staticSearchOptions.baseSysUID.length > 0 &&
                !me.appBase.get('YaioExportedData').VolltextTreffer(node.cachedParentHierarchy, [',' + staticSearchOptions.baseSysUID + ','], true, true)) {
                // words not found
                continue;
            }
            // NotNodePraefix-Filter
            if (staticSearchOptions.notPraefix.length > 0 &&
                me.appBase.get('YaioExportedData').VolltextTreffer(node.metaNodePraefix, staticSearchOptions.notPraefix, true, true)) {
                // blacklisted praefixes found
                console.log('fulltextSearch ignore nodeId ' + nodeId + ' because of ' + node.metaNodePraefix);
                continue;
            }

            // flgConcreteToDosOnly-Filter
            if (staticSearchOptions.flgConcreteToDosOnly > 0 &&
                (me.appBase.DataUtils.isEmptyStringValue(node.planAufwand) || node.planAufwand <= 0)) {
                continue;
            }

            // datefilter
            var searchFields = ['istStart', 'istEnde', 'planStart', 'planEnde'];
            var searchField;
            for (var idx2 = 0; idx2 < searchFields.length; idx2++) {
                searchField = searchFields[idx2];
                if (!me._filterNodeByDateFilter(staticSearchOptions, node, searchField)) {
                    flgFound = false;
                }
            }
            if (flgFound) {
                // no filter or all machtes
                searchResultIds.push(nodeId);
            }
        }

        return searchResultIds;
    };

    /**
     * filter the node with all dateFilter for searchField (LE, GE, IsNull)
     * @param {Object} staticSearchOptions  prepared filters
     * @param {Object} node                 node to filter
     * @param {String} fieldName            fieldName to run filter on
     * @returns {Boolean}                   passes or not
     */
    me._filterNodeByDateFilter = function (staticSearchOptions, node, fieldName) {
        var filterName = fieldName + 'LE';
        var filterValue = staticSearchOptions[filterName];
        var fieldValue = node[fieldName];
        if (staticSearchOptions.hasOwnProperty(filterName) && filterValue > 0 &&
            ((me.appBase.DataUtils.isEmptyStringValue(fieldValue) || fieldValue > filterValue))) {
            return false;
        }

        filterName = fieldName + 'GE';
        filterValue = staticSearchOptions[filterName];
        fieldValue = node[fieldName];
        if (staticSearchOptions.hasOwnProperty(filterName) && filterValue > 0 &&
            ((me.appBase.DataUtils.isEmptyStringValue(fieldValue) || fieldValue < filterValue))) {
            return false;
        }

        filterName = fieldName + 'IsNull';
        filterValue = staticSearchOptions[filterName];
        fieldValue = node[fieldName];
        if (staticSearchOptions.hasOwnProperty(filterName) &&
            (filterValue === 'true' || filterValue === true) &&
            !me.appBase.DataUtils.isEmptyStringValue(fieldValue)) {
            return false;
        }

        return true;
    };


    /**
     * create a dynamic sort-function
     * @param {Object} property  property to sort the values by (name asc|desc)
     * @returns {function}       function (a, b) which compares a.property and b.property
     */
    me._dynamicSort = function (property) {
        var sortOrder = 1;
        if (property.search(' desc') > 0) {
            sortOrder = -1;
        }
        property = property.replace(/( desc)|( asc)$/, '').trim();
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            result = result * sortOrder;
            // sort null and undefined to last
            if (result === -1 && (me.appBase.DataUtils.isUndefinedStringValue(a[property]))) {
                result = 1;
            } else if (result === 1 && (me.appBase.DataUtils.isUndefinedStringValue(b[property]))) {
                result = -1;
            }
//            console.log('dynamicSort: ' + sortOrder + ' ' + property + ' a:' + a[property] + ' b:' + b[property] + ' res:' +  result * sortOrder);
            return result;
        };
    };

    /**
     * create a dynamic sort-function for multiple "sorts sort1asc, sort2 desc"
     * @param {Array} props   array of sort-properties to sort the values by (name asc|desc)
     * @returns {function}    function (a, b) which compares a.propert1 and b.propert1 | a.propert2 and b.propert2
     */
    me._dynamicSortMultiple = function (props) {
        return function (obj1, obj2) {
            var i = 0, result = 0, numberOfProperties = props.length;
            /* try getting a different result from 0 (equal)
             * as long as we have extra properties to compare
             */
            while(result === 0 && i < numberOfProperties) {
                result = me._dynamicSort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        };
    };

    /**
     * sort the list by sortConfig
     * @param {Array} list        list of object to compare
     * @param {Array} sortConfig  list of obj-properties to sort by
     */
    me._orderBy = function(list, sortConfig) {
        list.sort(me._dynamicSortMultiple(sortConfig));
    };

    /**
     * cache the parentHierarchy
     * @param {Object} node                 node to cache the parentHierarchy
     */
    me._cacheParentHierarchy = function (node) {
        if (!node.cachedParentHierarchy) {
            node.cachedParentHierarchy = ',' + node.sysUID + ',';
            if (node.parentId && me.nodeList.hasOwnProperty(node.parentId)) {
                node.cachedParentHierarchy = me.nodeList[node.parentId].cachedParentHierarchy + node.cachedParentHierarchy;
            }
        }
    };

    me._init();
    
    return me;
};
