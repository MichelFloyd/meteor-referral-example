import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
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

Template.referral.events({
  'click #login'(ev) {
    Meteor.loginWithPassword('foo@bar.com', 'ph00bar');
  }
});
