var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  type: {
    type: String,
    Required: true
  },
  serviceId: {
    type: String,
    Required: true
  },
  data: {
    type: String,
    Required: true
  }
});

module.exports = mongoose.model('Event', EventSchema);