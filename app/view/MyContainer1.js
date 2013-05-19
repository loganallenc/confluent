/*
 * File: app/view/MyContainer1.js
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

Ext.define('Booking.view.MyContainer1', {
    extend: 'Ext.Container',
    alias: 'widget.MyContainer1',

    config: {
        itemId: 'MyContainer1',
        scrollable: {
            direction: 'horizontal',
            directionLock: true
        },
        items: [
            {
                xtype: 'draw',
                itemId: 'inlineDraw1',
                style: 'background:#236B8E;',
                listeners: [
                    {
                        fn: function(element, eOpts) {
                            var me = this,
                                h = Ext.getBody().getSize().height,
                                w = Ext.getBody().getSize().width,
                                surface = this.getSurface('main'),
                                boxColor = '#43aad5',
                                xloc,
                                iter;

                            var token = Booking.app.authToken,
                                clientId = '464168127252.apps.googleusercontent.com',
                                apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
                                scopes = 'https://www.googleapis.com/auth/calendar';

                            console.log(token);
                            gapi.client.setApiKey(apiKey);
                            gapi.auth.setToken(token);

                            gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
                            function(authResult) {
                                if (authResult) {
                                    console.log('About to request Calendar events');
                                    gapi.client.load('calendar', 'v3', function() {
                                        var request = gapi.client.calendar.events.list({
                                            'calendarId': 'primary',
                                            'singleEvents': true,
                                            'orderBy': 'startTime',
                                            'timeMin': '2013-05-19T00:00:20-05:00',
                                            'timeMax': '2014-05-19T00:00:20-05:00'
                                        });

                                        request.execute(function(resp) {
                                            console.log(resp);
                                            w = 250 * resp.items.length;
                                            me.setSize(w,h);
                                            surface.setSize(w,h);

                                            //Line across screen
                                            surface.add({
                                                type: 'rect',
                                                fill: '#87CEEB',
                                                height : 20,
                                                width: w,
                                                x: 0,
                                                y: 330
                                            }).show(true);

                                            surface.add({
                                                type: 'text',
                                                text: 'Meetings in Room A',
                                                font: '32px Arial',
                                                fill: '#FFF',
                                                x: 70,
                                                y: 50
                                            }).show(true);

                                            //Text for top
                                            surface.add({
                                                type: 'text',
                                                text: '10:33 pm',
                                                font: '14px Arial',
                                                fill: '#FFF',
                                                x: 170,
                                                y: 380
                                            }).show(true);

                                            surface.add({
                                                type: 'circle',
                                                cx: 193,
                                                cy: 338,
                                                r: 20,
                                                fillStyle: boxColor
                                            }).show(true);

                                            for (iter = 0; iter < resp.items.length; iter++) {
                                                console.log(resp.items[iter].summary);
                                                xloc = iter*200;

                                                if (iter % 2 === 0) {
                                                    surface.add({
                                                        type: 'rect',
                                                        fill: boxColor,
                                                        height : 140,
                                                        width: 300,
                                                        radius: 10,
                                                        x: xloc+40,
                                                        y: 130
                                                    }).show(true);

                                                    surface.add({
                                                        type: 'path',
                                                        path: 'M ' + xloc+180 + ' ' + 270 + ' ' +
                                                        'l ' + 25 + ' ' + 0 + ' ' +
                                                        'l ' + -12 + ' ' + 10 + 'z',
                                                        fillStyle: boxColor
                                                    }).show(true);

                                                    surface.add({
                                                        type: 'text',
                                                        text: resp.items[iter].summary,
                                                        font: '14px Arial',
                                                        fill: '#FFF',
                                                        x: xloc+50,
                                                        y: 145
                                                    }).show(true);

                                                } else {
                                                    surface.add({
                                                        type: 'rect',
                                                        fill: boxColor,
                                                        height : 140,
                                                        width: 300,
                                                        radius: 10,
                                                        x: xloc+100,
                                                        y: 410
                                                    }).show(true);

                                                    surface.add({
                                                        type: 'path',
                                                        path: 'M ' + xloc+250 + ' ' + 410 + ' ' +
                                                        'l ' + -25 + ' ' + 0 + ' ' +
                                                        'l ' + 12 + ' ' + -10 + 'z',
                                                        fillStyle: boxColor
                                                    }).show(true);

                                                    surface.add({
                                                        type: 'text',
                                                        text: resp.items[iter].summary,
                                                        font: '14px Arial',
                                                        fill: '#FFF',
                                                        x: xloc+60,
                                                        y: 425
                                                    }).show(true);
                                                }
                                            }
                                        });
                                    });
                                }
                            });
                        },
                        event: 'painted'
                    },
                    {
                        fn: function(element, eOpts) {
                            this.setSize(null, Ext.getBody().getSize().height);
                            this.getSurface('main').setSize(null, Ext.getBody().getSize().height);
                        },
                        event: 'resize'
                    }
                ]
            }
        ]
    }

});