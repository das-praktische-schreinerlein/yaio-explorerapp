/*! yaio-v0.1.0 app-0.1.0 */

'use strict';


    /**
     * fuegt FormRowToggler an Elternelement an
     */
    JMATPageLayout.prototype.appendFormrowToggler = function(parentId, togglerBaseId, toggleClassName, label) {
        var html = jMATService.getPageLayoutService().createFormrowToggler(
                togglerBaseId, toggleClassName, 
                label + '<span class="icon-formrowtoggler icon-formrowtoggleron">&nbsp;</span>',
                label + '<span class="icon-formrowtoggler icon-formrowtoggleroff">&nbsp;</span>', '', '');
        jMATService.getJMSServiceObj().appendHtml(html,parentId, 'formrowToggler');
    };

    /**
     * show InputRow
     * @param eleInputRow            
     * @returns                      {Boolean}
     */
    JMSLayout.prototype.showInputRow = function(eleInputRow) {
        if (! eleInputRow) {
           return false;
        }
        eleInputRow.style.display = 'inline-block';
        return true;
    };

    /**
     * liefert Status eines Input-Elements
     * @param eleInput               INPUT-HTMLElement
     * return belegt trzue/false
     */
    JMSLayout.prototype.getStateInputElement = function(eleInput) {
        var state = false;

        if (eleInput.nodeName.toUpperCase() === 'SELECT') {
            // Select-Box
            if (eleInput.value && (eleInput.value !== 'search_all.php')) {
                state = true;
            } else {
                // Multiselect auswerten
                for (var i = 0; i < eleInput.length; i++) {
                    if (eleInput.options[i].selected && eleInput.options[i].value && (eleInput.options[i].value !== 'search_all.php')) {
                        state = true;
                        i = eleInput.length + 1;
                    }
                }
            }
        } else if (eleInput.nodeName.toUpperCase() === 'INPUT') {
           // Element als Radio/Checkbox suchen
           if (eleInput.type.toUpperCase() === 'RADIO') {
              if (eleInput.checked) {
                  state = true;
              }
           } else if (eleInput.type.toUpperCase() === 'CHECKBOX') {
              if (eleInput.checked) {
                  state = true;
              }
           } else if (eleInput && eleInput.value) {
              // normales Eingabefeld
              state = true;
           }
        } else if (eleInput.nodeName.toUpperCase() === 'TEXTAREA') {
            // Element als textarea suchen
            if (eleInput && eleInput.value) {
               // normales Eingabefeld
               state = true;
            }
         }

        return state;
    };

    
    JMSLayout.prototype.isInputRowsSet = function(className) {
        // InputRows anhand des Classnames abfragen
        var lstInputRows = this.getInputRows(className);
        if (! lstInputRows || lstInputRows.length <= 0) {
           return null;
        }
        var state = false;

        // alle InputRows iterieren
        for (var i = 0; i < lstInputRows.length; ++i){
           // InputRow verarbeiten
           var eleInputRow = lstInputRows[i];
           state = state || this.getState4InputRow(eleInputRow);
           console.log('state=' + state + ' for ' + eleInputRow.id);
        }
        return state;
     };
    
     /**
      * Toggler an bestehendes Diff anfuegen
      * @param parentId               
      * @param toggleId               
      */
     JMATPageLayout.prototype.appendBlockToggler = function(parentId, toggleId) {
         var html = jMATService.getPageLayoutService().createBlockTogglerHtml(toggleId, toggleId, 
                 '<span class="icon-formrowtoggler icon-formrowtoggleron">&nbsp;</span>',
                 '<span class="icon-formrowtoggler icon-formrowtoggleroff">&nbsp;</span>', '', '');
         jMATService.getJMSServiceObj().appendHtml(html, parentId, 'blockToggler');
      };
     
/**
 * the Config for the YaioAppBase
 * @returns {YaioAppBaseConfig}         an config-instance
 * @augments JsHelferlein.AppBaseConfig
 * @constructor
 */
window.YaioAppBaseConfig = function() {
    'use strict';

    // my own instance
    var me = JsHelferlein.AppBaseConfig();
    
    me.appBaseVarName               = 'yaioAppBase';
    
    me.resBaseUrl                   = '';
    me.addResBaseUrls               = []; // additional resBaseUrls for CORS
    
    me.additionalDetectorStyleNS    = ['yaio-'];

    me.masterSysUId                 = 'MasterplanMasternode1';

    me.datasources = [];
    
    // server-configs
    me.plantUmlBaseUrl              = 'http://www.plantuml.com/';

    // App urls
    me.appRootUrl                   = '/';
    me.appSourceSelectorUrl         = me.appRootUrl + 'sourceselector';
    me.appFrontpageUrl              = me.appRootUrl + 'frontpage';
    me.appLoginUrl                  = me.appRootUrl + 'login';
    me.appLogoutUrl                 = me.appRootUrl + 'logout/logout';
    
    me.configNodeTypeFields         = {
        Create: {
            fields: [
                { fieldName: 'className', type: 'hidden'},
                { fieldName: 'sysUID', type: 'hidden'}
            ]
        },
        CreateUploadFileUrlResNode: {
            fields: [
                { fieldName: 'name', type: 'input'},
                { fieldName: 'type', type: 'hidden'},
                { fieldName: 'metaNodeSubType', type: 'hidden'},
                { fieldName: 'className', type: 'hidden'},
                { fieldName: 'sysUID', type: 'hidden'},
                { fieldName: 'resLocRef', type: 'input'},
                //{ fieldName: 'resContentDMSState', type: 'checkbox'},
                //{ fieldName: 'resIndexDMSState', type: 'checkbox'},
                { fieldName: 'resLocName', type: 'input'},
                { fieldName: 'resLocTags', type: 'textarea'},
                { fieldName: 'docLayoutTagCommand', type: 'select'},
                { fieldName: 'docLayoutAddStyleClass', type: 'input'},
                { fieldName: 'docLayoutShortName', type: 'input'},
                { fieldName: 'docLayoutFlgCloseDiv', type: 'checkbox'},
                { fieldName: 'mode', type: 'hidden', intern: true}
            ]
        },
        CreateSymlink: {
            fields: [
                { fieldName: 'name', type: 'input'},
                { fieldName: 'type', type: 'hidden'},
                { fieldName: 'metaNodeSubType', type: 'hidden'},
                { fieldName: 'className', type: 'hidden'},
                { fieldName: 'sysUID', type: 'hidden'},
                { fieldName: 'symLinkRef', type: 'input'},
                { fieldName: 'symLinkName', type: 'input'},
                { fieldName: 'symLinkTags', type: 'textarea'},
                { fieldName: 'mode', type: 'hidden', intern: true}
            ]
        },
        CreateSnapshot: {
            fields: [
                { fieldName: 'name', type: 'input'},
                { fieldName: 'type', type: 'hidden'},
                { fieldName: 'metaNodeSubType', type: 'hidden'},
                { fieldName: 'className', type: 'hidden'},
                { fieldName: 'sysUID', type: 'hidden'},
                { fieldName: 'nodeDesc', type: 'textarea'},
                { fieldName: 'mode', type: 'hidden', intern: true}
            ]
        },
        Common: {
            fields: [
                { fieldName: 'className', type: 'hidden'},
                { fieldName: 'sysUID', type: 'hidden'},
                { fieldName: 'mode', type: 'hidden', intern: true},
                { fieldName: 'type', type: 'select'},
                { fieldName: 'metaNodeTypeTags', type: 'tagstring'},
                { fieldName: 'state', type: 'select'},
                { fieldName: 'nodeDesc', type: 'textarea'}
            ]
        },
        TaskNode: {
            fields: [
                { fieldName: 'metaNodeSubType', type: 'select'},
                { fieldName: 'name', type: 'input'},
                { fieldName: 'istAufwand', type: 'input'},
                { fieldName: 'istStand', type: 'input'},
                { fieldName: 'istStart', type: 'input', datatype: 'date'},
                { fieldName: 'istEnde', type: 'input', datatype: 'date'},
                { fieldName: 'planAufwand', type: 'input'},
                { fieldName: 'planStart', type: 'input', datatype: 'date'},
                { fieldName: 'planEnde', type: 'input', datatype: 'date'}
            ]
        },
        EventNode: {
            fields: [
                { fieldName: 'metaNodeSubType', type: 'select'},
                { fieldName: 'name', type: 'input'},
                { fieldName: 'istAufwand', type: 'input'},
                { fieldName: 'istStand', type: 'input'},
                { fieldName: 'istStart', type: 'input', datatype: 'datetime'},
                { fieldName: 'istEnde', type: 'input', datatype: 'datetime'},
                { fieldName: 'planAufwand', type: 'input'},
                { fieldName: 'planStart', type: 'input', datatype: 'datetime'},
                { fieldName: 'planEnde', type: 'input', datatype: 'datetime'}
            ]
        },
        InfoNode: {
            fields: [
                { fieldName: 'metaNodeSubType', type: 'select'},
                { fieldName: 'name', type: 'textarea'},
                { fieldName: 'docLayoutTagCommand', type: 'select'},
                { fieldName: 'docLayoutAddStyleClass', type: 'input'},
                { fieldName: 'docLayoutShortName', type: 'input'},
                { fieldName: 'docLayoutFlgCloseDiv', type: 'checkbox'}
            ]
        },
        UrlResNode: {
            fields: [
                { fieldName: 'metaNodeSubType', type: 'hidden'},
                { fieldName: 'name', type: 'input'},
                { fieldName: 'resLocRef', type: 'input'},
                //{ fieldName: 'resContentDMSState', type: 'checkbox'},
                //{ fieldName: 'resIndexDMSState', type: 'checkbox'},
                { fieldName: 'resLocName', type: 'input'},
                { fieldName: 'resLocTags', type: 'textarea'},
                { fieldName: 'docLayoutTagCommand', type: 'select'},
                { fieldName: 'docLayoutAddStyleClass', type: 'input'},
                { fieldName: 'docLayoutShortName', type: 'input'},
                { fieldName: 'docLayoutFlgCloseDiv', type: 'checkbox'}
            ]
        },
        SymLinkNode: {
            fields: [
                { fieldName: 'metaNodeSubType', type: 'hidden'},
                { fieldName: 'name', type: 'input'},
                { fieldName: 'type', type: 'hidden'},
                { fieldName: 'symLinkRef', type: 'input'},
                { fieldName: 'symLinkName', type: 'input'},
                { fieldName: 'symLinkTags', type: 'textarea'}
            ]
        }
    };
    
    me.initResBasedUrls = function () {
        me.loginUrl                     = me.resBaseUrl + '../yaio-explorerapp/yaio-explorerapp.html#/login';
        me.exportStaticDocumentationUrl = me.resBaseUrl + '../yaio-explorerapp/yaio-staticapp.html?mode=documentatuion&template=';
    };
    
    me.initResBasedUrls();

    return me;
};
window.Yaio = {};

/**
 * the appBase for the YaioApp
 * @returns {YaioAppBase}       an appBase-instance
 * @augments JsHelferlein.AppBase
 * @constructor
 */
window.YaioAppBase = function() {
    'use strict';

    // my own instance
    var me = JsHelferlein.AppBase(YaioAppBaseConfig());

    me._init = function () {
        me._configureDefaultServices();
    };

    /* jshint maxstatements: 100 */
    me._configureDefaultServices = function() {
        // instances
        me.configureService('Ymf.MarkdownEditorServiceHelper', function () {
            return Ymf.MarkdownEditorServiceHelper(me);
        });
        me.configureService('Ymf.MarkdownConverter', function () {
            return Ymf.MarkdownConverter(me);
        });
        me.configureService('JsHelferlein.MarkdownRenderer', function () {
            return Yaio.MarkdownRenderer(me);
        });
        me.configureService('Ymf.MarkdownEditorController', function () {
            var config = new JsHelferlein.ConfigBase();
            config.usePrintWidget = false;
            return Ymf.MarkdownEditorController(me, config);
        });

        // instances
        me.configureService('Yaio.PromiseHelper', function() { return Yaio.PromiseHelper(me); });
        me.configureService('Yaio.Base', function() { return Yaio.Base(me); });
        me.configureService('Yaio.FileLoader', function() { return Yaio.FileLoader(me); });
        me.configureService('Yaio.Layout', function() { return Yaio.Layout(me); });
        me.configureService('Yaio.NodeEditor', function() { return Yaio.NodeEditor(me); });
        me.configureService('Yaio.MarkdownConverter', function() { return Yaio.MarkdownConverter(me); });
        me.configureService('Yaio.MarkdownRenderer', function() { return Yaio.MarkdownRenderer(me); });
        me.configureService('Yaio.ExplorerConverter', function() { return Yaio.ExplorerConverter(me); });
        me.configureService('Yaio.Formatter', function() { return Yaio.Formatter(me); });
        me.configureService('Yaio.MarkdownEditorController', function() { return Yaio.MarkdownEditorController(me); });
        me.configureService('Yaio.DataSourceManager', function() { return Yaio.DataSourceManager(me); });
        me.configureService('Yaio.ServerNodeDBDriver_Local', function() { return Yaio.ServerNodeDBDriver(me, Yaio.ServerNodeDBDriverConfig()); });
        me.configureService('Yaio.StaticNodeDataStore', function() { return Yaio.StaticNodeDataStore(me); });
        me.configureService('Yaio.StaticNodeDBDriver', function() { return Yaio.StaticNodeDBDriver(me, Yaio.StaticNodeDBDriverConfig()); });
        me.configureService('Yaio.FileNodeDBDriver', function() { return Yaio.FileNodeDBDriver(me, Yaio.FileNodeDBDriverConfig()); });
        me.configureService('Yaio.NodeRepository', function() { return Yaio.NodeRepository(me); });
        me.configureService('Yaio.NodeDataRenderer', function() { return Yaio.NodeDataRenderer(me); });
        me.configureService('Yaio.NodeGanttRenderer', function() { return Yaio.NodeGanttRenderer(me); });
        me.configureService('Yaio.ExplorerCommands', function() { return Yaio.ExplorerCommands(me); });
        me.configureService('Yaio.ExplorerTree', function() { return Yaio.ExplorerTree(me); });
        me.configureService('Yaio.ExportedData', function() { return Yaio.ExportedData(me); });

        // aliases
        me.configureService('YmfMarkdownEditorServiceHelper', function () {
            return me.get('Ymf.MarkdownEditorServiceHelper');
        });
        me.configureService('YmfMarkdownConverter', function () {
            return me.get('Ymf.MarkdownConverter');
        });
        me.configureService('YmfMarkdownRenderer', function () {
            return me.get('JsHelferlein.MarkdownRenderer');
        });
        me.configureService('YmfRenderer', function () {
            return me.get('JsHelferlein.Renderer');
        });
        me.configureService('YmfMarkdownEditorController', function () {
            return me.get('Ymf.MarkdownEditorController');
        });
        me.configureService('YaioPromiseHelper', function() { return me.get('Yaio.PromiseHelper'); });
        me.configureService('YaioBase', function() { return me.get('Yaio.Base'); });
        me.configureService('YaioFileLoader', function() { return me.get('Yaio.FileLoader'); });
        me.configureService('YaioLayout', function() { return me.get('Yaio.Layout'); });
        me.configureService('YaioNodeEditor', function() { return me.get('Yaio.NodeEditor'); });
        me.configureService('YaioMarkdownConverter', function() { return me.get('YmfMarkdownConverter'); });
        me.configureService('YaioMarkdownRenderer', function() { return me.get('YmfMarkdownRenderer'); });
        me.configureService('YaioExplorerConverter', function() { return me.get('Yaio.ExplorerConverter'); });
        me.configureService('YaioFormatter', function() { return me.get('YmfRenderer'); });
        me.configureService('YaioMarkdownEditorController', function() { return me.get('YmfMarkdownEditorController'); });

        me.configureService('YaioStaticNodeDataStore', function() { return me.get('Yaio.StaticNodeDataStore'); });
        me.configureService('YaioStaticNodeDBDriver', function() { return me.get('Yaio.StaticNodeDBDriver'); });
        me.configureService('YaioFileNodeDBDriver', function() { return me.get('Yaio.FileNodeDBDriver'); });
        me.configureService('YaioServerNodeDBDriver_Local', function() { return me.get('Yaio.ServerNodeDBDriver_Local'); });
        me.configureService('YaioNodeRepository', function() { return me.get('Yaio.NodeRepository'); });
        me.configureService('YaioAccessManager', function() { return me.get('YaioNodeRepository').getAccessManager(); });
        me.configureService('YaioDataSourceManager', function() {
            var dsm = me.get('Yaio.DataSourceManager');
            dsm.addConnection('YaioFileNodeDBDriver', function () { return me.get('YaioFileNodeDBDriver'); });
            dsm.addConnection('YaioStaticNodeDBDriver', function () { return me.get('YaioStaticNodeDBDriver'); });
            dsm.addConnection('YaioServerNodeDBDriver_Local', function () { return me.get('YaioServerNodeDBDriver_Local'); });
            return dsm;
        });

        me.configureService('YaioNodeDataRenderer', function() { return me.get('Yaio.NodeDataRenderer'); });
        me.configureService('YaioNodeGanttRenderer', function() { return me.get('Yaio.NodeGanttRenderer'); });
        me.configureService('YaioExplorerCommands', function() { return me.get('Yaio.ExplorerCommands'); });
        me.configureService('YaioExplorerTree', function() { return me.get('Yaio.ExplorerTree'); });
        me.configureService('YaioExportedData', function() { return me.get('Yaio.ExportedData'); });
    };
    /* jshint maxstatements: 50 */

    // init all
    me._init();

    return me;
};
/**
 * service-functions to simulate promises
 * @param {YaioAppBase} appBase           the appbase to get other services
 * @returns {Yaio.PromiseHelper}          an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.PromiseHelper = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    // Angular-PromiseHelper
    var PromiseHelper = (function () {
        function wrapPromise(promise) {
            return {
                then: promise.then,
                success: function (fn) {
                    promise.then(fn);
                    return wrapPromise(promise);
                },
                error: function (fn) {
                    promise.then(null, fn);
                    return wrapPromise(promise);
                }
            };
        }
     
        function PromiseHelper() {
            var _this = this;
            var $q = appBase.get('Angular.$q');
            _this._deferred = $q.defer();
            _this.$rootScope = appBase.get('Angular.$rootScope');
        }
      
        PromiseHelper.prototype.resolve = function (data) {
            this._deferred.resolve(data);
            //this.$rootScope.$apply();
        };
      
        PromiseHelper.prototype.reject = function (data) {
            this._deferred.reject(data);
            //this.$rootScope.$apply();
        };

        PromiseHelper.prototype.getHttpPromiseMock = function () {
            var promise = this._deferred.promise;
            return wrapPromise(promise);
        };
      
        return PromiseHelper;
    })();
    

    /**
     * initialize the object
     */
    me._init = function() {
    };

    me.createAngularPromiseHelper = function() {
        return new PromiseHelper();
    };
    
    me._init();
    
    return me;
};

/**
 * service-functions for special needs :-)
 * @param {YaioAppBase} appBase     the appbase to get other services
 * @returns {Yaio.Base}             an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.Base = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
    };

    me.toggleWithLinks = function(link1, link2, id1, id2) {
         if (me.$(id1).css('display') !== 'none') {
             me.$(id1).css('display', 'none');
             me.$(link1).css('display', 'inline');
             me.$(id2).css('display', 'block');
             me.$(link2).css('display', 'none');
         } else {
             me.$(id2).css('display', 'none');
             me.$(link2).css('display', 'inline');
             me.$(id1).css('display', 'block');
             me.$(link1).css('display', 'none');
         }
         return false;
     };
    
    me.createXFrameAllowFrom = function() {
        return 'x-frames-allow-from=' + window.location.hostname;
    };

    me._init();

    return me;
};
/**
 * service-functions for file-lading (documentation...)
 * @param {YaioAppBase} appBase     the appbase to get other services
 * @returns {Yaio.FileLoader}       an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.FileLoader = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
    };

    /**
     * load content into containerFile insert it between <!-- REPLACECONTENT_START --> and <!-- REPLACECONTENT_END -->
     * @param {String} containerFileName             name of the containerFile
     * @param {String} content                       content
     * @returns {JQueryPromise<T>|JQueryPromise<*>}  promise if load succeed or failed - resolves with content
     */
    me.loadContentIntoContainerFile = function(containerFileName, content) {
        var msg = 'loadContentIntoContainerFile containerFileName:' + containerFileName;

        // create promise
        var dfd = new $.Deferred();
        var res = dfd.promise();
        
        console.log('START ' + msg);
        me.appBase.FileUtils.loadFile(containerFileName)
            .then(function doneContainerFile(containerData) {
                // do replacements
                containerData = containerData.replace(/<!-- REPLACECONTENT_START -->[\s\S]*<!-- REPLACECONTENT_END -->/gi, 
                        '<!-- REPLACECONTENT_START -->' + content + '<!-- REPLACECONTENT_END -->');
                // set baseref
                var baseRef = me.appBase.config.resBaseUrl + '../';
                containerData = containerData.replace(/=\'.\/dist\//g,
                        '=\'' + baseRef + 'dist/');
                containerData = containerData.replace('yaioAppBase.config.resBaseUrl = \'\';',
                        'yaioAppBase.config.resBaseUrl = \'' + baseRef + '\';');

                console.log('DONE ' + msg + ' doneContainerFile + replace -> return');
                dfd.resolve(containerData);
            }, function error(errorThrown) {
                console.error('ERROR ' + msg + ' error -> return', errorThrown);
                dfd.reject(errorThrown);
            });
        
        return res;
    };

    /**
     * load content of contentFileName into containerFile
     * @param {String} containerFileName             name of the containerFile
     * @param {String} contentFileName               name of the contentFile to insert into containerFile
     * @returns {JQueryPromise<T>|JQueryPromise<*>}  promise if load succeed or failed - resolves with content
     */
    me.loadStaticFileIntoContainerFile = function(containerFileName, contentFileName) {
        var msg = 'loadStaticFileIntoContainerFile containerFileName:' + containerFileName + ' contentFileName:' + contentFileName;
        // create promise
        var dfd = new $.Deferred();
        var res = dfd.promise();
        
        console.log('START ' + msg);
        me.appBase.FileUtils.loadFile(contentFileName)
            .then(function doneContentFile(contentData) {
                console.log(msg + ' doneContentFile DONE call loadContentIntoContainerFile');
                me.loadContentIntoContainerFile(containerFileName, contentData) 
                    .then(function doneContainerFile(containerData) {
                        console.log('DONE ' + msg + ' doneContainerFile -> return');
                        dfd.resolve(containerData);
                    }, function error(errorThrown) {
                        console.error('ERROR ' + msg + ' error -> return', errorThrown);
                        dfd.reject(errorThrown);
                    });
            }, function error(errorThrown) {
                console.error('ERROR ' + msg + ' error -> return', errorThrown);
                dfd.reject(errorThrown);
            });
        
        return res;
    };

    /**
     * load content of contentFileName into containerFile: documentation-export.html
     * @param {String} contentFileName               name of the contentFile to insert into containerFile
     * @returns {JQueryPromise<T>|JQueryPromise<*>}  promise if load succeed or failed - resolves with content
     */
    me.loadDocumentationContainerContent = function(contentFileName) {
        var msg = 'loadDocumentationContainerContent contentFileName:' + contentFileName;
        var containerFileName = '../exporttemplates/documentation-export.html';
        // create promise
        var dfd = new $.Deferred();
        var res = dfd.promise();

        console.log('START ' + msg);
        me.loadStaticFileIntoContainerFile(containerFileName, contentFileName)
            .then(function doneContentFile(contentData) {
                console.log('DONE ' + msg + ' loading -> return');
                dfd.resolve(contentData);
            }, function error(errorThrown) {
                console.error('ERROR ' + msg + ' error -> return', errorThrown);
                dfd.reject(errorThrown);
            });

        return res;
    };
    
    me.downloadDocumentationContainerContent = function($link, contentFileName, mime, encoding) {
        var target = $link.attr('target');
        me.loadDocumentationContainerContent(contentFileName)
            .then(function doneContentFile(contentData) {
                me.appBase.FileUtils.downloadAsFile($link, contentData, contentFileName, mime, encoding, target);
            });
    };

    me._init();
    
    return me;
};
/** 
 * servicefunctions for the editors
 *  
 * @FeatureDomain                WebGUI
 * @author                       Michael Schreiner <michael.schreiner@your-it-fellow.de>
 * @category                     collaboration
 * @copyright                    Copyright (c) 2014, Michael Schreiner
 * @license                      http://mozilla.org/MPL/2.0/ Mozilla Public License 2.0
 */


