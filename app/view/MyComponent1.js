/*
 * File: app/view/MyComponent1.js
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

Ext.define('Booking.view.MyComponent1', {
    extend: 'Ext.draw.Component',
    alias: 'widget.myComponent1',

    config: {
        itemId: 'myComponent1',
        style: 'background:#0d6289;'
    },

    initialize: function() {
        this.callParent();
        this.element.on({
            scope : this,
            painted : this.onElementPainted()
        });
    },

    onElementPainted: function() {
        var w       = 700 * Ext.getStore('MyStore').getCount(),
            h       = this.element.getHeight(),
            dynText = '10:33 pm',
            child   = this.items.getAt(0),
            surface = child.getSurface('main'),
            loc,
            iter;

        console.log("w: " + w);
        console.log("h: " + h);

        child.setSize(w,h);
        surface.setSize(w,h);

        //Line across screen
        surface.add({
            type: 'rect',
            fill: '#176c93',
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

        for (iter=0; iter<5; iter++) {
            loc = 100 + iter*500;
            //Rounded rectangle example
            surface.add({
                type: 'rect',
                fill: '#43aad5',
                height : 130,
                width: 300,
                radius: 10,
                x: loc,
                y: 170
            }).show(true);
        }

        for (iter=0; iter<5; iter++) {
            loc = 350 + iter*500;
            //Rounded rectangle example
            surface.add({
                type: 'rect',
                fill: '#43aad5',
                height : 130,
                width: 300,
                radius: 10,
                x: loc,
                y: 380
            }).show(true);
        }


        surface.add({
            type: 'text',
            text: dynText,
            font: '18px Arial',
            fill: '#FFF',
            x: 200,
            y: 380
        }).show(true);
    }

});