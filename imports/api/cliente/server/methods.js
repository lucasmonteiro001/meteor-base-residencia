import { Cliente } from "./../cliente.js"
import {Meteor} from 'meteor/meteor';

Meteor.methods({
    'cliente.insert' ( dataObj ) {

        dataObj.userId = this.userId;

        check(dataObj,{nome: String, endereco: String, telefone: String, Email: String,  userId:String});

        Cliente.insert( dataObj, ( error ) => {
            if ( error ) {
                console.log( error );
            }
        });
    }
});