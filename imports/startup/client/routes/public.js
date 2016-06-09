import {FlowRouter} from 'meteor/kadira:flow-router';
import '../../../ui/public/index';
import '../../../ui/layouts/default';

const publicRoutes = FlowRouter.group({
  name: 'public',
});

publicRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'index' } );
  }
});
