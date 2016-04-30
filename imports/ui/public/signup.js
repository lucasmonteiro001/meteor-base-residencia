import { Template } from 'meteor/templating';
import './signup.html';


Template.signup.onRendered( () => {
  console.log("signup");
});

Template.signup.events({
  'submit form': ( event ) => event.preventDefault()
});

export default "signup";
