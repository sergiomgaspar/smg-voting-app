/**
 * Polls model events
 */

'use strict';

import {EventEmitter} from 'events';
import Polls from './polls.model';
var PollsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PollsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Polls.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PollsEvents.emit(event + ':' + doc._id, doc);
    PollsEvents.emit(event, doc);
  };
}

export default PollsEvents;
