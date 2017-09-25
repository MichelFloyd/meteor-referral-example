import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Template } from 'meteor/templating';
import { Invitations } from '../imports/api/invitations/schema.js';

Template.referral.onCreated(function() {
  Tracker.autorun(() => {
    Meteor.logout(); // for demo purposes - switch context to be the invitee
    Meteor.subscribe('oneInvitation',FlowRouter.getParam('invitationId'));
  });
});

Template.referral.helpers({
  invitation() {
    return Invitations.findOne(FlowRouter.getParam('invitationId'));
  },
});

Template.referral.events({ // directly log the user in using the demo account
  'click #login'(ev) {
    Meteor.loginWithPassword('foo@bar.com', 'ph00bar');
  }
});
