import { Template } from 'meteor/templating';
import './teste0.html';

Template.tasks.helpers({
  tasks: [
    { text: 'This is task 5' },
    { text: 'This is task 6' },
    { text: 'This is task 7' },
  ],
});

export default "tasks";
