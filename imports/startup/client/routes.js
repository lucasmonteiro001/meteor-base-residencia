import {FlowRouter} from 'meteor/kadira:flow-router';
import teste from '../../ui/public/teste';
import tarefas from '../../ui/public/teste0';

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
