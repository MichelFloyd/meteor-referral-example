import { Meteor } from 'meteor/meteor';
import { Invitations } from './schema';

Meteor.publish('oneInvitation',function(invitationId) {
  check(invitationId,String);
  return Invitations.find(invitationId);
});

Meteor.publish('myInvitations',function() {
  if (this.userId) return Invitations.find({userId: this.userId});
  this.ready();
});
