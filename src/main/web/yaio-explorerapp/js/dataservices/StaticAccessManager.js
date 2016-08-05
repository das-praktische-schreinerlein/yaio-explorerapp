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
 * service-functions to get actions, urls, flags... available and configured for the current static-datasource
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @param {JsHelferlein.ConfigBase} config         config to use
 * @param {JsHelferlein.ConfigBase} defaultConfig  default to merge with config
 * @returns {Yaio.StaticAccessManager}             an service-instance
 * @augments Yaio.AccessManager
 * @constructor
 */
Yaio.StaticAccessManager = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = Yaio.AccessManager(appBase, config, defaultConfig);

    /**
     * initialize/configure AccessManager
     */
    me._init = function() {
        // urls
        // we have problems with sysUID and nodeRef me.setAvailiableNodeAction('createsymlink', true);
        me.deactivateEditor();
        me.setAvailiableNodeAction('search', true);
        me.setAvailiableNodeAction('dashboard', '#/dashboard');
        
        me.setAvailiableNodeAction('frontpagebaseurl', me.appBase.config.resBaseUrl + 'static/');
        me.setAvailiableNodeAction('syshelp', me.appBase.config.exportStaticDocumentationUrl + 'SysHelp1');
        me.setAvailiableNodeAction('sysinfo', me.appBase.config.exportStaticDocumentationUrl + 'SysInfo1');
        
        me.setAvailiableStaticExportLink('ExportStaticJsonDirect', me.appBase.config.appRootUrl + 'staticexporter/json/');
        
        me.setAvailiableNodeAction('showsysdata', true);
        me.setAvailiableNodeAction('print', true);
    };

    /**
     * @inheritdoc
     */
    me.getAvailiableNodeAction = function(key, nodeId, flgMaster) {
        if (key === 'delete' && flgMaster) {
            return false;
        }
        if (key === 'frontpagebaseurl') {
            return me.availiableNodeActions[key] + nodeId + '.html';
        }
        return me.availiableNodeActions[key];
    };


    me.activateEditor = function () {
        me.setAvailiableNodeAction('edit', true);
        me.setAvailiableNodeAction('create', true);
        me.setAvailiableNodeAction('move', true);
        me.setAvailiableNodeAction('remove', true);
    };

    me.deactivateEditor = function () {
        me.setAvailiableNodeAction('edit', false);
        me.setAvailiableNodeAction('create', false);
        me.setAvailiableNodeAction('move', false);
        me.setAvailiableNodeAction('remove', false);
    };

    me._init();
    
    return me;
};
