/*
 * File: app/view/drawComponent.js
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

Ext.define('Booking.view.drawComponent', {
    extend: 'Ext.draw.Component',
    alias: 'widget.drawComponent',

    config: {
        autoScroll: 'true',
        docked: 'left',
        height: '100%',
        itemId: 'myComponent',
        showAnimation: 'flip',
        style: 'background:#0d6289; overflow:visible;',
        width: '100%'
    },

    initialize: function() {
        this.callParent();

        //Line across screen
        this.getSurface('main').add({
            type: 'rect',
            fill: '#176c93',
            height : 20,
            width: 1440,
            x: 0,
            y: 430
        }).show(true);

        //Rounded rectangle example
        this.getSurface('main').add({
            type: 'rect',
            fill: '#43aad5',
            height : 130,
            width: 300,
            radius: 10,
            x: 100,
            y: 250
        }).show(true);

        this.getSurface('main').add({
            type: 'text',
            text: '10:33pm',
            font: '20px Arial',
            fill: '#FFF',
            x: 195,
            y: 470
        }).show(true);
    }

});