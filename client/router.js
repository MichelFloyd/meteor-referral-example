import { Session } from 'meteor/session';
import { incrementVisitCount } from '../imports/api/invitations/methods';

FlowRouter.route('/', {
  action(params) {
    BlazeLayout.render('layout',{ main: 'invite' });
  }
});

FlowRouter.route('/referral/:invitationId', {
  triggersEnter: [ (route) => {
    const invitationId = route.params.invitationId;
    Session.set('invitationId',invitationId);
    incrementVisitCount.call({ invitationId });
  }],
  action(params) {
    BlazeLayout.render('layout',{ main: 'referral' });
  }
});

FlowRouter.route('/register', {
  action(params) {
    BlazeLayout.render('layout',{ main: 'register' });
  }
});
