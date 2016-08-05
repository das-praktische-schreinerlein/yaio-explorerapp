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
 * service-functions to get actions, urls, flags... available and configured for the current uploadfile-datasource
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @param {JsHelferlein.ConfigBase} config         config to use
 * @param {JsHelferlein.ConfigBase} defaultConfig  default to merge with config
 * @returns {Yaio.FileAccessManager}               an service-instance
 * @augments Yaio.StaticAccessManager
 * @constructor
 */
Yaio.FileAccessManager = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = Yaio.StaticAccessManager(appBase, config, defaultConfig);

    me._init();
    
    return me;
};
