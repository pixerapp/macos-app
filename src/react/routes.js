import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './App';
import Files from './Files';
import Settings from './Settings';

export default <Route path="/" component={App}>
  <IndexRoute component={Files} />
  <Route path="settings" component={Settings} />
</Route>;
