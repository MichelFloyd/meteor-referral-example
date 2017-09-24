import { Meteor } from 'meteor/meteor';

import './main.html';

if (!Meteor.userId()) Meteor.loginWithPassword('foo@bar.com', 'ph00bar'); // autologin for demo
