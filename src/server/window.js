'use strict';

const { requestAccessToken } = require('./auth');
const { showApp } = require('./app');
const db = require('./db');
const logger = require('./logger');

module.exports = function createWindow() {
  db
    .get('user')
    .then(data => {
      if (!data) {
        return requestAccessToken().then(authData => {
          return db.put('user', JSON.stringify(authData));
        });
      }

      return Promise.resolve(JSON.parse(data));
    })
    .then(authData => {
      logger.debug('authData', authData);

      return db
        .get('watchDir')
        .then(watchDir => {
          return showApp({
            user: authData,
            settings: {
              watchDir: watchDir || '',
            },
          });
        });
    })
    .catch(err => {
      console.trace(err);
      logger.error(err);

      throw err;
    });
};
