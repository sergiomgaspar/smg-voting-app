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

/* Count existing polls */
/*PollsSchema.methods.findByUser = function(cb) {  
  return this.model('Polls').find({ createWhoId: this.createWhoId }, cb);
  //return this.model('Polls').find({  }, cb);
};*/

/* toJSON implementation */
/*PollsSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};*/
 
export default mongoose.model('Polls', PollsSchema);
