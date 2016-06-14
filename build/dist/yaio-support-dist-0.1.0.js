/*! yaio-v0.1.0 support-0.1.0 */

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
        me.configureService('Yaio.NodeSearch', function() { return Yaio.NodeSearch(me); });
        me.configureService('Yaio.NodeCharts', function() { return Yaio.NodeCharts(me); });
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
        me.configureService('YaioNodeSearch', function() { return me.get('Yaio.NodeSearch'); });
        me.configureService('YaioNodeCharts', function() { return me.get('Yaio.NodeCharts'); });
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

    me.parseGermanDate = function(value, defaultTimeStr) {
        var res, lstDate, lstDateTime, strTime, newDateTimeStr, newDate;
        if (typeof value === 'string') {
            lstDateTime = value.split(' ');
            lstDate = lstDateTime[0].split('.');
            strTime = '12:00:00';
            if (defaultTimeStr) {
                strTime = defaultTimeStr;
            }

            if (lstDateTime.length > 1) {
                strTime = lstDateTime[1] + ':00';
            }
            newDateTimeStr = lstDate[1] +'/' + lstDate[0] + '/' + lstDate[2] + ' ' + strTime;
            newDate = new Date(newDateTimeStr);
            res = newDate;
        } else if (typeof value === 'object') {
            res = value;
        }

        return res;
    };

    me.now = function() {
        var date = new Date();
        return date;
    };

    me.getDayOfWeek = function(date, dayOfWeek) {
        date = new Date(date.getTime ());
        var weekDay = date.getDay();
        if (weekDay === 0) {
            weekDay = 7;
        }
        date.setDate(date.getDate() + (dayOfWeek - weekDay) % 7);
        return date;
    };

    me.getWithTime00 = function(date) {
        date = new Date(date.getTime ());
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    };

    me.getWithTime24 = function(date) {
        date = new Date(date.getTime ());
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
        return date;
    };

    me.getFirstDayOfMonth = function(date) {
        date = new Date(date.getTime ());
        date.setFullYear(date.getFullYear(), date.getMonth(), 1);
        return date;
    };

    me.getLastDayOfMonth = function(date) {
        date = new Date(date.getTime ());
        date.setFullYear(date.getFullYear(), date.getMonth()+1, 0);
        return date;
    };

    me.getLastMonth = function(date) {
        date = new Date(date.getTime ());
        date.setFullYear(date.getFullYear(), date.getMonth()-1, date.getDate());
        return date;
    };

    me.getNextMonth = function(date) {
        date = new Date(date.getTime ());
        date.setFullYear(date.getFullYear(), date.getMonth()+1, date.getDate());
        return date;
    };

    me.getStartOfTime = function() {
        var date = new Date();
        date.setFullYear('1976', '04', '28');
        return date;
    };

    /**
     * calc parentHierarchy for node
     * @param {Object} node          node to get parent-hierarchy
     * @returns {Array}              parent-objects
     */
    me.getNodeHierarchy = function(node) {
        // create nodehierarchy
        var nodeHierarchy = [];
        var parentNode = node.parentNode;
        while (!me.appBase.DataUtils.isEmptyStringValue(parentNode)) {
            nodeHierarchy.push(parentNode);
            parentNode = parentNode.parentNode;
        }
        nodeHierarchy.reverse();
        return nodeHierarchy;
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
 
