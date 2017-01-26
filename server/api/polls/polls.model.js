'use strict';

import mongoose from 'mongoose';

var PollsSchema = new mongoose.Schema({
  title: String,
  description: String,
  createWho: String,
  items: [] //{name:String, votes: String, id: String}
});

export default mongoose.model('Polls', PollsSchema);