/**
 * service-functions to manage/control the node-editor
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @returns {Yaio.NodeEditor}                      an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.NodeEditor = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
        window.self.callUpdateTriggerForElement = me.callUpdateTriggerForElement;
    };



    /**
     * hide all editor-forms
     */
    me.hideAllNodeEditorForms = function() {
        // reset editor
        console.log('yaioHideAllNodeEditorForms: hide forms');
        // hide forms
        me.$('#containerFormYaioEditorCreate').css('display', 'none');
        me.$('#containerFormYaioEditorTaskNode').css('display', 'none');
        me.$('#containerFormYaioEditorEventNode').css('display', 'none');
        me.$('#containerFormYaioEditorInfoNode').css('display', 'none');
        me.$('#containerFormYaioEditorUrlResNode').css('display', 'none');
        me.$('#containerFormYaioEditorSymLinkNode').css('display', 'none');
    };

    /**
     * open the nodeeditor for the node (toggle it fromleft), transfer the data from node to the formfields
     * reset forms+field, hide forms, open the spcific form for the nodeclass, updates fields
     * @param {String} nodeId                 id of the node
     * @param {String} mode                   edit, create, createsymlink
     * @param {Object} newNode                optional basedata for the new node
     */
    me.openNodeEditorForNodeId = function(nodeId, mode, newNode) {
        var svcLogger = me.appBase.get('Logger');

        // reset editor
        console.log('yaioOpenNodeEditor: reset editor');
        me._resetNodeEditor();
        
        // check vars
        if (! nodeId) {
            // tree not found
            svcLogger.logError('error yaioOpenNodeEditor: nodeId required', false);
            return null;
        }
        // load node
        var tree = me.$('#tree').fancytree('getTree');
        if (!tree) {
            // tree not found
            svcLogger.logError('error yaioOpenNodeEditor: cant load tree for node:' + nodeId, false);
            return null;
        }
        var treeNode = tree.getNodeByKey(nodeId);
        if (! treeNode) {
            svcLogger.logError('error yaioOpenNodeEditor: cant load node:' + nodeId, false);
            return null;
        }
        
        // extract nodedata
        var basenode = treeNode.data.basenode;
        
        // open editor
        me.openNodeEditorForNode(basenode, mode, newNode);
    };

    /* jshint maxstatements: 100 */
    /**
     * open the nodeeditor for the node (toggle it fromleft), transfer the data from node to the formfields
     * reset forms+field, hide forms, open the spcific form for the nodeclass, updates fields
     * @param {Object} basenode               the node
     * @param {String} mode                   edit, create, createsymlink
     * @param {Object} newNode                optional node to copy data from (for mode createsnapshot...)
     */
    me.openNodeEditorForNode = function(basenode, mode, newNode) {
        var svcLogger = me.appBase.get('Logger');
        var svcDataUtils = me.appBase.get('DataUtils');
        var svcYaioLayout = me.appBase.get('YaioLayout');
        var svcYaioMarkdownEditorController = me.appBase.get('YaioMarkdownEditorController');

        // reset editor
        console.log('yaioOpenNodeEditor: reset editor');
        me._resetNodeEditor();
        
        // check vars
        if (! basenode) {
            // tree not found
            svcLogger.logError('error yaioOpenNodeEditor: basenode required', false);
            return null;
        }
        var nodeId = basenode.sysUID;
    
        // check mode    
        var fields = [];
        var formSuffix, fieldSuffix;
        var origBasenode = basenode;
        if (mode === 'edit') {
            // mode edit
            
            // configure value mapping
            fields = fields.concat(me.appBase.config.configNodeTypeFields.Common.fields);
            if (basenode.className === 'TaskNode') {
                fields = fields.concat(me.appBase.config.configNodeTypeFields.TaskNode.fields);
            } else if (basenode.className === 'EventNode') {
                fields = fields.concat(me.appBase.config.configNodeTypeFields.EventNode.fields);
            } else if (basenode.className === 'InfoNode') {
                fields = fields.concat(me.appBase.config.configNodeTypeFields.InfoNode.fields);
            }  else if (basenode.className === 'UrlResNode') {
                fields = fields.concat(me.appBase.config.configNodeTypeFields.UrlResNode.fields);
            }  else if (basenode.className === 'SymLinkNode') {
                fields = fields.concat(me.appBase.config.configNodeTypeFields.SymLinkNode.fields);
            }
            
            // set formSuffix
            formSuffix = basenode.className;
            fieldSuffix = basenode.className;
            basenode.mode = 'edit';
            console.log('yaioOpenNodeEditor mode=edit for node:' + nodeId);
        } else if (mode === 'create') {
            // mode create
            formSuffix = 'Create';
            fieldSuffix = 'Create';
            fields = fields.concat(me.appBase.config.configNodeTypeFields.Create.fields);
            
            // new basenode
            basenode = {
                    mode: 'create',
                    sysUID: origBasenode.sysUID
            };
            console.log('yaioOpenNodeEditor mode=create for node:' + nodeId);
        } else if (mode === 'createsymlink') {
            // mode create
            formSuffix = 'SymLinkNode';
            fieldSuffix = 'SymLinkNode';
            fields = fields.concat(me.appBase.config.configNodeTypeFields.CreateSymlink.fields);
    
            // new basenode
            basenode = {
                    mode: 'create',
                    sysUID: origBasenode.sysUID,
                    name: 'Symlink auf: "' + origBasenode.name + '"',
                    type: 'SYMLINK',
                    metaNodeSubType: 'SymLinkNodeMetaNodeSubType.SYMLINK',
                    state: 'SYMLINK',
                    className: 'SymLinkNode',
                    symLinkRef: origBasenode.metaNodePraefix + '' + origBasenode.metaNodeNummer
            };
            console.log('yaioOpenNodeEditor mode=createsymlink for node:' + nodeId);
        } else if (mode === 'createuploadurlresnode') {
            // mode create
            formSuffix = 'UrlResNode';
            fieldSuffix = 'UrlResNode';
            fields = fields.concat(me.appBase.config.configNodeTypeFields.CreateUploadFileUrlResNode.fields);

            // new basenode
            basenode = {
                mode: 'create',
                sysUID: origBasenode.sysUID,
                name: newNode.name,
                className: 'UrlResNode',
                type: 'FILERES',
                metaNodeSubType: 'UrlResNodeMetaNodeSubType.RESOURCE',
                state: 'FILERES',
                resLocRef: newNode.resLocRef,
                resLocName: newNode.resLocName,
                resLocTags: newNode.resLocTags,
                uploadFile: newNode.uploadFile
            };
            console.log('yaioOpenNodeEditor mode=createupload for node:' + nodeId);
        } else if (mode === 'createsnapshot') {
            // mode create
            formSuffix = 'InfoNode';
            fieldSuffix = 'InfoNode';
            fields = fields.concat(me.appBase.config.configNodeTypeFields.CreateSnapshot.fields);
    
            // new basenode
            basenode = {
                    mode: 'create',
                    sysUID: origBasenode.sysUID,
                    name: 'Snapshot für: "' + origBasenode.name + '" vom ' + svcDataUtils.formatGermanDateTime((new Date()).getTime()),
                    type: 'INFO',
                    metaNodeSubType: 'InfoNodeMetaNodeSubType.SNAPSHOT',
                    state: 'INFO',
                    className: 'InfoNode',
                    nodeDesc: newNode.nodeDesc
            };
            console.error('yaioOpenNodeEditor mode=createsnapshot for node:' + nodeId);
        } else {
            svcLogger.logError('error yaioOpenNodeEditor: unknown mode=' + mode
                    + ' for nodeId:' + nodeId, false);
            return null;
        }
        
        // iterate fields
        for (var idx in fields) {
            if (!fields.hasOwnProperty(idx)) {
                continue;
            }
            var field = fields[idx];
            me._setNodeEditorFormField(field, fieldSuffix, basenode);
        }
        
        // show editor
        var width = me.$('#box_data').width();
        console.log('yaioOpenNodeEditor show editor: ' + formSuffix
                + ' for node:' + nodeId);
    
        // set width
        me.$('#containerYaioEditor').css('width', '900px');
        me.$('#containerBoxYaioEditor').css('width', '900px');
        me.$('#containerYaioTree').css('width', (width - me.$('#containerYaioEditor').width() - 30) + 'px');
        
        // display editor and form for the formSuffix
        me.$('#containerBoxYaioEditor').css('display', 'block');
        me.$('#containerFormYaioEditor' + formSuffix).css('display', 'block');
        //me.$('#containerYaioEditor').css('display', 'block');
        me.appBase.get('UIToggler').toggleElement('#containerYaioEditor');
    
        // create Elements if not exists
        svcYaioLayout.createTogglerIfNotExists('legendIstTaskForm', 'filterIstTaskForm', 'filter_IstTaskNode');
        svcYaioLayout.createTogglerIfNotExists('legendDescTaskForm', 'filterDescTaskForm', 'filter_DescTaskNode');
        svcYaioLayout.createTogglerIfNotExists('legendMetaTaskForm', 'filterMetaTaskForm', 'filter_MetaTaskNode');
        svcYaioLayout.createTogglerIfNotExists('legendIstEventForm', 'filterIstEventForm', 'filter_IstEventNode');
        svcYaioLayout.createTogglerIfNotExists('legendDescEventForm', 'filterDescEventForm', 'filter_DescEventNode');
        svcYaioLayout.createTogglerIfNotExists('legendMetaEventForm', 'filterMetaEventForm', 'filter_MetaEventNode');
        svcYaioLayout.createTogglerIfNotExists('legendLayoutInfoForm', 'filterLayoutInfoForm', 'filter_LayoutInfoNode');
        svcYaioLayout.createTogglerIfNotExists('legendDescInfoForm', 'filterDescInfoForm', 'filter_DescInfoNode');
        svcYaioLayout.createTogglerIfNotExists('legendMetaInfoForm', 'filterMetaInfoForm', 'filter_MetaInfoNode');
        svcYaioLayout.createTogglerIfNotExists('legendLayoutUrlResForm', 'filterLayoutUrlResForm', 'filter_LayoutUrlResNode');
        svcYaioLayout.createTogglerIfNotExists('legendDescUrlResForm', 'filterDescUrlResForm', 'filter_DescUrlResNode');
        svcYaioLayout.createTogglerIfNotExists('legendMetaUrlResForm', 'filterMetaUrlResForm', 'filter_MetaUrlResNode');
        svcYaioLayout.createTogglerIfNotExists('legendDescSymLinkForm', 'filterDescSymLinkForm', 'filter_DescSymLinkNode');
        svcYaioLayout.createTogglerIfNotExists('legendMetaSymLinkForm', 'filterMetaSymLinkForm', 'filter_MetaSymLinkNode');

        // hide empty, optional elements
        svcYaioLayout.hideFormRowTogglerIfSet('filterIstTaskForm', 'filter_IstTaskNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterDescTaskForm', 'filter_DescTaskNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterMetaTaskForm', 'filter_MetaTaskNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterIstEventForm', 'filter_IstEventNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterDescEventForm', 'filter_DescEventNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterMetaEventForm', 'filter_MetaEventNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterLayoutInfoForm', 'filter_LayoutInfoNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterDescInfoForm', 'filter_DescInfoNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterMetaInfoForm', 'filter_MetaInfoNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterLayoutUrlResForm', 'filter_LayoutUrlResNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterDescUrlResForm', 'filter_DescUrlResNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterMetaUrlResForm', 'filter_MetaUrlResNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterDescSymLinkForm', 'filter_DescSymLinkNode', false);
        svcYaioLayout.hideFormRowTogglerIfSet('filterMetaSymLinkForm', 'filter_MetaSymLinkNode', false);

        // create nodeDesc-editor
        svcYaioMarkdownEditorController.createMarkdownEditorForTextarea('editorInputNodeDescTaskNode', 'inputNodeDescTaskNode');
        svcYaioMarkdownEditorController.createMarkdownEditorForTextarea('editorInputNodeDescEventNode', 'inputNodeDescEventNode');
        svcYaioMarkdownEditorController.createMarkdownEditorForTextarea('editorInputNodeDescInfoNode', 'inputNodeDescInfoNode');
        svcYaioMarkdownEditorController.createMarkdownEditorForTextarea('editorInputNodeDescUrlResNode', 'inputNodeDescUrlResNode');
        svcYaioMarkdownEditorController.createMarkdownEditorForTextarea('editorInputNodeDescSymLinkNode', 'inputNodeDescSymLinkNode');
        
        // update appsize
        svcYaioLayout.setupAppSize();

        // set uploadfile
        if (mode === 'createuploadurlresnode') {
            me.setUploadFileUrlResNode(basenode);
        }
    };
    /* jshint maxstatements: 50 */

    /** 
     * close the nodeditor, toggle it to the left
     */
    me.closeNodeEditor = function() {
        console.log('close editor');
        me.appBase.get('UIToggler').toggleElement('#containerYaioEditor');
        me._resetNodeEditor();
    };
    
    /** 
     * a hack to call updatetrigger for the element because for speechregognition the popup
     * cant call the trigger for another window (security)
     * the function binds to the current document-window
     * @param element                element (HTML-Element) to fire the trigger
     */
    me.callUpdateTriggerForElement = function(element) {
        me.appBase.DataUtils.callUpdateTriggerForElement(element);
    };

    /**
     * initialize the dropzone for UrlResNode-UploadFiles - add dragover and drop - eventlistener
     * @param {String} selector          selector to use as JQuery-Filter
     */
    me.initUploadFileUrlResNodeDropZone = function(selector) {
        // aad event if not exists on jQuery
        jQuery.event.props.push('dataTransfer');

        var $dropZone = me.$(selector);
        if (!$dropZone || $dropZone.length !== 1) {
            console.error('initdragdrop failed dropzone not exists:', $dropZone);
            return;
        }

        console.log('initdragdrop before init :', me.$._data( $dropZone[0], 'events'));
        if (!me.$._data( $dropZone[0], 'events') ||
                me.$._data( $dropZone[0], 'events').dragover === undefined) {
            $dropZone.bind('dragover', function (event) {
                //console.log('dragover:', event);
                me.handleUploadFileUrlResNodeDragOver(event);
            });
        }
        if (!me.$._data( $dropZone[0], 'events') ||
                me.$._data( $dropZone[0], 'events').drop === undefined) {
            $dropZone.bind('drop', function (event) {
                //console.log('drop:', event);
                me.handleUploadFileUrlResNodeSelect(event);
            });
        }
        console.log('initdragdrop after init :', me.$._data( $dropZone[0], 'events'));
    };

    /**
     * handler for drag&drop-dragover - show copy-hint
     * @param {Event} evt                    Drag&Drop-event
     */
    me.handleUploadFileUrlResNodeDragOver = function(evt) {
        // Explicitly show this is a copy.
        evt.stopPropagation();
        evt.preventDefault();
        if (!me.appBase.DataUtils.isUndefined(evt.dataTransfer)) {
            evt.dataTransfer.dropEffect = 'copy';
        }
    };

    /**
     * show uploadform
     * handler for drag&drop-drag: open the UrlResNode-Editor with the filedata to create and upload the file
     * File-Drag&Drop&Read inspired by http://www.html5rocks.com/de/tutorials/file/dndfiles/
     * @param {Event} evt                    Drag&Drop-event
     */
    me.handleUploadFileUrlResNodeSelect = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        // get files
        if (!me.appBase.DataUtils.isUndefined(evt.dataTransfer) &&
            !me.appBase.DataUtils.isUndefined(evt.dataTransfer.files) &&
            evt.dataTransfer.files.length > 0) {
            var files = evt.dataTransfer.files;
            var file = files[0];
            var parentSysUID = evt.target.getAttribute('data-parentsysuid');

            // check data
            if (!parentSysUID || !file) {
                me.appBase.get('Logger').logError('error: parentSysUID and file required', false);
            }
            var baseNode = {
                sysUID: parentSysUID,
                className: 'UrlResNode',
                type: 'FILERES',
                name: file.name,
                resLocRef: file.name,
                resLocName: file.name,
                uploadFile: file
            };

            // open Editor
            me.openNodeEditorForNode(baseNode, 'createuploadurlresnode', baseNode);
        }
    };

    /** 
     * set uploadFile in angular - init uploadFile
     * @param {Object} basenode               the node-data with attr: uploadfile
     */
    me.setUploadFileUrlResNode = function (basenode) {
        // set uploadFile in scope
        var uploadFile = basenode.uploadFile;
        var element = document.getElementById('inputTypeUrlResNode');
        angular.element(element).scope().setUploadFileUrlResNode(uploadFile, true);
    };


    /*****************************************
     *****************************************
     * Service-Funktions (businesslogic)
     *****************************************
     *****************************************/
    
    /** 
     * recalcs the istStand depending on the state/type
     * if ERLEDIGT || VERWORFEN || EVENT_ERLEDIGT || EVENT_VERWORFEN: update istStand=100
     * @param {Object} basenode      the node to recalc
     * @return {int}                 istStand in %
     */
    me.calcIstStandFromState = function(basenode) {
        var istStand = basenode.istStand;
        if (   basenode.type === 'EVENT_ERLEDIGT'
            || basenode.type === 'EVENT_VERWORFEN'
            || basenode.type === 'ERLEDIGT'
            || basenode.type === 'VERWORFEN') {
            istStand = 100;
        }
        console.log('calcIstStandFromState for node:' + basenode.sysUID + ' state=' + basenode.type + ' new istStand=' + istStand);
        
        return istStand;
    };
    
    /** 
     * recalcs the type/state depending on the istStand
     * <ul>
     *   <li>if className=TaskNode && 0: update type=OFFEN
     *   <li>if className=TaskNode && >0&&<100 && ! WARNING: update type=RUNNING
     *   <li>if className=TaskNode && 100 && != VERWORFEN: update type=ERLEDIGT
     *   <li>if className=EventNode && 0: update type=EVENT_PLANED
     *   <li>if className=EventNode && >0&&<100 && ! EVENT_WARNING: update type=EVENT_RUNNING
     *   <li>if className=EventNode && 100 && != EVENT_VERWORFEN: update type=EVENT_ERLEDIGT
     * </ul>
     * @param {Object} basenode        the node to recalc
     * @return {String}                the recalced type
     */
    me.calcTypeFromIstStand = function(basenode) {
        var type = basenode.type;
    
        if (basenode.className === 'TaskNode') {
            // TaskNode
            if (basenode.istStand === '0' || basenode.istStand === 0) {
                // 0: OFFEN
                type = 'OFFEN';
            } else if (basenode.istStand === 100 && basenode.type !== 'VERWORFEN') {
                // 100: ERLEDIGT if not VERWORFEN already
                type = 'ERLEDIGT';
            } else if (basenode.istStand < 100 && basenode.istStand > 0) {
                // 0<istStand<100: RUNNING if not WARNING already
                if (basenode.type !== 'WARNING') {
                    type = 'RUNNING';
                }
            }
        } else if (basenode.className === 'EventNode') {
            // EventNode
            if (basenode.istStand === '0' || basenode.istStand === 0) {
                // 0: EVENT_PLANED
                type = 'EVENT_PLANED';
            } else if (basenode.istStand === 100 && basenode.type !== 'EVENT_VERWORFEN') {
                // 100: EVENT_ERLEDIGT if not EVENT_VERWORFEN already
                type = 'EVENT_ERLEDIGT';
            } else if (basenode.istStand < 100 && basenode.istStand > 0) {
                // 0<istStand<100: EVENT_RUNNING if not EVENT_WARNING already
                if (basenode.type !== 'EVENT_WARNING') {
                    type = 'EVENT_RUNNING';
                }
            }
        }
        console.log('calcTypeFromIstStand for node:' + basenode.sysUID + ' istStand=' + basenode.istStand + ' newstate=' + type);
        
        return type;
    };

    /**
     * reset editor (hide all form, empty all formfields)- hide editor
     */
    me._resetNodeEditor = function() {
        // reset editor
        console.log('yaioResetNodeEditor: show tree, hide editor');

        // show full tree
        me.$('#containerYaioTree').css('width', '100%');

        // hide editor-container
        me.$('#containerYaioEditor').css('width', '100%');
        me.$('#containerYaioEditor').css('display', 'none');

        // hide editor-box
        me.$('#containerBoxYaioEditor').css('width', '100%');
        me.$('#containerBoxYaioEditor').css('display', 'none');

        // hide forms
        me.hideAllNodeEditorForms();
        me._resetNodeEditorFormFields();
    };

    /**
     * reset/empty all formfields
     */
    me._resetNodeEditorFormFields = function() {
        // reset data
        // configure value mapping
        var basenode = {};
        for (var formName in me.appBase.config.configNodeTypeFields) {
            if (!me.appBase.config.configNodeTypeFields.hasOwnProperty(formName)) {
                continue;
            }
            var fields = [];
            fields = fields.concat(me.appBase.config.configNodeTypeFields.Common.fields);
            fields = fields.concat(me.appBase.config.configNodeTypeFields[formName].fields);
            for (var idx in fields) {
                if (!fields.hasOwnProperty(idx)) {
                    continue;
                }
                var field = fields[idx];
                me._setNodeEditorFormField(field, formName, basenode);
            }
        }
    };

    /**
     * updates the formfield with the nodedata
     * @param {Object} field                  fieldconfig from me.appBase.config.configNodeTypeFields
     * @param {String} fieldSuffix            suffix of the fieldName to identify the form (nodeclass of basenode)
     * @param {Object} basenode               the node to map the fieldvalue
     */
    me._setNodeEditorFormField = function(field, fieldSuffix, basenode) {
        var svcDataUtils = me.appBase.get('DataUtils');
        var fieldName = field.fieldName;
        var fieldNameId = '#input' + fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + fieldSuffix;
        var value = basenode[fieldName];

        // convert value
        if (field.datatype === 'integer' && (me.appBase.DataUtils.isEmptyStringValue(value))) {
            // specical int
            value = 0;
        } else if (field.datatype === 'date')  {
            // date
            value = svcDataUtils.formatGermanDate(value);
        } else if (field.datatype === 'datetime')  {
            // date
            value = svcDataUtils.formatGermanDateTime(value);
        } else if (me.appBase.DataUtils.isUndefinedStringValue(value)) {
            // alle other
            value = '';
        }

        // reescape data for form
        if (fieldName === 'nodeDesc') {
            value = value.replace(/<WLBR>/g, '\n');
            value = value.replace(/<WLESC>/g, '\\');
            value = value.replace(/<WLTAB>/g, '\t');
        }

        // set depending on the fieldtype
        if (field.type === 'hidden') {
            me.$(fieldNameId).val(value).trigger('input').triggerHandler('change');
        } else if (field.type === 'select') {
            me.$(fieldNameId).val(value).trigger('select').triggerHandler('change');
        } else if (field.type === 'tagstring') {
            console.error('tagstring:' + value + ' for ' + fieldNameId);
            me.$.each(value.split(' '), function (optionIndex, optionValue) {
                if (me.appBase.DataUtils.isEmptyStringValue(optionValue)) {
                    return;
                }
                me.$(fieldNameId).append($('<option/>', {
                    value: optionValue,
                    text : optionValue,
                    selected: 'selected'
                }));
            });
            me.$(fieldNameId).trigger('select').triggerHandler('change');
            me.$(fieldNameId).trigger('change');
        } else if (field.type === 'checkbox') {
            if (value) {
                me.$(fieldNameId).prop('checked', true);
            } else {
                me.$(fieldNameId).prop('checked', false);
            }
            me.$(fieldNameId).trigger('input').triggerHandler('change');
        } else if (field.type === 'textarea') {
            me.$(fieldNameId).val(value).trigger('select').triggerHandler('change');
        } else {
            // input
            me.$(fieldNameId).val(value).trigger('input');
        }
        console.log('yaioSetFormField map nodefield:' + fieldName
            + ' set:' + fieldNameId + '=' + value);

    };

    me._init();
    
    return me;
};
/**
 * service-functions for special layout-features
 * @param {YaioAppBase} appBase     the appbase to get other services
 * @returns {Yaio.Layout}           an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.Layout = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
        me.jMATService = jMATService;
    };


    /**
     * add preview to name+nodeDesc-Label if availiable
     */
    me.addPreviewToElements = function() {
        me.appBase.YmfMarkdownEditorServiceHelper.addPreviewToElements('label[for="nodeDesc"');
    };

    /**
     * add wysiwyg-editor to name+nodeDesc-Label if availiable
     */
    me.addWysiwygToElements = function() {
        me.appBase.YmfMarkdownEditorServiceHelper.addWysiwygToElements('label[for="nodeDesc"');
    };
    
    /** 
     * add speechRecognition to name+nodeDesc-Label if availiable
     * set the flg webkitSpeechRecognitionAdded on the element, so that there is no doubling
     */
    me.addSpeechRecognitionToElements = function() {
        me.appBase.SpeechServiceHelper.addSpeechRecognitionToElements('label[for="nodeDesc"], label[for="name"]');
    };
    
    /** 
     * add speechSynth to nodeDesc-Label if availiable
     * set the flg speechSynthAdded on the element, so that there is no doubling
     */
    me.addSpeechSynthToElements = function() {
        me.appBase.SpeechServiceHelper.addSpeechSynthToElements('label[for="nodeDesc"]');
    };
    
    /**
     * toggle printlayout depending on #checkboxPrintAll is checked or not
     */
    me.togglePrintLayout = function () {
        if (me.$('#checkboxPrintAll').prop('checked')) {
            // print all
            me.$('#link_css_dataonly').attr('disabled', 'disabled');
            me.$('#link_css_dataonly').prop('disabled', true);
        } else {
            // print data only
            me.$('#link_css_dataonly').removeAttr('disabled');
            me.$('#link_css_dataonly').prop('disabled', false);
        }
    };

    /**
     * add datepicker to all input-elements with styleclass inputtype_date and inputtype_datetime
     */
    me.addDatePickerToElements = function () {
        // add datepicker to all dateinput
        me.$.datepicker.setDefaults(me.$.datepicker.regional.de);
        me.$.timepicker.regional.de = {
            timeOnlyTitle: 'Uhrzeit auswählen',
            timeText: 'Zeit',
            hourText: 'Stunde',
            minuteText: 'Minute',
            secondText: 'Sekunde',
            currentText: 'Jetzt',
            closeText: 'Auswählen',
            ampm: false
        };
        me.$.timepicker.setDefaults(me.$.timepicker.regional.de);
        me.$('input.inputtype_date').datepicker();
        me.$('input.inputtype_datetime').datetimepicker();
    };

    /** 
     * add styleselectbox to all input-elements with styleclass inputtype_docLayoutAddStyleClass
     */
    me.addDocLayoutStyleSelectorToElements = function() {
        // iterate over docLayoutSDtyleClass-elements
        me.$('input.inputtype_docLayoutAddStyleClass').each(function () {
            // add select only if id id set
            var ele = this;
            var id = me.$(ele).attr('id');
            if (id) {
                // add select
                var $select = me.$('<select id="' + id + '_select" lang="tech" />');
                
                // append values
                $select.append(me.$('<option value="">Standardstyle</option>'));
                $select.append(me.$('<option value="row-label-value">row-label-value</option>'));
                $select.append(me.$('<option value="row-label-value">row-label-value</option>'));
                $select.append(me.$('<option value="row-boldlabel-value">row-boldlabel-value</option>'));
                $select.append(me.$('<option value="row-value-only-full">row-value-only-full</option>'));
                $select.append(me.$('<option value="row-label-only-full">row-label-only-full</option>'));
                
                // add changehandler
                $select.change(function() {
                    // set new value
                    var style = me.$(this).val();
                    me.$(ele).val(style);
                    
                    // call updatetrigger
                    window.callUpdateTriggerForElement(ele);
                });
                
                // insert select after input
                me.$(ele).after($select);
            }
            
        });
    };
    
    /** 
     * init the multilanguage support for all tags with attribute <XX lang='de'>
     * @param {string} langKey                key of the preferred-language
     */
    me.initLanguageSupport = function(langKey) {
        // Create language switcher instance and set default language to tech
        window.lang = new Lang('tech');
    
        //Define the de language pack as a dynamic pack to be loaded on demand
        //if the user asks to change to that language. We pass the two-letter language
        //code and the path to the language pack js file
        window.lang.dynamic('de', me.appBase.config.resBaseUrl + 'lang/lang-tech-to-de.json');
        window.lang.dynamic('en', me.appBase.config.resBaseUrl + 'lang/lang-tech-to-en.json');
        window.lang.loadPack('de');
        window.lang.loadPack('en');
    
        // change to de
        window.lang.change(langKey);
    };

    me.setupAppSize = function () {
        var height = window.innerHeight;

        // YAIO-editor
        var ele = me.$('#containerBoxYaioEditor');
        if (ele.length > 0) {
            // we are relative to the tree
            var paddingToHead = me.$('#containerYaioTree').position().top;
            var left = me.$('#containerYaioTree').position().left + me.$('#containerYaioTree').width + 2;

            // set posTop as scrollTop burt never < paddingToHead
            var posTop = me.$(window).scrollTop();
            if (posTop < paddingToHead) {
                posTop = paddingToHead;
            }

            // calc maxHeight = windHeight - 20 (puffer)
            var maxHeight = height - 20;
            // sub topPos - Scollpos
            maxHeight = maxHeight - (posTop - me.$(window).scrollTop());

            // set values
            me.$(ele).css('position', 'absolute');
            me.$(ele).css('max-height', maxHeight);
            me.$(ele).css('top', posTop);
            me.$(ele).css('left', left);

            console.log('setup size containerBoxYaioEditor width:' + window.innerWidth
                + ' height:' + window.innerHeight
                + ' scrollTop:' + me.$(window).scrollTop()
                + ' offset.top' + me.$(ele).offset().top
                + ' top:' + posTop
                + ' max-height:' + me.$(ele).css('max-height')
            );
        }

        // Export-editor
        ele = me.$('#containerFormYaioEditorOutputOptions');
        if (ele.length > 0) {
            me.$(ele).css('max-height', height - me.$(ele).offset().top);
            console.log('setup size containerFormYaioEditorOutputOptions width:' + window.innerWidth
                + ' height:' + window.innerHeight
                + ' scrollTop:' + me.$(window).scrollTop()
                + ' offset.top' + me.$(ele).offset().top
                + ' max-height:' + me.$(ele).css('max-height')
            );
        }
        // Import-editor
        ele = me.$('#containerFormYaioEditorImport');
        if (ele.length > 0) {
            me.$(ele).css('max-height', height - me.$(ele).offset().top);
            console.log('setup size containerFormYaioEditorImport width:' + window.innerWidth
                + ' height:' + window.innerHeight
                + ' scrollTop:' + me.$(window).scrollTop()
                + ' offset.top' + me.$(ele).offset().top
                + ' max-height:' + me.$(ele).css('max-height')
            );
        }

        // Frontpage
        ele = me.$('#front-content-intro');
        if (0 && ele.length > 0) {
            var maxHeight = height - me.$(ele).offset().top;

            // sub todonextbox
            if (me.$('#box_todonext').length > 0) {
                if (me.$('#box_todonext').height > 0) {
                    maxHeight = maxHeight - me.$('#box_todonext').height;
                } else {
                    // sometime height is not set: then default
                    maxHeight = maxHeight - 100;
                }
            }
            me.$(ele).css('max-height', maxHeight);
            console.log('setup size front-content-intro width:' + window.innerWidth
                + ' height:' + window.innerHeight
                + ' scrollTop:' + me.$(window).scrollTop()
                + ' offset.top' + me.$(ele).offset().top
                + ' max-height:' + me.$(ele).css('max-height')
            );
        }
    };

    me.yaioShowHelpSite = function (url) {
        // set messagetext
        console.log('yaioShowHelpSite:' + url);
        me.$('#help-iframe').attr('src', url);

        // show message
        me.$('#help-box').dialog({
            modal: true,
            width: '800px',
            buttons: {
                'Schliessen': function () {
                    me.$(this).dialog('close');
                },
                'Eigenes Fenster': function () {
                    var helpFenster = window.open(url, 'help', 'width=750,height=500,scrollbars=yes,resizable=yes');
                    helpFenster.focus();
                    me.$(this).dialog('close');
                }
            }
        });
    };

    me.hideFormRowTogglerIfSet = function(togglerId, className, state) {
        if (jMATService.getLayoutService().isInputRowsSet(className)) {
            // show all
            jMATService.getPageLayoutService().toggleFormrows(togglerId, className, true);
            
            // hide toggler
            me.$('#' + togglerId + '_On').css('display', 'none');
            me.$('#' + togglerId + '_Off').css('display', 'none');
        } else {
            // show or hide ??
            me.$('#' + togglerId + '_On').css('display', 'none');
            me.$('#' + togglerId + '_Off').css('display', 'block');
            jMATService.getPageLayoutService().toggleFormrows(togglerId, className, state);
        }
    };
     
    me.createTogglerIfNotExists = function(parentId, toggleId, className) {
        var $ele = me.$('#' + toggleId + '_On');
        if ($ele.length <= 0) {
            // create toggler
            console.log('createTogglerIfNotExists link not exists: create new toggler parent=' + parentId 
                    + ' toggleEleId=' + toggleId
                    + ' className=' + className);
            jMATService.getPageLayoutService().appendFormrowToggler(parentId, toggleId, className, '&nbsp;');
        } else {
            console.log('createTogglerIfNotExists link exists: skip new toggler parent=' + parentId 
                    + ' toggleEleId=' + toggleId
                    + ' className=' + className);
        }
    };
     

    me._init();
    
    return me;
};
 

/**
 * service-functions to extend the JsHelferlein.MarkdownRenderer
 * @param {YaioAppBase} appBase               the appbase to get other services
 * @returns {Yaio.MarkdownRenderer}           an service-instance
 * @augments JsHelferlein.MarkdownRenderer
 * @constructor
 */
Yaio.MarkdownRenderer = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.MarkdownRenderer(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
    };


    /**
     * parse yaio-links like yaio:, yaiodmsdownload:, yaiodmsidxdownload:, yaiodmsembed:, yaiodmsidxembed: from href
     * and replace if exists with dms-urls...
     * @param {String} href          the url to parse
     * @param {Boolean} dmsOnly      parse dms only: not yaio:
     * @return  {String}             mapped url
     */
    me._parseLinks = function(href, dmsOnly) {
        var sysUID;
        if (!dmsOnly && href && href.indexOf('yaio:') === 0) {
            sysUID = href.substr(5);
            href = '/yaio-explorerapp/yaio-explorerapp.html#/showByAllIds/' + sysUID;
        } else if (href && href.indexOf('yaiodmsdownload:') === 0) {
            sysUID = href.substr('yaiodmsdownload:'.length);
            href = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsDownload', sysUID, false) + sysUID;
        } else if (href && href.indexOf('yaiodmsidxdownload:') === 0) {
            sysUID = href.substr('yaiodmsidxdownload:'.length);
            href = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsIndexDownload', sysUID, false) + sysUID;
        } else if (href && href.indexOf('yaiodmsembed:') === 0) {
            sysUID = href.substr('yaiodmsembed:'.length);
            href = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsEmbed', sysUID, false) + sysUID;
        } else if (href && href.indexOf('yaiodmsidxembed:') === 0) {
            sysUID = href.substr('yaiodmsidxembed:'.length);
            href = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsIndexEmbed', sysUID, false) + sysUID;
        }
        return href;
    };

    me._init();
    
    return me;
};

/**
 * service-functions available in html-export (documentation...)
 * @param {YaioAppBase} appBase           the appbase to get other services
 * @returns {Yaio.ExportedData}           an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.ExportedData = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
    };
    /*
     * ###########################
     * # PrintLayout
     * ###########################
     */
    me.togglePrintLayout = function() {
        if (me.$('#checkboxPrintAll').prop('checked')) {
            // print all
            me.$('#link_css_dataonly').attr('disabled', 'disabled');
            me.$('#link_css_dataonly').prop('disabled', true);
        } else  {
            // print data only
            me.$('#link_css_dataonly').removeAttr('disabled');
            me.$('#link_css_dataonly').prop('disabled', false);
        }
    };
    
    /*
     * ###########################
     * # SpeechSynth
     * ###########################
     */
    me.openSpeechSynth = function() {
        me.appBase.SpeechSynthController.open('div_full');
    };
    
    /*
     * ###########################
     * # Kalkulation
     * ###########################
     */
    me.CONST_FUNCNAME_SUM = 'SUM';
    
    me.calcColumns = function(nodeTDId, functionName, praefix, suffix) {
       // Variablen belegen
       var errMsg = null;
       var elemNodeTD = null;
       var idxCol = null;
       var elemNodeTABLE = null;
        
       // Parameter checken und Eelemente einlesen
       
       // TD-Element einlesen
       if (! errMsg && ! functionName) { 
           errMsg = 'Parameter functionName required';
       } else {
           if (functionName !== me.CONST_FUNCNAME_SUM) {
              errMsg = 'Parameter functionName must be [' + me.CONST_FUNCNAME_SUM + ']';
           }
       }
       if (! errMsg && ! nodeTDId) { 
           errMsg = 'Parameter nodeTDId required';
       } else {
           elemNodeTD = me.$('#' + nodeTDId);
       }
       
       // TABLE-Element einlesen
       if (! errMsg && ! elemNodeTD) { 
           errMsg = 'HTMLElement nodeTDId not found';
       } else {
           idxCol = elemNodeTD.attr('cellIndex');
           elemNodeTABLE = me.$(elemNodeTD).closest('table');
       }
    
       // IDX einlesen
       if (! errMsg && ! elemNodeTABLE) { 
           errMsg = 'HTMLElement elemNodeTABLE not found';
       } else {
           idxCol = elemNodeTD[0].cellIndex;
       }
       if (! errMsg && ! idxCol) { 
           errMsg = 'idxCol not found';
       }
       
       // abschließender Fehlercheck
       if (errMsg) {
          window.alert('Fehler aufgetreten: ' + errMsg);
          return null;
       }
       
       // Funktionalitaet: alle x-Spalten iterieren und Zahlen extrahieren
       var filterTD = 'td:nth-child(' + (idxCol + 1) + ')';
       var numbers = [];
       me.$(elemNodeTABLE).children('tbody').children('tr').children(filterTD).each(function (i) {
           var col = me.$(this);
    
           // mich selbst herauslassen 
           if (col.attr('id') === nodeTDId) {
              // Jquery continue;
              //alert('SKIP NODEID: Zeile:' + (i+1) + ' ID:' + col.id + ' Content:' + col.html() + ' Number' + number);
              return;
           }
    
           // normalisieren
           var strNumber = col.html();
           strNumber = strNumber.replace(/./g, '');
           strNumber = strNumber.replace(/,/, '.');
           
           // auf Zahl testen
           var number = parseFloat(strNumber, '10');
           if (isNaN(number)) {
              // Jquery continue;
              //alert('SKIP NAN: Zeile:' + (i+1) + ' ID:' + col.id + ' Content:' + col.html() + ' Number' + number);
              return;
           }
           
           // an Zahlen anhaengen
           //alert('ADD NUMBER: Zeile:' + (i+1) + ' ID:' + col.id + ' Content:' + col.html() + ' Number' + number);
           numbers.push(number);
       });       
       
       // Funktionalitaet: gewünsche Aktion auf alle Zahlen ausführen
       var funcResult = 0;
       for (var index = 0; index < numbers.length; ++index) {
           // alert('funcResult +' +  numbers[index]);
           if (functionName === me.CONST_FUNCNAME_SUM) {
              funcResult += numbers[index]; 
           }
       }
       
       // Inhalt des Elements setzen
       //alert('funcResult:' + funcResult);
       var text = (praefix ? praefix : '') + funcResult + (suffix ? suffix : '');
       elemNodeTD.html(text);
    };
    
    /*
     * ######################
     * # Volltextsuche
     * #######################
     */
    me.doAllNodeToggler = function(flgShow, minEbene) {
        try {
            // Bloecke Oeffnen/Schließen
            var toggleList = document.getElementsByClassName('blockToggler');
            if (toggleList.length > 0) {
                // Elemente vorhanden
                for (var j = 0; j < toggleList.length; j++) {
                    // Elemente iterieren
                    var element = toggleList[j];
                    var toggleId = element.getAttribute('toggleId');
                    var togglerBaseId = element.getAttribute('togglerBaseId');
    
                    // Pruefen ob Node-Toggler
                    if (toggleId && toggleId.search('childrencontainer') > 0) {
                        // Ebene einlesen
                        var toggleBlock = document.getElementById(toggleId);
                        var curEbene = 0;
                        if (toggleBlock) {
                            curEbene = toggleBlock.getAttribute('data-pjebene');
                        }

                        /* jshint loopfunc: true */
                        var effect = function(){
                            // Leertoggler
                            var togEf = new ToggleEffect(toggleId); 
                            togEf.slideAniLen = 1; 
                            togEf.doEffect();
                        };
                        /* jshint loopfunc: false */
                        if (flgShow) {
                            // Block zeigen
                            if (minEbene && curEbene && curEbene < minEbene) {
                                jMATService.getLayoutService().togglerBlockShow(
                                    togglerBaseId, toggleId, effect);
                            } else {
                                jMATService.getLayoutService().togglerBlockHide(
                                    togglerBaseId, toggleId, effect);
                            }
                        }
                        else {
                            // Block verbergen
                            if (minEbene && curEbene && curEbene > minEbene) {
                                jMATService.getLayoutService().togglerBlockHide(
                                    togglerBaseId, toggleId, effect);
                            } else {
                                jMATService.getLayoutService().togglerBlockShow(
                                    togglerBaseId, toggleId, effect);
                            }
                        }
                    }
                }
            }
        } catch (e) {
            // anscheinend  nicht definiert
            window.alert(e);
        }
    };
    
    me.doParentNodeToggler = function(myId, flgShow) {
        try {
            // Parent-Container einlesen (Child)
            var parents = me.$('#' + myId).parents();
            if (parents) {
                parents.map( 
                    function () {
                        // Toggler visible setzen, wenn gefunden
                        var parentId = me.$(this).attr('id');
                        if (parentId) {
                            var nodeIdMatcher = parentId.match(/node_(.*)_childrencontainer/);
                            if (nodeIdMatcher && nodeIdMatcher.length > 0) {
                                // Toggler aktivieren
                                var togglerId = parentId;
                                if (! me.$(this).is(':visible')) {
                                    jMATService.getLayoutService().togglerBlockShow(
                                        togglerId, togglerId, function () { 
                                            var togEf = new ToggleEffect(togglerId); 
                                            togEf.slideAniLen = 1; 
                                            togEf.doEffect();
                                        }
                                     );
                                }
    
                                // Element anzeigen
                                var nodeId = nodeIdMatcher[1];
                                var master = me.$('#node_' + nodeId + '_master');
                                if (master && ! me.$(master).is(':visible') ) {
                                    me.$(master).show();                                
                                }
                            }
                        }
                    }
                );
            }
        } catch (e) {
            // anscheinend  nicht definiert
            window.alert(e);
        }
    };
    
    
    /* Um einen Volltext-Treffer zu haben, müssen alle Worte im durchsuchten Text vorkommen. */
    me.VolltextTreffer = function(inhalt, suchworte, flgUseWildCards, flgUseOr) {
        if (suchworte.length === 0 || (suchworte.length === 1 && me.appBase.DataUtils.isEmptyStringValue(suchworte[0]))) {
            return true;
        }
        if (me.appBase.DataUtils.isEmptyStringValue(inhalt)) {
            return false;
        }

        // alle Suchworte iterieren
        var suchwortFound = true;
        for (var i = 0; i < suchworte.length; i++) {
            // extract patterns
            var patterns = [suchworte[i]];
            if (flgUseWildCards) {
                patterns = suchworte[i].split('*');
            }
            // iterate patterns
            suchwortFound = true;
            for (var pi = 0; pi < patterns.length; pi++) {
                var pattern = patterns[pi];
                if (me.appBase.DataUtils.isEmptyStringValue(pattern)) {
                    continue;
                }
                // check pattern
                if (inhalt.indexOf(pattern) === -1) {
                    // pattern not found
                    if (! flgUseOr) {
                        // we use AND and 1 pattern not found: the looser takes it all
                        return false;
                    }
                    suchwortFound = false;
                    continue;
                }
            }

            if (flgUseOr && suchwortFound) {
                // we use OR and 1 full word found: the winner takes it all
                return true;
            }
        }
     
        // alle Worte gefunden
        return suchwortFound;
    };
    
    me.doSearch = function(suchworte) {
        // Suche auf alle Node-Elemente ausführen
        me.$('.node-block').each(
            function(index, value) {
                var flgFound = false;
                
                // Datenelemente konfigurieren
                var searchElements = [];
                searchElements.push(me.$('#' + me.$(value).attr('id') + ' > div:eq(1)').attr('id')); // Desc
                searchElements.push(me.$('#' + me.$(value).attr('id') + ' > div:first > div:first > div:first > div:eq(1)').attr('id')); // Name
                searchElements.push(me.$('#' + me.$(value).attr('id') + ' > div:first > div:eq(1)').attr('id')); // Status
    
                // alle Datenelemente iterieren
                me.$.each(searchElements,
                    function(subIndex, subId) {
                        // Inhalt auslesen
                        var inhalt = me.$('#'+subId).text().toLowerCase();
                        
                        // Volltextsuche
                        if (me.VolltextTreffer(inhalt, suchworte)) {
                            // wenn geufndne: verlassen;
                            flgFound = true;
                            return;
                        }
                    }
                 );
                
                // Elemente je nach Status der SubElemente ein/ausblenden
                if (flgFound) {
                    if ( !me.$(value).is(':visible') ) {
                        // Element aktivieren
                        me.$(value).show();
                    }  
    
                    // Eltern oeffnen
                    me.doParentNodeToggler(me.$(value).attr('id'), true);
                } else {
                    // Element deaktivieren
                    me.$(value).hide();
                }
            }
        );
    };
    
    me.startSearch = function() {
        // Suchworte auslesen
        var suchworte = me.$('.volltextsuchfeld').val().toLowerCase().split(' ');
    
        // alle Toggler schließen
        me.doAllNodeToggler(false, 0);
        
        // Suche ausfuehren
        me.doSearch(suchworte);
    };
    
    me.resetSearch = function() {
        // Suchworte leeren
        me.$('.volltextsuchfeld').val('');
        
        // suche ausfuehren
        me.startSearch();
    };
    
    me.initSearch = function() {
        // Volltextsuche
        me.$('.volltextsuchfeld').keyup(
            function(event) {
                // nur ausfuehren wenn enter
                if(event.keyCode !== 13) {
                   return;
                }
                
                // Suche ausfuehren
                me.startSearch();
            }
        );
    };
    
    /*
     * ######################
     * # Symlink
     * #######################
     */
    me.openNode = function(nodeId) {
        var masterId = 'node_' + nodeId + '_master';
        
        // Node aktivieren
        me.$('#' + masterId).show();
        
        // openParent-Nodes
        me.doParentNodeToggler(masterId, true);
        
        // animated ScrollTo after intervall, because of time used for ToggleEffects
        var delayedFocus = window.setInterval(
            function() {
                // nach 0,1 Sekunden ausfuehren und Intervall loeschen
                me.$('html, body').animate({
                    scrollTop: me.$('#' + masterId).offset().top
                    }, 
                    1000);
                window.clearInterval(delayedFocus);
            }, 
            100
        );
    };

    me._init();
    
    return me;
};
 

