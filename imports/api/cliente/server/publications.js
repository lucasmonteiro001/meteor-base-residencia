import { Cliente } from "../cliente.js"

Meteor.publish( 'cliente', function(){
    var user = this.userId;

    if ( user ) {
        var data = [
            Cliente.find( { "userId": user } )
        ];
    }

    if ( data ) {
        return data;
    }

    return this.ready();
});