import { Template } from 'meteor/templating';
import './authenticated-navigation.html';

Template.authenticatedNavigation.events({
    'click .logout': (e) => {
        e.preventDefault();
        Meteor.logout();
        Bert.alert("Logged out", 'info');
        FlowRouter.go('login');
    }
});
