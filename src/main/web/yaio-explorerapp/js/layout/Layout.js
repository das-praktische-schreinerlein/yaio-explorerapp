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


    /**
     * open the dmsdownloadwindow for the nodeId
     * @param {Object} nodeId                 nodeId
     */
    me.openDMSDownloadWindowForNodeId = function(nodeId) {
        me.appBase.YaioNodeRepository.getNodeById(nodeId, {})
            .then(function sucess(angularResponse) {
                // handle success
                me.openDMSDownloadWindowForNode(angularResponse.data.node);
            }, function error(angularResponse) {
                // handle error
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading rootNodeHierarchy';
                me.appBase.Logger.logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                me.appBase.Logger.logError(message, false);
            });
    };

    /**
     * open the dmsdownloadwindow for the node
     * @param {Object} basenode                 node
     */
    me.openDMSDownloadWindowForNode = function(basenode) {
        var svcLogger = me.appBase.Logger;

        // check vars
        if (! basenode) {
            // basenode not found
            svcLogger.logError('error openDMSDownloadWindowForNode: basenode required', false);
            return null;
        }

        var embedUrl = me.appBase.YaioAccessManager.getAvailiableNodeAction('dmsEmbed', basenode.sysUID, false);
        if (!embedUrl) {
            embedUrl = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsNo', basenode.sysUID, false);
        }
        embedUrl = embedUrl + basenode.sysUID;
        var downloadUrl = me.appBase.YaioAccessManager.getAvailiableNodeAction('dmsDownload', basenode.sysUID, false);
        if (!downloadUrl) {
            downloadUrl = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsNo', basenode.sysUID, false);
        }
        downloadUrl = downloadUrl + basenode.sysUID;

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
     * open the dmsdownloadwindow for the extracted metadata of the nodeId
     * @param {Object} nodeId                 nodeId
     */
    me.openDMSIndexDownloadWindowForNodeId = function(nodeId) {
        me.appBase.YaioNodeRepository.getNodeById(nodeId, {})
            .then(function sucess(angularResponse) {
                // handle success
                me.openDMSIndexDownloadWindowForNode(angularResponse.data.node);
            }, function error(angularResponse) {
                // handle error
                var data = angularResponse.data;
                var header = angularResponse.header;
                var config = angularResponse.config;
                var message = 'error loading rootNodeHierarchy';
                me.appBase.Logger.logError(message, true);
                message = 'error data: ' + data + ' header:' + header + ' config:' + config;
                me.appBase.Logger.logError(message, false);
            });
    };

    /**
     * open the dmsdownloadwindow for the extracted metadata of the node document
     * @param {Object} basenode                 node
     */
    me.openDMSIndexDownloadWindowForNode = function(basenode) {
        var svcLogger = me.appBase.Logger;

        // check vars
        if (! basenode) {
            // basenode not found
            svcLogger.logError('error openDMSIndexDownloadWindowForNode: basenode required', false);
            return null;
        }
        var embedUrl = me.appBase.YaioAccessManager.getAvailiableNodeAction('dmsIndexEmbed', basenode.sysUID, false);
        if (!embedUrl) {
            embedUrl = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsNo', basenode.sysUID, false);
        }
        embedUrl = embedUrl + basenode.sysUID;
        var downloadUrl = me.appBase.YaioAccessManager.getAvailiableNodeAction('dmsIndexDownload', basenode.sysUID, false);
        if (!downloadUrl) {
            downloadUrl = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsNo', basenode.sysUID, false);
        }
        downloadUrl = downloadUrl + basenode.sysUID;

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


    me.showDiagramSpinner = function (htmlTarget) {
        var opts = {
            lines: 13, // The number of lines to draw
            length: 28, // The length of each line
            width: 14, // The line thickness
            radius: 22, // The radius of the inner circle
            scale: 1, // Scales overall size of the spinner
            corners: 1, // Corner roundness (0..1)
            color: '#000', // #rgb or #rrggbb or array of colors
            opacity: 0.25, // Opacity of the lines
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            className: 'spinner', // The CSS class to assign to the spinner
            top: '50%', // Top position relative to parent
            left: '50%', // Left position relative to parent
            shadow: true, // Whether to render a shadow
            hwaccel: true, // Whether to use hardware acceleration
            position: 'absolute' // Element positioning
        };
        var spinner = new Spinner(opts).spin(htmlTarget);
        htmlTarget.spinner = spinner;
        return spinner;
    };

    me.hideDiagramSpinner = function (spinner) {
        spinner.stop();
    };


    me._init();
    
    return me;
};
 
