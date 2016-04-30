import {FlowRouter} from 'meteor/kadira:flow-router';
import '../../../ui/public/teste';
import '../../../ui/public/teste0';
import '../../../ui/public/login';
import '../../../ui/public/recover-password';
import '../../../ui/public/reset-password';
import '../../../ui/public/signup';
import '../../../ui/layouts/default';

const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route( '/signup', {
  name: 'signup',
  action() {
    BlazeLayout.render( 'default', { yield: 'signup' } );
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    BlazeLayout.render( 'default', { yield: 'login' } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recover-password',
  action() {
    BlazeLayout.render( 'default', { yield: 'recoverPassword' } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'reset-password',
  action() {
    BlazeLayout.render( 'default', { yield: 'resetPassword' } );
  }
});
