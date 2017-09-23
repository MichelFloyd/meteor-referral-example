import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Invitations } from './schema';
const referralPath = 'referral/';

export const inviteByEmail = new ValidatedMethod({
  name: 'invitations.insert',
  validate: new SimpleSchema({
    inviteeEmail: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
  }).validator(),
  run({ inviteeEmail }) {
    const userId = this.userId;
    const referrerEmail = Meteor.users.findOne(userId).emails[0].address;
    if (userId) {
      const doc = { userId, referrerEmail, inviteeEmail: inviteeEmail.toLowerCase() };
      const invitation = Invitations.findOne(doc);
      const invitationId = invitation? invitation._id : Invitations.insert(doc);
      return `${Meteor.absoluteUrl()}${referralPath}${invitationId}`;
    } else throw new Meteor.Error(500, 'Access denied!');
  },
});

export const incrementVisitCount = new ValidatedMethod( {  
  name: 'invitations.incrementVisitCount',
  validate: new SimpleSchema({
    invitationId: {
      type: String,
    },
  }).validator(),
  run({ invitationId }) {
    Invitations.update(invitationId, { $inc: { visitCount: 1 }});
  },
});

export const processReferral = new ValidatedMethod( {
  name: 'invitations.processReferral',
  validate: new SimpleSchema({
    invitationId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
  }).validator(),
  run({ invitationId }) {
    const invitation = Invitations.findOne(invitationId);
    if ( invitation ) {
      if (!invitation.inviteeId) {
        Invitations.update(invitationId, { $set: { inviteeId: this.userId }});
      } else {
        throw new Error(`Invitation ${invitationId} already used!`);
      }
    } else {
      throw new Error('Invitation not found');
    }
  },
});