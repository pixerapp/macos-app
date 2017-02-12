'use strict';

/* External dependencies */
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/filter';

/* Local dependencies */
import Logger from './Logger';

// Buffer size: message count to keep and replay
// to all subscribed and future observers.
const Bus = new ReplaySubject(1000);

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
  Bus.subscribe(Logger);
}

export default Bus;

export function initState(state) {
  /*
   * For each property register a dispatcher function
   * that can be called whenever these properties need to
   * be updated with new values.
   * When these dispatchers are called with new values, we
   * replay these values to all subscribers.
   * */
  for (let type in state) {
    // Emit the initial states as if they are
    // coming from the socket.
    Bus.next({
      type,
      payload: state[type]
    });
  }
}
