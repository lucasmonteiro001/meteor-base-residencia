import { Template } from 'meteor/templating';
import './signup.html';


Template.signup.onRendered( () => {
    console.log("signup");
});

Template.signup.events({
    'submit form': ( event ) => {
        event.preventDefault();
        var email = $('[type=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        });
    }
});
