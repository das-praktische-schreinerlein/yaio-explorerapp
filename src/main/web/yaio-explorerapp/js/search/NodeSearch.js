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
 * servicefunctions for the search
 *  
 * @FeatureDomain                WebGUI
 * @author                       Michael Schreiner <michael.schreiner@your-it-fellow.de>
 * @category                     collaboration
 * @copyright                    Copyright (c) 2014, Michael Schreiner
 * @license                      http://mozilla.org/MPL/2.0/ Mozilla Public License 2.0
 */


/**
 * service-functions to manage/control the node-search
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @returns {Yaio.NodeSearch}                      an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.NodeSearch = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
    };

    /**
     * create the search-uri to use
     * @param {Object} searchOptions  current searchoptions (filter..) to use
     * @param {int} page              pagenumber to load
     * @param {int} pageSize          optional pageSize (if not set searchOptions.pageSize will be used)
     * @param {int} baseSysUID        optional baseSysUID (if not set searchOptions.baseSysUID will be used)
     * @returns {String}              new search-uri
     */
    me.createSearchUri = function(searchOptions, page, pageSize, baseSysUID) {
        var additionalFilter = 'classFilter=' + searchOptions.strClassFilter + ';' +
            'workflowStateFilter=' + searchOptions.strWorkflowStateFilter + ';' +
            'notNodePraefix=' + searchOptions.strNotNodePraefix + ';' +
            'metaNodeTypeTagsFilter=' + searchOptions.strMetaNodeTypeTagsFilter + ';' +
            'metaNodeSubTypeFilter=' + searchOptions.strMetaNodeSubTypeFilter + ';';
        var additionalSearchFields = ['istStartGE', 'istStartLE', 'istEndeGE', 'istEndeLE',
            'planStartGE', 'planStartLE', 'planEndeGE', 'planEndeLE',
            'istStartIsNull', 'istEndeIsNull', 'planStartIsNull', 'planEndeIsNull',
            'flgConcreteToDosOnly'
        ];
        var additionalSearchField;
        for (var idx = 0; idx < additionalSearchFields.length; idx++) {
            additionalSearchField = additionalSearchFields[idx];
            additionalFilter += additionalSearchField + '=' + searchOptions[additionalSearchField] + ';';
        }

        return '/search'
            + '/' + encodeURI(page)
            + '/' + encodeURI(pageSize > 0 ? pageSize : searchOptions.pageSize)
            + '/' + encodeURI(searchOptions.searchSort)
            + '/' + encodeURI(!me.appBase.DataUtils.isEmptyStringValue(baseSysUID) ? baseSysUID : searchOptions.baseSysUID)
            + '/' + encodeURI(searchOptions.fulltext)
            + '/' + encodeURI(additionalFilter)
            + '/';
    };



    me._init();
    
    return me;
};