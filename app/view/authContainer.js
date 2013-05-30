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
        console.log('painted: authContainer');
        var parameters = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            parameters[key] = value;
        });

        Ext.create('Conflux.view.mainCarousel');

        if (Ext.isEmpty(parameters)) {
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
        console.log('generateItems: authContainer');
        var me = this,
            token = Conflux.app.authToken,
            clientId = '464168127252.apps.googleusercontent.com',
            apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
            scopes = 'https://www.googleapis.com/auth/calendar',
            active = [],
            items = [],
            calendarId,
            summary,
            last;

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
                            if (outer.items[a].id !== null && outer.items[a].summary !== null) {
                                active.push(a);
                            }
                        }
                    }

                    for (var b = 0; b < active.length; b++) {
                        if (b == (active.length-1)) {
                            last = true;
                            console.log("true");
                        } else {
                            last = false;
                        }
                        calendarId = outer.items[active[b]].id;
                        summary = outer.items[active[b]].summary;
                        console.log('calendarId: ' + calendarId + ' summary: ' + summary);
                        me.loadData(calendarId, summary, items, last);
                    }
                });
            });
        }
    });
    },

    loadData: function(calendarId, summary, items, last) {
        console.log('loadData: authContainer');
        console.log("last is equal to " + last);
        var me = this,
            today = new Date(),
            mainCarousel,
            child;

        var token = Conflux.app.authToken,
            clientId = '464168127252.apps.googleusercontent.com',
            apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
            scopes = 'https://www.googleapis.com/auth/calendar';

        var backgroundColors = [
        '#53ab73', //Green
        '#4E2B52', //Purple
        '#d27f56', //Orange
        '#0d6289', //Blue
        '#FF4242', //Red
        '#D9D1A9'  //Beige
        ];

        var boxColors = [
        '#7DCB99', //Green
        '#436085', //Purple
        '#F99665', //Orange
        '#43aad5', //Blue
        '#FF837E', //Red
        '#B9C18A'  //Beige
        ];

        var timelineColors = [
        '#80E2BF', //Green
        '#5A325F', //Purple
        '#DA8359', //Orange
        '#176c93', //Blue
        '#EC6B51', //Red
        '#A4AE6A'  //Beige
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
                        if (Ext.isDefined(resp.items)) {
                            if (Ext.isDefined(resp.items[0])) {
                                if (Ext.isDefined(resp.items[0].summary)) {
                                    if (Ext.isDefined(resp.items[0].summary.length)) {
                                        obj = new Conflux.view.myContainer();
                                        array_i = Ext.ComponentQuery.query('#inlineDraw').length - 1;
                                        child = Ext.ComponentQuery.query('#inlineDraw')[array_i];

                                        child.roomText = summary;
                                        child.backgroundColor = backgroundColors[array_i];
                                        child.boxColor = boxColors[array_i];
                                        child.timelineColor = timelineColors[array_i];
                                        child.events = resp.items;
                                        items.push(obj);

                                        console.log("array_i: " + array_i + " items.length: " + items.length);
                                    }
                                }
                            }
                        }
                        if (last === true) {
                            console.log("Should be switching to mainCarousel");
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