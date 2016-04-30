import {FlowRouter} from 'meteor/kadira:flow-router';
import teste from '../../ui/public/teste';
import tarefas from '../../ui/public/teste0';
import login from '../../ui/public/login.js';

FlowRouter.route("/", {
    name: "homepage",
    action() {
        console.log(teste);
        BlazeLayout.render( teste );
    }
});

FlowRouter.route("/tarefas",  {
    name: "tarefas",
    action() {
        console.log(tarefas);
        BlazeLayout.render(tarefas);
    }
});

FlowRouter.route("/login",  {
    name: "login",
    action() {
        console.log(login);
        BlazeLayout.render(login);
    }
});