/**
 * service-functions to render data-blocks for nodes in explorer
 * @param {YaioAppBase} appBase      the appbase to get other services
 * @returns {Yaio.NodeDataRenderer}  an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.NodeDataRenderer = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
    };

    /**
     * Callback for fancyftree. Renders the full block for corresponding basenode.
     * Manipulates the default-fancytree-tablerow (replace+add+hide elements).
     * <ul>
     *   <li>data.node.tr: Html-Obj of the table-line
     *   <li>data.node.data.basenode: the basenode (java de.yaio.core.node.BaseNode)
     * </ul>
     * @param {FancyTreeEvent} event           fancytree-event
     * @param {FancyTreeData} data             the fancytreenode-data (basenode = data.node.data.basenode, tr = data.node.tr)
     * @param {Boolean} preventActionsColum    dont replace Action-column
     * @param {Boolean} flgRenderMinimum       render only the minimal subset of data
     */
    me.renderColumnsForNode = function(event, data, preventActionsColum, flgRenderMinimum) {
        var svcDataUtils = me.appBase.get('DataUtils');
        var svcYaioExplorerCommands = me.appBase.get('YaioExplorerCommands');
        var svcYaioNodeGanttRenderer = me.appBase.get('YaioNodeGanttRenderer');

        // extract nodedata
        var node = data.node;
        var basenode = node.data.basenode;
        var nodestate = basenode.state;
        var statestyle = 'yaio-node-state-' + nodestate;
    
        var colName = 0, colData = 1, colGantt = 2, colActions = 3;
        
        // get tdlist
        var $tdList = me.$(node.tr).find('>td');
    
        // add stateclasss to tr
        me.$(node.tr).addClass('container_nodeline');
        
        // replace checkbox by center-command
        var $expanderEle = $tdList.eq(colName).find('span.fancytree-expander');
        $expanderEle.attr('data-tooltip', 'tooltip.command.NodeShow');
        $expanderEle.attr('lang', 'tech');
        $expanderEle.attr('id', 'expander' + basenode.sysUID);
    
        // replace checkbox by center-command
        var $checkEle = $tdList.eq(colName).find('span.fancytree-checkbox');
        $checkEle.html('<a href="#/show/' + basenode.sysUID + '"' +
            ' class="yaio-icon-center"' +
            ' lang="tech" data-tooltip="tooltip.command.NodeFocus"></a>');
        $checkEle.removeClass('fancytree-checkbox').addClass('command-center');
    
        // manipulate name-column
        $tdList.eq(colName).addClass('container_field')
                     .addClass('fieldtype_name')
                     .addClass('field_name');
        
        // define name
        var name = basenode.name;
        if (me.appBase.DataUtils.isUndefinedStringValue(name)) {
           if (basenode.className === 'UrlResNode') {
               name = basenode.resLocName;
           } else if (basenode.className === 'SymLinkNode') {
               name = basenode.symLinkName;
           }
        }
    
        // insert state before name-span
        var $nameEle = $tdList.eq(colName).find('span.fancytree-title');
        var $div = me.$('<div style="display: inline-block" />')
            .append(me.$('<span class="' + statestyle + ' fancytree-title-state" lang="de" id="titleState' + basenode.sysUID + '"/>')
                .html(basenode.state + ' '))
            .append('&nbsp;')
            .append(me.$('<span class="fancytree-title2" id="title' + basenode.sysUID + '">' +
                svcDataUtils.htmlEscapeText(name) + '</span>'));
        $nameEle.html($div);

        // add nodeData
        var $nodeDataBlock = me._renderDataBlock(basenode, preventActionsColum, flgRenderMinimum);
        $tdList.eq(colData).html($nodeDataBlock).addClass('block_nodedata');

        // add action-links
        if (!preventActionsColum && !flgRenderMinimum) {
            // generate actions
            var actionHtml = me._renderNodeActionLinks(basenode);

            // add actions
            $tdList.eq(colActions).html(actionHtml)
                .addClass('container_field')
                .addClass('fieldtype_actions');
        }

        // add gantt
        if (!flgRenderMinimum) {
            var $nodeGanttBlock = svcYaioNodeGanttRenderer.renderGanttBlock(basenode, node);
            $tdList.eq(colGantt).html($nodeGanttBlock).addClass('block_nodegantt');
        
            // set visibility of data/gantt-block
            if (me.$('#tabTogglerGantt').css('display') !== 'none') {
                $tdList.eq(colData).css('display', 'table-cell');
                $tdList.eq(colGantt).css('display', 'none');
            } else {
                $tdList.eq(colGantt).css('display', 'table-cell');
                $tdList.eq(colData).css('display', 'none');
            }
        }

        // add TOC
        if (!flgRenderMinimum) {
            var settings = {
                toc: {}
            };
            settings.toc.dest = me.$('#toc_desc_' + basenode.sysUID);
            settings.toc.minDeep = 2;
            me.$.fn.toc(me.$('#container_content_desc_' + basenode.sysUID), settings);
        }

        // toogle sys
        svcYaioExplorerCommands.toggleNodeSysContainerForNodeId(basenode.sysUID);
        
        // toogle desc
        svcYaioExplorerCommands.toggleNodeDescContainerForNodeId(basenode.sysUID);
    
        // calc nodeData
        if (!flgRenderMinimum) {
            svcYaioNodeGanttRenderer.recalcMasterGanttBlockForTree();
        }
    };

    /**
     * Shows the DataBlock
     * Toggles DataBlock, GanttBlock and the links #tabTogglerData, #tabTogglerGantt.
     * Show all: td.block_nodedata, th.block_nodedata + #tabTogglerGantt
     * Hide all: td.block_nodegantt, th.block_nodegantt + #tabTogglerData
     */
    me.showDataView = function() {
        var svcUIToggler = me.appBase.get('UIToggler');

        svcUIToggler.toggleTableBlock('#tabTogglerData');
        svcUIToggler.toggleTableBlock('td.block_nodegantt, th.block_nodegantt');
        setTimeout(function(){
            svcUIToggler.toggleTableBlock('#tabTogglerGantt');
            svcUIToggler.toggleTableBlock('td.block_nodedata, th.block_nodedata');
        }, 400);
        // set it to none: force
        setTimeout(function(){
            me.$('#tabTogglerData').css('display', 'none');
            me.$('td.block_nodegantt, th.block_nodegantt').css('display', 'none');
        }, 400);
    };

    /**
     * render the whole data-block for the node
     * @param {Object} basenode    yaio-node to render
     * @param {Boolean} preventActionsColum    dont replace Action-column
     * @param {Boolean} flgRenderMinimum       render only the minimal subset of data
     * @returns {JQuery}           html
     */
    me._renderDataBlock = function(basenode, preventActionsColum, flgRenderMinimum) {
        var yaioAppBaseVarName = me.appBase.config.appBaseVarName,
            clickHandler;

        // render datablock
        var $nodeDataBlock = me._renderBaseDataBlock(basenode, preventActionsColum);

        // add SysData
        var $sysDataBlock = me._renderSysDataBlock(basenode);
        $nodeDataBlock.append($sysDataBlock);

        // add nodeDesc if set
        if (!me.appBase.DataUtils.isEmptyStringValue(basenode.nodeDesc) && !flgRenderMinimum) {
            // add  column
            clickHandler = yaioAppBaseVarName + '.YaioExplorerCommands.toggleNodeDescContainerForNodeId(\'' + basenode.sysUID + '\'); return false;';
            me.$($nodeDataBlock).find('div.container_data_row').append(
                me.$('<div />').html('<a href="#"' +
                        ' onclick="' + clickHandler + '"' +
                        ' id="toggler_desc_' + basenode.sysUID + '"' +
                        ' data-tooltip="tooltip.command.ToggleDesc" lang="tech"></a>')
                    .addClass('container_field')
                    .addClass('fieldtype_descToggler')
                    .addClass('toggler_show')
            );

            var $descDataBlock = me._renderDescBlock(basenode);
            $nodeDataBlock.append($descDataBlock);

            // disable draggable for td.block_nodedata
            me.$( '#tree' ).draggable({ cancel: 'td.block_nodedata' });

            // enable selction
            me.$('td.block_nodedata').enableSelection();
        }

        return $nodeDataBlock;
    };

    /**
     * render the sysdata-block for the node
     * @param {Object} basenode    yaio-node to render
     * @returns {JQuery}           html
     */
    me._renderSysDataBlock = function(basenode) {
        var svcDataUtils = me.appBase.get('DataUtils');
        var $block = me.$('<div class="togglecontainer field_nodeSys" id="detail_sys_' + basenode.sysUID + '" />');
        $block.append(
            me.$('<div lang="tech" />').html('Stand: ' + svcDataUtils.formatGermanDateTime(basenode.sysChangeDate))
                .addClass('container_field')
                .addClass('fieldtype_basedata')
                .addClass('fieldtype_sysChangeDate')
                .addClass('field_sysChangeDate')
        );
        $block.append(
            me.$('<div lang="tech" />').html(' (V ' + svcDataUtils.formatNumbers(basenode.sysChangeCount, 0, '') + ')')
                .addClass('container_field')
                .addClass('fieldtype_basedata')
                .addClass('fieldtype_sysChangeCount')
                .addClass('field_sysChangeCount')
        );
        $block.append(
            me.$('<div lang="tech" />').html('angelegt: ' + svcDataUtils.formatGermanDateTime(basenode.sysCreateDate))
                .addClass('container_field')
                .addClass('fieldtype_basedata')
                .addClass('fieldtype_sysCreateDate')
                .addClass('field_sysCreateDate')
        );
        $block.append(
            me.$('<div lang="tech" />').html('Kinder: ' + svcDataUtils.formatNumbers(basenode.statChildNodeCount, 0, '') +
                    ' Workflows: ' + svcDataUtils.formatNumbers(basenode.statWorkflowCount, 0, '') +
                    ' ToDos: ' + svcDataUtils.formatNumbers(basenode.statWorkflowTodoCount, 0, '') +
                    ' Urls: ' + svcDataUtils.formatNumbers(basenode.statUrlResCount, 0, '') +
                    ' Infos: ' + svcDataUtils.formatNumbers(basenode.statInfoCount, 0, ''))
                .addClass('container_field')
                .addClass('fieldtype_basedata')
                .addClass('fieldtype_statistik')
                .addClass('field_statistik')
        );

        return $block;
    };


    /**
     * render the desc-block for the node
     * @param {Object} basenode    yaio-node to render
     * @returns {JQuery}           html
     */
    me._renderDescBlock = function (basenode) {
        var yaioAppBaseVarName = me.appBase.config.appBaseVarName,
            clickHandler;

        // create desc row
        var $divDesc = me.$('<div class="togglecontainer" id="detail_desc_' + basenode.sysUID + '" />');
        $divDesc.addClass('field_nodeDesc');

        // add commands
        var commands = '<div class="container-commands-desc" id="commands_desc_' + basenode.sysUID + '"' +
            ' data-tooltip="tooltip.command.TogglePreWrap" lang="tech" >';

        clickHandler = yaioAppBaseVarName + '.UIToggler.togglePreWrap(\'#content_desc_' + basenode.sysUID + '\');' +
            yaioAppBaseVarName + '.get(\'UIToggler\').togglePreWrap(\'#container_content_desc_' + basenode.sysUID + '\'); return true;';
        commands += '<input type="checkbox" id="cmd_toggle_content_desc_' + basenode.sysUID +
            '" onclick="' + clickHandler + '">' +
            '<span lang="tech">im Originallayout anzeigen</span>';

        clickHandler = yaioAppBaseVarName + '.YaioExplorerCommands.openJiraExportWindowByNodeId(\'' + basenode.sysUID + '\'); return false;';
        commands += '<a class="button command-desc-jiraexport" onClick="' + clickHandler + '" lang="tech"' +
            ' data-tooltip="tooltip.command.OpenJiraExportWindow">common.command.OpenJiraExportWindow</a>';

        clickHandler = yaioAppBaseVarName + '.YaioExplorerCommands.openTxtExportWindowForContent(' + yaioAppBaseVarName + '.$(\'#container_content_desc_' + basenode.sysUID + '\').text()); return false;';
        commands += '<a class="button command-desc-txtexport" onClick="' + clickHandler + '" lang="tech"' +
            ' data-tooltip="tooltip.command.OpenTxtExportWindow">common.command.OpenTxtExportWindow</a>';
        if ('speechSynthesis' in window) {
            // Synthesis support. Make your web apps talk!
            clickHandler = yaioAppBaseVarName + '.SpeechSynthController.open(\'container_content_desc_' + basenode.sysUID + '\'); return false;';
            commands += '<a class="button" onClick="' + clickHandler + '" lang="tech"' +
                ' data-tooltip="tooltip.command.OpenSpeechSynth">common.command.OpenSpeechSynth</a>';

        }
        commands += '</div>';
        $divDesc.append(commands);
        $divDesc.append('<div class="container-toc-desc" id="toc_desc_' + basenode.sysUID + '"><h1>Inhalt</h1></div>');

        // append content
        var descText = basenode.nodeDesc;
        descText = descText.replace(/<WLBR>/g, '\n');
        descText = descText.replace(/<WLESC>/g, '\\');
        descText = descText.replace(/<WLTAB>/g, '\t');

        // prepare descText
        var descHtml = me.appBase.get('YaioFormatter').renderMarkdown(descText, false, basenode.sysUID);
        $divDesc.append('<div id="container_content_desc_' + basenode.sysUID + '"' +
            ' class="container-content-desc syntaxhighlighting-open">' + descHtml + '</div>');

        return $divDesc;
    };

    /**
     * render the available actions-links for the node
     * @param {Object} basenode    yaio-node to render
     * @returns {String}           html
     */
    me._renderNodeActionLinks = function(basenode) {
        var actionHtml = '',
            svcYaioAccessManager = me.appBase.get('YaioAccessManager'),
            yaioAppBaseVarName = me.appBase.config.appBaseVarName,
            clickHandler;

        if (svcYaioAccessManager.getAvailiableNodeAction('showsysdata', basenode.sysUID, false)) {
            clickHandler = yaioAppBaseVarName + '.YaioExplorerCommands.toggleNodeSysContainerForNodeId(\'' + basenode.sysUID + '\'); return false;';
            actionHtml += '<div class="fieldtype_sysToggler">' +
                '<a onclick="javascript: ' + clickHandler + '"' +
                ' id="toggler_sys_' + basenode.sysUID + '"' +
                ' class="" ' +
                ' data-tooltip="tooltip.command.ToggleSys" lang="tech"></a>' +
                '</div>';
        }
        if (svcYaioAccessManager.getAvailiableNodeAction('edit', basenode.sysUID, false)) {
            clickHandler = yaioAppBaseVarName + '.YaioNodeEditor.openNodeEditorForNodeId(\'' + basenode.sysUID + '\', \'edit\'); return false;';
            actionHtml += '<a onclick="javascript: ' + clickHandler + '"' +
                ' id="cmdEdit' + basenode.sysUID + '"' +
                ' class="yaio-icon-edit"' +
                ' lang="tech" data-tooltip="tooltip.command.NodeEdit"></a>';
        }
        if (svcYaioAccessManager.getAvailiableNodeAction('create', basenode.sysUID, false)) {
            clickHandler = yaioAppBaseVarName + '.YaioNodeEditor.openNodeEditorForNodeId(\'' + basenode.sysUID + '\', \'create\'); return false;';
            actionHtml += '<a onclick="javascript: ' + clickHandler + '"' +
                ' id="cmdCreate' + basenode.sysUID + '"' +
                ' class="yaio-icon-create"' +
                ' lang="tech" data-tooltip="tooltip.command.NodeCreateChild"></a>';
        }
        if (svcYaioAccessManager.getAvailiableNodeAction('createsymlink', basenode.sysUID, false)) {
            clickHandler = yaioAppBaseVarName + '.YaioNodeEditor.openNodeEditorForNodeId(\'' + basenode.sysUID + '\', \'createsymlink\'); return false;';
            actionHtml += '<a onclick="javascript: ' + clickHandler + '"' +
                ' id="cmdCreateSymLink' + basenode.sysUID + '"' +
                ' class="yaio-icon-createsymlink"' +
                ' lang="tech" data-tooltip="tooltip.command.NodeCreateSymLink"></a>';
        }
        if (svcYaioAccessManager.getAvailiableNodeAction('remove', basenode.sysUID, false)) {
            clickHandler = yaioAppBaseVarName + '.YaioExplorerCommands.doRemoveNodeByNodeId(\'' + basenode.sysUID + '\'); return false;';
            actionHtml += '<a onclick="javascript: ' + clickHandler + '"' +
                ' id="cmdRemove' + basenode.sysUID + '"' +
                ' class="yaio-icon-remove"' +
                ' lang="tech" data-tooltip="tooltip.command.NodeDelete"></a>';
        }

        return actionHtml;
    };

    /**
     * Renders the BaseDataBlock for basenode and returns a JQuery-Html-Obj.
     * @param {Object} basenode               the nodedata to render (java de.yaio.core.node.BaseNode)
     * @param {Boolean} preventActionsColum   dont replace Action-column
     * @returns {JQuery}                      JQuery-Html-Object - the rendered datablock
     */
    me._renderBaseDataBlock = function(basenode, preventActionsColum) {
        var svcDataUtils = me.appBase.get('DataUtils');

        // extract nodedata
        var nodestate = basenode.state;
        var statestyle = 'yaio-node-state-' + nodestate;
    
        var msg = 'datablock for node:' + basenode.sysUID;
        console.log('renderBaseDataBlock START: ' + msg);
    
        // current datablock
        var $table = me.$('<div class="container_data_table"/>');
        var $row = me.$('<div class="container_data_row"/>');
        $table.append($row);

        // default fields
        $row.append(me.$('<div />').html(svcDataUtils.htmlEscapeText(basenode.metaNodePraefix + basenode.metaNodeNummer))
            .addClass('container_field')
            .addClass('fieldtype_basedata')
            .addClass('fieldtype_metanummer')
            .addClass('field_metanummer')
        );

        var typeData = basenode.className;
        if (!svcDataUtils.isEmptyStringValue(basenode.metaNodeSubType)) {
            typeData = basenode.metaNodeSubType;
        }
        $row.append(me.$('<div lang="tech" />').html(typeData)
            .addClass('container_field')
            .addClass('fieldtype_basedata')
            .addClass('fieldtype_type')
            .addClass('field_type')
            .addClass(statestyle));
        if (basenode.className === 'TaskNode' || basenode.className === 'EventNode') {
            // TaskNode
            me._appendWorkflowBlocks(basenode, $row, statestyle);
        } else if (basenode.className === 'InfoNode' || basenode.className === 'UrlResNode') {
            // render Info + UrlRes

            // Url only
            if (basenode.className === 'UrlResNode') {
                // url
                me._appendDownloadBlocks(basenode, $row, preventActionsColum);

                // url-data
                var resLocData = svcDataUtils.htmlEscapeText(basenode.resLocRef);
                if (basenode.type === 'URLRES') {
                    resLocData = '<a href="' + resLocData + '" target="_blank">' + resLocData + '</a>';
                } else {
                    resLocData = '<span>' + resLocData + '</span>';
                }
                $row.append(
                    me.$('<div />').html(resLocData)
                        .addClass('container_field')
                        .addClass('fieldtype_additionaldata')
                        .addClass('fieldtype_url')
                        .addClass('field_resLocRef')
                );
            }
        
            // both
            if (   basenode.docLayoutTagCommand || basenode.docLayoutShortName
                || basenode.docLayoutAddStyleClass || basenode.docLayoutFlgCloseDiv) {
                me._appendDocLayoutBlocks(basenode, $row);
            }
        } else if (basenode.className === 'SymLinkNode') {
            // render SymLinkNode
            me.appBase.get('YaioNodeRepository').getNodeForSymLink(basenode)
                .done(function(yaioNodeActionResponse, textStatus, jqXhr ) {
                    console.log('call successHandler ' + msg + ' state:' + textStatus);
                    me._getNodeForSymLinkSuccessHandler(basenode, yaioNodeActionResponse, textStatus, jqXhr);
                });
        } 
    
        console.log('renderDataBlock DONE: ' + msg);
    
        return $table;
    };

    /**
     * append WorkflowBlocks to the row for the node
     * @param {Object} basenode               the nodedata to render (java de.yaio.core.node.BaseNode)
     * @param {JQuery} $row                   JQuery-Html-Object to append the blockData
     * @param {String} statestyle             style for the workflow-state to add to blocks
     */
    me._appendWorkflowBlocks = function(basenode, $row, statestyle) {
        var svcDataUtils = me.appBase.get('DataUtils');
        $row.append(
            me.$('<div />').html('&nbsp;' + svcDataUtils.formatNumbers(basenode.istChildrenSumStand, 0, '%'))
                .addClass('container_field')
                .addClass('fieldtype_additionaldata')
                .addClass('fieldtype_stand')
                .addClass('field_istChildrenSumStand')
                .addClass(statestyle)
        );
        $row.append(
            me.$('<div />').html('&nbsp;' + svcDataUtils.formatNumbers(basenode.istChildrenSumAufwand, 1, 'h'))
                .addClass('container_field')
                .addClass('fieldtype_additionaldata')
                .addClass('fieldtype_aufwand')
                .addClass('field_istChildrenSumAufwand')
                .addClass(statestyle)
        );
        $row.append(
            me.$('<div />').html('&nbsp;' + svcDataUtils.formatGermanDate(basenode.istChildrenSumStart)
                    + '-' + svcDataUtils.formatGermanDate(basenode.istChildrenSumEnde))
                .addClass('container_field')
                .addClass('fieldtype_additionaldata')
                .addClass('fieldtype_fromto')
                .addClass('field_istChildrenSum')
                .addClass(statestyle)
        );
        $row.append(
            me.$('<div />').html('&nbsp;' + svcDataUtils.formatNumbers(basenode.planChildrenSumAufwand, 1, 'h'))
                .addClass('container_field')
                .addClass('fieldtype_additionaldata')
                .addClass('fieldtype_aufwand')
                .addClass('field_planChildrenSumAufwand')
                .addClass(statestyle)
        );
        $row.append(
            me.$('<div />').html('&nbsp;' + svcDataUtils.formatGermanDate(basenode.planChildrenSumStart)
                    + '-' + svcDataUtils.formatGermanDate(basenode.planChildrenSumEnde))
                .addClass('container_field')
                .addClass('fieldtype_additionaldata')
                .addClass('fieldtype_fromto')
                .addClass('field_planChildrenSum')
                .addClass(statestyle)
        );
    };

    /**
     * append DownloadBlocks to the row for the node
     * @param {Object} basenode               the nodedata to render (java de.yaio.core.node.BaseNode)
     * @param {JQuery} $row                   JQuery-Html-Object to append the blockData
     * @param {Boolean} preventActionsColum   dont replace Action-column
     */
    me._appendDownloadBlocks = function(basenode, $row, preventActionsColum) {
        var stateBlock;
        var svcDataUtils = me.appBase.get('DataUtils');
        var yaioAppBaseVarName = me.appBase.config.appBaseVarName;

        // upload content
        var resContentDMSState = basenode.resContentDMSState;
        var stateMapping = {'UPLOAD_DONE': 'Download', 'UPLOAD_OPEN': 'Webshoting', 'UPLOAD_FAILED': 'Webshot failed'};
        if (stateMapping[resContentDMSState]
            && me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsDownload', basenode.sysUID, false)) {
            // url
            stateBlock = svcDataUtils.htmlEscapeText(stateMapping[resContentDMSState]);
            if (resContentDMSState === 'UPLOAD_DONE' && !preventActionsColum) {
                stateBlock = '<a href=""' +
                    ' onClick="' + yaioAppBaseVarName + '.get(\'YaioExplorerCommands\').openDMSDownloadWindowForNodeId(\''+ basenode.sysUID + '\'); return false;"' +
                    ' lang="tech" data-tooltip="tooltip.command.OpenDMSDownloadWindow_' + resContentDMSState + '">' + stateBlock + '</a>';
            } else if (stateMapping[resContentDMSState]) {
                stateBlock = '<span lang="tech" data-tooltip="tooltip.command.OpenDMSDownloadWindow_' + resContentDMSState + '">' + stateBlock + '</span>';
            }
            $row.append(
                me.$('<div />').html(stateBlock)
                    .addClass('container_field')
                    .addClass('fieldtype_additionaldata')
                    .addClass('fieldtype_uploadsstate')
                    .addClass('field_resContentDMSState')
                    .addClass('field_resContentDMSState_' + resContentDMSState)
            );
        }
        // extracted metadata
        var resIndexDMSState = basenode.resIndexDMSState;
        var indexStateMapping = {'INDEX_DONE': 'Metadata', 'INDEX_OPEN': 'Indexing', 'INDEX_FAILED': 'Indexing Failed'};
        if (indexStateMapping[resIndexDMSState]
            && me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsDownload', basenode.sysUID, false)) {
            // url
            stateBlock = svcDataUtils.htmlEscapeText(indexStateMapping[resIndexDMSState]);
            if (resIndexDMSState === 'INDEX_DONE' && !preventActionsColum) {
                stateBlock = '<a href=""' +
                    ' onClick="' + yaioAppBaseVarName + '.get(\'YaioExplorerCommands\').openDMSIndexDownloadWindowForNodeId(\''+ basenode.sysUID + '\'); return false;"' +
                    ' lang="tech" data-tooltip="tooltip.command.OpenDMSIndexDownloadWindow_' + resIndexDMSState + '">' +
                    stateBlock + '</a>';
            } else if (indexStateMapping[resIndexDMSState]) {
                stateBlock = '<span lang="tech" data-tooltip="tooltip.command.OpenDMSIndexDownloadWindow_' + resIndexDMSState + '">' +
                    stateBlock + '</span>';
            }
            $row.append(
                me.$('<div />').html(stateBlock)
                    .addClass('container_field')
                    .addClass('fieldtype_additionaldata')
                    .addClass('fieldtype_uploadsstate')
                    .addClass('field_resIndexDMSState')
                    .addClass('field_resIndexDMSState_' + resIndexDMSState)
            );
        }
    };

    /**
     * append DocLayoutBlocks to the row for the node
     * @param {Object} basenode               the nodedata to render (java de.yaio.core.node.BaseNode)
     * @param {JQuery} $row                   JQuery-Html-Object to append the blockData
     */
    me._appendDocLayoutBlocks = function(basenode, $row) {
        var svcDataUtils = me.appBase.get('DataUtils');

        // render both
        $row.append(
            me.$('<div lang="tech" />').html('Layout ')
                .addClass('container_field')
                .addClass('fieldtype_additionaldata')
                .addClass('fieldtype_ueDocLayout')
                .addClass('field_ueDocLayout')
        );

        // check which docLayout is set
        if (basenode.docLayoutTagCommand) {
            $row.append(
                me.$('<div lang="tech" />').html('Tag: '
                        + svcDataUtils.htmlEscapeText(basenode.docLayoutTagCommand))
                    .addClass('container_field')
                    .addClass('fieldtype_additionaldata')
                    .addClass('fieldtype_docLayoutTagCommand')
                    .addClass('field_docLayoutTagCommand')
            );
        }
        if (basenode.docLayoutAddStyleClass) {
            $row.append(
                me.$('<div lang="tech" />').html('Style: '
                        + svcDataUtils.htmlEscapeText(basenode.docLayoutAddStyleClass))
                    .addClass('container_field')
                    .addClass('fieldtype_additionaldata')
                    .addClass('fieldtype_docLayoutAddStyleClass')
                    .addClass('field_docLayoutAddStyleClass')
            );
        }
        if (basenode.docLayoutShortName) {
            $row.append(
                me.$('<div lang="tech" />').html('Kurzname: '
                        + svcDataUtils.htmlEscapeText(basenode.docLayoutShortName))
                    .addClass('container_field')
                    .addClass('fieldtype_additionaldata')
                    .addClass('fieldtype_docLayoutShortName')
                    .addClass('field_docLayoutShortName')
            );
        }
        if (basenode.docLayoutFlgCloseDiv) {
            $row.append(
                me.$('<div lang="tech" />').html('Block schlie&szligen!')
                    .addClass('container_field')
                    .addClass('fieldtype_additionaldata')
                    .addClass('fieldtype_docLayoutFlgCloseDiv')
                    .addClass('field_docLayoutFlgCloseDiv')
            );
        }
    };


    /**
     * succes-handler if getNodeForSymLink succeeded (resolves yaioNodeActionResponse.state)
     * @param {Object} basenode                     node to get symlinked-data for
     * @param {Object} yaioNodeActionResponse       the serverresponse (java de.yaio.rest.controller.NodeActionReponse)
     * @param {String} textStatus                   http-state as text
     * @param {JQueryXHR} jqXhr                     jqXhr-Object
     */
    me._getNodeForSymLinkSuccessHandler = function(basenode, yaioNodeActionResponse, textStatus, jqXhr) {
        var svcLogger = me.appBase.get('Logger');
        var msg = '_getNodeForSymLinkSuccessHandler for symLinkBaseId:' + basenode.sysUID;
        console.log(msg + ' OK done!' + yaioNodeActionResponse.state);
        if (yaioNodeActionResponse.state === 'OK') {
            if (yaioNodeActionResponse.node) {
                var $nodeDataBlock = me._renderBaseDataBlock(yaioNodeActionResponse.node);

                // load referring node
                var tree = me.$('#tree').fancytree('getTree');
                if (!tree) {
                    // tree not found
                    svcLogger.logError('error getNodeForSymLink: cant load tree - ' + msg, false);
                    return null;
                }
                var rootNode = tree.rootNode;
                if (! rootNode) {
                    console.error(msg + ' openHierarchy: error for tree'
                        + ' rootNode not found: ' + msg);
                    return;
                }
                var treeNode = tree.getNodeByKey(basenode.sysUID);
                if (! treeNode) {
                    svcLogger.logError('error getNodeForSymLink: cant load node - ' + msg, false);
                    return null;
                }

                // append Link in current hierarchy to referenced node
                var newUrl = '#/show/' + tree.options.masterNodeId
                    + '/activate/' + yaioNodeActionResponse.node.sysUID + '/';

                // check if node-hierarchy exists (same tree)
                var firstNodeId, firstNode;
                var lstIdsHierarchy = [].concat(yaioNodeActionResponse.parentIdHierarchy);
                while (! firstNode && lstIdsHierarchy.length > 0) {
                    firstNodeId = lstIdsHierarchy.shift();
                    firstNode = rootNode.mapChildren[firstNodeId];
                }
                if (! firstNode) {
                    // load page for referenced node with full hierarchy
                    //firstNodeId = yaioNodeActionResponse.parentIdHierarchy.shift();
                    // we set it constant
                    firstNodeId = me.appBase.config.masterSysUId;

                    newUrl = '#/show/' + firstNodeId
                        + '/activate/' + yaioNodeActionResponse.node.sysUID + '/';
                }

                me.$(treeNode.tr).find('div.container_data_row').append(
                    '<a href="' + newUrl + '"'
                    + ' data-tooltip="Springe zum verkn&uuml;pften Element"'
                    + ' class="button">OPEN</a>');

                // add datablock of referenced node
                me.$(treeNode.tr).find('div.container_data_table').append($nodeDataBlock.html());

                console.log(msg + ' DONE');
            } else {
                svcLogger.logError('ERROR got no ' + msg, true);
            }
        } else {
            svcLogger.logError('ERROR cant load  ' + msg + ' error:' + yaioNodeActionResponse.stateMsg, true);
        }
    };

    me._init();
    
    return me;
};

/**
 * service-functions to render gantt-blocks for nodes in explorer
 * @param {YaioAppBase} appBase      the appbase to get other services
 * @returns {Yaio.NodeDataRenderer}  an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.NodeGanttRenderer = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
    };

    /**
     * Shows the GanttBlock - Updates DOM
     * Toggles DataBlock, GanttBlock and the links #tabTogglerData, #tabTogglerGantt.
     * Hide all: td.block_nodedata, th.block_nodedata + #tabTogglerGantt
     * Show all: td.block_nodegantt, th.block_nodegantt + #tabTogglerData
     */
    me.showGanttView = function() {
        var svcUIToggler = me.appBase.get('UIToggler');

        svcUIToggler.toggleTableBlock('#tabTogglerGantt');
        svcUIToggler.toggleTableBlock('td.block_nodedata, th.block_nodedata');
        setTimeout(function(){
            svcUIToggler.toggleTableBlock('#tabTogglerData');
            svcUIToggler.toggleTableBlock('td.block_nodegantt, th.block_nodegantt');
        }, 400);
        // set it to none: force
        setTimeout(function(){
            me.$('#tabTogglerGantt').css('display', 'none');
            me.$('td.block_nodedata, th.block_nodedata').css('display', 'none');
        }, 400);
    };

    /**
     * activate one of the gantt-blocks for the element - Updates DOM
     * When flgMeOnly ist set: activate #gantt_ist_container_ + #gantt_plan_container
     * to display only the gantt with the data of this node
     * When flgMeOnly ist nmot set: activate #gantt_istChildrenSum_container_ + #gantt_planChildrenSum_container
     * to display only the gantt with the data of this node and children
     * @param {FancytreeNode} node             the FancytreeNode
     * @param {Boolean} flgMeOnly              true - display only the gantt for the node / false - node+children
     */
    me.showGanttBlockForNode = function(node, flgMeOnly) {
        if (flgMeOnly) {
            console.debug('yaioActivateGanttBlock: activate gantt - only own data for ' + node.key);
            // I'm expanded: show only my own data
            me.$('#gantt_istChildrenSum_container_' + node.key).css('display', 'none');
            me.$('#gantt_planChildrenSum_container_' + node.key).css('display', 'none');
            me.$('#gantt_ist_container_' + node.key).css('display', 'block');
            me.$('#gantt_plan_container_' + node.key).css('display', 'block');
        } else {
            // I'm collapsed: show me and my childsum
            console.debug('yaioActivateGanttBlock: activate gantt - sum data of me+children for ' + node.key);
            me.$('#gantt_ist_container_' + node.key).css('display', 'none');
            me.$('#gantt_plan_container_' + node.key).css('display', 'none');
            me.$('#gantt_istChildrenSum_container_' + node.key).css('display', 'block');
            me.$('#gantt_planChildrenSum_container_' + node.key).css('display', 'block');
        }

        // recalc gantt tree
        me.recalcMasterGanttBlockForTree();
    };

    /**
     * recalc gantt-block for the basenode - Updates DOM
     * calls fillGanttBlock for (plan, ist, planChildrenSum, istChildrenSum)
     * @param {Object} basenode               the basenode to recalc (java de.yaio.core.node.BaseNode)
     */
    me.recalcGanttBlockForNode = function(basenode) {
        me._fillGanttBlock(basenode, 'plan', 'Plan', null);
        me._fillGanttBlock(basenode, 'planChildrenSum', 'PlanSum', null);
        me._fillGanttBlock(basenode, 'ist', 'Ist', null);
        me._fillGanttBlock(basenode, 'istChildrenSum', 'IstSum', null);
    };

    /**
     * recalc all gantt-blocks of the fancytree-nodes (iterates over getRooNode.visit() - Updates DOM
     * calls yaioRecalcGanttBlock for every node and afterwards me.recalcMasterGanttBlockForTree()
     */
    me.recalcGanttBlocksForTree = function() {
        if (me.$('#tree').length > 0) {
            // tree exists
            me.$('#tree').fancytree('getRootNode').visit(function(node){
                me.recalcGanttBlockForNode(node.data.basenode);
            });
        }
        me.recalcMasterGanttBlockForTree();
    };

    /**
     * recalc mastergantt-block for the basenode on top of the page - Updates DOM
     * calls yaioRecalcGanttBlock and yaioRecalcMasterGanttBlockFromTree
     * @param {Object} basenode               the basenode to recalc (java de.yaio.core.node.BaseNode)
     */
    me.recalcMasterGanttBlock = function(basenode) {
        // default: set with own
        me.recalcGanttBlockForNode(basenode);

        // calc from tree
        me.recalcMasterGanttBlockForTree();
    };


    /* jshint maxstatements: 100 */
    /**
     * Updates GUI: #gantt_' + type + '_container_' + basenode.sysUID
     * Calcs+renders the gantt-block of specified type: (ist, plan, planChildrenSum, 
     * istChildrenSum) for basenode. Updates this elements:
     * <ul>
     *   <li> #gantt_' + type + '_container_' + basenode.sysUID
     *   <li> #gantt_' + type + '_aufwand_' + basenode.sysUID
     *   <li> #gantt_' + type + '_bar_' + basenode.sysUID
     * </ul>
     * @param {Object} basenode               the nodedata to render (java de.yaio.core.node.BaseNode)
     * @param {String} type                   the type of data to calc (ist, plan, planChildrenSum, istChildrenSum)
     * @param {String} label                  the label to show if aufwand >0
     * @param {JQuery} $divLine               optional ganttContainer to use - if not set #gantt_' + type + '_container_' + basenode.sysUID will be used
     */
    me._fillGanttBlock = function (basenode, type, label, $divLine) {
        var msg = 'ganttblock for node:' + basenode.sysUID;
    
        // get divs
        if (! $divLine) {
            $divLine = me.$('#gantt_' + type + '_container_' + basenode.sysUID);
        }
        var $divLabel = me.$($divLine).find('#gantt_' + type + '_aufwand_' + basenode.sysUID);
        var $div = me.$($divLine).find('#gantt_' + type + '_bar_' + basenode.sysUID);
        
        // reset
        $divLabel.html('');
        $div.html('&nbsp;');
        $div.css('width', 0);
        $div.css('margin-left', 0);
        $div.attr('data-rangeaufwand', 0);
    
        // set range
        var dateRangeStartStr = me.$('#inputGanttRangeStart').val();
        var dateRangeEndStr = me.$('#inputGanttRangeEnde').val();
        if (me.appBase.DataUtils.isUndefinedStringValue(dateRangeStartStr) || me.appBase.DataUtils.isUndefinedStringValue(dateRangeEndStr)) {
            console.error('fillGanttBlock range is not set correctly: '
                    + dateRangeStartStr + '-' + dateRangeEndStr + ' ' + msg);
            return;
        }
        
        // calc dates...
        var lstDate=dateRangeStartStr.split('.');
        var dateRangeStart = new Date(lstDate[1]+'/'+lstDate[0]+'/'+lstDate[2]);
        lstDate=dateRangeEndStr.split('.');
        var dateRangeEnd = new Date(lstDate[1]+'/'+lstDate[0]+'/'+lstDate[2]);
        if (me.appBase.DataUtils.isUndefinedStringValue(dateRangeStart) || me.appBase.DataUtils.isUndefinedStringValue(dateRangeEndStr)) {
            console.error('fillGanttBlock range is not set correctly: '
                    + dateRangeStartStr + '-' + dateRangeEndStr + ' ' + msg);
            return;
        }
        var dateRangeStartMillis = dateRangeStart.getTime();
        var dateRangeEndMillis = dateRangeEnd.getTime();
        if (isNaN(dateRangeStartMillis) || isNaN(dateRangeEndMillis)) {
            console.error('fillGanttBlock range is not set correctly: '
                    + dateRangeStartStr + '-' + dateRangeEndStr + ' ' + msg);
            return;
        }
    
        var rangeWidth = 450;
        var rangeDays = (dateRangeEndMillis-dateRangeStartMillis);
        var rangeFactor = rangeWidth / rangeDays;
    
        // check if dates are set
        var startMillis = basenode[type + 'Start'];
        var endMillis = basenode[type + 'Ende'];
        var aufwand = basenode[type + 'Aufwand'];
        if (!me.appBase.DataUtils.isUndefinedStringValue(startMillis) && !me.appBase.DataUtils.isUndefinedStringValue(endMillis)) {
    
            var startPos = 0;
            var endPos = 0;
            var rangeAufwand = 0;
            var flgMatchesRange = false;
            
            // add 8h to the end
            endMillis = endMillis + 1000 * 60 * 60 * 8;
            
            // check if range matches
            if (startMillis > dateRangeEndMillis) {
                // sorry you start later
                console.log('fillGanttBlock SKIP sorry you start later: '
                        + startMillis + '>' + dateRangeEndMillis + ' ' + msg);
            } else if (endMillis < dateRangeStartMillis) {
                // sorry you end before
                console.log('fillGanttBlock SKIP sorry you start later: '
                        + endMillis + '<' + dateRangeStartMillis + ' ' + msg);
            } else {
                // we match
                flgMatchesRange = true;
                if (startMillis > dateRangeStartMillis) {
                    //
                    startPos = (startMillis - dateRangeStartMillis) * rangeFactor;
                } else {
                    // we start on it
                    startPos = 0;
                }
                
                if (endMillis < dateRangeEndMillis) {
                    //
                    endPos = (endMillis - dateRangeStartMillis) * rangeFactor;
                } else {
                    // we start on it
                    endPos = rangeWidth;
                }
                
                // calc aufwand in range
                rangeAufwand = (endPos - startPos) * aufwand / ((endMillis - startMillis) * rangeFactor);
            }
            
            if (flgMatchesRange) {
                $div.html('&nbsp;');
                $div.css('width', endPos-startPos);
                $div.css('margin-left', startPos);
                
                // show aufwand
                if (rangeAufwand > 0) {
                    $divLabel.html('<span class="gantt_aufwand_label">' + label + ':' + '</span>'
                                   + '<span class="gantt_aufwand_value"' + ' data-rangeaufwand="' + rangeAufwand + '">'
                                     + me.appBase.get('DataUtils').formatNumbers(rangeAufwand, 0, 'h') + '</span>');
                    $div.attr('data-rangeaufwand', rangeAufwand);
                }
                
                console.log('fillGanttBlock MATCHES width: '
                        + startPos + '-' + endPos + ' aufwand:' + rangeAufwand + ' ' + msg);
            } else {
                console.log('fillGanttBlock SKIP dates not matched: ' + msg);
            }
        } else {
            console.log('fillGanttBlock SKIP no planDates: ' + msg);
        }
    };
    /* jshint maxstatements: 50 */

    /** 
     * Updates GUI: #gantt_' + type + '_container_' + basenode.sysUID
     * Create the gantt-block of specified type: (ist, plan, planChildrenSum,
     * istChildrenSum) for basenode. Creates this elements:
     * <ul>
     *   <li> #gantt_' + type + '_container_' + basenode.sysUID
     *   <li> #gantt_' + type + '_aufwand_' + basenode.sysUID
     *   <li> #gantt_' + type + '_bar_' + basenode.sysUID
     * </ul>
     * @param {Object} basenode               the nodedata to render (java de.yaio.core.node.BaseNode)
     * @param {String} type                   the type of data to calc (ist, plan, planChildrenSum, istChildrenSum)
     * @param {String} addStyle               optional css-class to add to t-element
     * @param {String} label                  the label to show if aufwand >0
     * @returns {JQuery}                      JQuery-Html-Object - the rendered ganttblock
     */
    me._createGanttBlock = function(basenode, type, addStyle, label) {
        // create line
        var $divLine = me.$('<div id="gantt_' + type + '_container_' + basenode.sysUID + '"' +
                ' class ="gantt_container gantt_' + type + '_container"' +
                ' lang="tech" data-tooltip="tooltip.hint.Gantt"/>');
        
        // create aufwand
        var $divLabel = me.$('<div id="gantt_' + type + '_aufwand_' + basenode.sysUID + '"' +
                ' class ="gantt_aufwand ganttblock_' + type + '_aufwand" />');
        $divLabel.addClass(addStyle);
        $divLine.append($divLabel);
        
        // create gantt
        var $div = me.$('<div id="gantt_' +type + '_bar_' + basenode.sysUID + '"' +
                ' class ="gantt_bar gantt_' +type + '_bar" />');
        $div.addClass(addStyle);
        $divLine.append($div);
        
        // fill gantt
        me._fillGanttBlock(basenode, type, label, $divLine);
        
        return $divLine;
    };
    
    /** 
     * renders the full GanttBlock (ist, plan, istChildrenSum, planChildrenSum) 
     * for basenode and returns a JQuery-Html-Obj.
     * @param {Object} basenode               the nodedata to render (java de.yaio.core.node.BaseNode)
     * @param {FancytreeNode} fancynode       the corresponding fancynode
     * @returns {JQuery}                      JQuery-Html-Object - the rendered ganttblock
     */
    me.renderGanttBlock = function(basenode, fancynode) {
        // extract nodedata
        var nodestate = basenode.state;
        var statestyle = 'yaio-node-state-' + nodestate;
    
        var msg = 'ganttblock for node:' + basenode.sysUID;
        console.log('renderGanttBlock START: ' + msg);
    
        // current ganttblock
        var $table = me.$('<div class="container_gantt_table" />');
        var $row = me.$('<div class="container_gantt_row" />');
        $table.append($row);
        
        if (basenode.className === 'TaskNode' || basenode.className === 'EventNode') {
            // TaskNode
            var $div;
            
            // create plan
            $div = me._createGanttBlock(basenode, 'plan', statestyle, 'Plan');
            $row.append($div);
            $div = me._createGanttBlock(basenode, 'planChildrenSum', statestyle, 'PlanSum');
            $row.append($div);
            
            // create ist and add statestyle
            $div = me._createGanttBlock(basenode, 'ist', statestyle, 'Ist');
            $row.append($div);
            $div = me._createGanttBlock(basenode, 'istChildrenSum', statestyle, 'IstSum');
            $row.append($div);
        } else {
            console.log('renderGanttBlock SKIP no task or event: ' + msg);
        }
    
        console.log('renderGanttBlock DONE: ' + msg);
    
        return $table;
    };
    
    
    /**
     * recalc mastergantt-block from the tree-data - Updates DOM
     * extract nodeid of the masternode from '#masterTr.data-value'
     * calls yaioRecalcMasterGanttBlockLine for plan+ist
     */
    me.recalcMasterGanttBlockForTree = function() {
        // calc from children
        var masterNodeId = me.$('#masterTr').attr('data-value');
        if (!me.appBase.DataUtils.isUndefinedStringValue(masterNodeId)) {
            console.log('yaioRecalcMasterGanttBlockFromTree calc for masterNodeId:', masterNodeId);
            me._recalcMasterGanttBlockLine(masterNodeId, 'plan');
            me._recalcMasterGanttBlockLine(masterNodeId, 'ist');
        } else {
            console.log('yaioRecalcMasterGanttBlockFromTree skip: no masterNodeId');
        }
    };
    
    /** 
     * Recalcs mastergantt-line for praefix (plan, ist) with the tree-data - Updates DOM
     * It extracts the data-rangeaufwand from gantt_${praefix}ChildrenSum_bar_$masterNodeId
     * It iterates over all visible div.gantt_$praefix_bar, div.gantt_${praefix}ChildrenSum_bar
     * and adds their data-rangeaufwand
     * At the end the sumRangeAufwand will be placed on #gantt_${praefix}ChildrenSum_aufwand_{masterNodeId}
     * @param {String} masterNodeId           id of the masterNode on top of the page
     * @param {String} praefix                datablock to racalc (plan, ist)
     */
    me._recalcMasterGanttBlockLine = function(masterNodeId, praefix) {
        // calc rangeAufwand
        var sumRangeAufwand = 0;
    
        // init with aufwand of the masternode
        var masterBarId = '#gantt_' + praefix + '_bar_' + masterNodeId;
        var $masterBar = me.$(masterBarId);
        if ($masterBar.length > 0) {
            sumRangeAufwand = parseFloat($masterBar.attr('data-rangeaufwand'));
            console.log('yaioRecalcMasterGanttBlock type=' + praefix + ' found masterrangeaufwand :' + sumRangeAufwand + ' for ' + masterBarId);
        } else {
            console.log('yaioRecalcMasterGanttBlock type=' + praefix + ' no masterrangeaufwand :' + sumRangeAufwand + ' for ' + masterBarId);
        }
        
        // check for tree
        var treeId = '#tree';
        var tree = me.$(treeId).fancytree('getTree');
        if (me.appBase.DataUtils.isEmptyStringValue(me.$(treeId).length) || me.appBase.DataUtils.isEmptyStringValue(tree)) {
            me.appBase.get('Logger').logError('yaioRecalcMasterGanttBlock: error tree:"' + treeId + '" not found.', false);
            return;
        }
        
        // filter ganttblocks
        var filter = 'div.gantt_' + praefix + '_bar, div.gantt_' + praefix + 'ChildrenSum_bar';
        var $ganttBars = me.$(filter).filter(function () { 
            return me.$(this).parent().css('display') === 'block';
        });
        console.log('yaioRecalcMasterGanttBlock type=' + praefix + ' found:' + $ganttBars.length + ' for filter:' + filter);
        if ($ganttBars.length > 0) {
            me.$($ganttBars).each( function () {
                // check if node is visible
                var nodeId = this.id;
                nodeId = nodeId.replace(/gantt_(.*)bar_/, '');
                var treeNode = tree.getNodeByKey(nodeId);
                if (treeNode && treeNode.isVisible()) {
                    // node is visible: calc
                    var rangeAufwand = me.$(this).attr('data-rangeaufwand');
                    if (this.id.indexOf(masterNodeId) <= 0) {
                        console.log('yaioRecalcMasterGanttBlock type=' + praefix + ' found rangeaufwand :' + rangeAufwand + ' for ' + this.id);
                        sumRangeAufwand += parseFloat(rangeAufwand);
                        
                    } else {
                        console.log('yaioRecalcMasterGanttBlock type=' + praefix + ' ignore rangeaufwand from master:' + rangeAufwand + ' for ' + this.id);
                    }
                } else if (! treeNode) {
                    // not found
                    console.log('yaioRecalcMasterGanttBlock type=' + praefix + ' skip node not found nodeId:' + nodeId + ' for ' + this.id);
                } else {
                    // not visble
                    console.log('yaioRecalcMasterGanttBlock type=' + praefix + ' skip node not visble nodeId:' + nodeId + ' for ' + this.id);
                }
            });
        }
        console.log('yaioRecalcMasterGanttBlock type=' + praefix + ' calced rangeaufwand :' + sumRangeAufwand + ' for ' + masterNodeId);
    
        // update masterBlock
        var type = praefix + 'ChildrenSum';
        var $divLine = me.$('#gantt_' + type + '_container_' + masterNodeId);
        var $divLabel = me.$($divLine).find('#gantt_' + type + '_aufwand_' + masterNodeId);
        $divLabel.html('');
        if (sumRangeAufwand > 0)  {
            console.log('yaioRecalcMasterGanttBlock type=' + praefix + ' set gantt_aufwand_label with calced rangeaufwand :' + sumRangeAufwand + ' for ' + masterNodeId);
            $divLabel.html('<span class="gantt_aufwand_label">'
                    + praefix + 'Sum:' + '</span>'
                    + '<span class="gantt_aufwand_value"' + '>'
                    + me.appBase.get('DataUtils').formatNumbers(sumRangeAufwand, 0, 'h') + '</span>');
        } else {
            console.log('yaioRecalcMasterGanttBlock type=' + praefix + ' hide gantt_aufwand_label because no calced rangeaufwand :' + sumRangeAufwand + ' for ' + masterNodeId);
        }
    };
    

    me._init();
    
    return me;
};

