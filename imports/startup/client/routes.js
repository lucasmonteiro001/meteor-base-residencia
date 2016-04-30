import {FlowRouter} from 'meteor/kadira:flow-router';
import teste from '../../ui/public/teste';
import tarefas from '../../ui/public/teste0';
import login from '../../ui/public/login';
import recoverPassword from '../../ui/public/recover-password';
import resetPassword from '../../ui/public/reset-password';
import signup from '../../ui/public/signup';
import layout from '../../ui/layouts/default';

FlowRouter.route("/", {
    name: "homepage",
    action() {
        BlazeLayout.render( 'default', { yield: teste } );
    }
});

FlowRouter.route("/tarefas",  {
    name: "tarefas",
    action() {
        BlazeLayout.render( 'default', { yield: tarefas } );
    }
});

FlowRouter.route("/login",  {
    name: "login",
    action() {
        BlazeLayout.render( 'default', { yield: login } );
    }
});

FlowRouter.route("/recover-password",  {
    name: "recoverPassword",
    action() {
        BlazeLayout.render( 'default', { yield: recoverPassword } );
    }
});


FlowRouter.route("/reset-password",  {
    name: "resetPassword",
    action() {
        BlazeLayout.render( 'default', { yield: resetPassword } );
    }
});

FlowRouter.route("/signup",  {
    name: "signup",
    action() {
        BlazeLayout.render( 'default', { yield: signup } );
    }
});
