'use strict';

import mongoose from 'mongoose';

var PollsSchema = new mongoose.Schema({
  title: String,
  description: String,
  createWho: String,
  createWhoId: String,
  items: [] //{name:String, votes: String, id: String}
});

/* Custom methods */

/* Search Polls by ID of creator */
PollsSchema.methods.findByUser = function(cb) {  
  return this.model('Polls').find({ createWhoId: this.createWhoId }, cb);
  //return this.model('Polls').find({  }, cb);
};

export default mongoose.model('Polls', PollsSchema);
