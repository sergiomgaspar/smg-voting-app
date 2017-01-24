'use strict';

import mongoose from 'mongoose';

var PollsSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Polls', PollsSchema);
