import {FlowRouter} from 'meteor/kadira:flow-router';
import {Teste} from '../../ui/public/teste';
import {Outro} from '../../ui/public/teste0';

FlowRouter.route("/", {
    name: "homepage",
    action() {
        console.log(Teste);
        BlazeLayout.render( Teste );
    }
});
