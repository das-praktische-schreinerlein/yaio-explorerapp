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
 * service-functions connect/save/retrieve data from uploadfile-datasource
 * @param {YaioAppBase} appBase                        the appbase to get other services
 * @param {Yaio.FileNodeDBDriverConfig} config         config to use
 * @param {Yaio.FileNodeDBDriverConfig} defaultConfig  default to merge with config
 * @returns {Yaio.FileNodeDBDriver}                    an service-instance
 * @augments Yaio.StaticNodeDBDriver
 * @constructor
 */
Yaio.FileNodeDBDriver = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = Yaio.StaticNodeDBDriver(appBase, config, defaultConfig);
    
    /**
     * initialize the object
     */
    me._init = function() {
    };

    me.loadFile = function (file) {
        var dfd = new $.Deferred();
        var res = dfd.promise();
        var reader = new FileReader();

        // config reader
        reader.onload = function (res) {
            console.log('read fileName:' + file.name);

            // update serviceconfig
            me.configureDataService();
            me.reconfigureBaseApp();

            // set content as json
            window.yaioFileJSON = res.target.result;

            // load content
            me._loadStaticJson(window.yaioFileJSON);

            // set new name
            me.config.name = 'Dateiupload: ' + file.name;

            // resolve connect
            me.getConnectPromise().resolve('OK');

            // resolve fileLoad
            dfd.resolve('OK');
        };

        // read the file
        console.log('start read file:' + file);
        reader.readAsText(file);

        return res;
    };

    /**
     * connect the dataservice
     * @returns {JQueryPromise<T>|JQueryPromise<*>}    promise if connect succeed or failed
     */
    me.connectService = function() {
        // return promise
        var dfd = me.createConnectPromise();
        return dfd.promise();
    };

    /*****************************************
     *****************************************
     * Service-Funktions (webservice)
     *****************************************
     *****************************************/
    me._createAccessManager = function() {
        return Yaio.FileAccessManager(me.appBase, me.config);
    };
    
    me._init();
    
    return me;
};