/**
 * abstract service-functions connect/save/retrieve data from datasource
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @param {JsHelferlein.ConfigBase} config         config to use
 * @param {JsHelferlein.ConfigBase} defaultConfig  default to merge with config
 * @returns {Yaio.AbstractNodeDBDriver}            an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.AbstractNodeDBDriver = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase, config, defaultConfig);

    /**
     * initialize the object
     */
    me._init = function() {
        me.AccessManager = null;
    };

    /**
     * return the accessmanager for this service
     * @returns {Yaio.AccessManager}    instance of Yaio.AccessManager
     */
    me.getAccessManager = function() {
        if (! me.AccessManager) {
            me.AccessManager = me._createAccessManager();
        }
        return me.AccessManager;
    };

    /**
     * load the data of the node (own, parent, children)
     * use promise as described on https://github.com/mar10/fancytree/wiki/TutorialLoadData#user-content-use-a-deferred-promise
     * @abstract
     * @param {String} nodeId     id of the node to load data for
     * @returns {JQueryPromise<T>|JQueryPromise<*>|Object}    Object or JQueryPromise for FancyTree
     */
    me.loadNodeData = function(nodeId) {
        me.logNotImplemented();
    };

    /**
     * connect the dataservice
     * @abstract
     * @returns {JQueryPromise<T>|JQueryPromise<*>}    promise if connect succeed or failed
     */
    me.connectService = function() {
        me.logNotImplemented();
    };

    /**
     * update my config (this instance of NodeDataConfig)
     * @param {Object} yaioCommonApiConfig  Common Api Config from yaio-server
     */
    me.configureDataService = function(yaioCommonApiConfig) {
        me.logNotImplemented();
    };

    /**
     * update appBase-config (plantUmlBaseUrl, masterSysUId, excludeNodePraefix) with my config (this instance of NodeDataConfig)
     */
    me.reconfigureBaseApp = function() {
        var msg = 'reconfigureBaseApp';
        console.log(msg + ' with:', me.config);
        if (me.config.plantUmlBaseUrl) {
            me.appBase.config.plantUmlBaseUrl = me.config.plantUmlBaseUrl;
        }
        if (me.config.masterSysUId) {
            me.appBase.config.masterSysUId = me.config.masterSysUId;
        }
        if (me.config.excludeNodePraefix) {
            me.appBase.config.excludeNodePraefix = me.config.excludeNodePraefix;
        }
        console.log(msg + ' to:', me.appBase.config);
    };


    /**
     * implementation of: get symlinked nodedata for basenode
     * @abstract
     * @param {Object} basenode                           node-data to get symlink-data
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if read succeed or failed with parameters { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me.getNodeForSymLink = function(basenode) {
        me.logNotImplemented();
    };

    /**
     * implementation of: update node with values in json
     * @abstract
     * @param {String} nodeId                             nodeId to update
     * @param {String} json                               json with the update-values
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if update succeed or failed  { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me.updateNode = function(nodeId, json) {
        me.logNotImplemented();
    };

    /**
     * implementation of: move node to newParentKey at position newPos
     * @abstract
     * @param {String} nodeId                             nodeId to move
     * @param {String} newParentKey                       nodeId of the new parent
     * @param {int} newPos                                sort-position in parents childList
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if update succeed or failed { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me.moveNode = function(nodeId, newParentKey, newPos) {
        me.logNotImplemented();
    };

    /**
     * implementation of: copy node to newParentKey
     * @abstract
     * @param {String} nodeId                             nodeId to copy
     * @param {String} newParentKey                       nodeId of the new parent
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if update succeed or failed { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me.copyNode = function(nodeId, newParentKey) {
        me.logNotImplemented();
    };

    /**
     * implementation of: patch node
     * @abstract
     * @param {String} nodeId                             nodeId to copy
     * @param {String} url                                url to call
     * @param {String} json                               json to submit
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if update succeed or failed { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me.patchNode = function(nodeId, url, json) {
        me.logNotImplemented();
    };

    /**
     * implementation of delete node
     * @abstract
     * @param {String} nodeId                             nodeId to delete
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if delete succeed or failed { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me.deleteNode = function(nodeId) {
        me.logNotImplemented();
    };

    /**
     * implementation of: save (create/update) node
     * @abstract
     * @param {Object} nodeObj                            node with values to save
     * @param {Object} options                            options
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if save succeed or failed
     */
    me.saveNode = function(nodeObj, options) {
        me.logNotImplemented();
    };

    /**
     * implementation of: read node
     * @abstract
     * @param {String} nodeId                             nodeId to read
     * @param {Object} options                            options
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if read succeed or failed
     */
    me.getNodeById = function(nodeId, options) {
        me.logNotImplemented();
    };

    /**
     * implementation of: search node
     * @abstract
     * @param {Object} searchOptions                      filters and sorts...
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if search succeed or failed
     */
    me.searchNode = function(searchOptions) {
        me.logNotImplemented();
    };

    /**
     * implementation of: login to service
     * @abstract
     * @param {Object} credentials                        credentials to login with
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if login succeed or failed
     */
    me.loginToService = function(credentials) {
        me.logNotImplemented();
    };

    /**
     * mplementation of: logout from service
     * @abstract
     * @param {Object} session                            session to logout
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if logout succeed or failed
     */
    me.logoutFromService = function(session) {
        me.logNotImplemented();
    };

    /**
     * implementation of: check current session of service
     * @abstract
     * @param {Object} session                            session to check
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if check succeed or failed returns { data: 'OK' }
     */
    me.checkSession = function(session) {
        me.logNotImplemented();
    };

    /**
     * implementation of: create an accessmanager for this service
     * @abstract
     * @returns {Yaio.AccessManager}    instance of Yaio.AccessManager
     */
    me._createAccessManager = function() {
        me.logNotImplemented();
    };

    me._init();
    
    return me;
};

/**
 * service-functions to get actions, urls, flags... available and configured for the current datasource
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @param {JsHelferlein.ConfigBase} config         config to use
 * @param {JsHelferlein.ConfigBase} defaultConfig  default to merge with config
 * @returns {Yaio.AccessManager}                   an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.AccessManager = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase, config, defaultConfig);

    /**
     * initialize the object
     */
    me._init = function() {
        me.masterNodeId = undefined;
        me.availiableExportForms = {};
        me.availiableExportLinks = {};
        me.availiableStaticExportLinks = {};
        me.availiableImportForms = {};
        me.availiableNodeActions = {};
        me.nodeActions = {};
    };


    /**
     * return all available export-form-keys for the node "mindmap, html...)
     * @param {String} nodeId      optional id of the node to check to get the available export-forms (form-keys)
     * @param {Boolean} flgMaster  true if it is the master-node
     * @returns {Array}            available export-form-keys for the node
     */
    me.getAvailiableExportFormKeys = function(nodeId, flgMaster) {
        return Object.keys(me.availiableExportForms);
    };

    /**
     * return data of the export-form (url)
     * @param {String} key         key of the export-form
     * @param {String} nodeId      optional id of the node to check to get the available export-form (form-keys)
     * @param {Boolean} flgMaster  true if it is the master-node
     * @returns {String}           url
     */
    me.getAvailiableExportForm = function(key, nodeId, flgMaster) {
        return me.availiableExportForms[key];
    };

    /**
     * set data for the export-form (url)
     * @param {String} key         key of the export-form
     * @param {String} url         url for the export-form
     */
    me.setAvailiableExportForm = function(key, url) {
        me.availiableExportForms[key] = url;
        return me.availiableExportForms[key];
    };

    /**
     * return all available export-link-keys for the node "mindmap, html...)
     * @param {String} nodeId      optional id of the node to check to get the available export-links (link-keys)
     * @param {Boolean} flgMaster  true if it is the master-node
     * @returns {Array}            available export-link-keys for the node
     */
    me.getAvailiableExportLinkKeys = function(nodeId, flgMaster) {
        return Object.keys(me.availiableExportLinks);
    };

    /**
     * return data of the export-link (url)
     * @param {String} key         key of the export-link
     * @param {String} nodeId      optional id of the node to check to get the available export-link (form-keys)
     * @param {Boolean} flgMaster  true if it is the master-node
     * @returns {String}           url
     */
    me.getAvailiableExportLink = function(key, nodeId, flgMaster) {
        return me.availiableExportLinks[key];
    };

    /**
     * set data for the export-link (url)
     * @param {String} key         key of the export-link
     * @param {String} url         url for the export-link
     */
    me.setAvailiableExportLink = function(key, url) {
        me.availiableExportLinks[key] = url;
        return me.availiableExportLinks[key];
    };

    /**
     * return all available static-export-link-keys for the node "mindmap, html...)
     * @param {String} nodeId      optional id of the node to check to get the available static-export-links (link-keys)
     * @param {Boolean} flgMaster  true if it is the master-node
     * @returns {Array}            available static-export-link-keys for the node
     */
    me.getAvailiableStaticExportLinkKeys = function(nodeId, flgMaster) {
        return Object.keys(me.availiableStaticExportLinks);
    };

    /**
     * return data of the static-export-link (url)
     * @param {String} key         key of the static-export-link
     * @param {String} nodeId      optional id of the node to check to get the available static-export-link (form-keys)
     * @param {Boolean} flgMaster  true if it is the master-node
     * @returns {String}           url
     */
    me.getAvailiableStaticExportLink = function(key, nodeId, flgMaster) {
        return me.availiableStaticExportLinks[key];
    };

    /**
     * set data for the static-export-link (url)
     * @param {String} key         key of the static-export-link
     * @param {String} url         url for the static-export-link
     */
    me.setAvailiableStaticExportLink = function(key, url) {
        me.availiableStaticExportLinks[key] = url;
        return me.availiableStaticExportLinks[key];
    };

    /**
     * return all available import-form-keys for the node "json, wiki...)
     * @param {String} nodeId      optional id of the node to check to get the available import-forms (form-keys)
     * @param {Boolean} flgMaster  true if it is the master-node
     * @returns {Array}            available import-form-keys for the node
     */
    me.getAvailiableImportFormKeys = function(nodeId, flgMaster) {
        return Object.keys(me.availiableImportForms);
    };

    /**
     * return data of the import-form (url)
     * @param {String} key         key of the import-form
     * @param {String} nodeId      optional id of the node to check to get the available import-form (form-keys)
     * @param {Boolean} flgMaster  true if it is the master-node
     * @returns {String}           url
     */
    me.getAvailiableImportForm = function(key, nodeId, flgMaster) {
        return me.availiableImportForms[key];
    };

    /**
     * set data for the import-form (url)
     * @param {String} key         key of the import-form
     * @param {String} url         url for the import-form
     */
    me.setAvailiableImportForm = function(key, url) {
        me.availiableImportForms[key] = url;
        return me.availiableImportForms[key];
    };

    /**
     * return all available node-action-keys for the node "create, edit...)
     * @param {String} nodeId      optional id of the node to check to get the available node-action (action-keys)
     * @param {Boolean} flgMaster  true if it is the master-node
     * @returns {Array}            available import-form-keys for the node
     */
    me.getAvailiableNodeActionKeys = function(nodeId, flgMaster) {
        return Object.keys(me.availiableNodeActions);
    };

    /**
     * return data of the node-action (url|flag)
     * @param {String} key            key of the node-action
     * @param {String} nodeId         optional id of the node to check to get the available node-action (action-keys)
     * @param {Boolean} flgMaster     true if it is the master-node
     * @returns {String|Boolean} url  url/flag for the node-action
     */
    me.getAvailiableNodeAction = function(key, nodeId, flgMaster) {
        if (key === 'delete' && flgMaster) {
            return false;
        }
        if (key === 'frontpagebaseurl') {
            return me.availiableNodeActions[key] + nodeId;
        }
        return me.availiableNodeActions[key];
    };

    /**
     * set data for the node-action (url|flag)
     * @param {String} key            key of the node-action
     * @param {String|Boolean} url    url/flag for the node-action
     */
    me.setAvailiableNodeAction = function(key, url) {
        me.availiableNodeActions[key] = url;
        return me.availiableNodeActions[key];
    };

    me._init();
    
    return me;
};

/**
 * service-functions to manage/connect available datasources
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @param {JsHelferlein.ConfigBase} config         config to use
 * @param {JsHelferlein.ConfigBase} defaultConfig  default to merge with config
 * @returns {Yaio.DataSourceManager}               an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.DataSourceManager = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase, config, defaultConfig);

    /**
     * initialize the object
     */
    me._init = function() {
        me.connections = {};
        me.currentConnection = undefined;
    };

    /**
     * return all available connection-keys
     * @returns {Array}            available connection-keys
     */
    me.getConnectionKeys = function() {
        return Object.keys(me.connections);
    };

    /**
     * return the connection
     * @param {String} key                     key of the connection
     * @returns {Yaio.AbstractNodeDBDriver}    connection
     */
    me.getConnection = function(key) {
        return me.connections[key];
    };

    /**
     * set data for the connection
     * @param {String} key                 key of the connection
     * @param {Yaio.AbstractNodeDBDriver}  connection
     */
    me.addConnection = function(key, connection) {
        me.connections[key] = connection;
    };

    /**
     * connect the service
     * @param {String} key                             key of the connection
     * @returns {JQueryPromise<T>|JQueryPromise<*>}    promise if connect succeed or failed
     */
    me.connectService = function(key) {
        me.currentConnection = undefined;
        if (typeof me.connections[key] === 'function') {
            me.currentConnection = me.connections[key]();
        } else {
            me.currentConnection = me.connections[key];
        }
        me.appBase.configureService('YaioAccessManager', function () {
            return me.currentConnection.getAccessManager();
        });
        return me.currentConnection.connectService();
    };

    /**
     * get data for the current connection
     * @returns {Yaio.AbstractNodeDBDriver}    connection
     */
    me.getCurrentConnection = function() {
        return me.currentConnection;
    };

    me._init();
    
    return me;
};

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

    /**
     * initialize the object
     */
    me._init = function() {
    };
    
    me._init();
    
    return me;
};

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

    /**
     * connect the dataservice
     * - load uploaded jsonfile from #yaioLoadJSONFile
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
        var handleLoadJSONFileSelectHandler = function handleLoadJSONFileSelect(evt) {
            var files = evt.target.files; // FileList object
            var reader = new FileReader();

            if (files.length === 1) {
                var file = files[0];

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

                    dfd.resolve('OK');
                };

                // read the file
                reader.readAsText(file);
            }
        };
        
        // initFileUploader
        var fileDialog = document.getElementById('yaioLoadJSONFile');
        fileDialog.addEventListener('change', handleLoadJSONFileSelectHandler, false);
        me.$( '#yaioloadjsonuploader-box' ).dialog({
            modal: true,
            width: '200px',
            buttons: {
              'Schließen': function() {
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
        return Yaio.FileAccessManager(me.appBase, me.config);
    };
    
    me._init();
    
    return me;
};

/**
 * default-configuration for current Yaio.FileNodeDBDriver-datasource
 * @param {String} urlBase                   desc of the current datasource (to connect if url)
 * @param {String} name                      name of the current datasource
 * @param {String} desc                      desc of the current datasource
 * @returns {Yaio.FileNodeDBDriverConfig}    an config-instance
 * @augments JsHelferlein.ConfigBase
 * @constructor
 */
Yaio.FileNodeDBDriverConfig = function(urlBase, name, desc) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ConfigBase();
    
    me.urlBase                      = urlBase || window.location.host;
    me.name                         = name || ('Dateiupload');
    me.desc                         = desc || ('Daten werden aus einer Yaio-JSON-Datei geladen.');
    me.plantUmlBaseUrl              = 'http://www.plantuml.com/';
    me.excludeNodePraefix           = 'Sys* *Templ MyStart MyHelp JsUnitTest JsFuncTest JUnitTest';
    me.masterSysUId                 = 'MasterplanMasternode1';

    return me;
};
/**
 * service-functions to connect/load/save... to current node-datasource
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @param {JsHelferlein.ConfigBase} config         config to use
 * @param {JsHelferlein.ConfigBase} defaultConfig  default to merge with config
 * @returns {Yaio.NodeRepository}                   an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.NodeRepository = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase, config, defaultConfig);

    /**
     * initialize the object
     */
    me._init = function() {
        me.AccessManager = null;
    };

    /**
     * return the accessmanager for this service
     * @returns {Yaio.AccessManager}    instance of Yaio.AccessManager
     */
    me.getAccessManager = function() {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().getAccessManager();
    };
    
    /**
     * load the data of the node (own, parent, children)
     * use promise as described on https://github.com/mar10/fancytree/wiki/TutorialLoadData#user-content-use-a-deferred-promise
     * @param {String} nodeId     id of the node to load data for
     * @returns {JQueryPromise<T>|JQueryPromise<*>|Object}    Object or JQueryPromise for FancyTree
     */
    me.loadNodeData = function(nodeId) {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().loadNodeData(nodeId);
    };

    /**
     * connect the dataservice
     * @returns {JQueryPromise<T>|JQueryPromise<*>}    promise if connect succeed or failed
     */
    me.connectService = function() {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().connectService();
    };

    /**
     * update my config (this instance of NodeDataConfig)
     * @param {Object} yaioCommonApiConfig  Common Api Config from yaio-server
     */
    me.configureDataService = function(yaioCommonApiConfig) {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().configureDataService(yaioCommonApiConfig);
    };

    /**
     * update appBase-config (plantUmlBaseUrl, masterSysUId, excludeNodePraefix) with my config (this instance of NodeDataConfig)
     */
    me.reconfigureBaseApp = function() {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().reconfigureBaseApp();
    };


    /**
     * read all available templates from configured parents accessmanager.systemTemplateId, accessmanager.ownTemplateId
     * @return {Promise}     with obj { systemTemplates: [], ownTemplates: [] }
     */
    me.getAvailableTemplates = function() {
        var msg = 'getAvailableTemplates';
        console.log(msg + ' START');

        var promiseHelper = me.appBase.get('YaioPromiseHelper').createAngularPromiseHelper();
        var ajaxCall = function () {
            return promiseHelper.getHttpPromiseMock();
        };
        var angularResponse = {
            data: {systemTemplates: [], ownTemplates: []}
        };

        var systemTemplateId = me.getAccessManager().getAvailiableNodeAction('systemTemplateId'); 
        var ownTemplateId = me.getAccessManager().getAvailiableNodeAction('ownTemplateId');
        if (systemTemplateId) {
            me.getNodeById(systemTemplateId, {})
            .then(function sucess(systemAngularResponse) {
                // handle success: systemTemplates
                angularResponse.data = {systemTemplates: systemAngularResponse.data.childNodes, ownTemplates: []};
                if (! ownTemplateId) {
                    // return only mine
                    console.log(msg + ' response:', angularResponse);
                    promiseHelper.resolve(angularResponse);
                }
                
                // load own templates
                me.getNodeById(ownTemplateId, {})
                    .then(function sucess(ownAngularResponse) {
                        // handle success: ownTemplates
                        angularResponse.data = {systemTemplates: systemAngularResponse.data.childNodes, 
                            ownTemplates: ownAngularResponse.data.childNodes};
                        console.log(msg + ' response:', angularResponse);
                        promiseHelper.resolve(angularResponse);
                    }, function error() {
                        console.log(msg + 'error response:', angularResponse);
                        promiseHelper.resolve(angularResponse);
                    });
            }, function error() {
                console.log(msg + 'error response:', angularResponse);
                promiseHelper.resolve(angularResponse);
            });
        } else  {
            // no templates configured
            promiseHelper.resolve(angularResponse);
        }

        return ajaxCall();
    };

    /**
     * get symlinked nodedata for basenode
     * @param {Object} basenode                           node-data to get symlink-data
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if read succeed or failed with parameters { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me.getNodeForSymLink = function(basenode) {
        var msg = 'getNodeForSymLink for node:' + basenode.sysUID + ' symlink:' + basenode.symLinkRef;
        console.log(msg + ' START');
        return me._getNodeForSymLink(basenode);
    };

    /**
     * update node with values in json
     * @param {String} nodeId                             nodeId to update
     * @param {String} json                               json with the update-values
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if update succeed or failed  { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me.updateNode = function(nodeId, json) {
        var msg = 'updateNode for nodeId:' + nodeId;
        console.log(msg + ' START');
        return me._updateNode(nodeId, json);
    };

    /**
     * move node to newParentKey at position newPos
     * @param {String} nodeId                             nodeId to move
     * @param {String} newParentKey                       nodeId of the new parent
     * @param {int} newPos                                sort-position in parents childList
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if update succeed or failed { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me.moveNode = function(nodeId, newParentKey, newPos) {
        var msg = 'moveNode for nodeId:' + nodeId + ' newParentKey:' + newParentKey + ' newPos:' + newPos;
        console.log(msg + ' START');
        return me._moveNode(nodeId, newParentKey, newPos);
    };

    /**
     * copy node to newParentKey
     * @param {String} nodeId                             nodeId to copy
     * @param {String} newParentKey                       nodeId of the new parent
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if update succeed or failed { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me.copyNode = function(nodeId, newParentKey) {
        var msg = 'copyNode for nodeId:' + nodeId + ' newParentKey:' + newParentKey;
        console.log(msg + ' START');
        return me._copyNode(nodeId, newParentKey);
    };

    /**
     * delete node
     * @param {String} nodeId                             nodeId to delete
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if delete succeed or failed { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me.deleteNode = function(nodeId) {
        var msg = 'deleteNode for nodeId:' + nodeId;
        console.log(msg + ' START');
        return me._deleteNode(nodeId);
    };

    /**
     * save (create/update) node
     * @param {Object} nodeObj                            node with values to save
     * @param {Object} options                            options
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if save succeed or failed
     */
    me.saveNode = function(nodeObj, options) {
        var msg = 'saveNode for node:' + nodeObj.sysUID;
        console.log(msg + ' START');
        return me._saveNode(nodeObj, options);
    };

    /**
     * read node
     * @param {String} nodeId                             nodeId to read
     * @param {Object} options                            options
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if read succeed or failed
     */
    me.getNodeById = function(nodeId, options) {
        var msg = 'getNodeById for node:' + nodeId;
        console.log(msg + ' START');
        return me._getNodeById(nodeId, options);
    };

    /**
     * search node
     * @param {Object} searchOptions                      filters and sorts...
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if search succeed or failed
     */
    me.searchNode = function(searchOptions) {
        var msg = 'searchNode for searchOptions:' + searchOptions;
        console.log(msg + ' START');
        return me._searchNode(searchOptions);
    };

    /**
     * implementation of: get symlinked nodedata for basenode
     * @param {Object} basenode                           node-data to get symlink-data
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if read succeed or failed with parameters { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me._getNodeForSymLink = function(basenode) {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().getNodeForSymLink(basenode);
    };

    /**
     * implementation of: update node with values in json
     * @param {String} nodeId                             nodeId to update
     * @param {String} json                               json with the update-values
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if update succeed or failed  { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me._updateNode = function(nodeId, json) {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().updateNode(nodeId, json);
    };

    /**
     * implementation of: move node to newParentKey at position newPos
     * @param {String} nodeId                             nodeId to move
     * @param {String} newParentKey                       nodeId of the new parent
     * @param {int} newPos                                sort-position in parents childList
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if update succeed or failed { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me._moveNode = function(nodeId, newParentKey, newPos) {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().moveNode(nodeId, newParentKey, newPos);
    };

    /**
     * implementation of: copy node to newParentKey
     * @param {String} nodeId                             nodeId to copy
     * @param {String} newParentKey                       nodeId of the new parent
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if update succeed or failed { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me._copyNode = function(nodeId, newParentKey) {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().copyNode(nodeId, newParentKey);
    };

    /**
     * implementation of: patch node
     * @param {String} nodeId                             nodeId to copy
     * @param {String} url                                url to call
     * @param {String} json                               json to submit
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if update succeed or failed { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me._patchNode = function(nodeId, url, json) {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().patchNode(nodeId, url, json);
    };

    /**
     * implementation of delete node
     * @param {String} nodeId                             nodeId to delete
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if delete succeed or failed { yaioNodeActionResponse, textStatus, jqXhr}
     */
    me._deleteNode = function(nodeId) {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().deleteNode(nodeId);
    };

    /**
     * implementation of: save (create/update) node
     * @param {Object} nodeObj                            node with values to save
     * @param {Object} options                            options
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if save succeed or failed
     */
    me._saveNode = function(nodeObj, options) {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().saveNode(nodeObj, options);
    };

    /**
     * implementation of: read node
     * @param {String} nodeId                             nodeId to read
     * @param {Object} options                            options
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if read succeed or failed
     */
    me._getNodeById = function(nodeId, options) {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().getNodeById(nodeId, options);
    };

    /**
     * implementation of: search node
     * @param {Object} searchOptions                      filters and sorts...
     * @returns {JQueryPromise<T>|JQueryDeferred<T>|any}  promise if search succeed or failed
     */
    me._searchNode = function(searchOptions) {
        return me.appBase.YaioDataSourceManager.getCurrentConnection().searchNode(searchOptions);
    };

    me._init();
    
    return me;
};

/**
 * service-functions to get actions, urls, flags... available and configured for the current server-datasource
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @param {JsHelferlein.ConfigBase} config         config to use
 * @param {JsHelferlein.ConfigBase} defaultConfig  default to merge with config
 * @returns {Yaio.ServerAccessManager}             an service-instance
 * @augments Yaio.AccessManager
 * @constructor
 */
Yaio.ServerAccessManager = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = Yaio.AccessManager(appBase, config, defaultConfig);

    /**
     * initialize/configure AccessManager
     */
    me._init = function() {
        // urls
        me.setAvailiableNodeAction('show', me.config.restShowUrl);
        me.setAvailiableNodeAction('createsymlink', me.config.restSymLinkUrl);
        me.setAvailiableNodeAction('edit', me.config.restUpdateUrl);
        me.setAvailiableNodeAction('create', me.config.restCreateUrl);
        me.setAvailiableNodeAction('move', me.config.restMoveUrl);
        me.setAvailiableNodeAction('copy', me.config.restCopyUrl);
        me.setAvailiableNodeAction('remove', me.config.restRemoveUrl);
        me.setAvailiableNodeAction('search', me.config.restSearchUrl);
        me.setAvailiableNodeAction('dashboard', '#/dashboard');

        if (me.config.dmsAvailable) {
            me.setAvailiableNodeAction('dmsDownload', me.config.dmsDownloadUrl);
            me.setAvailiableNodeAction('dmsEmbed', me.config.dmsEmbedUrl);
            me.setAvailiableNodeAction('dmsIndexDownload', me.config.dmsIndexDownloadUrl);
            me.setAvailiableNodeAction('dmsIndexEmbed', me.config.dmsIndexEmbedUrl);
        }

        me.setAvailiableNodeAction('syshelp', me.config.restExportsBaseUrl + 'documentation/SysHelp1');
        me.setAvailiableNodeAction('sysinfo', me.config.restExportsBaseUrl + 'documentation/SysInfo1');
        me.setAvailiableNodeAction('frontpagebaseurl', me.config.restExportsBaseUrl + 'htmlfrontpagefragment/');
        me.setAvailiableNodeAction('logout', '#/logout/logout');
//        me.setAvailiableNodeAction('logout', me.config.restLogoutUrl);
        
        // configure parentIds of the available templates
        me.setAvailiableNodeAction('ownTemplateId', 'OwnTempl1');
        me.setAvailiableNodeAction('systemTemplateId', 'SysTempl1');

        // flags
        me.setAvailiableNodeAction('showsysdata', true);
        me.setAvailiableNodeAction('print', true);
        me.setAvailiableNodeAction('urlResFileUploadAvailable', me.config.dmsAvailable);
        me.setAvailiableNodeAction('urlResWebshotAvailable', me.config.webshotAvailable);
        me.setAvailiableNodeAction('urlResIndexingAvailable', me.config.metaextractAvailable);

        // import-forms
        me.setAvailiableImportForm('ImportWiki', '/imports/wiki/');
        me.setAvailiableImportForm('ImportJson', '/imports/json/');

        // export-forms
        me.setAvailiableExportForm('ExportWiki', me.config.restExportsBaseUrl + 'wikiuseoptions/');
        me.setAvailiableExportForm('ExportMindmap', me.config.restExportsBaseUrl + 'mindmapuseoptions/');
        me.setAvailiableExportForm('ExportICal', me.config.restExportsBaseUrl + 'icaluseoptions/');
        me.setAvailiableExportForm('ExportHtml', me.config.restExportsBaseUrl + 'htmluseoptions/');
        me.setAvailiableExportForm('ExportExcel', me.config.restExportsBaseUrl + 'exceluseoptions/');
        me.setAvailiableExportForm('ExportCsv', me.config.restExportsBaseUrl + 'csvuseoptions/');

        // export-links
        me.setAvailiableExportLink('ExportYaioAppDirect', me.config.restExportsBaseUrl + 'yaioapp/');
        me.setAvailiableExportLink('ExportWikiDirect', me.config.restExportsBaseUrl + 'wiki/');
        me.setAvailiableExportLink('ExportMindmapDirect', me.config.restExportsBaseUrl + 'mindmap/');
        me.setAvailiableExportLink('ExportHtmlDirect', me.config.restExportsBaseUrl + 'html/');
        me.setAvailiableExportLink('ExportHtmlDocumentationDirect', me.config.restExportsBaseUrl + 'documentation/');
        me.setAvailiableExportLink('ExportICalDirect', me.config.restExportsBaseUrl + 'ical/');
        me.setAvailiableExportLink('ExportICalEventsDirect', me.config.restExportsBaseUrl + 'icalevents/');
        me.setAvailiableExportLink('ExportICalTasksDirect', me.config.restExportsBaseUrl + 'icaltasks/');
        me.setAvailiableExportLink('ExportICalTasksTodoDirect', me.config.restExportsBaseUrl + 'icaltaskstodo/');
        me.setAvailiableExportLink('ExportICalTasksLateDirect', me.config.restExportsBaseUrl + 'icaltaskslate/');
        me.setAvailiableExportLink('ExportExcelDirect', me.config.restExportsBaseUrl + 'excel/');
        me.setAvailiableExportLink('ExportCsvDirect', me.config.restExportsBaseUrl + 'csv/');
        me.setAvailiableExportLink('ExportJsonDirect', me.config.restExportsBaseUrl + 'json/');
        me.setAvailiableExportLink('ExportPplDirect', me.config.restExportsBaseUrl + 'ppl/');
    };

    me._init();
    
    return me;
};

