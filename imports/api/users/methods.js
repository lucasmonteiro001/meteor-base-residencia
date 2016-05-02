import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';

import {Users} from './users';


Meteor.methods({
    'users.addUser' (params) {
        // check(params, Object);
        check(params, {
            email:String,
            password:String
        });

        Accounts.createUser({
            email: params.email,
            password: params.password
        });

        return true;

    }
});
