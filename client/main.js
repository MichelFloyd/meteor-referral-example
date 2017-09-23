import { Meteor } from 'meteor/meteor';
import register from './register.js';
import './main.html';

if (!Meteor.userId()) register({email: 'foo@bar.com', password: 'ph00bar' });

FlowRouter.route('/', {
  action(params) {
    BlazeLayout.render('layout',{ main: 'invite' });
  }
});