/**
 * service-functions connect/save/retrieve data from yaio-server-datasource
 * @param {YaioAppBase} appBase                          the appbase to get other services
 * @param {Yaio.ServerNodeDBDriverConfig} config         config to use
 * @param {Yaio.ServerNodeDBDriverConfig} defaultConfig  default to merge with config
 * @returns {Yaio.ServerNodeDBDriver}                    an service-instance
 * @augments Yaio.AbstractNodeDBDriver
 * @constructor
 */
Yaio.ServerNodeDBDriver = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = Yaio.AbstractNodeDBDriver(appBase, config, defaultConfig);

    /**
     * initialize the object
     */
    me._init = function() {
    };

    /**
     * load the data of the node (own, parent, children)
     * use promise as described on https://github.com/mar10/fancytree/wiki/TutorialLoadData#user-content-use-a-deferred-promise
     * @param {String} nodeId     id of the node to load data for
     * @returns {JQueryPromise<T>|JQueryPromise<*>|Object}    Object or JQueryPromise for FancyTree
     */
    me.loadNodeData = function(nodeId) {
        console.log('load data for node:' + nodeId);
        return { 
            url: me.config.restShowUrl + nodeId, 
            cache: false 
        };
    };

    /**
     * connect the dataservice
     * - load config from server
     * - updateServiceConfig
     * - updateAppConfig
     * @returns {JQueryPromise<T>|JQueryPromise<*>}    promise if connect succeed or failed
     */
    me.connectService = function() {
        var res = me._loadConfig();
        return res;
    };

    /**
     * update my config (this instance of ServerNodeDBDriverConfig)
     * @param {Object} yaioCommonApiConfig  Common Api Config from yaio-server
     */
    me.configureDataService = function(yaioCommonApiConfig) {
        if (yaioCommonApiConfig) {
            var msg = 'configureService for yaio';
            console.log(msg + ' with:', yaioCommonApiConfig);
            
            // base
            me.config.name               = yaioCommonApiConfig.yaioInstanceName;
            // dont overwrite configured url, maybe its tunneled: me.config.urlBase            = yaioCommonApiConfig.yaioInstanceUrl;
            me.config.desc               = yaioCommonApiConfig.yaioInstanceDesc;
            me.config.updateConfig();
            
            // options
            me.config.masterSysUId       = yaioCommonApiConfig.yaioMastersysuid;
            me.config.excludeNodePraefix = yaioCommonApiConfig.yaioExportcontrollerExcludenodepraefix;
            me.config.excludeNodePraefix = (!me.appBase.DataUtils.isUndefined(me.config.excludeNodePraefix) ?
                me.config.excludeNodePraefix.replace(/%/g, '*') : 'nothing');

            // services
            me.config.plantUmlBaseUrl    = yaioCommonApiConfig.plantUmlBaseUrl;

            me.config.dmsAvailable       = yaioCommonApiConfig.dmsAvailable;
            me.config.webshotAvailable   = yaioCommonApiConfig.webshotAvailable;
            me.config.metaextractAvailable = yaioCommonApiConfig.metaextractAvailable;

            console.log(msg + ' to:', me.config);
        }
    };
    
    /*****************************************
     *****************************************
     * Service-Funktions (webservice)
     *****************************************
     *****************************************/

    /**
     * @inheritdoc
     */
    me.updateNode = function(nodeId, json) {
        var url = me.config.restUpdateUrl + nodeId;
        return me.patchNode(nodeId, url, json);
    };

    /**
     * @inheritdoc
     */
    me.moveNode = function(nodeId, newParentKey, newPos) {
        var json = JSON.stringify({parentNode: newParentKey});
        var url = me.config.restMoveUrl + nodeId + '/' + newParentKey + '/' + newPos;
        return me.patchNode(nodeId, url, json);
    };

    /**
     * @inheritdoc
     */
    me.copyNode = function(nodeId, newParentKey) {
        var json = JSON.stringify({parentNode: newParentKey});
        var url = me.config.restCopyUrl + nodeId + '/' + newParentKey;
        return me.patchNode(nodeId, url, json);
    };

    /**
     * @inheritdoc
     */
    me.patchNode = function(nodeId, url, json) {
        var svcLogger = me.appBase.get('Logger');

        var msg = '_patchNode for nodeId:' + nodeId;
        console.log(msg + ' CALL: ' + 'url: '+ url + ' with:' + json);
        return me.$.ajax({
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            xhrFields : {
                // for CORS
                withCredentials : true
            },
            url : url,
            type : 'PATCH',
            data : json,
            error : function(jqXHR, textStatus, errorThrown) {
                // log the error to the console
                svcLogger.logError('The following error occured: ' + textStatus + ' ' + errorThrown, true);
                svcLogger.logError('cant save nodeId:' + nodeId + ' error:' + textStatus);
            },
            complete : function() {
                console.log('update nodeId:' + nodeId + ' ran');
            }
        });
    };

    /**
     * @inheritdoc
     */
    me.getNodeForSymLink = function(basenode) {
        var svcLogger = me.appBase.get('Logger');

        var msg = '_getNodeForSymLink for node:' + basenode.sysUID + ' symlink:' + basenode.symLinkRef;
        console.log(msg + ' START');
        var url = me.config.restSymLinkUrl + basenode.symLinkRef;
        return me.$.ajax({
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            xhrFields : {
                // for CORS
                withCredentials : true
            },
            url : url,
            type : 'GET',
            error : function(jqXHR, textStatus, errorThrown) {
                // log the error to the console
                svcLogger.logError('ERROR  ' + msg + ' The following error occured: ' + textStatus + ' ' + errorThrown, false);
                svcLogger.logError('cant load ' + msg + ' error:' + textStatus, true);
            },
            complete : function() {
                console.log('completed load ' + msg);
            }
        });
    };

    /**
     * @inheritdoc
     */
    me.deleteNode = function(nodeId) {
        var svcLogger = me.appBase.get('Logger');

        var msg = '_deleteNode node:' + nodeId;
        var url = me.config.restRemoveUrl + nodeId;
        console.log(msg + ' START: with:' + url);
        return me.$.ajax({
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            xhrFields : {
                // for CORS
                withCredentials : true
            },
            url: url,
            type: 'DELETE',
            error: function(jqXHR, textStatus, errorThrown) {
                // log the error to the console
                svcLogger.logError('The following error occured: ' + textStatus + ' ' + errorThrown, false);
                svcLogger.logError('cant remove node:' + nodeId + ' error:' + textStatus, true);
            },
            complete: function() {
                console.log('remove node:' + nodeId + ' ran');
            }
        });
    };

    /**
     * @inheritdoc
     */
    me.saveNode = function(nodeObj, options) {
        var svcLogger = me.appBase.get('Logger');

        var msg = '_saveNode node: ' + options.mode + ' ' + nodeObj.sysUID;
        console.log(msg + ' START');
        // branch depending on mode
        var method, url, json, ajaxCall, formData;
        
        if (options.mode === 'create') {
            // unset sysUID
            nodeObj.sysUID = null;
        }

        // special case UrlResNode because of multipart-uploads
        var flgMultiPart = false;
        if (options.className === 'UrlResNode') {
            // UrlResNod set formdata for multipart-uploads
            flgMultiPart = true;
            
            // create formadata
            formData = new FormData();
            formData.append('node', new Blob([JSON.stringify(nodeObj)], {
                                                type: 'application/json'
                                            })
            );
            
            // add uploadfile only if set
            formData.append('uploadFile', options.uploadFile ? options.uploadFile : '');
        } else {
            // default: json-request: add nodeObj
            formData = nodeObj;
        }
        
        if (options.mode === 'edit') {
            // mode update 
            method = 'PATCH';
            url = me.config.restUpdateUrl + options.className + '/' + options.sysUID;
            ajaxCall = function () {
                // hack because shortcut .patch not exists yet in angular-version
                var http = me.appBase.get('Angular.$http');
                var httpOptions = {
                        method: method, 
                        url: url, 
                        data: formData, 
                        withCredentials: true 
                };
                if (flgMultiPart) {
                    // spring accepts no fileuploads for PATCH
                    httpOptions.method = 'POST';
                    httpOptions.headers = {'Content-Type': undefined};
                    httpOptions.transformRequest = angular.identity;
                }
                return http(httpOptions);
            };
        } else if (options.mode === 'create') {
            // mode create 
            method = 'POST';
            url = me.config.restCreateUrl + options.className + '/' + options.sysUID;
            
            ajaxCall = function () {
                var http = me.appBase.get('Angular.$http');
                var httpOptions = {
                        method: method, 
                        url: url, 
                        data: formData, 
                        withCredentials: true 
                };
                if (flgMultiPart) {
                    httpOptions.headers = {'Content-Type': undefined};
                    httpOptions.transformRequest = angular.identity;
                }
                return http(httpOptions);
            };
        } else {
            // unknown mode
            svcLogger.logError('unknown mode=' + options.mode + ' form formName=' + options.formName, false);
            return null;
        }

        // define json for common fields
        json = JSON.stringify(nodeObj);
        
        // do http
        console.log(msg + ' CALL url:' + url + ' data:' + json);
        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me.getNodeById = function(nodeId, options) {
        var msg = '_getNodeById node: ' + nodeId + ' options:' + options;
        console.log(msg + ' START');
        var restBaseUrl = me.config.restShowUrl;
        if (options.flgNodeByAllId) {
            restBaseUrl = me.config.restSymLinkUrl;
        }
        var url = restBaseUrl + nodeId;
        var ajaxCall = function () {
            return me.appBase.get('Angular.$http').get(url);
        };
        
        // do http
        console.log(msg + ' CALL url:' + url);
        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me.searchNode = function(searchOptions) {
        var msg = '_searchNode searchOptions: ' + searchOptions;
        var uri = encodeURI(searchOptions.curPage)
            + '/' + encodeURI(searchOptions.pageSize)
            + '/' + encodeURI(searchOptions.searchSort)
            + '/' + encodeURI(searchOptions.baseSysUID)
            + '/';

        // no empty fulltext for webservice -> we use there another route 
        if (searchOptions.fulltext && searchOptions.fulltext.length > 0) {
            uri = uri + encodeURI(searchOptions.fulltext) + '/';
        }
        
        // copy availiable serverSearchOptions
        var serverSearchOptions = {};
        var searchFields = ['strTypeFilter', 'strReadIfStatusInListOnly', 'maxEbene', 'strClassFilter', 'strWorkflowStateFilter', 
            'strNotNodePraefix', 'flgConcreteToDosOnly', 'strMetaNodeTypeTagsFilter', 'strMetaNodeSubTypeFilter'];
        var searchField;
        for (var idx = 0; idx < searchFields.length; idx++) {
            searchField = searchFields[idx];
            if (searchOptions.hasOwnProperty(searchField)) {
                serverSearchOptions[searchField] = searchOptions[searchField];
            }
        }
        if (serverSearchOptions.hasOwnProperty('strNotNodePraefix')) {
            // replace * with sql %
            serverSearchOptions.strNotNodePraefix = serverSearchOptions.strNotNodePraefix.replace(/\*/g, '%');
        }
        if (serverSearchOptions.hasOwnProperty('strMetaNodeTypeTagsFilter')) {
            // replace space with ,
            serverSearchOptions.strMetaNodeTypeTagsFilter = serverSearchOptions.strMetaNodeTypeTagsFilter.replace(/ /g, ',');
        }

        // load data
        var url = me.config.restSearchUrl + uri;
        var ajaxCall = function () {
            return me.appBase.get('Angular.$http').post(url, serverSearchOptions, {
                    withCredentials: true,
                    headers : {
                        'content-type' : 'application/json;charset=utf-8'
                    }
                });
        };
        
        // do http
        console.log(msg + ' CALL url:' + url);
        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me.loginToService = function(credentials) {
        var msg = '_loginToService for credentials:' + credentials;
        console.log(msg + ' START');

        // load data
        var url = me.config.restLoginUrl;
        var ajaxCall = function () {
            return me.appBase.get('Angular.$http').post(url, $.param(credentials),
                {
                    headers : {
                        'content-type' : 'application/x-www-form-urlencoded'
                    }
                });
        };
        
        // do http
        console.log(msg + ' CALL url:' + url);
        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me.logoutFromService = function(session) {
        var msg = '_logoutFromService for session' + session;
        console.log(msg + ' START');

        // load data
        var url = me.config.restLogoutUrl;
        var ajaxCall = function () {
            return me.appBase.get('Angular.$http').post(url, $.param({}), {withCredentials: true});
        };
        
        // do http
        console.log(msg + ' CALL url:' + url);
        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me.checkSession = function(session) {
        var msg = '_checkSession for session:' + session;
        console.log(msg + ' START');

        // load data
        var url = me.config.restCheckUserUrl + '?' + (new Date()).getTime();
        var ajaxCall = function () {
            return me.appBase.get('Angular.$http').get(url);
        };
        
        // do http
        console.log(msg + ' CALL url:' + url);
        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me._createAccessManager = function() {
        return Yaio.ServerAccessManager(me.appBase, me.config);
    };

    /**
     * TODO
     * @returns {JQueryPromise<T>|JQueryPromise<*>}
     * @private
     */
    me._loadConfig = function() {
        // return promise
        var dfd = new $.Deferred();
        var res = dfd.promise();

        // load config from server
        var resConfig = me._loadConfigFromServer();
        resConfig.done(function(yaioCommonApiConfig, textStatus, jqXhr ) {
            var msg = '_loadConfig for yaio';
            console.log(msg + ' done');
            // update config
            me.configureDataService(yaioCommonApiConfig);
            me.reconfigureBaseApp();

            // resolve promise
            dfd.resolve('OK');
        });

        return res;
    };

    /**
     * TODO
     * @returns {*|JQueryXHR|{xhrFields}}
     * @private
     */
    me._loadConfigFromServer = function() {
        var svcLogger = me.appBase.get('Logger');

        var url = me.config.configUrl;
        var msg = '_loadConfigFromServer for yaio:' + url;
        console.log(msg + ' START');
        return me.$.ajax({
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            xhrFields : {
                // for CORS
                withCredentials : true
            },
            url : url,
            type : 'GET',
            error : function(jqXHR, textStatus, errorThrown) {
                // log the error to the console
                svcLogger.logError('ERROR  ' + msg + ' The following error occured: ' + textStatus + ' ' + errorThrown, false);
                svcLogger.logError('cant load ' + msg + ' error:' + textStatus, true);
            },
            complete : function() {
                console.log('completed load ' + msg);
            }
        });
    };

    me._init();
    
    return me;
};

/**
 * default-configuration for current Yaio.ServerNodeDBDriver-datasource
 * @param {String} urlBase                   desc of the current datasource (to connect if url)
 * @param {String} name                      name of the current datasource
 * @param {String} desc                      desc of the current datasource
 * @returns {Yaio.ServerNodeDBDriverConfig}  an config-instance
 * @augments JsHelferlein.ConfigBase
 * @constructor
 */
Yaio.ServerNodeDBDriverConfig = function(urlBase, name, desc) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ConfigBase();
    
    me.urlBase                      = urlBase || (window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : ''));
    me.name                         = name || ('Server: ' + window.location.host);
    me.desc                         = desc || ('Daten werden vom aktuellen Server ' + window.location.host + ' geladen.');
    me.configUrl                    = me.urlBase + '/apiconfig/commonApiConfig';

    /**
     * initialize the object
     */
    me._init = function() {
        me.updateConfig();
    };

    /**
     * initialize the object
     */
    me.updateConfig = function() {
        // REST login
        me.restLoginUrl                 = me.urlBase + '/login';
        me.restLogoutUrl                = me.urlBase + '/logout';
        me.restCheckUserUrl             = me.urlBase + '/user/current';
        
        // REST actions
        me.restBaseUrl                  = me.urlBase + '/nodes/';
        me.restShowUrl                  = me.restBaseUrl + 'show/';
        me.restSymLinkUrl               = me.restBaseUrl + 'showsymlink/';
        me.restUpdateUrl                = me.restBaseUrl + 'update/';
        me.restCreateUrl                = me.restBaseUrl + 'create/';
        me.restMoveUrl                  = me.restBaseUrl + 'move/';
        me.restCopyUrl                  = me.restBaseUrl + 'copy/';
        me.restRemoveUrl                = me.restBaseUrl + 'delete/';
        me.restSearchUrl                = me.restBaseUrl + 'search/';
        me.restExportsBaseUrl           = me.urlBase + '/exports/';
        
        // dms
        me.dmsDownloadUrl               = me.urlBase + '/dms/download/';
        me.dmsEmbedUrl                  = me.urlBase + '/dms/embed/';
        me.dmsIndexDownloadUrl          = me.urlBase + '/dms/indexdownload/';
        me.dmsIndexEmbedUrl             = me.urlBase + '/dms/indexembed/';
    };
    
    me._init();
    
    return me;
};
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
        me.setAvailiableNodeAction('edit', true);
        me.setAvailiableNodeAction('create', true);
        me.setAvailiableNodeAction('move', true);
        me.setAvailiableNodeAction('remove', true);
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

    me._init();
    
    return me;
};

/**
 * service-functions connect/save/retrieve data from static-datasource ({Object} window.yaioStaticJSON)
 * @param {YaioAppBase} appBase                          the appbase to get other services
 * @param {Yaio.ServerNodeDBDriverConfig} config         config to use
 * @param {Yaio.ServerNodeDBDriverConfig} defaultConfig  default to merge with config
 * @returns {Yaio.StaticNodeDBDriver}                    an service-instance
 * @augments Yaio.AbstractNodeDBDriver
 * @constructor
 */
Yaio.StaticNodeDBDriver = function(appBase, config, defaultConfig) {
    'use strict';

    // my own instance
    var me = Yaio.AbstractNodeDBDriver(appBase, config, defaultConfig);
    
    me.flgDataLoaded = false;

    /**
     * initialize the object
     */
    me._init = function() {
    };

    /**
     * load the data of the node (own, parent, children)
     * @param {String} nodeId     id of the node to load data for
     * @returns {JQueryPromise<T>|JQueryPromise<*>}
     */
    me.loadNodeData = function(nodeId) {
        // use promise as described on https://github.com/mar10/fancytree/wiki/TutorialLoadData#user-content-use-a-deferred-promise
        console.log('load data for node:' + nodeId);
        var nodeActionResponse = me._getNodeActionResponseById(nodeId);
        var fancyTreeResponse = { response: nodeActionResponse};
        me.appBase.get('YaioExplorerTree').postProcessNodeData({}, fancyTreeResponse);
        
        var dfd = new $.Deferred();
        var res = dfd.promise();
        dfd.resolve(fancyTreeResponse.result);

        return res;
    };

    /**
     * connect the dataservice
     * - load static json from window.yaioStaticJSO
     * - updateServiceConfig
     * - updateAppConfig
     * - load initial data)
     * @returns {JQueryPromise<T>|JQueryPromise<*>}    promise if connect succeed or failed
     */
    me.connectService = function() {
        // update serviceconfig
        me.configureDataService();
        me.reconfigureBaseApp();
        
        // load data
        me._loadStaticJson(JSON.stringify(window.yaioStaticJSON));

        // return promise
        var dfd = new $.Deferred();
        var res = dfd.promise();
        dfd.resolve('OK');
        return res;
    };

    /**
     * update my config (this instance of StaticNodeDBDriverConfig)
     * @param {Object} yaioCommonApiConfig  Common Api Config from yaio-server
     */
    me.configureDataService = function(yaioCommonApiConfig) {
    };

    me.exportNodeActionResponseJSONById = function(nodeId) {
        return JSON.stringify(me._exportNodeActionResponseById(nodeId));
    };
    
    /*****************************************
     *****************************************
     * Service-Funktions (webservice)
     *****************************************
     *****************************************/

    /**
     * @inheritdoc
     */
    me.moveNode = function(nodeId, newParentKey, newPos) {
        //var msg = '_moveNode for nodeId:' + nodeId + ' newParentKey:' + newParentKey + ' newPos:' + newPos;

        var node = me.appBase.get('YaioStaticNodeDataStore').moveNode(nodeId, newParentKey, newPos);

        // create response for
        var nodeActionResponse = me._getNodeActionResponseById(node.sysUID);

        var dfd = new $.Deferred();
        var res = dfd.promise();
        dfd.resolve(nodeActionResponse);

        return res;
    };

    /**
     * @inheritdoc
     */
    me.deleteNode = function(nodeId) {
        var node = me._getNodeDataById(nodeId, true);
        me.appBase.get('YaioStaticNodeDataStore').removeNodeById(nodeId);
        
        // create response for parent
        var nodeActionResponse = me._getNodeActionResponseById(node.parentId);

        var dfd = new $.Deferred();
        var res = dfd.promise();
        dfd.resolve(nodeActionResponse);

        return res;
    };

    /**
     * @inheritdoc
     */
    me.getNodeForSymLink = function(basenode) {
        var msg = '_getNodeForSymLink for node:' + basenode.sysUID + ' symlink:' + basenode.symLinkRef;
        console.log(msg + ' START');
        var nodeActionResponse = me._getNodeActionResponseById(basenode.symLinkRef);

        var dfd = new $.Deferred();
        var res = dfd.promise();
        dfd.resolve(nodeActionResponse);

        return res;
    };

    /**
     * @inheritdoc
     */
    me.getNodeById = function(nodeId, options) {
        var msg = '_getNodeById node: ' + nodeId + ' options:' + options;
        console.log(msg + ' START');
        
        // mock the ajax-request
        var promiseHelper = me.appBase.get('YaioPromiseHelper').createAngularPromiseHelper();
        var ajaxCall = function () {
            return promiseHelper.getHttpPromiseMock();
        };
        var angularResponse = {
            data: me._getNodeActionResponseById(nodeId)
        };
        promiseHelper.resolve(angularResponse);
        
        // do http
        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me.saveNode = function(nodeObj, options) {
        var msg = '_saveNode node: ' + options.mode + ' ' + nodeObj.sysUID;
        console.log(msg + ' START:', nodeObj);

        var node = me.appBase.get('YaioStaticNodeDataStore').saveNode(nodeObj, options);

        // mock the ajax-request
        var promiseHelper = me.appBase.get('YaioPromiseHelper').createAngularPromiseHelper();
        var ajaxCall = function () {
            return promiseHelper.getHttpPromiseMock();
        };
        var angularResponse = {
            data: me._getNodeActionResponseById(node.sysUID)
        };
        console.log(msg + ' response:', angularResponse);
        promiseHelper.resolve(angularResponse);

        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me.searchNode = function(searchOptions) {
        var msg = '_searchNode searchOptions: ' + searchOptions;
        
        var searchResponse = me.appBase.get('YaioStaticNodeDataStore').fulltextSearch(searchOptions);
        
        // mock the ajax-request
        var promiseHelper = me.appBase.get('YaioPromiseHelper').createAngularPromiseHelper();
        var ajaxCall = function () {
            return promiseHelper.getHttpPromiseMock();
        };
        var angularResponse = {
            data: searchResponse
        };
        console.log(msg + ' response:', angularResponse);
        promiseHelper.resolve(angularResponse);

        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me.loginToService = function(credentials) {
        var msg = '_loginToService for credentials:' + credentials;
        console.log(msg + ' START');

        // load data
        var promiseHelper = me.appBase.get('YaioPromiseHelper').createAngularPromiseHelper();
        var ajaxCall = function () {
            return promiseHelper.getHttpPromiseMock();
        };
        var angularResponse = {
            data: 'OK'
        };
        promiseHelper.resolve(angularResponse);
        
        // do http
        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me.logoutFromService = function(session) {
        var msg = '_logoutFromService for session' + session;
        console.log(msg + ' START');

        // load data
        var promiseHelper = me.appBase.get('YaioPromiseHelper').createAngularPromiseHelper();
        var ajaxCall = function () {
            return promiseHelper.getHttpPromiseMock();
        };
        var angularResponse = {
            data: 'OK'
        };
        promiseHelper.resolve(angularResponse);
        
        // do http
        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me.checkSession = function(session) {
        var msg = '_checkSession for session:' + session;
        console.log(msg + ' START');

        // load data
        var promiseHelper = me.appBase.get('YaioPromiseHelper').createAngularPromiseHelper();
        var ajaxCall = function () {
            return promiseHelper.getHttpPromiseMock();
        };
        var angularResponse = {
            data: 'OK'
        };
        promiseHelper.resolve(angularResponse);
        
        // do http
        return ajaxCall();
    };

    /**
     * @inheritdoc
     */
    me._createAccessManager = function() {
        return Yaio.StaticAccessManager(me.appBase, me.config);
    };

    me._loadStaticJson = function(json) {
        me.appBase.get('YaioStaticNodeDataStore').resetNodeList();
        me.flgDataLoaded = false;

        var yaioNodeActionReponse = JSON.parse(json);
        var masterNode = yaioNodeActionReponse.node;

        // create Masternode if not exists
        if (masterNode.sysUID !== me.appBase.config.masterSysUId) {
            masterNode = {
                'className': 'TaskNode',
                'name': 'Masterplan',
                'ebene': 0,
                'nodeDesc': 'Masternode of the Masterplan',
                'sysUID': me.appBase.config.masterSysUId,
                'sysChangeCount': 9,
                'sysCreateDate': 1411717226471,
                'sysChangeDate': 1429887836887,
                'metaNodePraefix': 'Masterplan',
                'metaNodeNummer': '1',
                'state': 'RUNNING',
                'type': 'RUNNING',
                'workflowState': 'RUNNING',
                'sortPos': 0,
                'childNodes': [yaioNodeActionReponse.node]
            };
        }
        me.appBase.get('YaioStaticNodeDataStore').loadStaticNodeData(masterNode);
        me.flgDataLoaded = true;
    };

    /**
     * TODO
     * @param nodeId
     * @param flgCopy
     * @private
     */
    me._getNodeDataById = function(nodeId, flgCopy) {
        return me.appBase.get('YaioStaticNodeDataStore').getNodeDataById(nodeId, flgCopy);
    };

    /**
     * TODO
     * @param nodeId
     * @param flgCopy
     * @returns {Array}
     * @private
     */
    me._getParentIdHierarchyById = function(nodeId, flgCopy) {
        if (flgCopy) {
            return JSON.parse(JSON.stringify(me._getParentIdHierarchyById(nodeId, false)));
        }

        var parentIdHirarchy = [];
        var node = me._getNodeDataById(nodeId, false);
        if (node && node.parentId && !me.appBase.DataUtils.isEmptyStringValue(node.parentId)) {
            parentIdHirarchy = me._getParentIdHierarchyById(node.parentId, true);
            parentIdHirarchy.push(node.parentId);
        }
        return parentIdHirarchy;
    };

    /**
     * TODO
     * @param nodeId
     * @param flgCopy
     * @returns {Array}
     * @private
     */
    me._getChildNodesById = function(nodeId, flgCopy) {
        // check for node
        var node = me._getNodeDataById(nodeId, false);
        if (! node) {
            return [];
        }

        // read nodes for childNodeIds
        var childNodes = [];
        for (var i = 0; i < node.childNodes.length; i++) {
            childNodes.push(me._getNodeDataById(node.childNodes[i], flgCopy));
        }

        return childNodes;
    };

    /**
     * TODO
     * @param nodeId
     * @returns {{state: string, stateMsg: string, node, parentIdHierarchy: Array, childNodes: Array}}
     * @private
     */
    me._getNodeActionResponseById = function(nodeId) {
        // extract data
        var nodeData = me._getNodeDataById(nodeId, true);
        var parentIdHierarchy = me._getParentIdHierarchyById(nodeId, false);
        var childNodes = me._getChildNodesById(nodeId, false);

        // add parentHierarchy
        var curNode = nodeData;
        while (curNode.parentId) {
            curNode.parentNode = me._getNodeDataById(curNode.parentId, true);
            curNode = curNode.parentNode;
        }

        // create response
        var nodeActionResponse = {
            state: 'OK',
            stateMsg: 'node "' +  nodeId + '" found',
            node: nodeData,
            parentIdHierarchy: parentIdHierarchy,
            childNodes: childNodes
        };
        if (! nodeData || ! parentIdHierarchy) {
            nodeActionResponse.state = 'ERROR';
            nodeActionResponse.stateMsg = 'node "' +  nodeId + '" not found';
        }

        return nodeActionResponse;
    };

    /**
     * TODO
     * @param nodeId
     * @returns {{state: string, stateMsg: string, node, parentIdHierarchy: Array}}
     * @private
     */
    me._exportNodeActionResponseById = function(nodeId) {
        // extract data
        var nodeData = me._exportNodeJSONById(nodeId);
        var parentIdHierarchy = me._getParentIdHierarchyById(nodeId, true);

        // create response
        var nodeActionResponse = {
            state: 'OK',
            stateMsg: 'node "' +  nodeId + '" found',
            node: nodeData,
            parentIdHierarchy: parentIdHierarchy
        };
        if (! nodeData || ! parentIdHierarchy) {
            nodeActionResponse.state = 'ERROR';
            nodeActionResponse.stateMsg = 'node "' +  nodeId + '" not found';
        }

        return nodeActionResponse;
    };

    /**
     * TODO
     * @param nodeId
     * @private
     */
    me._exportNodeJSONById = function(nodeId) {
        // extract data
        var node = me._getNodeDataById(nodeId, true);
        var childNodes = [];
        for (var i = 0; i < node.childNodes.length; i++) {
            childNodes.push(me._exportNodeJSONById(node.childNodes[i]));
        }
        node.childNodes = childNodes;

        return node;
    };

    me._init();
    
    return me;
};

/**
 * default-configuration for current Yaio.StaticNodeDBDriver-datasource
 * @param {String} urlBase                   unused
 * @param {String} name                      name of the current datasource
 * @param {String} desc                      desc of the current datasource
 * @returns {Yaio.StaticNodeDBDriverConfig}  an config-instance
 * @augments JsHelferlein.ConfigBase
 * @constructor
 */
Yaio.StaticNodeDBDriverConfig = function(urlBase, name, desc) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ConfigBase();
    
    me.urlBase                      = '';
    me.name                         = name || 'Statische InApp-Daten';
    me.desc                         = desc || 'Die statisch in der App hinterlegten Daten werden geladen.';
    me.plantUmlBaseUrl              = 'http://www.plantuml.com/';
    me.excludeNodePraefix           = 'Sys* *Templ MyStart MyHelp JsUnitTest JsFuncTest JUnitTest';
    me.masterSysUId                 = 'MasterplanMasternode1';

    return me;
};
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
        var nodeId, node, flgFound, content;
        var searchResultIds = [];
        var suchworte = searchOptions.fulltext.toLowerCase().split(' ');
        var classes = searchOptions.strClassFilter.split(',');
        var states = searchOptions.strWorkflowStateFilter.split(',');
        var subTypes = searchOptions.strMetaNodeSubTypeFilter.split(',');
        var metaNodeTypeTags = searchOptions.strMetaNodeTypeTagsFilter.split(',');
        var notPraefix = searchOptions.strNotNodePraefix.split(' ');
        for (var idx = 0; idx < me.nodeList.length; idx++) {
            nodeId = me.nodeList[idx];
            node = me.getNodeDataById(nodeId, true);
            content = node.nodeDesc + ' ' + node.name + ' ' + node.state;

            flgFound = false;
            // Fulltext
            if (suchworte.length > 0 && !me.appBase.get('YaioExportedData').VolltextTreffer(content.toLowerCase(), suchworte)) {
                // words not found
                continue;
            }
            // Classfilter
            if (classes.length > 0 && !me.appBase.get('YaioExportedData').VolltextTreffer(node.workflowState, classes)) {
                // words not found
                continue;
            }
            // SubTypes-Filter
            if (subTypes.length > 0 && !me.appBase.get('YaioExportedData').VolltextTreffer(node.metaNodeSubType, subTypes)) {
                // words not found
                continue;
            }
            // MetaNodeTypeTags-Filter
            if (metaNodeTypeTags.length > 0 && !me.appBase.get('YaioExportedData').VolltextTreffer(node.metaNodeTypeTags, metaNodeTypeTags)) {
                // words not found
                continue;
            }
            // Workflowstate-Filter
            if (states.length > 0 && !me.appBase.get('YaioExportedData').VolltextTreffer(node.className, states)) {
                // words not found
                continue;
            }
            // NotNodePraefix-Filter
            if (notPraefix.length > 0 && me.appBase.get('YaioExportedData').VolltextTreffer(node.metaNodePraefix, notPraefix, true, true)) {
                // blacklisted praefixes found
                console.log('ignore nodeId ' + nodeId + ' because of ' + node.metaNodePraefix);
                continue;
            }
            
            // no filter or all machtes
            searchResultIds.push(nodeId);
            flgFound = true;
        }
        
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

    
    me._init();
    
    return me;
};

/**
 * service-functions to handle the explorer-commands
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @returns {Yaio.ExplorerCommands}                an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.ExplorerCommands = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
    };

    /**
     * open node-hierarchy of treeId
     * @param {String} treeId           id of the fancytree
     * @param {Array} lstIdsHierarchy   node-hierarchy too open as list of node.id
     */
    me.openNodeHierarchyForTreeId = function(treeId, lstIdsHierarchy) {
        var svcLogger = me.appBase.Logger;

        // check for tree
        var tree = me.$(treeId).fancytree('getTree');
        if (! tree) {
            svcLogger.logError('openHierarchy: error tree:"' + treeId + '" not found.', false);
            return;
        }
    
        // check for rootNode
        var rootNode = tree.rootNode;
        if (! rootNode) {
            svcLogger.logError('openHierarchy: error for tree:"' + treeId
                        + '" rootNode not found.', false);
            return;
        }
        
        // check for lstIdsHierarchy
        if (! lstIdsHierarchy || lstIdsHierarchy.length <= 0) {
            svcLogger.logError('openHierarchy: error for tree:"' + treeId + '" lstIdsHierarchy is empty.', false);
            return;
        }
        
        // search for firstNode in rootTree, ignore if not found
        var firstNodeId, firstNode;
        var lstIdsHierarchySave = [].concat(lstIdsHierarchy);
        while (! firstNode && lstIdsHierarchy.length > 0) {
            firstNodeId = lstIdsHierarchy.shift();
            firstNode = rootNode.mapChildren[firstNodeId];
        }
        if (! firstNode) {
            svcLogger.logError('openHierarchy: error for tree:"' + treeId + '" firstNode of:"' + lstIdsHierarchySave + '"'
                        + ' not found on rootNode.', false);
            return;
        }
    
        // open Hierarchy
        var opts = {};
        opts.openHierarchy = lstIdsHierarchy;
        opts.activateLastNode = true;
        firstNode.setExpanded(true, opts);
    };

    /**
     * open node-hierarchy of treeId till level
     * @param {String} treeId     id of the fancytree
     * @param {int} level         open till level
     */
    me.openSubNodesForTreeId = function(treeId, level) {
        var svcLogger = me.appBase.Logger;

        var tree = me.$(treeId).fancytree('getTree');
        if (! tree) {
            svcLogger.logError('yaioOpenSubNodesForTree: error tree:"' + treeId + '" not found.', false);
            return;
        }
        
        // check for activeNodeId
        var treeNode = tree.rootNode;
        if (! treeNode) {
            svcLogger.logError('yaioOpenSubNodesForTree: error rootnode for tree:"' + treeId + '" not found.', false);
            return null;
        }
        
        var opts = {};
        opts.minExpandLevel = level;
        opts.recursively = true;
        console.log('yaioOpenSubNodesForTree setExpanded:' + ' level:' + level);
        treeNode.setExpanded(true, opts);
    };

    /**
     * move the node as new child of parent
     * @param {Object} node           node to copy
     * @param {String} newParentKey   key of the new parentNode to add a copy of the node as child
     * @param {int} newPos            position to move node to
     */
    me.doMoveNode = function(node, newParentKey, newPos) {
        console.log('move node:' + node.key + ' to:' + newParentKey + ' Pos:' + newPos);
        me.appBase.YaioNodeRepository.moveNode(node.key, newParentKey, newPos)
            .done(function(yaioNodeActionResponse, textStatus, jqXhr ) {
                me.patchNodeSuccessHandler(node.key, yaioNodeActionResponse, textStatus, jqXhr);
            });
    };

    /**
     * make a copy of the node as new child of parent
     * @param {Object} node           node to copy
     * @param {String} newParentKey   key of the new parentNode to add a copy of the node as child
     */
    me.doCopyNode = function(node, newParentKey) {
        console.log('copy node:' + node.key + ' to:' + newParentKey);
        me.appBase.YaioNodeRepository.copyNode(node.key, newParentKey)
            .done(function(yaioNodeActionResponse, textStatus, jqXhr ) {
                me.patchNodeSuccessHandler(node.key, yaioNodeActionResponse, textStatus, jqXhr);
            });
    };

    /**
     * success-handler if patchNode succeeded (resolves yaioNodeActionResponse.state)
     * @param {String} nodeId                       nodeId to patch
     * @param {Object} yaioNodeActionResponse       the serverresponse (java de.yaio.rest.controller.NodeActionReponse)
     * @param {String} textStatus                   http-state as text
     * @param {JQueryXHR} jqXhr                     jqXhr-Object
     */
    me.patchNodeSuccessHandler = function(nodeId, yaioNodeActionResponse, textStatus, jqXhr) {
        var svcLogger = me.appBase.get('Logger');
        var msg = '_patchNodeSuccessHandler for nodeId:' + nodeId;
        console.log(msg + ' OK done!' + yaioNodeActionResponse.state);
        if (yaioNodeActionResponse.state === 'OK') {
            console.log(msg + ' OK saved nodeId:' + nodeId + ' load:' + yaioNodeActionResponse.parentIdHierarchy);
            if (yaioNodeActionResponse.parentIdHierarchy && yaioNodeActionResponse.parentIdHierarchy.length > 0) {
                // reload tree
                var tree = me.$('#tree').fancytree('getTree');
                tree.reload().done(function(){
                    // handler when done
                    console.log(msg + ' RELOAD tree done:' + yaioNodeActionResponse.parentIdHierarchy);
                    console.log(msg + ' CALL openNodeHierarchy load hierarchy:' + yaioNodeActionResponse.parentIdHierarchy);
                    me.appBase.get('YaioExplorerCommands').openNodeHierarchyForTreeId('#tree', yaioNodeActionResponse.parentIdHierarchy);
                });
            } else {
                svcLogger.logError('got no hierarchy for:' + nodeId
                    + ' hierarchy:' + yaioNodeActionResponse.parentIdHierarchy, true);
            }
        } else {
            var message = 'cant save nodeId:' + nodeId + ' error:' + yaioNodeActionResponse.stateMsg;
            // check for violations
            if (yaioNodeActionResponse.violations) {
                // iterate violations
                message = message +  ' violations: ';
                for (var idx in yaioNodeActionResponse.violations) {
                    if (!yaioNodeActionResponse.violations.hasOwnProperty(idx)) {
                        continue;
                    }
                    var violation = yaioNodeActionResponse.violations[idx];
                    svcLogger.logError('violations while save nodeId:' + nodeId
                        + ' field:' + violation.path + ' message:' + violation.message, false);
                    message = message +  violation.path + ' (' + violation.message + '),';
                }
            }
            svcLogger.logError(message, true);
        }
    };


    /**
     * open confirmbox and remove node if confirmed
     * @param {String} nodeId    id of the node to delete
     */
    me.doRemoveNodeByNodeId = function(nodeId) {
        var svcLogger = me.appBase.Logger;

        if (window.confirm('Wollen Sie die Node wirklich l&ouml;schen?')) {
            console.log('remove node:' + nodeId);
            // check for tree
            var treeId = '#tree';
            var tree = me.$(treeId).fancytree('getTree');
            if (! tree) {
                svcLogger.logError('yaioRemoveNode: error tree:"' + treeId + '" not found.', false);
                return;
            }
            
            // check for activeNodeId
            var treeNode = tree.getNodeByKey(nodeId);
            if (! treeNode) {
                svcLogger.logError('yaioRemoveNode: error for tree:"' + treeId + '"' +
                    ' activeNode ' + nodeId + ' not found.', false);
                return null;
            }
            me.appBase.YaioNodeRepository.deleteNode(nodeId)
                .done(function(yaioNodeActionResponse, textStatus, jqXhr ) {
                    me._deleteNodeSuccessHandler(nodeId, yaioNodeActionResponse, textStatus, jqXhr);
                });
        } else {
            // discard
            return false;
        }
    };

    /**
     * opens jira window with jira-converted node-content
     * @param {String} nodeId                 id of the node
     */
    me.openJiraExportWindowByNodeId = function(nodeId) {
        var svcLogger = me.appBase.Logger;
        var svcDataUtils = me.appBase.DataUtils;

        // check vars
        if (! nodeId) {
            // tree not found
            svcLogger.logError('error openJiraWindow: nodeId required', false);
            return null;
        }
        // load node
        var tree = me.$('#tree').fancytree('getTree');
        if (!tree) {
            // tree not found
            svcLogger.logError('error openJiraWindow: cant load tree for node:' + nodeId, false);
            return null;
        }
        var treeNode = tree.getNodeByKey(nodeId);
        if (! treeNode) {
            svcLogger.logError('error openJiraWindow: cant load node:' + nodeId, false);
            return null;
        }
        
        // extract nodedata
        var basenode = treeNode.data.basenode;
        var descText = basenode.nodeDesc;
        if (! descText) {
            descText = '';
        }
        descText = descText.replace(/<WLBR>/g, '\n');
        descText = descText.replace(/<WLESC>/g, '\\');
        descText = descText.replace(/<WLTAB>/g, '\t');
        
        // convert and secure
        var nodeDesc = me.appBase.YaioMarkdownConverter.convertMarkdownToJira(descText);
        nodeDesc = svcDataUtils.htmlEscapeText(nodeDesc);
        
        // set clipboard-content
        me.$( '#clipboard-content' ).html(nodeDesc);
        
        // show message
        me.$( '#clipboard-box' ).dialog({
            modal: true,
            width: '700px',
            buttons: {
              Ok: function() {
                me.$( this ).dialog( 'close' );
              }
            }
        });    
    };
    
    
    /** 
     * opens clipboard window with checklist/ganttmarkdown-converted node-content
     */
    me.openClipBoardWithCurrentViewAsOverview = function() {
        var svcDataUtils = me.appBase.DataUtils;
        var svcYaioExplorerConverter = me.appBase.YaioExplorerConverter;

        // convert and secure
        var checkListSrc = svcYaioExplorerConverter.convertExplorerLinesAsCheckList();
        checkListSrc = svcDataUtils.htmlEscapeText(checkListSrc);
        var ganttSrc = svcYaioExplorerConverter.convertExplorerLinesAsGanttMarkdown();
        ganttSrc = svcDataUtils.htmlEscapeText(ganttSrc);
        
        // set clipboard-content
        me.$( '#clipboard-content' ).html(checkListSrc + '\n\n' +  ganttSrc);
        
        // show message
        me.$( '#clipboard-box' ).dialog({
            modal: true,
            width: '700px',
            buttons: {
              Ok: function() {
                me.$( this ).dialog( 'close' );
              }
            }
        });    
    };
    
    /** 
     * open the nodeeditor with a new infornode with snaphot of current gui: checklist and gantt-markdown
     * @param {Object} parentNode     parentNode to get the content from
     */
    me.openNewInfoNodeWithCurrentViewAsSnapshotForParent = function(parentNode) {
        var svcDataUtils = me.appBase.DataUtils;
        var svcYaioExplorerConverter = me.appBase.YaioExplorerConverter;

        // convert and secure
        var checkListSrc = svcYaioExplorerConverter.convertExplorerLinesAsCheckList();
        checkListSrc = svcDataUtils.htmlEscapeText(checkListSrc);
        var ganttSrc = svcYaioExplorerConverter.convertExplorerLinesAsGanttMarkdown();
        ganttSrc = svcDataUtils.htmlEscapeText(ganttSrc);
    
        // open editor
        me.appBase.YaioNodeEditor.openNodeEditorForNode(parentNode, 'createsnapshot', {nodeDesc: checkListSrc + '\n\n' +  ganttSrc});
    };
    
    
    /** 
     * opens txt-window with txt node-content
     * @param {String} content                txt content
     */
    me.openTxtExportWindowForContent = function(content) {
        // secure
        content = me.appBase.DataUtils.htmlEscapeText(content);
    
        // set clipboard-content
        me.$( '#clipboard-content' ).html(content);
        
        // show message
        me.$( '#clipboard-box' ).dialog({
            modal: true,
            width: '700px',
            buttons: {
              Ok: function() {
                me.$( this ).dialog( 'close' );
              }
            }
        });    
    };

    /** 
     * open the dmsdownloadwindow for the node  
     * @param {String} nodeId                 id of the node
     */
    me.openDMSDownloadWindowForNodeId = function(nodeId) {
        var svcLogger = me.appBase.Logger;

        // check vars
        if (! nodeId) {
            // tree not found
            svcLogger.logError('error openDMSDownloadExportWindow: nodeId required', false);
            return null;
        }
        // load node
        var tree = me.$('#tree').fancytree('getTree');
        if (!tree) {
            // tree not found
            svcLogger.logError('error openDMSDownloadExportWindow: cant load tree for node:' + nodeId, false);
            return null;
        }
        var treeNode = tree.getNodeByKey(nodeId);
        if (! treeNode) {
            svcLogger.logError('error openDMSDownloadExportWindow: cant load node:' + nodeId, false);
            return null;
        }
        
        // extract nodedata
        var basenode = treeNode.data.basenode;
        var embedUrl = me.appBase.YaioAccessManager.getAvailiableNodeAction('dmsEmbed', basenode.sysUID, false) + basenode.sysUID;
        var downloadUrl = me.appBase.YaioAccessManager.getAvailiableNodeAction('dmsDownload', basenode.sysUID, false) + basenode.sysUID;

        // set clipboard-content
        me.$( '#download-iframe' ).attr('src', embedUrl);
        
        // show message
        me.$( '#download-box' ).dialog({
            modal: true,
            width: '700px',
            buttons: {
              Ok: function() {
                me.$( this ).dialog( 'close' );
              },
              'Download': function() {
                var helpFenster = window.open(downloadUrl, 'download', 'width=200,height=200,scrollbars=yes,resizable=yes');
                helpFenster.focus();
              }
            }
        });    
    };
    
    /** 
     * open the dmsdownloadwindow for the extracted metadata of the node document 
     * @param {String} nodeId                 id of the node
     */
    me.openDMSIndexDownloadWindowForNodeId = function(nodeId) {
        var svcLogger = me.appBase.Logger;

        // check vars
        if (! nodeId) {
            // tree not found
            svcLogger.logError('error openDMSIndexDownloadWindow: nodeId required', false);
            return null;
        }
        // load node
        var tree = me.$('#tree').fancytree('getTree');
        if (!tree) {
            // tree not found
            svcLogger.logError('error openDMSIndexDownloadWindow: cant load tree for node:' + nodeId, false);
            return null;
        }
        var treeNode = tree.getNodeByKey(nodeId);
        if (! treeNode) {
            svcLogger.logError('error openDMSIndexDownloadWindow: cant load node:' + nodeId, false);
            return null;
        }
        
        // extract nodedata
        var basenode = treeNode.data.basenode;
        var embedUrl = me.appBase.YaioAccessManager.getAvailiableNodeAction('dmsIndexEmbed', basenode.sysUID, false) + basenode.sysUID;
        var downloadUrl = me.appBase.YaioAccessManager.getAvailiableNodeAction('dmsIndexDownload', basenode.sysUID, false) + basenode.sysUID;

        $.getJSON( embedUrl, function(data) {
            // set clipboard-content
            var parent = me.$( '#downloadindex-content' );
            parent.html('');
            for (var key in data.versions) {
                if (data.versions.hasOwnProperty(key)) {
                    me._createDMSIndexDiv(key, data.versions[key], parent);
                }
            }
        });
        
        
        // show message
        me.$( '#downloadindex-box' ).dialog({
            modal: true,
            width: '700px',
            buttons: {
              Ok: function() {
                me.$( this ).dialog( 'close' );
              },
              'Download': function() {
                var helpFenster = window.open(downloadUrl, 'download', 'width=200,height=200,scrollbars=yes,resizable=yes');
                helpFenster.focus();
              }
            }
        });    
    };

    /** 
     * Toggle the '#detail_desc_' for the specified id with a slide - updates DOM
     * @param {String} id                     sysUID of the node
     */
    me.toggleNodeDescContainerForNodeId = function(id) {
        var svcYaioFormatter = me.appBase.YaioFormatter;
        me.$('#detail_desc_' + id).slideToggle(1000,function() {
            // show/hide toggler
            if (me.$('#detail_desc_' + id).css('display') === 'block') {
                // desc is now shown
                me.$('#toggler_desc_' + id).addClass('toggler_show').removeClass('toggler_hidden');
   
                // check if syntaxhighlighting to do
                var descBlock = me.$('#container_content_desc_' + id);
                if (me.$(descBlock).hasClass('syntaxhighlighting-open')) {
                    me.$(descBlock).removeClass('syntaxhighlighting-open');
                    console.log('toggleNodeDescContainer highlight for descBlock: ' + me.$(descBlock).attr('id'));
                    svcYaioFormatter.runAllRendererOnBlock(descBlock);
                }
            } else {
                // desc is now hidden
                me.$('#toggler_desc_' + id).addClass('toggler_hidden').removeClass('toggler_show');
            }
        });
    };

    /**
     * Toggle all desc-divs for nodes with '#detail_desc_' depending on state of #toggler_desc_all with a slide.
     */
    me.toggleAllNodeDescContainer = function() {
        if (me.$('#toggler_desc_all').hasClass('toggler_hidden')) {
            // show all desc
            me.$('div.field_nodeDesc').slideDown(1000);
            me.$('div.fieldtype_descToggler > a').addClass('toggler_show').removeClass('toggler_hidden');
   
            // check if syntaxhighlighting to do
            me.$('div.syntaxhighlighting-open').each(function (i, descBlock) {
                console.log('toggleAllNodeDescContainer highlight for descBlock: ' + me.$(descBlock).attr('id'));
                me.appBase.YaioFormatter.runAllRendererOnBlock(descBlock);
            });
        } else {
            // hide all desc
            me.$('div.field_nodeDesc').slideUp(1000);
            me.$('div.fieldtype_descToggler > a').addClass('toggler_hidden').removeClass('toggler_show');
        }
    };
    
    /** 
     * Toggle the '#detail_sys_' for the specified id with a slide.
     * @param {String} id                     sysUID of the node
    */
    me.toggleNodeSysContainerForNodeId = function(id) {
        me.$('#detail_sys_' + id).slideToggle(1000,function() {
            // show/hide toggler
            if (me.$('#detail_sys_' + id).css('display') === 'block') {
                // desc is now shown
                me.$('#toggler_sys_' + id).addClass('toggler_show').removeClass('toggler_hidden');
            } else {
                // desc is now hidden
                me.$('#toggler_sys_' + id).addClass('toggler_hidden').removeClass('toggler_show');
            }
        });
    };

    /**
     * Toggle all sys-divs for nodes with '#detail_sys_' depending on state of #toggler_sys_all with a slide.
     */
    me.toggleAllNodeSysContainer = function() {
        if (me.$('#toggler_sys_all').hasClass('toggler_hidden')) {
            // show all sys
            me.$('div.field_nodeSys').slideDown(1000);
            me.$('div.fieldtype_sysToggler > a').addClass('toggler_show').removeClass('toggler_hidden');
        }  else {
            // hide all sys
            me.$('div.field_nodeSys').slideUp(1000);
            me.$('div.fieldtype_sysToggler > a').addClass('toggler_hidden').removeClass('toggler_show');
        }
    };

    /**
     * create the dmsdownloadwindow for the extracted metadata of the node document
     * @param {String} key                  id of the
     * @param {Object} data                 data to show
     * @param {String} parent               JQuery-Selector to append the download-window
     */
    me._createDMSIndexDiv = function (key, data, parent) {
        var content = '' + data.content;
        var name = '' + data.parserName;
        content = me.appBase.DataUtils.htmlEscapeText(content);
        content = content.replace(/\n/g, '<br />');
        $(parent).append('<div class="downloadindex-container"><div class="downloadindex-name">' + name + '</div><br><pre>' + content + '<pre></div>');
    };

    /**
     * success-handler if deleteNode succeeded (resolves yaioNodeActionResponse.state)
     * @param {String} nodeId                       nodeId to patch
     * @param {Object} yaioNodeActionResponse       the serverresponse (java de.yaio.rest.controller.NodeActionReponse)
     * @param {String} textStatus                   http-state as text
     * @param {JQueryXHR} jqXhr                     jqXhr-Object
     */
    me._deleteNodeSuccessHandler = function(nodeId, yaioNodeActionResponse, textStatus, jqXhr) {
        var svcLogger = me.appBase.get('Logger');
        var msg = '_deleteNodeSuccessHandler for nodeId:' + nodeId;
        console.log(msg + ' OK done!' + yaioNodeActionResponse.state);
        if (yaioNodeActionResponse.state === 'OK') {
            console.log(msg + ' OK removed node:' + nodeId + ' load:' + yaioNodeActionResponse.parentIdHierarchy);
            if (yaioNodeActionResponse.parentIdHierarchy && yaioNodeActionResponse.parentIdHierarchy.length >= 0) {
                // reload tree
                var tree = me.$('#tree').fancytree('getTree');
                tree.reload().done(function(){
                    // handler when done
                    console.log(msg + ' RELOAD tree done:' + yaioNodeActionResponse.parentIdHierarchy);
                    console.log(msg + ' CALL openNodeHierarchy load hierarchy:' + yaioNodeActionResponse.parentIdHierarchy);
                    me.appBase.get('YaioExplorerCommands').openNodeHierarchyForTreeId('#tree', yaioNodeActionResponse.parentIdHierarchy);
                });
            } else {
                svcLogger.logError('got no hierarchy for:' + nodeId
                    + ' hierarchy:' + yaioNodeActionResponse.parentIdHierarchy, true);
            }
        } else {
            svcLogger.logError('cant remove node:' + nodeId + ' error:' + yaioNodeActionResponse.stateMsg, false);
            // check for violations
            if (yaioNodeActionResponse.violations) {
                // iterate violations
                for (var idx in yaioNodeActionResponse.violations) {
                    if (!yaioNodeActionResponse.violations.hasOwnProperty(idx)) {
                        continue;
                    }
                    var violation = yaioNodeActionResponse.violations[idx];
                    svcLogger.logError('violations while remove node:' + nodeId
                        + ' field:' + violation.path + ' message:' + violation.message, false);
                    window.alert('cant remove node because: ' + violation.path + ' (' + violation.message + ')');
                }
            }
        }
    };

    me._init();
    
    return me;
};

/**
 * service-functions for converting explorer-content to markdown/jira...
 * @param {YaioAppBase} appBase                    the appbase to get other services
 * @returns {Yaio.ExplorerConverter}               an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.ExplorerConverter = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me._init = function() {
    };


    /**
     * extract data from explorerlines (table.fancytree-ext-table tr) and format
     * them as linked markdown-checklists ([state] - [title](yaio:number)
     * @return {String}             checklist in yaio-markdown-format
     */
    me.convertExplorerLinesAsCheckList = function() {
        // get title
        var idx;
        var title = me.$('#masterTr td.fieldtype_name').text();
        var now = me.appBase.get('DataUtils').formatGermanDateTime((new Date()).getTime());

        var checkList = '# Checklist: ' + title + ' (Stand: ' + now + ')\n\n';

        // iterate all nodelines
        me.$('table.fancytree-ext-table tr').each(function(i, line) {
            // extract data
            var titleSpan = me.$(line).find('span.fancytree-title2');
            var stateSpan = me.$(line).find('span.fancytree-title-state');
            var numberSpan = me.$(line).find('div.field_metanummer');
            var levelSpan = me.$(line).find('span.fancytree-node');
            var istStandDiv = me.$(line).find('div.fieldtype_stand.field_istChildrenSumStand');
            var istAufwandDiv = me.$(line).find('div.fieldtype_aufwand.field_istChildrenSumAufwand');
            var planAufwandDiv = me.$(line).find('div.fieldtype_aufwand.field_planChildrenSumAufwand');

            // extract content
            var level = 0;
            var title = null;
            var state = null;
            var number = null;
            var istStand = '0%';
            var istAufwand = '0h';
            var planAufwand = null;
            if (me.$(levelSpan).size() > 0) {
                // extract level from intend
                var intend = me.$(levelSpan).css('margin-left').replace('px', '');
                level = parseInt(intend, 10) / 20;
            }
            if (me.$(stateSpan).size() > 0) {
                // extract state from style
                idx = me._extractCheckListStatefromStateSpan(me.$(stateSpan));
                if (idx) {
                    state = idx;
                    state = state.replace('checklist-state-', '');
                    state = state.replace('checklist-test-', '');
                }
            }
            if (me.$(titleSpan).size() > 0) {
                title = me.$(titleSpan).text();
            }
            if (me.$(numberSpan).size() > 0) {
                number = me.$(numberSpan).text();
            }

            if (me.$(istAufwandDiv).size() > 0) {
                istAufwand = me.$(istAufwandDiv).text();
            }
            if (me.$(planAufwandDiv).size() > 0) {
                planAufwand = me.$(planAufwandDiv).text();
            }
            if (me.$(istStandDiv).size() > 0) {
                istStand = me.$(istStandDiv).text();
            }

            var stand = istStand.trim() + ' (' + istAufwand.trim();
            if (planAufwand) {
                stand  += '/' + planAufwand.trim();
            }
            stand += ')';

            // if all set: generate checklist
            console.log('state:' + state + ' title:' + title + ' number:' + number + ' level:' + level + ' stand:' + stand);
            if (title && state && number) {
                for (idx = 0; idx < level; idx ++) {
                    checkList += '    ';
                }
                checkList += '- [' + state + '] - [' + title + '](yaio:' + number + ') ' + stand + '\n';
            }
        });

        return checkList;
    };

    /**
     * extract data from explorerlines (table.fancytree-ext-table tr) and format
     * them as mermaid-gantt-markdown
     * @return                       {String}    mermaid-gantt-markdown
     */
    me.convertExplorerLinesAsGanttMarkdown = function() {
        // get title
        var title = me.$('#masterTr td.fieldtype_name').text();
        var now = me.appBase.get('DataUtils').formatGermanDateTime((new Date()).getTime());

        var ganttMarkdown = '# Gantt: ' + title + ' (Stand: ' + now + ')\n\n'
            + '```mermaid\n'
            + 'gantt\n'
            + '    title ' + title + ' (Stand: ' + now + ')\n'
            + '    dateFormat  DD.MM.YYYY\n'
            + '\n';
        var ganttMarkdownPlan = '';
        var ganttMarkdownIst  = '';

        // iterate all nodelines
        me.$('table.fancytree-ext-table tr').each(function(i, line) {
            // extract data
            var titleSpan = me.$(line).find('span.fancytree-title2');
            var numberSpan = me.$(line).find('div.field_metanummer');
            var startEndPlanDiv = me.$(line).find('div.fieldtype_fromto.field_planChildrenSum');
            var startEndIstDiv = me.$(line).find('div.fieldtype_fromto.field_istChildrenSum');

            // extract content
            var title = null;
            var number = null;
            if (me.$(titleSpan).size() > 0) {
                title = me.$(titleSpan).text();
            }
            if (me.$(numberSpan).size() > 0) {
                number = me.$(numberSpan).text();
            }
            ganttMarkdownPlan += me._generateGanttMarkdownLineFromBlock(title, number, startEndPlanDiv);
            ganttMarkdownIst += me._generateGanttMarkdownLineFromBlock(title, number, startEndIstDiv);
        });

        // concat
        ganttMarkdownPlan = ganttMarkdownPlan.length > 0 ? '    section Plan\n' + ganttMarkdownPlan : '';
        ganttMarkdownIst = ganttMarkdownIst.length > 0 ? '    section Ist\n' + ganttMarkdownIst : '';
        ganttMarkdown += ganttMarkdownPlan + ganttMarkdownIst  + '```\n';

        return ganttMarkdown;
    };

    /**
     * check block for matchers from checkListConfigs
     * @param {JQuery} block      block to check
     * @return {null|String}      key of checkListConfigs that matches
     */
    me._extractCheckListStatefromStateSpan = function(block) {
        // iterate all configs
        var checkListConfigs = me.appBase.get('ChecklistParser').checkListConfigs;
        for (var idx in checkListConfigs) {
            if (!checkListConfigs.hasOwnProperty(idx)) {
                continue;
            }
            var matchers = checkListConfigs[idx].matchers;

            // iterate all matchers
            for (var idx2 in matchers) {
                // check for matcher in style
                if (block.hasClass('yaio-node-state-' + matchers[idx2])) {
                    return idx;
                }
            }
        }
        return null;
    };


    /**
     * generate a mermaid-gantt-markdown-line for selector (if start, end-date can be extracted)
     * @param {String} title         title of the line
     * @param {int} number           reference
     * @param {Object} selector      selector to filter the element with jquery
     * @return {String}              mermaid-gantt-markdown-line
     */
    me._generateGanttMarkdownLineFromBlock = function(title, number, selector) {
        if (me.$(selector).size() > 0) {
            // extract dates
            var dates = me.$(selector).html().replace(/&nbsp;/g, ' ').split('-');
            if (dates.length !== 2) {
                return '';
            }
            var start = dates[0];
            var end = dates[1];

            // if all set: generate gantt
            console.log('extractGanttMarkdownLineFromBlock: title:' + title + ' number:' + number + ' start:' + start + ' end:' + end);
            if (title && number && start && end) {
                return '    ' + title + ': ' + number + ', ' + start + ', ' + end + '\n';
            }
        }
        return '';
    };


    me._init();
    
    return me;
};

/*****************************************
 *****************************************
 * Configuration
 *****************************************
 *****************************************/
var treeInstances = [];

/**
 * service-functions to initialize/control the explorer-tree (instances of FancyTree)
 * @param {YaioAppBase} appBase               the appbase to get other services
 * @returns {Yaio.ExplorerTree}               an service-instance
 * @augments JsHelferlein.ServiceBase
 * @constructor
 */
Yaio.ExplorerTree = function(appBase) {
    'use strict';

    // my own instance
    var me = JsHelferlein.ServiceBase(appBase);

    /**
     * initialize the object
     */
    me.clipboardNode = null;
    me.pasteMode = null;
    me.nodeFilter = {};
    me._init = function() {
    };

    /* jshint maxstatements: 100 */
    /* jshint maxcomplexity: 100 */
    /**
     * creates an fancytree on the html-element treeId and inits it with the data
     * of masterNodeId
     * after init of the tree the doneHandler will be executed
     * updates global var treeInstances[treeId]
     * @param {String} treeId                 id of the html-element containing the tree
     * @param {String} masterNodeId           the node.sysUID to load
     * @param {function} doneHandler          callback-function when tree is created
     */
    me.createExplorerTree = function(treeId, masterNodeId, doneHandler) {
        treeInstances[treeId] = {};
        treeInstances[treeId].state = 'loading';
        me.$(treeId).fancytree({
            
            // errorHandler
            loadError: function (e,data) { 
                me._showLoadError(e, data);
            },
            
            // save masterNodeId
            masterNodeId: masterNodeId,
            
            // set layoutoptions
            maxTitleWidth: 400,
            
            checkbox: true,
            titlesTabbable: true,     // Add all node titles to TAB chain
      
            source: me._sourceHandler(masterNodeId),
            
            // defaultoptions for ajax-request
            ajax: {
                xhrFields : {
                    // for CORS
                    withCredentials : true
                }
            },
          
            // set state of the tree for callback, when tree is created
            loadChildren: function(event, data) {
                treeInstances[treeId].state = 'loading_done';
            },    
    
            // lazy load the children
            lazyLoad: function(event, data) {
                var node = data.node;
                console.debug('yaioCreateFancyTree load data for ' + node.key);
                data.result = me._sourceHandler(node.key);
            },
      
            // callback if expanded-state of node changed, to show the matching gantt (only node or + childsum)
            onExpandCallBack: function (node, flag) {
                // activate/deactivate gantt for node
                if (flag) {
                    console.debug('onExpandCallBack: activate gantt - only own data for ' + node.key);
                    me.appBase.get('YaioNodeGanttRenderer').showGanttBlockForNode(node, true);
                } else {
                    // I'm collapsed: show me and my childsum
                    console.debug('onExpandCallBack: activate gantt - sum data of me+children for ' + node.key);
                    me.appBase.get('YaioNodeGanttRenderer').showGanttBlockForNode(node, false);
                }
            },
            
            // parse the nodedata
            postProcess: function(event, data) {
                me.appBase.get('YaioExplorerTree').postProcessNodeData(event, data);
            },
    
            // render the extra nodedata in grid, sets state for callbaclfunction when tree is created
            renderColumns: function(event, data) {
                me.appBase.get('YaioNodeDataRenderer').renderColumnsForNode(event, data);
                treeInstances[treeId].state = 'rendering_done';
            },
    
            // extensions: ['edit', 'table', 'gridnav'],
            extensions: ['edit', 'dnd', 'table', 'gridnav'],
    
            dnd: {
                preventVoidMoves: true,
                preventRecursiveMoves: true,
                autoExpandMS: 400,
                dragStart: function(node, data) {
                    return true;
                },
                dragEnter: function(node, data) {
                    return true;
                },
                dragDrop: function(node, data) {
                    // check permission
                    if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('move', node.key, false)) {
                        return false;
                    }
                    if (window.confirm('Wollen Sie die Node wirklich verschieben?')) {
                        data.otherNode.moveTo(node, data.hitMode);
    
                        // check parent of the node
                        var newPos = data.otherNode.data.basenode.sortPos;
                        var newParent = node.getParent();
                        var newParentKey = node.getParent().key;
                        if (newParent.isRootNode() || me.appBase.DataUtils.isUndefinedStringValue(newParentKey) || !newParent) {
                            newParentKey = node.tree.options.masterNodeId;
                        }
                        switch( data.hitMode){
                        case 'before':
                            newPos = node.data.basenode.sortPos - 2;
                            break;
                        case 'after':
                            newPos = node.data.basenode.sortPos + 2;
                            break;
                        default:
                            // add it to the current node
                            newParentKey = node.key;
                            newPos = 9999;
                        }
                        me.appBase.get('YaioExplorerCommands').doMoveNode(data.otherNode, newParentKey, newPos);
                        return true;
                    } else {
                        // discard
                        return false;
                    }
                }
            },
            edit: {
                triggerStart: ['f2', 'dblclick', 'shift+click', 'mac+enter'],
                beforeEdit: function(event, data){
                    // check permission
                    if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('edit', data.node.key, false)) {
                        return false;
                    }
                    // open yaio-editor
                    me.appBase.get('YaioNodeEditor').openNodeEditorForNodeId(data.node.key, 'edit');
                    
                    // Return false to prevent edit mode
                    // dont use fancyeditor
                    return false;
                }
            },
            table: {
                indentation: 20,
                nodeColumnIdx: 0
            },
            gridnav: {
                autofocusInput: false,
                handleCursorKeys: true
            }
        }).on('nodeCommand', function(event, data){
            var svcYaioExplorerCommands = me.appBase.get('YaioExplorerCommands');
            
            // Custom event handler that is triggered by keydown-handler and
            // context menu:
            var refNode,
                tree = me.$(this).fancytree('getTree'),
                node = tree.getActiveNode();
        
            switch( data.cmd ) {
                case 'edit':
                    // check permission
                    if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('edit', node.key, false)) {
                        return false;
                    }
                    // open yaio-editor
                    me.appBase.get('YaioNodeEditor').openNodeEditorForNodeId(node.key, 'edit');
                    return true;
                case 'cut':
                    if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('move', node.key, false)) {
                        return false;
                    }
                    me.clipboardNode = node;
                    me.pasteMode = data.cmd;
                    break;
                case 'copy':
                    if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('copy', node.key, false)) {
                        return false;
                    }
                    me.clipboardNode = node;
                    me.pasteMode = data.cmd;
                    break;
                case 'paste':
                    if (!me.clipboardNode ) {
                        me.appBase.get('Logger').logError('Clipoard is empty.', true);
                        break;
                    }
                    var newParent = node;
                    var node = me.clipboardNode.toDict(true);
                    if (me.pasteMode === 'cut' ) {
                        if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('move', node.key, false)) {
                            return false;
                        }
                        // Cut mode: check for recursion and remove source
                        if(newParent.isDescendantOf(node) ) {
                            me.appBase.get('Logger').logError('Cannot move a node to it\'s sub node.', true);
                            return;
                        }
                        if (window.confirm('Wollen Sie die Node und Ihre Subnodes wirklich hierher verschieben?')) {
                            // map rootnode to masterNodeId 
                            var newParentKey = newParent.key;
                            if (newParent.isRootNode() || me.appBase.DataUtils.isUndefinedStringValue(newParentKey) || !newParent) {
                                newParentKey = tree.options.masterNodeId;
                            }
                            // move yaioNode
                            svcYaioExplorerCommands.doMoveNode(node, newParentKey, 9999);
                            me.clipboardNode = me.pasteMode = null;
                            return true;
                        } else {
                            // discard
                            return false;
                        }
                    } else {
                        // Copy mode: prevent duplicate keys:
                        if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('copy', node.key, false)) {
                            return false;
                        }
                        if(newParent.isDescendantOf(node) ) {
                            me.appBase.get('Logger').logError('Cannot copy a node to it\'s sub node.', true);
                            return;
                        }
                        if (window.confirm('Wollen Sie die Node und Ihre Subnodes wirklich hierher kopieren?')) {
                            // map rootnode to masterNodeId 
                            var newParentKey = newParent.key;
                            if (newParent.isRootNode() || me.appBase.DataUtils.isUndefinedStringValue(newParentKey) || !newParent) {
                                newParentKey = tree.options.masterNodeId;
                            }
                            // copy yaioNode
                            svcYaioExplorerCommands.doCopyNode(node, newParentKey);
                            me.clipboardNode = me.pasteMode = null;
                            return true;
                        } else {
                            // discard
                            return false;
                        }
                    }
                    break;
                case 'indent':
                    if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('move', node.key, false)) {
                        return false;
                    }
                    if (window.confirm('Wollen Sie die Node wirklich verschieben?')) {
                        // move fancynode
                        refNode = node.getPrevSibling();
                        
                        // map rootnode to masterNodeId 
                        var newParentKey = refNode.key;
                        if (refNode.isRootNode()) {
                            newParentKey = tree.options.masterNodeId;
                        }
                        
                        // move yaioNode
                        svcYaioExplorerCommands.doMoveNode(node, newParentKey, 9999);
                        return true;
                    } else {
                        // discard
                        return false;
                    }
                    
                    break;
                case 'outdent':
                    if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('move', node.key, false)) {
                        return false;
                    }
                    if (window.confirm('Wollen Sie die Node wirklich verschieben?')) {
                        // move fancynode
                        var newParent = node.getParent().getParent();
                        
                        // map rootnode to masterNodeId 
                        var newParentKey = newParent.key;
                        if (newParent.isRootNode() || me.appBase.DataUtils.isUndefinedStringValue(newParentKey) || !newParent) {
                            newParentKey = tree.options.masterNodeId;
                        }
                        // move yaioNode
                        svcYaioExplorerCommands.doMoveNode(node, newParentKey, 9999);
                        return true;
                    } else {
                        // discard
                        return false;
                    }
                    break;
                case 'moveUp':
                    if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('move', node.key, false)) {
                        return false;
                    }
                    // check parent
                    var newParent = node.getParent();
                    var newParentKey = node.getParent().key;
                    if (newParent.isRootNode() || me.appBase.DataUtils.isUndefinedStringValue(newParentKey) || !newParent) {
                        newParentKey = tree.options.masterNodeId;
                    }
                    // calc new position
                    var newPos = -2;
                    if (!me.appBase.DataUtils.isUndefined(node.getPrevSibling())) {
                        newPos = node.getPrevSibling().data.basenode.sortPos - 2;
                    }
    
                    svcYaioExplorerCommands.doMoveNode(node, newParentKey, newPos);
                    break;
                case 'moveDown':
                    if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('move', node.key, false)) {
                        return false;
                    }
                    // check parent
                    var newParent = node.getParent();
                    var newParentKey = node.getParent().key;
                    if (newParent.isRootNode() || me.appBase.DataUtils.isUndefinedStringValue(newParentKey) || !newParent) {
                        newParentKey = tree.options.masterNodeId;
                    }
                    // calc new position
                    var newPos = 9999;
                    if (!me.appBase.DataUtils.isUndefined(node.getNextSibling())) {
                        newPos = node.getNextSibling().data.basenode.sortPos + 2;
                    }
    
                    svcYaioExplorerCommands.doMoveNode(node, newParentKey, newPos);
                    break;
                case 'remove':
                    if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('remove', node.key, false)) {
                        return false;
                    }
                    svcYaioExplorerCommands.doRemoveNodeByNodeId(node.key);
                    break;
                case 'addChild':
                    if (! me.appBase.get('YaioAccessManager').getAvailiableNodeAction('create', node.key, false)) {
                        return false;
                    }
                    me.appBase.get('YaioNodeEditor').openNodeEditorForNodeId(node.key, 'create');
                    break;
                case 'asTxt':
                    svcYaioExplorerCommands.openTxtExportWindowForContent(me.$('#container_content_desc_' + node.key).text());
                    break;
                case 'asJira':
                    svcYaioExplorerCommands.openJiraExportWindowByNodeId(node.key);
                    break;
                case 'focus':
                    window.location = '#/show/' + node.key;
                    break;
                case 'focusNewWindow':
                    window.open('#/show/' + node.key, '_blank');
                    break;
                default:
                    window.alert('Unhandled command: ' + data.cmd);
                    return;
            }
        }).on('keydown', function(e){
            var c = String.fromCharCode(e.which),
                cmd = null;
        
            if( c === 'N' && e.ctrlKey && e.shiftKey) {
                cmd = 'addChild';
            } else if( e.which === me.$.ui.keyCode.DELETE ) {
                cmd = 'remove';
            } else if( e.which === me.$.ui.keyCode.F2 ) {
                cmd = 'rename';
            } else if( e.which === me.$.ui.keyCode.UP && e.ctrlKey ) {
                cmd = 'moveUp';
            } else if( e.which === me.$.ui.keyCode.DOWN && e.ctrlKey ) {
                cmd = 'moveDown';
            } else if( e.which === me.$.ui.keyCode.RIGHT && e.ctrlKey ) {
                cmd = 'indent';
            } else if( e.which === me.$.ui.keyCode.LEFT && e.ctrlKey ) {
                cmd = 'outdent';
            }
            if( cmd ){
                me.$(this).trigger('nodeCommand', {cmd: cmd});
                return false;
            }
        });
        
        // check if donehandler
        if (doneHandler) {
            me._onFancyTreeStateChange(treeId,
                    'rendering_done', 1000, 5, doneHandler, 'yaioCreateFancyTree.doneHandler');
        }
    
        /*
         * Context menu (https://github.com/mar10/jquery-ui-contextmenu)
         */
        me.$(treeId).contextmenu({
            delegate: 'span.fancytree-node',
            menu: [
                {title: 'Bearbeiten <kbd>[F2]</kbd>', cmd: 'edit', uiIcon: 'ui-icon-pencil', disabled: true },
                {title: 'Löschen <kbd>[Del]</kbd>', cmd: 'remove', uiIcon: 'ui-icon-trash', disabled: true },
                {title: '----'},
                {title: 'Kind zeugen', cmd: 'addChild', uiIcon: 'ui-icon-plus', disabled: true},
                {title: '----'},
                {title: 'Focus', cmd: 'focus', uiIcon: 'ui-icon-arrowreturn-1-e' },
                {title: 'In neuem Fenster', cmd: 'focusNewWindow', uiIcon: 'ui-icon-arrowreturn-1-e' },
                {title: 'Export Jira', cmd: 'asJira', uiIcon: 'ui-icon-clipboard' },
                {title: 'Export Txt', cmd: 'asTxt', uiIcon: 'ui-icon-clipboard' },
                {title: '----'},
                {title: 'Cut <kbd>Ctrl+X</kbd>', cmd: 'cut', uiIcon: 'ui-icon-scissors', disabled: true},
                {title: 'Copy <kbd>Ctrl-C</kbd>', cmd: 'copy', uiIcon: 'ui-icon-copy', disabled: true},
                {title: 'Paste as child<kbd>Ctrl+V</kbd>', cmd: 'paste', uiIcon: 'ui-icon-clipboard', disabled: true}
              ],
            beforeOpen: function(event, ui) {
                var node = me.$.ui.fancytree.getNode(ui.target);
                me.$('#tree').contextmenu('enableEntry', 'edit', !!me.appBase.get('YaioAccessManager').getAvailiableNodeAction('edit', node.key, false));
                me.$('#tree').contextmenu('enableEntry', 'remove', !!me.appBase.get('YaioAccessManager').getAvailiableNodeAction('remove', node.key, false));
                me.$('#tree').contextmenu('enableEntry', 'addChild', !!me.appBase.get('YaioAccessManager').getAvailiableNodeAction('create', node.key, false));
                me.$('#tree').contextmenu('enableEntry', 'cut', !!me.appBase.get('YaioAccessManager').getAvailiableNodeAction('move', node.key, false));
                me.$('#tree').contextmenu('enableEntry', 'copy', !!me.appBase.get('YaioAccessManager').getAvailiableNodeAction('copy', node.key, false));
                me.$('#tree').contextmenu('enableEntry', 'paste', !!me.clipboardNode);
                node.setActive();
            },
            select: function(event, ui) {
                var that = this;
                // delay the event, so the menu can close and the click event does
                // not interfere with the edit control
                setTimeout(function() { 
                        me.$(that).trigger('nodeCommand', {cmd: ui.cmd});
                    }, 100);
            }
        });
    };
    /* jshint maxstatements: 50 */
    /* jshint maxcomplexity: 50 */

    /**
     * set the filter to filter nodes while reading the data for the fancytree
     * @param {Object} nodeFilter     object with the diffrent filter-fields
     */
    me.setNodeFilter = function(nodeFilter) {
        me.nodeFilter = nodeFilter || {};
    };


    /**
     * updates data.result with the childlist of the node
     * Callbackhandler for FancyTree to convert the presponse from server to fancytree-data. 
     * Fancytree runs it if nodedata is read from server.
     * checks for data.response.state=OK, create FancydataNode from data.response.childNodes
     * and adds them to data.result.
     * @param {FancytreeEvent} event  fancytree-event
     * @param {Object} data           the serverresponse (java de.yaio.rest.controller.NodeActionReponse)
     */
    me.postProcessNodeData = function(event, data) {
        var list = [];
        
        // check response
        var state = data.response.state;
        if (state === 'OK') {
            // all fine
            console.log('OK loading nodes:' + data.response.stateMsg);
            
            var baseNode = data.response.node;
            if (data.response.childNodes) {
                 // iterate childnodes
                for (var zaehler = 0; zaehler < data.response.childNodes.length; zaehler++) {
                    var childBaseNode = data.response.childNodes[zaehler];
                    
                    if (! me._filterNodeData(childBaseNode)) {
                        continue;
                    }
                    
                    var datanode = me.appBase.get('YaioExplorerTree')._createFancyDataFromNodeData(childBaseNode);
                    console.debug('add childnode for ' + baseNode.sysUID
                            + ' = ' + childBaseNode.sysUID + ' ' + childBaseNode.name);
                    list.push(datanode);
                }
            }
        } else {
            // error
            me.appBase.get('Logger').logError('error loading nodes:' + data.response.stateMsg, true);
        }
        
        data.result = list;
    };

    me._sourceHandler = function(nodeId) {
        return me.appBase.get('YaioNodeRepository').loadNodeData(nodeId);
    };

    /**
     * create an fancytree-datanode from an yaio.basenode
     * @param {Object} basenode      a basenode from yaio
     * @returns {FancytreeNode}      a datanode for FancyTree
     */
    me._createFancyDataFromNodeData = function(basenode) {
        var datanode = {
            title: basenode.name,
            key: basenode.sysUID,
            children: null,
            lazy: true,
            basenode: basenode
        };

        // deactivate lazyload for node if no children avaiable
        if (me.appBase.DataUtils.isUndefinedStringValue(basenode.statChildNodeCount) || basenode.statChildNodeCount <= 0) {
            datanode.lazy = false;
            datanode.children = [];
        }

        if (basenode.className === 'UrlResNode') {
            datanode.title = basenode.resLocName;
        }

        return datanode;
    };


    /**
     * checks if the node passes the current nodefilter
     * @param {Object} node          nodedata from serverresponse (java de.yaio.rest.controller.NodeActionReponse)
     * @return {boolean}             check passes or not
     */
    me._filterNodeData = function(node) {
        if (! me.nodeFilter) {
            // no filter
            return true;
        }
        
        // check filter
        if (me.nodeFilter.classNames && !me.nodeFilter.classNames[node.className]) {
            console.log('_filterNodeData: skip node by className:' + node.className);
            return false;
        }
        if (me.nodeFilter.workflowStates && !me.nodeFilter.workflowStates[node.workflowState]) {
            console.log('_filterNodeData: skip node by workflowState:' + node.workflowState);
            return false;
        }
        if (me.nodeFilter.statCount && (node[me.nodeFilter.statCount] <= 0)) {
            console.log('_filterNodeData: skip node by statCount:' + me.nodeFilter.statCount);
            return false;
        }
        
        return true;
    };

    /**
     * callbackhandler in state of fancytree node-loading failed
     * @param {Object} e      error
     * @param {Object} data   error-details
     */
    me._showLoadError = function(e, data) {
        var error = data.error;
        if (error.status && error.statusText) {
            data.message = 'Ajax error: ' + data.message;
            data.details = 'Ajax error: ' + error.statusText + ', status code = ' + error.status;
            
            // check if http-form result
            if (error.status === 401) {
                // reload loginseite
                me.$( '#error-message-text' ).html('Sie wurden vom System abgemeldet.');
                
                // show message
                me.$( '#error-message' ).dialog({
                    modal: true,
                    buttons: {
                      'Neu anmelden': function() {
                        me.$( this ).dialog( 'close' );
                        window.location.assign(me.appBase.config.loginUrl);
                      }
                    }
                });    
            }
        } else {
            data.message = 'Custom error: ' + data.message;
            data.details = 'An error occured during loading: ' + error;
        }
        me.appBase.get('UIDialogs').showToastMessage('error', 'Oops! Ein Fehlerchen beim Laden :-(',
                'Es ist ein Fehler beim Nachladen aufgetreten:' + data.message
                + ' Details:' + data.details);
    };

    /**
     * Checks if the tree is in wished state and runs doneHandler.
     * If tree is not in state, it waits waitTime trys it till maxTries is reached.
     * If maxTries reached, doneHandler is done regardless of the state.
     * @param {String} treeId         id of the html-element containing the tree
     * @param {String} state          the state the tree must reached to run doneHandler
     * @param {int} waitTime          millis to wait for next try if tree is not in state
     * @param {int} maxTries          maximum of tries till donehandlder will run if tree is not in state
     * @param {function} doneHandler  callback-function to run if tree is in state
     * @param {String} name           name of the callback-function fpr logging
     */
    me._onFancyTreeStateChange = function(treeId, state, waitTime, maxTries, doneHandler, name) {
        // check if donehandler
        if (doneHandler) {
            // only postprocess after rendering
            if (treeInstances[treeId].state !== state && maxTries > 0) {
                // wait if maxTries>0 or state is set to rendering_done
                console.log('_onFancyTreeStateChange doneHandler:' + name + ') try=' + maxTries
                    + ' wait=' + waitTime + 'ms for ' + treeId + '=' + state);
                setTimeout(function() {
                    me._onFancyTreeStateChange(treeId, state, waitTime, maxTries-1, doneHandler);
                }, waitTime);
            } else {
                // maxTries=0 or state is set to rendering_done
                console.log('__onFancyTreeStateChange call doneHandler:' + name + ' try=' + maxTries
                    + ' for ' + treeId + '=' + state);
                doneHandler();
            }
        }
    };

    me._init();
    
    return me;
};

