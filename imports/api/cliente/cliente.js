import { Mongo } from 'meteor/mongo';

export const Cliente = new Mongo.Collection('cliente');

Cliente_Schema = new SimpleSchema({
    /**
     * Aqui vão as definições dos schemas
     */
});

Cliente.attachSchema( Cliente_Schema );


// Deny all client-side updates on the Cliente collection
Cliente.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});


