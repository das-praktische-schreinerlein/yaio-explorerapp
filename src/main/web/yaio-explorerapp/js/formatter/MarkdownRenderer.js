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
     * callback to render markdown "link"-blocks
     * @param {string} href          href of the link
     * @param {string} title         title
     * @param {string} text          text
     * @return {string}              rendered block
     */
    me._renderMarkdownLink = function (href, title, text) {
        if (this.options.sanitize) {
            var prot;
            try {
                prot = decodeURIComponent(href)
                    .replace(/[^\w:]/g, '')
                    .toLowerCase();
            } catch (e) {
                return '';
            }
            /*jshint scripturl: true */
            if (prot && prot.indexOf('javascript:') === 0) {
                return '';
            }
            /*jshint scripturl: false */
        }
        var js = me._parseJs(href);
        var parsedHef = me._parseLinks(href, false);
        var out = '<a href="' + parsedHef + '"' + this.genStyleClassAttrForTag('a');
        if (js) {
            out += ' onclick="' + js + '"';
        }
        if (title) {
            out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
    };

    /**
     * parse yaio-links like yaio:, yaiodmsdownload:, yaiodmsidxdownload:, yaiodmsembed:, yaiodmsidxembed: from href
     * and replace if exists with dms-urls...
     * @param {String} href          the url to parse
     * @param {Boolean} dmsOnly      parse dms only: not yaio:
     * @return  {String}             mapped url
     */
    me._parseLinks = function(href, dmsOnly) {
        var sysUID, newHref = href;
        if (!dmsOnly && href && href.indexOf('yaio:') === 0) {
            sysUID = href.substr(5);
            newHref = '/yaio-explorerapp/yaio-explorerapp.html#/showByAllIds/' + sysUID;
        } else {
            newHref = me._parseDmsLinks(href, me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsNo', sysUID, false));
        }
        return newHref;
    };

    /**
     * parse yaiodms-links like yaiodmsdownload:, yaiodmsidxdownload:, yaiodmsembed:, yaiodmsidxembed: from href
     * and replace if exists with dms-urls or if not available with noDMSHref...
     * @param {String} href          the url to parse
     * @param {String} noDMSHref     link if dms not available
     * @return  {String}             mapped url
     */
    me._parseDmsLinks = function(href, noDMSHref) {
        var sysUID, newHref = href, dmsLink;
        if (href && href.indexOf('yaiodmsdownload:') === 0) {
            sysUID = href.substr('yaiodmsdownload:'.length);
            newHref = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsDownload', sysUID, false);
            dmsLink = true;
        } else if (href && href.indexOf('yaiodmsidxdownload:') === 0) {
            sysUID = href.substr('yaiodmsidxdownload:'.length);
            newHref = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsIndexDownload', sysUID, false);
            dmsLink = true;
        } else if (href && href.indexOf('yaiodmsembed:') === 0) {
            sysUID = href.substr('yaiodmsembed:'.length);
            newHref = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsEmbed', sysUID, false);
            dmsLink = true;
        } else if (href && href.indexOf('yaiodmsidxembed:') === 0) {
            sysUID = href.substr('yaiodmsidxembed:'.length);
            newHref = me.appBase.get('YaioAccessManager').getAvailiableNodeAction('dmsIndexEmbed', sysUID, false);
            dmsLink = true;
        }

        if (dmsLink) {
            if (newHref) {
                newHref = newHref + sysUID;
            } else if (noDMSHref) {
                newHref = noDMSHref;
            }
        }

        return newHref;
    };

    me._parseJs = function(href) {
        var sysUID, js;
        if (href && href.indexOf('yaiodmsdownload:') === 0) {
            sysUID = href.substr('yaiodmsdownload:'.length);
            js = 'yaioAppBase.YaioLayout.openDMSDownloadWindowForNodeId(\'' + sysUID + '\'); return false;';
        } else if (href && href.indexOf('yaiodmsidxdownload:') === 0) {
            sysUID = href.substr('yaiodmsidxdownload:'.length);
            js = 'yaioAppBase.YaioLayout.openDMSIndexDownloadWindowForNodeId(\'' + sysUID + '\'); return false;';
        } else if (href && href.indexOf('yaiodmsembed:') === 0) {
            sysUID = href.substr('yaiodmsembed:'.length);
            js = 'yaioAppBase.YaioLayout.openDMSDownloadWindowForNodeId(\'' + sysUID + '\'); return false;';
        } else if (href && href.indexOf('yaiodmsidxembed:') === 0) {
            sysUID = href.substr('yaiodmsidxembed:'.length);
            js = 'yaioAppBase.YaioLayout.openDMSIndexDownloadWindowForNodeId(\'' + sysUID + '\'); return false;';
        }
        return js;
    };

    me._init();
    
    return me;
};