/**
 * angular-module for serving yaio
 * @module
 */
var yaioApp = angular.module('yaioExplorerApp', ['ngAnimate', 'ngRoute', 'pascalprecht.translate']);

/**
 * angular-config: configures the routing for the app, add new routes to the $routeProvider-instance
 * @config
 */
yaioApp.config(function($routeProvider) {
    'use strict';
    
    var resBaseUrl = yaioAppBase.config.resBaseUrl;

    // configure routes
    $routeProvider
        .when('/show/:nodeId/activate/:activeNodeId/:dummy?', { 
            controller:  'NodeShowCtrl',
            templateUrl: resBaseUrl + 'js/explorer/node.html' })
        .when('/show/:nodeId/:workflowState?/:statCount?/activate/:activeNodeId/:dummy?', { 
            controller:  'NodeShowCtrl',
            templateUrl: resBaseUrl + 'js/explorer/node.html' })
        .when('/show/:nodeId/:workflowState?/:statCount?/:dummy?', { 
            controller:  'NodeShowCtrl',
            templateUrl: resBaseUrl + 'js/explorer/node.html' })
        .when('/show/:nodeId', { 
            controller:  'NodeShowCtrl',
            templateUrl: resBaseUrl + 'js/explorer/node.html' })
        .when('/showByAllIds/:nodeByAllId', { 
            controller:  'NodeShowCtrl',
            templateUrl: resBaseUrl + 'js/explorer/node.html' })
        .when('/search/:curPage?/:pageSize?/:searchSort?/:baseSysUID?/:fulltext?/:additionalFilters?/', { 
            controller:  'NodeSearchCtrl',
            templateUrl: resBaseUrl + 'js/search/node-search.html' })
        .when('/search/', { 
            controller:  'NodeSearchCtrl',
            templateUrl: resBaseUrl + 'js/search/node-search.html' })
        .when('/login', {
            controller : 'AuthController',
            templateUrl: resBaseUrl + 'js/auth/login.html' })
        .when('/logout', {
            controller : 'AuthController',
            templateUrl: resBaseUrl + 'js/auth/login.html' })
        .when('/logout/:logout', {
            controller : 'AuthController',
            templateUrl: resBaseUrl + 'js/auth/login.html' })
        .when('/frontpage/:nodeId', { 
            controller:  'FrontPageCtrl',
            templateUrl: resBaseUrl + 'js/frontpage/frontpage.html' })
        .when('/frontpage', { 
            controller:  'FrontPageCtrl',
            templateUrl: resBaseUrl + 'js/frontpage/frontpage.html' })
        .when('/dashboard', { 
            controller:  'DashboardCtrl',
            templateUrl: resBaseUrl + 'js/dashboard/dashboard.html' })
        .when('/sourceselect', { 
            controller:  'SourceSelectorCtrl',
            templateUrl: resBaseUrl + 'js/sourceselector/sourceselector.html' })
        .when('/sourceselect/:newds', { 
            controller:  'SourceSelectorCtrl',
            templateUrl: resBaseUrl + 'js/sourceselector/sourceselector.html' })
        .when('/', { 
            controller:  'SourceSelectorCtrl',
            templateUrl: resBaseUrl + 'js/sourceselector/sourceselector.html' })
        .otherwise({ redirectTo: '/'});
});

