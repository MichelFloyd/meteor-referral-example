import { Accounts } from 'meteor/accounts-base';
import { processReferral } from '../imports/api/invitations/methods';

export default function register({ email, password, profile }) {
  Accounts.createUser({ email, password, profile }, err => {
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
    }
  });
}
