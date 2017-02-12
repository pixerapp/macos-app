'use strict';

const leveldb = require('level');

// Create our database, supply location and options.
// This will create or open the underlying LevelDB store.
const db = leveldb('./pixerapp');

module.exports = {
  get: key => {
    return new Promise((resolve, reject) => {
      db.get(key, function (err, data) {
        if (err) {
          if (err.type === 'NotFoundError') {
            return resolve();
          }

          return reject(err);
        }

        resolve(data);
      });
    });
  },
  put: (key, value) => {
    return new Promise((resolve, reject) => {
      db.put(key, value, function (err) {
        if (err) {
          return reject(err);
        }

        resolve(value);
      });
    });
  }
};