/**
 * angular-config: configures $sceDelegateProvider - adds resourcewhitelist
 * @config
 */
yaioApp.config(function($sceDelegateProvider) {
    'use strict';

    var resBaseUrl = yaioAppBase.config.resBaseUrl;
    var whitelist = [
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        resBaseUrl + '**'];
    
    // configure additional resBaseUrls for CORS
    if (yaioAppBase.config.addResBaseUrls && yaioAppBase.config.addResBaseUrls.length  > 0) {
        for (var idx = 0; idx < yaioAppBase.config.addResBaseUrls.length; idx++) {
            whitelist.push(yaioAppBase.config.addResBaseUrls[idx] + '/**');
        }
    }
    
    if (resBaseUrl && resBaseUrl !== '') {
        $sceDelegateProvider.resourceUrlWhitelist(whitelist);
    }
});

/**
 * angular-config: configures $httpProvider - adds default-headers for patch-requests
 * @config
 */
yaioApp.config(['$httpProvider', function($httpProvider) {
    'use strict';

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.patch = {
        'Content-Type': 'application/json;charset=utf-8'
    };
}]);

// define pattern
yaioApp.CONST_PATTERN_CSSCLASS = /^[ A-Za-z0-9\._-]+$/;
yaioApp.CONST_PATTERN_NUMBERS = /^\d+$/;
yaioApp.CONST_PATTERN_TEXTCONST = /^[A-Za-z0-9_]$/;
yaioApp.CONST_PATTERN_TITLE = /^[A-Za-z0-9_]$/;

yaioApp.CONST_PATTERN_SEG_TASK = /__[A-Za-z]+?[0-9]+?__/;
/** Pattern to parse Aufwand-segments */
yaioApp.CONST_PATTERN_SEG_HOURS = /^[0-9]?\\.?[0-9.]+$/;
/** Pattern to parse Stand-segments */
yaioApp.CONST_PATTERN_SEG_STAND = /^[0-9]?\\.?[0-9.]+$/;
/** Pattern to parse Date-segments */
yaioApp.CONST_PATTERN_SEG_DATUM = /^\\d\\d\\.\\d\\d.\\d\\d\\d\\d$/;
/** Pattern to parse common String-segments */
yaioApp.CONST_PATTERN_SEG_STRING = /^[-0-9\\p{L}/+_\\*\\. ]$/;
/** Pattern to parse Flag-segments */
yaioApp.CONST_PATTERN_SEG_FLAG = /^[-0-9\\p{L}+_]$/;
/** Pattern to parse Integer-segments */
yaioApp.CONST_PATTERN_SEG_INT = /^[0-9]$/;
/** Pattern to parse UID-segments */
yaioApp.CONST_PATTERN_SEG_UID = /^[0-9A-Za-z]$/;
/** Pattern to parse ID-segments */
yaioApp.CONST_PATTERN_SEG_ID = /^[0-9]$/;
/** Pattern to parse Tag-segments */
yaioApp.CONST_PATTERN_SEG_TAGS = /^[-0-9\\p{L}+_\\*\\.;]$/;
/** Pattern to parse ID-Praefix-segments */
yaioApp.CONST_PATTERN_SEG_PRAEFIX = /^[A-Za-z]$/;
/** Pattern to parse Checksum-segments */
yaioApp.CONST_PATTERN_SEG_CHECKSUM = /^[0-9A-Za-z]$/;
/** Pattern to parse Time-segments */
yaioApp.CONST_PATTERN_SEG_TIME = /^\\d\\d\\:\\d\\d$/;

/** 
 * angular-directive: adds the new tag-directive 'state' to output formated node-state
 * @directive
 */
yaioApp.directive('state', function(){
    'use strict';

    return {
        restrict: 'E', // own tag
        scope: {
            value: '='
        },
        template: '<span ng-show="value == \'RUNNING\'">laufend</span>' +
                  '<span ng-show="value != \'RUNNING\'">{{value}}</span>'
     };
});

/***************************************
 ***************************************
 * errorhandling from https://nulogy.com/articles/designing-angularjs-directives#.VBp5gvnV-Po
 ***************************************
 ***************************************/

/**
 * angular-factory for serving form-validation-services
 * new function to set form-errors when using input-elements with attribute 'witherrors'
 * and element 'fielderrors' to show the corresponding errors
 * @service
 */
yaioApp.factory('setFormErrors', function() {
    'use strict';

    // Registered withErrors controllers
    var withErrorCtrls = [];

    // The exposed service
    var setFormErrors = function(opts) {
        var fieldErrors = opts.fieldErrors;
        var ctrl = withErrorCtrls[opts.formName];

        Object.keys(fieldErrors).forEach(function(fieldName) {
            ctrl.setErrorsFor(fieldName, fieldErrors[fieldName]);
        });
    };

    // Registers withErrors controller by form name (for internal use)
    setFormErrors._register = function(formName, ctrl) {
        withErrorCtrls[formName] = ctrl;
    };

    return setFormErrors;
});


/** 
 * adds the new attribute-directive 'witherrors' to set/show errors from
 * different sources (AngularJS, App, WebServices) for this element
 */
yaioApp.directive('withErrors', ['setFormErrors', function(setFormErrors) {
    'use strict';

    return {
        restrict: 'A',
        require: 'withErrors',
        controller: ['$scope', '$element', function($scope, $element) {
            var controls = {};

            this.addControl = function(fieldName, ctrl) {
                controls[fieldName] = ctrl;
            };

            this.setErrorsFor = function(fieldName, errors) {
                if (!(fieldName in controls)) { return; }
                return controls[fieldName].setErrors(errors);
            };

            this.clearErrorsFor = function(fieldName, errors) {
                if (!(fieldName in controls)) { return; }
                return controls[fieldName].clearErrors(errors);
            };
        }],
        link: function(scope, element, attrs, ctrl) {
            // Make this form controller accessible to setFormErrors service
            setFormErrors._register(attrs.name, ctrl);
        }
    }; 
}]);


/** 
 * extend the element with the new attribute-directive 'witherrors' to
 * set/show errors from different sources (AngularJS, App, WebServices) for this element
 */
function directiveFieldsWithErrors () {
    'use strict';

    return {
        restrict: 'E',
        require: ['?ngModel', '?^withErrors'],
        scope: true,
        link: function(scope, element, attrs, ctrls) {
            var ngModelCtrl = ctrls[0];
            var withErrorsCtrl = ctrls[1];
            var fieldName = attrs.name;

            if (!ngModelCtrl || !withErrorsCtrl) { return; }

            // Watch for model changes and set errors if any
            scope.$watch(attrs.ngModel, function() {
                if (ngModelCtrl.$dirty && ngModelCtrl.$invalid) {
                    withErrorsCtrl.setErrorsFor(fieldName, errorMessagesFor(ngModelCtrl));
                } else if (ngModelCtrl.$valid) {
                    withErrorsCtrl.clearErrorsFor(fieldName);
                }
            });

            // Mapping Angular validation errors to a message
            var errorMessages = {
                    required: 'This field is required'
            };

            function errorMessagesFor(ngModelCtrl) {
                return Object.keys(ngModelCtrl.$error).
                map(function(key) {
                    if (ngModelCtrl.$error[key]) { return errorMessages[key]; }
                    else { return null; }
                }).
                filter(function(msg) {
                    return msg !== null;
                });
            }
        }
    };
}

/** 
 * extend the element with the new attribute-directive 'witherrors' to
 * set/show errors from different sources (AngularJS, App, WebServices) for this element
 */
yaioApp.directive('input', function() {
    'use strict';

    return directiveFieldsWithErrors();
});
//yaioApp.directive('select', function() {
//    return directiveFieldsWithErrors();
//});
//yaioApp.directive('textarea', function() {
//    return directiveFieldsWithErrors();
//});

/** 
 * adds the new element-directive 'fielderrors' to set/show errors from
 * different sources (AngularJS, App, WebServices) for this element
 */
yaioApp.directive('fielderrors', function() {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        scope: true,
        require: ['fielderrors', '^withErrors'],
        template: 
            '<div class="fielderror" ng-repeat="error in errors">' +
            '<small class="error">{{ error }}</small>' +
            '</div>',
            controller: ['$scope', function($scope) {
                $scope.errors = [];
                this.setErrors = function(errors) {
                    $scope.errors = errors;
                };
                this.clearErrors = function() {
                    $scope.errors = [];
                };
            }],
            link: function(scope, element, attrs, ctrls) {
                var fieldErrorsCtrl = ctrls[0];
                var withErrorsCtrl = ctrls[1];
                withErrorsCtrl.addControl(attrs.for, fieldErrorsCtrl);
            }
    };
});

/**
 * angular-factory for serving yaioUtils-services - create yaioUtils with util-functions
 * @service
 */
yaioApp.factory('yaioUtils', ['$location', '$http', '$rootScope', '$q', function ($location, $http, $rootScope, $q) {
    'use strict';

    var appBase = yaioAppBase;
    var ganttRangeStart = appBase.get('DataUtils').formatGermanDate((new Date()).getTime() - 90*24*60*60*1000); 
    var ganttRangeEnd = appBase.get('DataUtils').formatGermanDate((new Date()).getTime() + 90*24*60*60*1000);

    // set angular to appbase
    appBase.configureService('Angular.$location', function() { return $location; });
    appBase.configureService('Angular.$http', function() { return $http; });
    appBase.configureService('Angular.$rootScope', function() { return $rootScope; });
    appBase.configureService('Angular.$q', function() { return $q; });

    return {
        /** 
         * open helpsite
         * @param {String} url                    the url of the helpsite
         */
        showHelpSite: function(url) {
            console.log('showHelpSite:' + ' url:' + url);
            appBase.get('YaioLayout').yaioShowHelpSite(url);
            return false;
        },

        /**
         * toggle the sys-container for the node
         * @param {Object} node    node-data
         */
        toggleSysContainerForNode: function(node) {
            appBase.get('YaioExplorerCommands').toggleNodeSysContainerForNodeId(node.sysUID);
        },

        /**
         * toggle editor for the node
         * @param {Object} node     node-data
         * @param {String} mode     edit, create, createsymlink
         * @param {Object} newNode  optional node to copy data from (for mode createsnapshot...)
         */
        openNodeEditorForNode: function(node, mode, newNode) {
            appBase.get('YaioNodeEditor').openNodeEditorForNode(node, mode, newNode);
        },

        /**
         * download the content as file (create response and open in new window)
         * @param {String} domId     id of the link to add the action
         * @param {string} content   data to download
         * @param {string} fileName  filename for save-dialog of the browser
         * @param {string} mime      mimetype of the file
         * @param {string} encoding  encoding to set
         */
        downloadAsFile: function(domId, content, fileName, mime, encoding) {
            return appBase.getService('FileUtils').downloadAsFile(appBase.$(domId), content, fileName, mime, encoding);
        },

        /**
         * Renders the full block for corresponding basenode.
         * @param {Object} node           node-data to render
         * @param {String} trIdSelector   tr-selector to append the rendered data
         * @param {Boolean} flgMinimum    render only the minimal subset of data
         */
        renderNodeLine: function(node, trIdSelector, flgMinimum) {
            // load me
            var data = {
                 node: {
                     data: {
                         basenode: node
                     },
                     tr: trIdSelector
                 } 
            };
            
            console.log('renderNodeLine nodeId=' + node.sysUID + ' tr=' + $(trIdSelector).length);
            appBase.get('YaioNodeDataRenderer').renderColumnsForNode(null, data, true, flgMinimum);
        },
        

        ganttOptions: {
            ganttRangeStart: ganttRangeStart, 
            ganttRangeEnd: ganttRangeEnd
        },

        /**
         * return the current appBase
         * @returns {JsHelferlein.AppBase}   the current appBase
         */
        getAppBase: function() {
            return appBase;
        },

        /**
         * return the current instance of the service
         * @param {String} service               servicename
         * @returns {JsHelferlein.ServiceBase}   current instance of the service
         */
        getService: function(service) {
            return appBase.get(service);
        },

        /**
         * return the current appBase-config
         * @returns {JsHelferlein.ConfigBase}   current appBase-config
         */
        getConfig: function() {
            return appBase.config;
        }
        
    };
}]);

/** 
 * angular-factory for serving authentification-services
 * @service
 */
yaioApp.factory('authorization', function ($rootScope, yaioUtils) {
    'use strict';

    return {
        /**
         * check if user is authentificated: sets $rootScope.authenticated and calls callback
         * @param {function} callback    callback to call after check
         */
        authentificate: function(callback) {
            yaioUtils.getService('YaioDataSourceManager').getCurrentConnection().checkSession().success(function(data) {
                console.log('authentificate: success ' + data);
                if (data) {
                    $rootScope.authenticated = true;
                } else {
                    $rootScope.authenticated = false;
                }
                if (callback) {
                    callback();
                }
            }).error(function(data) {
                console.log('authentificate: error ' + data);
                $rootScope.authenticated = false;
                if (callback) {
                    callback();
                }
            });
        }
    };
});

/**
 * angular-controller for serving pages: login/logout
 * @controller
 */
yaioApp.controller('AuthController', function($rootScope, $scope, $location, $routeParams,
                                              setFormErrors, OutputOptionsEditor, authorization, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        $scope.credentials = {};

        if ($routeParams.logout) {
            $scope.logout();
        }
    };

    /**
     * do login
     * @returns {*|JQueryPromise<any>|JQueryPromise<U>|JQueryPromise<void>}
     */
    $scope.login = function() {
        return yaioUtils.getService('YaioDataSourceManager').getCurrentConnection().loginToService($scope.credentials)
            .then(function success() {
                    // handle success
                    authorization.authentificate(function() {
                        if ($rootScope.authenticated) {
                            if ($rootScope.lastLocation) {
                                $location.path($rootScope.lastLocation);
                            } else {
                                $location.path(yaioUtils.getConfig().appFrontpageUrl);
                            }
                            $scope.error = false;
                        } else {
                            $location.path(yaioUtils.getConfig().appLoginUrl);
                            $scope.error = true;
                        }
                    });
                }, function error() {
                    // handle error
                    $location.path(yaioUtils.getConfig().appLoginUrl);
                    $scope.error = true;
                    $rootScope.authenticated = false;
            });
    };

    /**
     * do logout
     * @returns {*|JQueryPromise<any>|JQueryPromise<U>|JQueryPromise<void>}
     */
    $scope.logout = function() {
        return yaioUtils.getService('YaioDataSourceManager').getCurrentConnection().logoutFromService()
            .then(function success() {
                // handle success
                $rootScope.authenticated = false;
                $location.path(yaioUtils.getConfig().appRootUrl);
            }, function error() {
                // handle error
                $location.path(yaioUtils.getConfig().appRootUrl);
                $rootScope.authenticated = false;
            });
    };
    
    
    // init
    $scope._init();
});


/**
 * angular-config: configures $translateProvider - international app to get text-resources
 * @config
 */
yaioApp.config(function ($translateProvider) {
    'use strict';

    $translateProvider.translations();
    
    $translateProvider.useStaticFilesLoader({
        prefix: yaioAppBase.config.resBaseUrl + 'lang/lang-',
        suffix: '.json'
      });

    // default-language
    var langKey = 'de';
    
    // init
    $translateProvider.preferredLanguage(langKey);
    yaioAppBase.get('YaioLayout').initLanguageSupport(langKey);
    $translateProvider.currentLanguageKey = langKey;
    

    // change icons
    $('.button-lang').removeClass('button-lang-active').addClass('button-lang-inactive');
    $('#button_lang_' + langKey).removeClass('button-lang-inactive').addClass('button-lang-active');
});

/**
 * angular-controller for serving page-element: language-switch
 * @controller
 */
yaioApp.controller('LanguageCtrl', ['$translate', '$scope', function ($translate, $scope, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        // define languageutils
        $scope.currentLanguageKey = $translate.currentLanguageKey;
    };

    /**
     * switch current language to key (swictehs language-buttons)
     * @param {String} langKey    new langkey
     */
    $scope.changeLanguage = function (langKey) {
        // change angularTranslate
        $translate.use(langKey);
        
        // change other languagetranslator
        window.lang.change(langKey);
        
        $scope.currentLanguageKey = langKey;
        
        // change icons
        $('.button-lang').removeClass('button-lang-active').addClass('button-lang-inactive');
        $('#button_lang_' + langKey).removeClass('button-lang-inactive').addClass('button-lang-active');
    };

    // init
    $scope._init();
}]);

/**
 * angular-controller for serving page: node-editor
 * @controller
 */
yaioApp.controller('FrontPageCtrl', function($rootScope, $scope, $location, $routeParams,
                                             setFormErrors, OutputOptionsEditor, authorization, yaioUtils) {
    'use strict';

    var nodeId = $routeParams.nodeId;

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        // set vars
        if (yaioUtils.getService('DataUtils').isUndefinedStringValue(nodeId)) {
            nodeId = 'SysStart1';
        }
        console.log('FrontPageCtrl - processing nodeId=' + nodeId);

        $scope.frontpageNodeId = nodeId;

        // call authentificate
        authorization.authentificate(function () {
            // check authentification
            if (!$rootScope.authenticated) {
                $location.path(yaioUtils.getConfig().appLoginUrl);
                $scope.error = false;
            } else {
                // load data
                $scope.frontPageUrl = yaioUtils.getService('YaioAccessManager').getAvailiableNodeAction('frontpagebaseurl', nodeId, false);
            }
        });
    };

    // init
    $scope._init();
});

/**
 * angular-controller for serving page: dashoard-page
 * @controller
 */
yaioApp.controller('DashboardCtrl', function($rootScope, $scope, $location, $routeParams, setFormErrors,
                                             OutputOptionsEditor, authorization, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        // call authentificate
        authorization.authentificate(function () {
            // check authentification
            if (!$rootScope.authenticated) {
                $location.path(yaioUtils.getConfig().appLoginUrl);
                $scope.error = false;
            }
        });
    };

    // init
    $scope._init();
});

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
            strMetaNodeSubTypeFilter: ''
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
     * callbackhandler to rendernodeLine for node
     * @param {Object} node    YaioNode render
     */
    $scope.renderNodeLine = function(node) {
        // we need a timeout to put the tr into DOM
        setTimeout(function() {
                var domId = $scope.searchOptions.praefix + node.sysUID;
                $scope.yaioUtils.renderNodeLine(node, '#tr' + domId, true);
                console.log('renderNodeLine: done to:' + '#tr' + domId + $('#detail_sys_' + domId).length);

                var $html = $($scope.createParentHirarchyBlockForNode(node));
                $('#tr' + domId + ' #detail_sys_' + node.sysUID).after($html);
                console.log('renderNodeLine: added searchdata to:' +
                    '#detail_sys_' + domId + $('#detail_sys_' + domId).length);
            }, 10);
    };

    /**
     * create parentHirarchy-Block for node
     * @param {Object} node          node to render
     * @returns {String}
     */
    $scope.createParentHirarchyBlockForNode = function(node) {
        // render hierarchy
        var parentNode = node.parentNode;
        var parentStr = node.name;
        while (!yaioUtils.getService('DataUtils').isEmptyStringValue(parentNode)) {
            parentStr = parentNode.name + ' --> ' + parentStr;
            parentNode = parentNode.parentNode;
        }
        parentStr = '<b>' + yaioUtils.getService('DataUtils').htmlEscapeText(parentStr) + '</b>';

        // add hierarchy
        var html = '<div id="details_parent_' + node.sysUID + '"'
            + ' class="field_nodeParent">'
            + parentStr
            + '</div>';
        return html;
    };


    // init
    $scope._init();
});

/**
 * angular-controller for serving page-element: node-editor
 * @controller
 */
