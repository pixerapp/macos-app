'use strict';

const config = require('config');
const cuid = require('cuid');
const { BrowserWindow } = require('electron');
const querystring = require('querystring');

const logger = require('./logger');

function requestAccessToken() {
  return new Promise((resolve, reject) => {
    const appId = config.get('fb.appId');
    const redirectUri = config.get('fb.auth.redirectUri');
    const scopes = config.get('fb.auth.scopes');
    const state = cuid();

    const facebookAuthURL = `https://www.facebook.com/v2.8/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=token,granted_scopes&scope=${scopes}&display=popup&state=${state}`;

    const authWindow = new BrowserWindow({
      width: 450,
      height: 300,
      show: false,
      'node-integration': false
    });

    authWindow.once('ready-to-show', () => {
      authWindow.show();
    });

    authWindow.loadURL(facebookAuthURL);

    authWindow.webContents.on('did-get-redirect-request', function onAuthRedirect(event, oldUrl, newUrl) {
      if (newUrl.indexOf(redirectUri) !== 0) {
        // Facebook seems to have redirected us to a login page.
        logger.info(`Auth redirect to ${newUrl}`);

        return authWindow.loadURL(newUrl);
      }

      // Facebook has successfully redirected us to our predefined
      // redirect URI.
      authWindow.close();

      const queryStringSeparatorIndex = newUrl.indexOf('#') + 1;
      const query = querystring.parse(newUrl.substr(queryStringSeparatorIndex));

      logger.info(`Auth response: ${newUrl}`, { query });

      if (query.error) {
        return reject(query);
      }

      if (query.state !== state) {
        throw new Error('Facebook returned an unexpected state value.');
      }

      if (!query.granted_scopes.includes(scopes)) {
        throw new Error(`The user has not granted required "${scopes}" permissions.`);
      }

      resolve(query);
    });
  });
}

module.exports = {
  requestAccessToken,
};
