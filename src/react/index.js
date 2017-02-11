'use strict';

import React from 'react';
import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';

import App from './App';

const appPlaceholder = document.getElementById('app');

function attach(Component) {
  render(
    // <AppContainer>
      <Component/>
    // </AppContainer>
    ,appPlaceholder
  );
}

attach(App);

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     attach(App);
//   });
// }
