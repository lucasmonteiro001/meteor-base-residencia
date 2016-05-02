import { Documents } from '../documents';

Meteor.publish('Documents', () => {
    return Documents.find();
});
