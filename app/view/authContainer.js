/*
 * File: app/view/authContainer.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Conflux.view.authContainer', {
    extend: 'Ext.Container',

    config: {
        itemId: 'authContainer',
        listeners: [
            {
                fn: 'onContainerPainted',
                event: 'painted'
            },
            {
                fn: 'onAuthContainerDeactivate',
                event: 'deactivate'
            }
        ]
    },

    onContainerPainted: function(element, eOpts) {
        var parameters = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            parameters[key] = value;
        });

        Ext.create('Conflux.view.mainCarousel');
        Ext.create('Conflux.view.MyFormPanel');

        function isEmpty(ob) {
            for (var i in ob) {
                return false;
            }
            return true;
        }

        if (isEmpty(parameters)) {
            window.location.href = 'login.html';
        } else {
            Conflux.app.authToken = decodeURI(parameters.auth);
            this.generateItems();
        }
    },

    onAuthContainerDeactivate: function(oldActiveItem, container, newActiveItem, eOpts) {
        oldActiveItem.destroy();
    },

    generateItems: function() {
        var me = this,
            token = Conflux.app.authToken,
            clientId = '464168127252.apps.googleusercontent.com',
            apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
            scopes = 'https://www.googleapis.com/auth/calendar',
            items = [],
            calendarId,
            summary;

        try {
            gapi.client.setApiKey(apiKey);
            gapi.auth.setToken(token);
        } catch(e) {
            window.location.reload();
        }

        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, function(authResult) {
        if (authResult) {
            gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.calendarList.list();
                request.execute(function(outer) {
                    for (var a = 0; a < outer.items.length; a++) {
                        if (outer.items[a].id.substring(0,8) === 'bestfitm') {
                            calendarId = outer.items[a].id;
                            summary = outer.items[a].summary;
                            if ((calendarId !== null) && (summary !== null)) {
                                me.loadData(calendarId, summary, items);
                            }
                        }
                    }
                });
            });
        }
    });
    },

    loadData: function(calendarId, summary, items) {
        var me = this,
            today = new Date(),
            mainCarousel,
            child;

        var token = Conflux.app.authToken,
            clientId = '464168127252.apps.googleusercontent.com',
            apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
            scopes = 'https://www.googleapis.com/auth/calendar';

        var backgroundColors = [
        '#0d6289', //Blue
        '#4E2B52', //Purple
        '#d27f56', //Orange
        '#53ab73', //Green
        '#FF4242', //Red
        '#D9D1A9'  //Beige
        ];

        var boxColors = [
        '#43aad5', //Blue
        '#436085', //Purple
        '#F99665', //Orange
        '#7DCB99', //Green
        '#FF837E', //Red
        '#B9C18A'  //Beige
        ];

        var timelineColors = [
        '#2b8bb5', //Blue
        '#5A325F', //Purple
        '#DA8359', //Orange
        '#80E2BF', //Green
        '#EC6B51', //Red
        '#A4AE6A'  //Beige
        ];

        var dotColors = [
        '#176c93', //Blue
        '#8497BF', //Purple
        '#EC8E60', //Orange
        '#C4D7A4', //Green
        '#FFBFB4', //Red
        '#97A97F'  //Beige
        ];

        today.setHours(0,0,0,0);
        today = today.toISOString();

        gapi.client.setApiKey(apiKey);
        gapi.auth.setToken(token);

        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
        function(authResult) {
            if (authResult) {
                gapi.client.load('calendar', 'v3', function() {
                    var request = gapi.client.calendar.events.list({
                        'calendarId': calendarId,
                        'singleEvents': true,
                        'orderBy': 'startTime',
                        'timeMin': today,
                        'maxResults': 50
                    });

                    request.execute(function(resp) {
                        if (Ext.isDefined(resp)) {
                            if (Ext.isDefined(resp.items)) {
                                if (Ext.isDefined(resp.items[0])) {
                                    if (Ext.isDefined(resp.items[0].summary)) {
                                        if (Ext.isDefined(resp.items[0].summary.length)) {
                                            obj = new Conflux.view.myContainer();
                                            array_i = Ext.ComponentQuery.query('#inlineDraw').length - 1;
                                            child = Ext.ComponentQuery.query('#inlineDraw')[array_i];

                                            obj.roomText = summary;
                                            obj.calendarId = calendarId;

                                            child.roomText = summary;
                                            child.backgroundColor = backgroundColors[array_i];
                                            child.boxColor = boxColors[array_i];
                                            child.timelineColor = timelineColors[array_i];
                                            child.dotColor = dotColors[array_i];
                                            child.events = resp.items;
                                            items.push(obj);
                                        }
                                    }
                                }
                            }
                        }
                        if (items.length == 3) {
                            console.log(items);
                            mainCarousel = Ext.ComponentQuery.query('#mainCarousel')[0];
                            mainCarousel.setItems(items);
                            Ext.Viewport.setActiveItem('mainCarousel');
                        }
                    });
                });
            } else {
                window.location.reload();
            }
        });
    }

});