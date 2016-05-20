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
    },
    'cliente.update' ( id,dataObj ) {

        check(id, String);
        check(dataObj,{nome: String, endereco: String, telefone: String, Email: String});

        Cliente.update( id,{
            $set: { nome: dataObj.nome, endereco: dataObj.endereco, telefone: dataObj.telefone, Email: dataObj.Email },
        });
    },
    'cliente.delete'(id) {
        check(id, String);        
        Cliente.remove(id);
    },
});