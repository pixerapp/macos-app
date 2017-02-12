/* External dependencies */
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';

function resetState() {
  // Extract `resetState()` as a private function
  // so that people do not call it by mistake
  // on a `StreamsList` instance.
  if (!(this instanceof StreamsList)) {
    throw new Error('StreamsList#resetState() should be called on the instance of StreamsList.');
  }

  this.streams = [];
  this.subscriptions = [];
}

export default class StreamsList {
  static combineLatest(args) {
    return Observable
      .combineLatest
      .apply(Observable, args);
  }
  static merge(streams) {
    return Observable
      .merge
      .apply(Observable, Array.isArray(streams) ? streams : [streams]);
  }

  constructor(watcher) {
    resetState.call(this);
    this.notify(watcher);
  }

  createStream(streamName, defaultValue) {
    return this.streams[streamName] = new BehaviorSubject(defaultValue);
  }

  emit(streamName, payload) {
    this.streams[streamName].onNext(payload);
  }

  notify(watcher) {
    if (typeof watcher !== 'function') {
      throw new Error('`StreamsList#notify` expects a function as a watcher callback.');
    }

    this.watcher = watcher;
  }

  watchAny(streams, watcher = this.watcher) {
    // Notifies as soon as at least one stream has values.
    // `merge` does not accept a transformer function.
    this.subscriptions.push(StreamsList
      .merge(streams)
      .subscribe(watcher)
    );
  }

  watch(streams, transformer, watcher = this.watcher) {
    // Notifies only when all streams have values.
    !Array.isArray(streams) && (streams = [streams]);

    streams.push(transformer);

    this.subscriptions.push(StreamsList
      .combineLatest(streams)
      .subscribe(watcher)
    );
  }

  getStream(streamName) {
    return this.streams[streamName];
  }

  unsubscribe() {
    this.subscriptions.forEach(s => s.unsubscribe());
    resetState.call(this);
  }
}
