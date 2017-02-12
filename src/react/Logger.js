'use strict';

import { Subscriber } from 'rxjs/Subscriber';

const Logger = Subscriber.create(
  function (message) {
    console.log(`Log: type = ${message.type}`, message.payload);
  },
  function (err) {
    console.error(err);
  },
  function () {
    console.log('Logger completed.');
  }
);

export default Logger;
