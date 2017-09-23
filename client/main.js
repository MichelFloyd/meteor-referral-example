import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import './main.html';

if (!Meteor.userId()) Accounts.createUser({email: 'foo@bar.com', password: 'ph00bar' });

FlowRouter.route('/', {
  action(params) {
    BlazeLayout.render('layout',{ main: 'invite' });
  }
});