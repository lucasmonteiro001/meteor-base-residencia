import {FlowRouter} from 'meteor/kadira:flow-router';
import '../../ui/public/teste';
import '../../ui/public/teste0';
import '../../ui/public/login';
import '../../ui/public/recover-password';
import '../../ui/public/reset-password';
import '../../ui/public/signup';
import '../../ui/layouts/default';

FlowRouter.route("/", {
    name: "homepage",
    action() {
        BlazeLayout.render( 'default', { yield: 'teste' } );
    }
});

FlowRouter.route("/tarefas",  {
    name: "tarefas",
    action() {
        BlazeLayout.render( 'default', { yield: 'tarefas' } );
    }
});

FlowRouter.route("/login",  {
    name: "login",
    action() {
        BlazeLayout.render( 'default', { yield: 'login' } );
    }
});

FlowRouter.route("/recover-password",  {
    name: "recoverPassword",
    action() {
        BlazeLayout.render( 'default', { yield: 'recoverPassword' } );
    }
});


FlowRouter.route("/reset-password",  {
    name: "resetPassword",
    action() {
        BlazeLayout.render( 'default', { yield: 'resetPassword' } );
    }
});

FlowRouter.route("/signup",  {
    name: "signup",
    action() {
        BlazeLayout.render( 'default', { yield: 'signup' } );
    }
});
