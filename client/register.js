import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Invitations } from '../imports/api/invitations/schema.js';
import { processReferral } from '../imports/api/invitations/methods';

Template.register.helpers({
  invitation(){
    const invitationId = Session.get('invitationId');
    return Invitations.findOne(invitationId);
  }
});

Template.register.events({
  'click button'(ev){
    const email = $('#email').val();
    const password = $('#password').val();
    Accounts.createUser({ email, password }, err => {
      if ( err ) {
        Alert(`Error Creating New Account: ${err}`);
      } else {
        const invitationId = Session.get('invitationId');
        if ( invitationId ) {
          processReferral.call({ invitationId }, err => {
            if ( err ) alert('Error setting referral');
            else Session.set('invitationId','');
          });
        }
        FlowRouter.go('/');
      }
    });
  }
});
