'use strict';

/* External dependencies */
const { ipcRenderer } = require('electron');
import React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { hashHistory, Router } from 'react-router';

/* Local dependencies */
import i18n from './i18n';
import routes from './routes';
import { initState } from './Bus';

const appPlaceholder = document.getElementById('app');

ipcRenderer.on('initialState', (event, data) => {
  initState(data);
});

function attach() {
  render(
    <I18nextProvider i18n={ i18n }>
      <Router history={hashHistory}
              routes={routes}
      />
    </I18nextProvider>
    , appPlaceholder
  );
}

attach();
