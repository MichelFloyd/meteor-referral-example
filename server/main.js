import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/invitations/methods.js';

Meteor.startup(() => { // code to run on server at startup
  if (!Meteor.users.find({}).count()) { // create a default user for demo
    Accounts.createUser({ email: 'foo@bar.com', password: 'ph00bar' });
  }
});
