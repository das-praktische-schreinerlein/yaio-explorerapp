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
 * service-functions connect/save/retrieve data from urldownload-datasource
 * @param {YaioAppBase} appBase                        the appbase to get other services
 * @param {Yaio.FileNodeDBDriverConfig} config         config to use
 * @param {Yaio.FileNodeDBDriverConfig} defaultConfig  default to merge with config
 * @returns {Yaio.UrlDownloadNodeDBDriver}             an service-instance
 * @augments Yaio.StaticNodeDBDriver
 * @constructor
 */
Yaio.UrlDownloadNodeDBDriver = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = Yaio.StaticNodeDBDriver(appBase, config, defaultConfig);
    me._exampleDownloadUrls = {};
    
    /**
     * initialize the object
     */
    me._init = function() {
    };

    me.downloadFile = function (url) {
        var dfd = new $.Deferred();
        var res = dfd.promise();
        var svcLogger = me.appBase.get('Logger');
        var msg = 'connectService for url:' + url;

        me.$.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            xhrFields: {
                // for CORS
                withCredentials: true
            },
            url: url,
            type: 'GET',
            error: function (jqXHR, textStatus, errorThrown) {
                // log the error to the console
                svcLogger.logError('ERROR  ' + msg + ' The following error occured: ' + textStatus + ' ' + errorThrown, false);
                svcLogger.logError('cant load ' + msg + ' error:' + textStatus, true);
            },
            complete: function () {
                console.log('completed load ' + msg);
            },
            success: function (data) {
                // update serviceconfig
                me.configureDataService();
                me.reconfigureBaseApp();

                // set content as json
                window.yaioFileJSON = JSON.stringify(data);

                // load content
                me._loadStaticJson(window.yaioFileJSON);

                // set new name
                me.config.name = 'UrlDownload: ' + url;

                // resolve connect
                me.getConnectPromise().resolve('OK');

                // resolve fileDownload
                dfd.resolve('OK');
            }
        });

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
        return Yaio.UrlDownloadAccessManager(me.appBase, me.config);
    };

    me._init();
    
    return me;
};
