import "../../../ui/authenticated/cliente/cliente";
import {FlowRouter} from 'meteor/kadira:flow-router';
import '../../../ui/authenticated/index';
import  '../../../ui/authenticated/users/users';
import {CtrlCliente} from '../../../api/cliente/controllerCliente.js'
import {Message} from '../../../ui/utils/ui_utils';

const blockUnauthorizedAdmin = ( context, redirect ) => {
    //console.log(context.queryParams);
    if ( Meteor.userId() && !Roles.userIsInRole( Meteor.userId(), 'administrador' ) ) {
        Bert.alert('Acesso nao permitido!', 'danger')
        redirect('index');
    }
};

const authenticatedRedirect = ( context, redirect ) => {
    //console.log(context);
    redirectFunction = function() {
        this.set = function(value) {
            let rotaAnterior = "/";
            if(typeof context.oldRoute != 'undefined') {
                rotaAnterior = context.oldRoute.path;
            }
            if(value===false) {
                Message.showErrorNotification("Você não tem permissão para acessar essa página!");
                FlowRouter.go(rotaAnterior);
            }
        };
    }
    func = new redirectFunction();
    if(typeof context.route.options.canView != 'undefined') {
        let id = "";
        if(typeof context.params._id != 'undefined') {
            id = context.params._id;
        }
        context.route.options.canView(func,id);
    }


    if ( !Meteor.userId() ) {

        redirect('login');
    }
};

const authenticatedRoutes = FlowRouter.group({
    name: 'authenticated',
    triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route( '/', {
    name: 'index',
    action() {
        BlazeLayout.render( 'default', { yield: 'index' } );
        console.log('rota: index');

    }
});

authenticatedRoutes.route( '/users', {
    name: 'users',
    triggersEnter: [ blockUnauthorizedAdmin ],
    action() {
        BlazeLayout.render( 'default', { yield: 'users' } );
        console.log('rota: users');
    }
});
authenticatedRoutes.route( '/cliente', {
	name: 'cliente',
	action() {
		BlazeLayout.render( 'default', { yield: 'cliente' } );
	} 
});
authenticatedRoutes.route( '/clienteAdd', {
    name: 'clienteAdd',
    action() {
        BlazeLayout.render( 'default', { yield: 'clienteAdd' } );
    }
});

authenticatedRoutes.route( '/clienteEdit/:_id', {
    name: 'clienteEdit',
    canView(func,id){CtrlCliente.checkIfCanUserUpdate(func,id)},
    action() {
        BlazeLayout.render( 'default', { yield: 'clienteEdit'} );
    }
});

authenticatedRoutes.route( '/clienteView/:_id', {
    name: 'clienteView',
    canView(func,id){CtrlCliente.checkIfCanUserView(func,id)},
    action() {
        BlazeLayout.render( 'default', { yield: 'clienteView'} );
    }
});
