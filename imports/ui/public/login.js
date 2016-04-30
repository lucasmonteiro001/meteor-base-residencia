import { Template } from 'meteor/templating';
import './login.html';

Template.login.onRendered( () => {
  //Modules.client.login( { form: "#login", template: Template.instance() } );
  console.log("tela de login");
});

Template.login.events({
  'submit form': ( event ) => event.preventDefault()
});