yaioApp.controller('NodeEditorCtrl', function($rootScope, $scope, $location, $routeParams,
                                              setFormErrors, authorization, yaioUtils) {
    'use strict';

    // create node
    var nodeId = $rootScope.nodeId;

    /**
     * configure controller
     * @private
     */
    $scope._configure = function () {
        // register pattern
        $scope.CONST_PATTERN_CSSCLASS  = yaioApp.CONST_PATTERN_CSSCLASS ;
        $scope.CONST_PATTERN_NUMBERS  = yaioApp.CONST_PATTERN_NUMBERS ;
        $scope.CONST_PATTERN_TEXTCONST  = yaioApp.CONST_PATTERN_TEXTCONST ;
        $scope.CONST_PATTERN_TITLE  = yaioApp.CONST_PATTERN_TITLE ;
        $scope.CONST_PATTERN_SEG_TASK  = yaioApp.CONST_PATTERN_SEG_TASK ;
        $scope.CONST_PATTERN_SEG_HOURS  = yaioApp.CONST_PATTERN_SEG_HOURS ;
        $scope.CONST_PATTERN_SEG_STAND  = yaioApp.CONST_PATTERN_SEG_STAND ;
        $scope.CONST_PATTERN_SEG_DATUM  = yaioApp.CONST_PATTERN_SEG_DATUM ;
        $scope.CONST_PATTERN_SEG_STRING  = yaioApp.CONST_PATTERN_SEG_STRING ;
        $scope.CONST_PATTERN_SEG_FLAG  = yaioApp.CONST_PATTERN_SEG_FLAG ;
        $scope.CONST_PATTERN_SEG_INT  = yaioApp.CONST_PATTERN_SEG_INT ;
        $scope.CONST_PATTERN_SEG_UID  = yaioApp.CONST_PATTERN_SEG_UID ;
        $scope.CONST_PATTERN_SEG_ID  = yaioApp.CONST_PATTERN_SEG_ID ;
        $scope.CONST_PATTERN_SEG_TAGS  = yaioApp.CONST_PATTERN_SEG_TAGS ;
        $scope.CONST_PATTERN_SEG_PRAEFIX  = yaioApp.CONST_PATTERN_SEG_PRAEFIX ;
        $scope.CONST_PATTERN_SEG_CHECKSUM  = yaioApp.CONST_PATTERN_SEG_CHECKSUM ;
        $scope.CONST_PATTERN_SEG_TIME  = yaioApp.CONST_PATTERN_SEG_TIME ;
    };

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        $scope.nodeForEdit = {};
        $scope.uploadFile = undefined;

        $scope.availiableSystemTemplates = [];
        $scope.availiableOwnTemplates = [];

        $scope.loadAvailiableTemplates();
    };

    /**
     * discard and close the editor
     */
    $scope.discard = function() {
        yaioUtils.getService('YaioNodeEditor').closeNodeEditor();
        return false;
    };
    
    /** 
     * validate the type of a newNode and open the corresponding form
     */
    $scope.selectNewNodeType = function() {
        // hide all forms
        yaioUtils.getService('YaioNodeEditor').hideAllNodeEditorForms();
        
        // display createform and select nodeform
        $('#containerFormYaioEditorCreate').css('display', 'block');
        var className = $scope.nodeForEdit.className;
        $('#containerFormYaioEditor' + className).css('display', 'block');
        console.log('selectNewNodeType open form #containerFormYaioEditor' + className);

        // special fields
        if (className === 'SymLinkNode') {
            $scope.nodeForEdit.type = 'SYMLINK';
            $scope.nodeForEdit.metaNodeSubType = 'SymLinkNodeMetaNodeSubType.SYMLINK';
        } else if (className === 'InfoNode') {
            $scope.nodeForEdit.type = 'INFO';
            $scope.nodeForEdit.metaNodeSubType = 'InfoNodeMetaNodeSubType.INFONODE';
        } else if (className === 'UrlResNode') {
            $scope.nodeForEdit.type = 'URLRES';
            $scope.nodeForEdit.metaNodeSubType = 'UrlResNodeMetaNodeSubType.RESOURCE';
        } else if (className === 'TaskNode') {
            $scope.nodeForEdit.type = 'OFFEN';
            $scope.nodeForEdit.metaNodeSubType = 'TaskNodeMetaNodeSubType.TASK';
        } else if (className === 'EventNode') {
            $scope.nodeForEdit.type = 'EVENT_PLANED';
            $scope.nodeForEdit.metaNodeSubType = 'EventNodeMetaNodeSubType.EVENT';
        }

        // set mode
        $scope.nodeForEdit.mode = 'create';
        return false;
    };


    /**
     * create a new node from template $scope.nodeForEdit.createFromTemplate
     */
    $scope.selectCreateFromTemplate = function() {
        // create new node by template
        var newParentKey = $scope.nodeForEdit.sysUID;
        var srcId = $scope.nodeForEdit.createFromTemplate;
        if (!yaioUtils.getService('DataUtils').isEmpty(srcId)) {
            yaioUtils.getService('YaioNodeRepository').copyNode(srcId, newParentKey)
                .done(function(yaioNodeActionResponse, textStatus, jqXhr ) {
                    yaioUtils.getService('YaioExplorerCommands').patchNodeSuccessHandler(srcId, yaioNodeActionResponse,
                        textStatus, jqXhr);
                });
            yaioUtils.getService('YaioNodeEditor').closeNodeEditor();
            return false;
        }
    };

    /**
     * load available templates into form
     */
    $scope.loadAvailiableTemplates = function() {
        yaioUtils.getService('YaioNodeRepository').getAvailableTemplates()
            .then(function sucess(angularResponse) {
                    // handle success
                    $scope.availiableSystemTemplates = angularResponse.data.systemTemplates;
                    $scope.availiableOwnTemplates = angularResponse.data.ownTemplates;
                }, function error(angularResponse) {
                    // handle error
                    var data = angularResponse.data;
                    var header = angularResponse.header;
                    var config = angularResponse.config;
                    var message = 'error loading node-templates';
                    yaioUtils.getService('Logger').logError(message, true);
                    message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                    yaioUtils.getService('Logger').logError(message, false);
            });
    };

    /** 
     * callbackhandler to perform actions when type has changed - updates istStand
     * calls yaioUtils.getService('YaioNodeEditor').calcIstStandFromState() for the node
     * if ERLEDIGT || VERWORFEN || EVENT_ERLEDIGT || EVENT_VERWORFEN: update istStand=100
     */
    $scope.doTypeChanged = function() {
        $scope.nodeForEdit.istStand = yaioUtils.getService('YaioNodeEditor').calcIstStandFromState($scope.nodeForEdit);
        return false;
    };
    
    
    /** 
     * callbackhandler to perform actions when istStand has changed - updates type
     * recalcs the type/state depending on the istStand
     * <ul>
     *   <li>if className=TaskNode && 0: update type=OFFEN
     *   <li>if className=TaskNode && >0&&<100 && ! WARNING: update type=RUNNING
     *   <li>if className=TaskNode && 100 && != VERWORFEN: update type=ERLEDIGT
     *   <li>if className=EventNode && 0: update type=EVENT_PLANED
     *   <li>if className=EventNode && >0&&<100 && ! EVENT_WARNING: update type=EVENT_RUNNING
     *   <li>if className=EventNode && 100 && != EVENT_VERWORFEN: update type=EVENT_ERLEDIGT
     * </ul>
     */
    $scope.doIstStandChanged = function() {
        $scope.nodeForEdit.type = yaioUtils.getService('YaioNodeEditor').calcTypeFromIstStand($scope.nodeForEdit);
        return false;
    };
    
    /** 
     * callbackhandler to perform actions when type has changed - updates stand
     * if EVENT_ERLEDIGT || VERWORFEN: update stand=100;
     */
    $scope.doTaskNodeTypeChanged = function() {
        if (   $scope.nodeForEdit.type === 'ERLEDIGT'
            || $scope.nodeForEdit.type === 'VERWORFEN'
            ) {
            $scope.nodeForEdit.stand ='100';
        }
        return false;
    };
    
    /** 
     * callbackhandler to perform actions when UploadFile has changed - updates resLocRef and uploadFile
     * set variable in scope with filename and updates resLocRef
     */
    $scope.doUploadFileUrlResNodeChanged = function() {
        var element = document.getElementById('inputUploadFileUrlResNode');
        if (element && element.files) {
            $scope.setUploadFileUrlResNode(element.files[0], false);
        }
    };

    /**
     * set the uploadFile - updates resLocRef and uploadFile
     * @param {File} uploadFile         Fileobject
     * @param {Boolean} forceDoIndex    flag do index uploaded file
     */
    $scope.setUploadFileUrlResNode = function(uploadFile, forceDoIndex) {
        $scope.uploadFile = uploadFile;
        var fileName = '';
        if ($scope.uploadFile) {
            fileName = $scope.uploadFile.name;
        }
        $scope.nodeForEdit.resLocRef = fileName;
        $('#inputResLocRefUrlResNode').val($scope.nodeForEdit.resLocRef);

        if (forceDoIndex) {
            $scope.nodeForEdit.resIndexDMSState = true;
            $('#inputResIndexDMSStateUrlResNode').prop('checked', true).trigger('input').triggerHandler('change');
        }
    };


    /**
     * save node and updates layout - map the nodedata, create json, call webservice and relocate to the new nodeId
     * @param {String} formName    form to submit
     */
    $scope.save = function(formName) {
        // define json for common fields
        var nodeObj = {name: $scope.nodeForEdit.name};

        // do extra for the different classNames
        // configure value mapping
        var fields = [];
        fields = fields.concat(yaioUtils.getConfig().configNodeTypeFields.Common.fields);
        if ($scope.nodeForEdit.className === 'TaskNode') {
            fields = fields.concat(yaioUtils.getConfig().configNodeTypeFields.TaskNode.fields);
            $scope.nodeForEdit.state = $scope.nodeForEdit.type;
        } else if ($scope.nodeForEdit.className === 'EventNode') {
            fields = fields.concat(yaioUtils.getConfig().configNodeTypeFields.EventNode.fields);
        } else if ($scope.nodeForEdit.className === 'InfoNode') {
            fields = fields.concat(yaioUtils.getConfig().configNodeTypeFields.InfoNode.fields);
        } else if ($scope.nodeForEdit.className === 'UrlResNode') {
            fields = fields.concat(yaioUtils.getConfig().configNodeTypeFields.UrlResNode.fields);
        } else if ($scope.nodeForEdit.className === 'SymLinkNode') {
            fields = fields.concat(yaioUtils.getConfig().configNodeTypeFields.SymLinkNode.fields);
        }
        
        // iterate fields an map to nodeObj
        for (var idx in fields) {
            if (!fields.hasOwnProperty(idx)) {
                continue;
            }
            var field = fields[idx];
            var fieldName = field.fieldName;
            var value = $scope.nodeForEdit[fieldName];
            
            if (field.intern) {
                // ignore intern
                continue;
            } if (field.type === 'checkbox' && ! value) {
                value = '';
            } if (field.type === 'tagstring') {
                value = value || [];
                value = value.join(' ');
            }
            
            // convert values
            var lstDate, newDate;
            if (field.datatype === 'date' && value) {
                console.log('map nodefield date pre:' + fieldName + '=' + value);
                lstDate = value.split('.');
                newDate = new Date(lstDate[1]+'/'+lstDate[0]+'/'+lstDate[2]);
                value = newDate.getTime();
                console.log('map nodefield date post:' + fieldName + '=' + newDate + '->' + value);
            } if (field.datatype === 'datetime' && value) {
                console.log('map nodefield datetime pre:' + fieldName + '=' + value);
                var lstDateTime = value.split(' ');
                lstDate = lstDateTime[0].split('.');
                var strTime = lstDateTime[1];
                var newDateTimeStr = lstDate[1]+'/'+lstDate[0]+'/'+lstDate[2] + ' ' + strTime + ':00';
                console.log('map nodefield datetime run:' + fieldName + '=' + newDateTimeStr);
                newDate = new Date(newDateTimeStr);
                value = newDate.getTime();
                console.log('map nodefield datetime post:' + fieldName + '=' + newDate + '->' + value);
            }
            
            nodeObj[fieldName] = value;
            console.log('map nodefield:' + fieldName + '=' + value);
        }
        if ($scope.nodeForEdit.className === 'UrlResNode') {
            if ($scope.nodeForEdit.resContentDMSState) {
                nodeObj.resContentDMSState = 'UPLOAD_OPEN';
            }
            if ($scope.nodeForEdit.resIndexDMSState) {
                nodeObj.resIndexDMSState = 'INDEX_OPEN';
            }
        }
        
        // save node
        var yaioSaveNodeSuccessHandler = function(nodeObj, options, yaioNodeActionResponse) {
            // sucess handler
            var msg = 'yaioSaveNodeSuccessHandler node: ' + options.mode + ' ' + nodeObj.sysUID;
            
            // check response
            var state = yaioNodeActionResponse.state;
            if (state === 'OK') {
                // all fine
                console.log(msg + ' OK saved node:' + yaioNodeActionResponse.stateMsg);
                
                // reload
                var newUrl = '/show/' + nodeId 
                    + '/activate/' + yaioNodeActionResponse.node.sysUID + '/'; //$scope.nodeForEdit.sysUID
                console.log(msg + ' RELOAD:' + newUrl);
                
                // no cache!!!
                $location.path(newUrl + '?' + (new Date()).getTime());
            } else {
                // error
                var message = 'error saving node:' + yaioNodeActionResponse.stateMsg
                        + ' details:' + yaioNodeActionResponse;
                var userMessage = 'error saving node:' + yaioNodeActionResponse.stateMsg;
                
                // map violations
                var violations = yaioNodeActionResponse.violations;
                var fieldErrors = {};
                if (violations && violations.length > 0) {
                    message = message + ' violations: ';
                    userMessage = '';
                    for (var idx in violations) {
                        if (!violations.hasOwnProperty(idx)) {
                            continue;
                        }
                        // map violation errors
                        var violation = violations[idx];
                        
                        // TODO crud hack
                        if (violation.path === 'state') {
                            violation.path = 'type';
                        } else if (violation.path === 'planValidRange') {
                            violation.path = 'planStart';
                        } else if (violation.path === 'planStartValid') {
                            violation.path = 'planStart';
                        } else if (violation.path === 'planEndeValid') {
                            violation.path = 'planEnde';
                        } else if (violation.path === 'istValidRange') {
                            violation.path = 'istStart';
                        } else if (violation.path === 'istStartValid') {
                            violation.path = 'istStart';
                        } else if (violation.path === 'istEndeValid') {
                            violation.path = 'istEnde';
                        }
                        fieldErrors[violation.path] = [violation.message];
                        message = message + violation.path + ':' + violation.message + ', ';

                        // find formelement
                        var $formField = $('#' + options.formName).find('*[name="' + violation.path + '"]');
                        if (($formField.length > 0) && ($formField.is(':visible'))) {
                            // formfield is shown by showErrors
                            console.log(msg + ' MAP violation ' + violation + ' = ' + violation.path + ':' +
                                violation.message + ' to ' + options.formName + ' id=' + $($formField).attr('id'));
                        } else {
                            // another error: show userMessage
                            userMessage += '<br>' + violation.path + ':' + violation.message;
                        }
                    }
                }
                yaioUtils.getService('Logger').logError(message, false);
                if (!yaioUtils.getService('DataUtils').isUndefinedStringValue(userMessage)) {
                    yaioUtils.getService('Logger').logError(userMessage, true);
                }
                
                // Failed
                setFormErrors({
                    formName: options.formName,
                    fieldErrors: fieldErrors
                });
                
                console.log(msg + ' DONE');
            }
        };
        
        // call save
        var options = {
                mode: $scope.nodeForEdit.mode,
                formName: formName,
                className: $scope.nodeForEdit.className,
                sysUID: $scope.nodeForEdit.sysUID,
                uploadFile: $scope.uploadFile
            };
        return yaioUtils.getService('YaioNodeRepository').saveNode(nodeObj, options)
            .then(function success(angularReponse) {
                    // handle success
                    return yaioSaveNodeSuccessHandler(nodeObj, options, angularReponse.data);
                }, function error(angularReponse) {
                    // handle error
                    var data = angularReponse.data;
                    var header = angularReponse.header;
                    var config = angularReponse.config;
                    var message = 'error saving node ' + nodeObj.sysUID;
                    yaioUtils.getService('Logger').logError(message, true);
                    message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                    yaioUtils.getService('Logger').logError(message, false);
            });
    };
    
    // init
    $scope._configure();
    $scope._init();
});

/**
 * angular-controller for serving page-element: import-form
 * @controller
 */
yaioApp.controller('ImporterCtrl', function($rootScope, $scope, $location, $routeParams,
                                            setFormErrors, authorization, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;
    };

    /** 
     * submit and close the importeditor
     */
    $scope.sendImport = function() {
        var formId = '#nodeFormImport';
        $(formId).submit();
        yaioUtils.getService('UIToggler').toggleElement('#containerFormYaioEditorImport');

        console.log('send done');
        return false;
    };
    
    /** 
     * discard and close the editor
     */
    $scope.discardImport = function() {
        yaioUtils.getService('UIToggler').toggleElement('#containerFormYaioEditorImport');
        console.log('discard done');
        return false;
    };

    /** 
     * open the importEditor
     * @param {String} sysUID                 the sysUID of the current node
     * @param {String} newUrl                 the url to submit the for to
     * @param {String} newTarget              the target window-name
     */
    $scope.showImportEditor = function(sysUID, newUrl, newTarget) {
        var url = newUrl;
        var target = newTarget;

        var formId = '#nodeFormImport';
        $(formId).attr('target', target);
        $(formId).attr('action', url);
        $(formId).trigger('form').triggerHandler('change');
        $(formId).trigger('input');
        console.log('ImportEditor:' + ' url:' + url);
        $('#containerFormYaioEditorImport').css('display', 'none');
        yaioUtils.getService('UIToggler').toggleElement('#containerFormYaioEditorImport');
        
        // update appsize
        yaioUtils.getService('YaioLayout').setupAppSize();

        console.log('showImportEditor done:' + ' url:' + url);
        return false;
    };

    // init
    $scope._init();
});

/**
 * angular-controller for serving page-element: export-form
 * @controller
 */
yaioApp.controller('OutputOptionsCtrl', function($rootScope, $scope, $location, $routeParams,
                                                 setFormErrors, OutputOptionsEditor, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        // register the editor
        $scope.outputOptionsEditor = OutputOptionsEditor;
        // create options
        $scope.oOptions = $scope.outputOptionsEditor.oOptions;

        console.log('OutputOptionsCtrl - started');
    };

    // init
    $scope._init();
});


/**
 * angular-factory for serving export-form-functions
 * @service
 */
yaioApp.factory('OutputOptionsEditor', function(yaioUtils) {
    'use strict';

    var oOptions =  {};
    var url, target;

    // default-values
    oOptions.flgDoIntend = true;
    oOptions.flgShowBrackets = true;
    oOptions.intendFuncArea = 80;
    oOptions.flgIntendSum = false;

    oOptions.maxEbene = 9999;
    oOptions.maxUeEbene = 3;
    oOptions.intend = 2;
    oOptions.intendLi = 2;
    oOptions.intendSys = 160;
    oOptions.flgTrimDesc = true;
    oOptions.flgReEscapeDesc = true;

    oOptions.flgShowState = true;
    oOptions.flgShowType = true;
    oOptions.flgShowName = true;
    oOptions.flgShowResLoc = true;
    oOptions.flgShowSymLink = true;
    oOptions.flgShowDocLayout = true;
    oOptions.flgShowIst = true;
    oOptions.flgShowPlan = true;
    oOptions.flgShowChildrenSum = false;
    oOptions.flgShowMetaData = true;
    oOptions.flgShowSysData = true;
    oOptions.flgShowDesc = true;
    oOptions.flgShowDescWithUe = false;
    oOptions.flgShowDescInNextLine = false;

    oOptions.flgChildrenSum = false;
    oOptions.flgProcessDocLayout = false;
    oOptions.flgUsePublicBaseRef = false;
    oOptions.flgRecalc= false;
    oOptions.strClassFilter = '';
    oOptions.strTypeFilter = '';
    oOptions.strReadIfStatusInListOnly = '';
    
    // define the functions
    return {
        oOptions: oOptions,
        
        /** 
         * discard and close the editor
         */
        discard: function() {
            yaioUtils.getService('UIToggler').toggleElement('#containerFormYaioEditorOutputOptions');
            console.log('discard done');
            return false;
        },
    
        /** 
         * submit the form and close the editor
         */
        send: function() {
            var formId = '#nodeFormOutputOptions';
            $(formId).submit();
            yaioUtils.getService('UIToggler').toggleElement('#containerFormYaioEditorOutputOptions');
            console.log('send done');
            return false;
        },
        
        /** 
         * open the outputOptionsEditor
         * @param {String} sysUID                 the sysUID of the current node
         * @param {String} newUrl                 the url submit the form to
         * @param {String} newTarget              the target window-name
         */
        showOutputOptionsEditor: function(sysUID, newUrl, newTarget) {
            url = newUrl;
            target = newTarget;
            
            var formId = '#nodeFormOutputOptions';
            console.log('OutputOptionsEditor:' + ' url:' + url);
            $('#containerFormYaioEditorOutputOptions').css('display', 'none');
            yaioUtils.getService('UIToggler').toggleElement('#containerFormYaioEditorOutputOptions');
            $(formId).attr('target', target);
            $(formId).attr('action', url);
            $(formId).trigger('form').triggerHandler('change');
            $(formId).trigger('input');
            
            // update appsize
            yaioUtils.getService('YaioLayout').setupAppSize();

            console.log('showOutputOptionsEditor done:' + ' url:' + url);
            return false;
        }
    };
});

/**
 * angular-controller for serving page: explorer-page
 * @controller
 */
yaioApp.controller('NodeShowCtrl', function($rootScope, $scope, $location, $routeParams,
                                            setFormErrors, OutputOptionsEditor, authorization, yaioUtils) {
    'use strict';

    // check parameter - set default if empty
    var baseUrl = '/show/';
    var nodeId = $routeParams.nodeId;
    var nodeByAllId = $routeParams.nodeByAllId;
    var activeNodeId = $routeParams.activeNodeId;
    var flgNodeByAllId = false;
    if (!yaioUtils.getService('DataUtils').isUndefinedStringValue(nodeByAllId)) {
        nodeId = nodeByAllId;
        baseUrl = '/showByAllIds/';
        flgNodeByAllId = true;
    }
    if (yaioUtils.getService('DataUtils').isUndefinedStringValue(nodeId)) {
        nodeId = yaioUtils.getConfig().masterSysUId;
    }

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        // register the editor
        $scope.outputOptionsEditor = OutputOptionsEditor;

        // register filterOptions
        $scope.filterOptions = {};
        if ($routeParams.workflowState && $routeParams.workflowState !== '?') {
            $scope.filterOptions.strWorkflowStateFilter = $routeParams.workflowState;
        }
        if ($routeParams.statCount && $routeParams.statCount !== '?') {
            $scope.filterOptions.strStatCountFilter = $routeParams.statCount;
        }

        // create node
        $scope.node = {};
        $scope.config = {treeOpenLevel: 1};

        // save lastLocation for login
        $rootScope.lastLocation = baseUrl + nodeId;

        // save nodeId for NodeEditor
        $rootScope.nodeId = nodeId;

        // call authentificate
        authorization.authentificate(function () {
            // check authentification
            if (!$rootScope.authenticated) {
                console.log('showControl: not authentification: ' + $rootScope.authenticated);
                $location.path(yaioUtils.getConfig().appLoginUrl);
                $scope.error = false;
            } else {
                // configure data load
                var loadOptions = {
                    flgNodeByAllId: flgNodeByAllId
                };

                // configure filter
                $scope.setExplorerFilter();

                // check for activeNodeId if set
                if (activeNodeId) {
                    loadOptions.loadActiveNodeIdHandler = function () {
                        console.log('start loading activenode:' + activeNodeId);
                        return yaioUtils.getService('YaioNodeRepository').getNodeById(activeNodeId, {})
                            .then(function sucess(angularResponse) {
                                // handle success
                                $scope.loadActiveNodeIdSuccessHandler(activeNodeId, {}, angularResponse.data);
                            }, function error(angularResponse) {
                                // handle error
                                var data = angularResponse.data;
                                var header = angularResponse.header;
                                var config = angularResponse.config;
                                var message = 'error loading activenode: ' + activeNodeId;
                                yaioUtils.getService('Logger').logError(message, true);
                                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                                yaioUtils.getService('Logger').logError(message, false);
                            });
                    };
                }

                // load data
                console.log('NodeShowCtrl - processing nodeId=' + nodeId + ' activeNodeId=' + activeNodeId);
                return yaioUtils.getService('YaioNodeRepository').getNodeById(nodeId, loadOptions)
                    .then(function sucess(angularResponse) {
                        // handle success
                        $scope.loadCurrentNodeIdSuccessHandler(nodeId, loadOptions, angularResponse.data);
                    }, function error(angularResponse) {
                        // handle error
                        var data = angularResponse.data;
                        var header = angularResponse.header;
                        var config = angularResponse.config;
                        var message = 'error loading node=' + nodeId + ' activeNodeId=' + activeNodeId;
                        yaioUtils.getService('Logger').logError(message, true);
                        message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                        yaioUtils.getService('Logger').logError(message, false);
                    });
            }
        });
    };

    /**
     * callbackhandler if load of active nodeId succeeded
     * opens the nodehirarchy till that activeId in current fancytree
     * @param {String} nodeId                    active node id till the hirarchy-tre will opened
     * @param {Object} options                   loadOptions
     * @param {Object} yaioNodeActionResponse    server-response with nodedata + parenthirarchy
     */
    $scope.loadActiveNodeIdSuccessHandler = function(nodeId, options, yaioNodeActionResponse) {
        // check response
        var state = yaioNodeActionResponse.state;
        if (state === 'OK') {
            // all fine
            console.log('NodeShowCtrl - OK loading activenode:' + yaioNodeActionResponse.stateMsg);
            
            // create nodehierarchy
            var nodeIdHierarchy = [];
            var parentNode = yaioNodeActionResponse.node.parentNode;
            while (!yaioUtils.getService('DataUtils').isEmptyStringValue(parentNode)) {
                nodeIdHierarchy.push(parentNode.sysUID);
                parentNode = parentNode.parentNode;
            }
            nodeIdHierarchy.reverse();
            
            // add me 
            nodeIdHierarchy.push(yaioNodeActionResponse.node.sysUID);
            
            // open Hierarchy
            yaioUtils.getService('YaioExplorerCommands').openNodeHierarchyForTreeId('#tree', nodeIdHierarchy);
        } else {
            // error
            yaioUtils.getService('Logger').logError('error loading activenode:' + yaioNodeActionResponse.stateMsg
                    + ' details:' + yaioNodeActionResponse, false);
        }
    };

    /**
     * callbackhandler if load of current nodeId succeeded
     * renders the fancytree for the children of current node
     * @param {String} nodeId                    active node id to open
     * @param {Object} options                   loadOptions
     * @param {Object} yaioNodeActionResponse    server-response with nodedata + children
     */
    $scope.loadCurrentNodeIdSuccessHandler = function(nodeId, options, yaioNodeActionResponse) {
        // check response
        var state = yaioNodeActionResponse.state;
        if (state === 'OK') {
            // all fine
            console.log('NodeShowCtrl - OK loading nodes:' + yaioNodeActionResponse.stateMsg);
            $scope.node = yaioNodeActionResponse.node;
            
            // create nodehierarchy
            var nodeHierarchy = [];
            var parentNode = yaioNodeActionResponse.node.parentNode;
            while (!yaioUtils.getService('DataUtils').isEmptyStringValue(parentNode)) {
                nodeHierarchy.push(parentNode);
                parentNode = parentNode.parentNode;
            }
            nodeHierarchy.reverse();
            $scope.nodeHierarchy = nodeHierarchy;
            
            // load only when templates loaded, because we need some time for rendering angular :-(
            var tries = 20;
            var templateIsLoadedTimer;
            var templateIsLoadedHandler = function() {
                tries--;
                var loaded = $('#masterTr').length;
                if (loaded || tries <= 0) {
                    clearInterval(templateIsLoadedTimer);
                    
                    // load fencytree
                    yaioUtils.getService('YaioExplorerTree').createExplorerTree('#tree', $scope.node.sysUID, options.loadActiveNodeIdHandler);
                    
                    // load me
                    $scope.yaioUtils.renderNodeLine(yaioNodeActionResponse.node, '#masterTr', false);

                    // recalc gantt
                    yaioUtils.getService('YaioNodeGanttRenderer').recalcMasterGanttBlock($scope.node);
                }
            };
            templateIsLoadedTimer = setInterval(templateIsLoadedHandler, 100);
        } else {
            // error
            yaioUtils.getService('Logger').logError('error loading nodes:' + yaioNodeActionResponse.stateMsg
                    + ' details:' + yaioNodeActionResponse, true);
        }
    };

    /** 
     * buttoncommand to export visible nodehirarchy as overview into clipboardwindow
     */
    $scope.exportAsOverview = function() {
        console.log('exportAsOverview');
        yaioUtils.getService('YaioExplorerCommands').openClipBoardWithCurrentViewAsOverview();
        return false;
    };

    /**
     * buttoncommand to open nodeeditor with the visible nodehirarchy as snaphot
     */
    $scope.snapshot = function() {
        console.log('snapshot');
        yaioUtils.getService('YaioExplorerCommands').openNewInfoNodeWithCurrentViewAsSnapshotForParent($scope.node);
        return false;
    };

    /** 
     * buttoncommand to open all subnodes < $scope.config.treeOpenLevel in the treeview
     */
    $scope.openSubNodes = function() {
        console.log('openSubNodes:' + ' level:' + $scope.config.treeOpenLevel);
        yaioUtils.getService('YaioExplorerCommands').openSubNodesForTreeId('#tree', $scope.config.treeOpenLevel);
        return false;
    };

    /**
     * callbackhandler to recalc ganttblocks for current treeview
     */
    $scope.recalcGanttBlocks = function() {
        yaioUtils.getService('YaioNodeGanttRenderer').recalcGanttBlocksForTree();
        yaioUtils.getService('YaioNodeGanttRenderer').recalcMasterGanttBlock($scope.node);
        return false;
    };

    /**
     * buttoncommand to recalc ganttblocks for current treeview and date-filter
     * - from: $scope.node.istChildrenSumStart || $scope.node.planChildrenSumStart
     * - to: $scope.node.istChildrenSumEnde || $scope.node.planChildrenSumEnde
     * @param {Booolean} flgShowIst             if is set show IST, if not show PLAN
     */
    $scope.recalcGanttForIstOrPlan = function(flgShowIst) {
        var start = flgShowIst ? $scope.node.istChildrenSumStart : $scope.node.planChildrenSumStart;
        var ende = flgShowIst ? $scope.node.istChildrenSumEnde : $scope.node.planChildrenSumEnde;
        $('#inputGanttRangeStart').val(yaioUtils.getService('DataUtils').formatGermanDate(start)).trigger('input').triggerHandler('change');
        $('#inputGanttRangeEnde').val(yaioUtils.getService('DataUtils').formatGermanDate(ende)).trigger('input').triggerHandler('change');
        return false;
    };

    /**
     * callback to reload page after change of $scope.filterOptions.strWorkflowStateFilter or
     * $scope.filterOptions.strStatCountFilter
     */
    $scope.changeExplorerFilter = function() {
        var msg = 'changeExplorerFilter node: ' + nodeId;
        var newUrl = '/show/' + nodeId 
            + '/' + ($scope.filterOptions.strWorkflowStateFilter ? $scope.filterOptions.strWorkflowStateFilter : '?')
            + '/' + ($scope.filterOptions.strStatCountFilter ? $scope.filterOptions.strStatCountFilter : '?') + '/';
        if (activeNodeId) {
            newUrl = newUrl + 'activate/' + activeNodeId + '/';
        }
        
        // no cache!!!
        newUrl = newUrl +  '?' + (new Date()).getTime();
        console.log(msg + ' RELOAD:' + newUrl);
        $location.path(newUrl);
    };

    /**
     * callback to set explorerfilter for fancytree with $scope.filterOptions.strWorkflowStateFilter or
     * $scope.filterOptions.strStatCountFilter
     */
    $scope.setExplorerFilter = function() {
        // set new filter
        var nodeFilter = yaioUtils.getService('YaioExplorerTree').nodeFilter || {};
        nodeFilter.workflowStates = null;
        if ($scope.filterOptions.strWorkflowStateFilter) {
            var arrWorkflowStateFilter = $scope.filterOptions.strWorkflowStateFilter.split(',');
            if (arrWorkflowStateFilter.length > 0) {
                nodeFilter.workflowStates = {};
                for (var i=0; i < arrWorkflowStateFilter.length; i++) {
                    nodeFilter.workflowStates[arrWorkflowStateFilter[i]] = arrWorkflowStateFilter[i];
                }
            }
        }
        nodeFilter.statCount = null;
        if ($scope.filterOptions.strStatCountFilter) {
            nodeFilter.statCount = $scope.filterOptions.strStatCountFilter;
        }
        console.log('setExplorerFilter: set filter:', nodeFilter);
        yaioUtils.getService('YaioExplorerTree').setNodeFilter(nodeFilter);
    };


    /**
     * initialize the drag&drop
     * @param {String} divId          id of the drag&drop-html-element
     */
    $scope.initDragDropFileUploader = function(divId) {
        // Setup the Uploadfile-Listener after 1 second because Angular is removing event-listener: after 2. page loading
        setTimeout(function() {
            yaioUtils.getService('YaioNodeEditor').initUploadFileUrlResNodeDropZone('#' + divId);
        }, 1000);
    };

    // init
    $scope._init();
});

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
                var $html = $($scope.createParentHirarchyBlockForNode(node) + $scope.createSearchWordsBlockForNode(node));
                $('#detail_sys_' + node.sysUID).after($html);
                console.log('renderNodeLine: added parent+searchdata to:' + '#detail_sys_' + node.sysUID + $('#detail_sys_' + node.sysUID).length);

            }, 10);
    };

    /**
     * create parentHirarchy-Block for node
     * @param {Object} node          node to render
     * @returns {String}
     */
    $scope.createParentHirarchyBlockForNode = function(node) {
        // render hierarchy
        var parentNode = node.parentNode;
        var parentStr = node.name;
        while (!yaioUtils.getService('DataUtils').isEmptyStringValue(parentNode)) {
            parentStr = parentNode.name + ' --> ' + parentStr;
            parentNode = parentNode.parentNode;
        }
        parentStr = '<b>' + yaioUtils.getService('DataUtils').htmlEscapeText(parentStr) + '</b>';

        // add hierarchy
        var html = '<div id="details_parent_' + node.sysUID + '"'
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

/**
 * angular-controller for serving page-element: datasource-selector
 * @controller
 */
yaioApp.controller('SourceSelectorCtrl', function($rootScope, $scope, $location, $routeParams, yaioUtils) {
    'use strict';

    /**
     * init the controller
     * @private
     */
    $scope._init = function () {
        // include utils
        $scope.yaioUtils = yaioUtils;

        var dataSources = yaioUtils.getConfig().datasources;
        var dataSourceName = $routeParams.newds;
        if (dataSources.indexOf(dataSourceName) >= 0) {
            $scope.switchDataSource(dataSourceName);
        }
    };

    /**
     * switch to new datasource
     * @param {String} datasourceKey    servicename of the datasource
     */
    $scope.switchDataSource = function(datasourceKey) {
        // load data and open frontpage if succeed
        yaioUtils.getAppBase().YaioDataSourceManager.connectService(datasourceKey).done(function success() {
            console.log('success connectService:' + yaioUtils.getConfig().appFrontpageUrl);
            $location.path(yaioUtils.getConfig().appFrontpageUrl);
            yaioAppBase.get('Angular.$location').path(yaioAppBase.config.appFrontpageUrl);
            console.log('success connectService done:' + yaioUtils.getConfig().appFrontpageUrl);
        });
    };

    // init
    $scope._init();
});

yaioApp.directive('paging', function () {

    // Assign null-able scope values from settings
    function setScopeValues(scope, attrs) {

        scope.List = [];
        scope.Hide = false;
        scope.page = parseInt(scope.page) || 1;
        scope.total = parseInt(scope.total) || 0;
        scope.dots = scope.dots || '...';
        scope.ulClass = scope.ulClass || 'pagination';
        scope.adjacent = parseInt(scope.adjacent) || 2;
        scope.activeClass = scope.activeClass || 'active';
		scope.disabledClass = scope.disabledClass || 'disabled';

        scope.scrollTop = scope.$eval(attrs.scrollTop);
        scope.hideIfEmpty = scope.$eval(attrs.hideIfEmpty);
        scope.showPrevNext = scope.$eval(attrs.showPrevNext);

    }


    // Validate and clean up any scope values
    // This happens after we have set the
    // scope values
    function validateScopeValues(scope, pageCount) {

        // Block where the page is larger than the pageCount
        if (scope.page > pageCount) {
            scope.page = pageCount;
        }

        // Block where the page is less than 0
        if (scope.page <= 0) {
            scope.page = 1;
        }

        // Block where adjacent value is 0 or below
        if (scope.adjacent <= 0) {
            scope.adjacent = 2;
        }

        // Hide from page if we have 1 or less pages
        // if directed to hide empty
        if (pageCount <= 1) {
            scope.Hide = scope.hideIfEmpty;
        }
    }



    // Internal Paging Click Action
    function internalAction(scope, page) {

        // Block clicks we try to load the active page
        if (scope.page == page) {
            return;
        }

        // Update the page in scope and fire any paging actions
        scope.page = page;
        scope.pagingAction({
            page: page
        });

        // If allowed scroll up to the top of the page
        if (scope.scrollTop) {
            scrollTo(0, 0);
        }
    }


    // Add Range of Numbers
    function addRange(start, finish, scope) {

        var i = 0;
        for (i = start; i <= finish; i++) {

            var item = {
                value: i,
                title: 'Page ' + i,
                liClass: scope.page == i ? scope.activeClass : '',
                action: function () {
                    internalAction(scope, this.value);
                }
            };

            scope.List.push(item);
        }
    }


    // Add Dots ie: 1 2 [...] 10 11 12 [...] 56 57
    function addDots(scope) {
        scope.List.push({
            value: scope.dots
        });
    }


    // Add First Pages
    function addFirst(scope) {
        addRange(1, 2, scope);
        addDots(scope);
    }


    // Add Last Pages
    function addLast(pageCount, scope) {
        addDots(scope);
        addRange(pageCount - 1, pageCount, scope);
    }


    // Adds the first, previous text if desired   
    function addPrev(scope, pageCount) {

        // Ignore if we are not showing
		// or there are no pages to display
        if (!scope.showPrevNext || pageCount < 1) {
            return;
        }

        // Calculate the previous page and if the click actions are allowed
        // blocking and disabling where page <= 0
        var disabled = scope.page - 1 <= 0;
        var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;

        var first = {
            value: '<<',
            title: 'First Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled) {
                    internalAction(scope, 1);
                }
            }
        };

        var prev = {
            value: '<',
            title: 'Previous Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled) {
                    internalAction(scope, prevPage);
                }
            }
        };

        scope.List.push(first);
        scope.List.push(prev);
    }


    // Adds the next, last text if desired
    function addNext(scope, pageCount) {

        // Ignore if we are not showing 
		// or there are no pages to display
        if (!scope.showPrevNext || pageCount < 1) {
            return;
        }

        // Calculate the next page number and if the click actions are allowed
        // blocking where page is >= pageCount
        var disabled = scope.page + 1 > pageCount;
        var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;

        var last = {
            value: '>>',
            title: 'Last Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled){
                    internalAction(scope, pageCount);
                }
            }
        };

        var next = {
            value: '>',
            title: 'Next Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled){
                    internalAction(scope, nextPage);
                }
            }
        };

        scope.List.push(next);
        scope.List.push(last);
    }


    // Main build function
    function build(scope, attrs) {

        // Block divide by 0 and empty page size
        if (!scope.pageSize || scope.pageSize < 0) {
            return;
        }

        // Assign scope values
        setScopeValues(scope, attrs);

        // local variables
        var start,
            size = scope.adjacent * 2,
            pageCount = Math.ceil(scope.total / scope.pageSize);

        // Validate Scope
        validateScopeValues(scope, pageCount);

        // Calculate Counts and display
        addPrev(scope, pageCount);
        if (pageCount < (5 + size)) {

            start = 1;
            addRange(start, pageCount, scope);

        } else {

            var finish;

            if (scope.page <= (1 + size)) {

                start = 1;
                finish = 2 + size + (scope.adjacent - 1);

                addRange(start, finish, scope);
                addLast(pageCount, scope);

            } else if (pageCount - size > scope.page && scope.page > size) {

                start = scope.page - scope.adjacent;
                finish = scope.page + scope.adjacent;

                addFirst(scope);
                addRange(start, finish, scope);
                addLast(pageCount, scope);

            } else {

                start = pageCount - (1 + size + (scope.adjacent - 1));
                finish = pageCount;

                addFirst(scope);
                addRange(start, finish, scope);

            }
        }
        addNext(scope, pageCount);

    }


    // The actual angular directive return
    return {
        restrict: 'EA',
        scope: {
            page: '=',
            pageSize: '=',
            total: '=',
            dots: '@',
            hideIfEmpty: '@',
            ulClass: '@',
			activeClass: '@',
			disabledClass: '@',
            adjacent: '@',
            scrollTop: '@',
            showPrevNext: '@',
            pagingAction: '&'
        },
        template: 
			'<ul ng-hide="Hide" ng-class="ulClass"> ' +
				'<li ' +
				'title="{{Item.title}}" ' +
				'ng-class="Item.liClass" ' +
				'ng-click="Item.action()" ' +
				'ng-repeat="Item in List"> ' +
				'<span ng-bind="Item.value"></span> ' +
            '</ul>',
        link: function (scope, element, attrs) {
            // wait till NodeListReady is set
            scope.$on("NodeListReady", function  (){
                scope.$watch('page', function () {
                    build(scope, attrs);
                });
            });
        }
    };
});
