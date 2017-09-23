import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Invitations } from '../imports/api/invitations/schema.js';
import { incrementVisitCount } from '../imports/api/invitations/methods';

FlowRouter.route('/referral/:invitationId', {
  triggersEnter: [ (route) => {
    console.log('entering route');
    const invitationId = route.params.invitationId;
    Session.set('invitationId',invitationId);
    incrementVisitCount.call({ invitationId });
  }],
  action(params) {
    BlazeLayout.render('layout',{ main: 'referral' });
  }
});

Template.referral.onCreated(function() {
  Tracker.autorun(() => {
    Meteor.subscribe('oneInvitation',FlowRouter.getParam('invitationId'));
  });
});

Template.referral.helpers({
  invitation() {
    return Invitations.findOne(FlowRouter.getParam('invitationId'));
  },
});
