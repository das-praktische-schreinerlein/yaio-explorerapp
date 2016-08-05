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
        me._initExampleDownloads();
    };

    /**
     * connect the dataservice
     * - load json-file from url defined in element #yaioLoadJSONUrl.value
     * - updateServiceConfig
     * - updateAppConfig
     * - load initial data)
     * @returns {JQueryPromise<T>|JQueryPromise<*>}    promise if connect succeed or failed
     */
    me.connectService = function() {
        // return promise
        var dfd = new $.Deferred();
        var res = dfd.promise();
        
        // define handler
        var handleDownloadJSONFileSelectHandler = function handleDownloadJSONFile(url) {
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

                    dfd.resolve('OK');
                }
            });
        };
        
        // initFileUploader
        var downloadDialog = document.getElementById('yaioLoadJSONUrl');
        me.$( '#yaioloadjsondownloader-box' ).dialog({
            modal: true,
            width: '600px',
            buttons: {
              'Schließen': function() {
                me.$( this ).dialog( 'close' );
              },
              'Download': function() {
                  handleDownloadJSONFileSelectHandler(downloadDialog.value);
                  me.$( this ).dialog( 'close' );
              }
            }
        });
        
        return res;
    };

    /*****************************************
     *****************************************
     * Service-Funktions (webservice)
     *****************************************
     *****************************************/
    me._createAccessManager = function() {
        return Yaio.UrlDownloadAccessManager(me.appBase, me.config);
    };

    me._initExampleDownloads = function () {
        var indexUrl = me.appBase.config.exampleDownloadUrl;
        if (indexUrl) {
            var lastSlash = indexUrl.lastIndexOf('/');
            var baseUrl = '';
            if (lastSlash >= 0) {
                baseUrl = indexUrl.substring(0, lastSlash+1);
            }
            me._readExampleDownloads(indexUrl).then(function () {
                me._initExampleDownloadUrlDialog(baseUrl);
            });
        }
    };

    me._readExampleDownloads = function (url) {
        // return promise
        var dfd = new $.Deferred();
        var res = dfd.promise();
        var svcLogger = me.appBase.get('Logger');

        var msg = '_initExampleDownloadUrls';
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
                me._exampleDownloadUrls = data;
                dfd.resolve('OK');
            }
        });

        return res;
    };

    me._initExampleDownloadUrlDialog = function (baseUrl) {
        var $select = $('#yaioLoadJSONUrlExampleDownloadUrls');

        Object.keys(me._exampleDownloadUrls).forEach(function(id) {
            var url = me._exampleDownloadUrls[id].url;
            if (!url.startsWith('http') && !url.startsWith('/')) {
                url = baseUrl + url;
            }
            $select.append(
                new Option(me._exampleDownloadUrls[id].name, url, false, false)
            ).trigger('change');
        });

        $select.on('select2:select', function (evt) {
            // How to select a value
            var current = $select.select2('val');
            $('#yaioLoadJSONUrl').val(current);
        });
    };
    
    me._init();
    
    return me;
};
