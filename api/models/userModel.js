'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the task',
    unique: true,
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['active', 'inactive', 'blocked']
    }],
    default: ['active']
  },
  Api_key: {
    type: String,
  }
});

module.exports = mongoose.model('User', UserSchema);
