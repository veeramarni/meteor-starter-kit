import { Meteor } from 'meteor/meteor';
import Tasks from 'TodoApp/collections/tasks';

Meteor.publish('tasks', function(){
    return Tasks.find({
        owner: this.userId
    })
});