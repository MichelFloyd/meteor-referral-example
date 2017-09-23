import Invitations from '../imports/api/invitations/schema.js';
import { inviteByEmail } from '../imports/api/invitations/methods.js';

Template.invite.events({
  'click button'(ev) {
    const inviteeEmail = $('#inviteeEmail').val();
    inviteByEmail.call({ inviteeEmail }, (err, invitationUrl) => {
      if (err) alert(`Error creating invitation: ${err}`);
      else {
        const mailto = `mailto:${inviteeEmail}?subject=Invitation&body=Here is an invitation link to a hot new site!\n\n${invitationUrl}`;
        location.href = encodeURI(mailto);
      }
    });
  }
});