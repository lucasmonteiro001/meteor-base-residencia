import { Users } from '../users';
import '../methods';

Meteor.publish('Users', () => {
    return Users.find();
});
