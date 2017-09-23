import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import './main.html';

if (!Meteor.userId()) Meteor.loginWithPassword('foo@bar.com', 'ph00bar'); // autologin for demo
