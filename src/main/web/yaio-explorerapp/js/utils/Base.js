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