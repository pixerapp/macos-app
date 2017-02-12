'use strict';

const config = require('config');

module.exports = require('bunyan').createLogger({
  level: config.get('logger.level'),
  name: require('../../package.json').name,
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'trace',
      stream: require('fs').createWriteStream(config.get('logger.file.path'))
    }
  ]
});
