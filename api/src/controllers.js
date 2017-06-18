const mongoose = require('mongoose');
const Event = mongoose.model('Event');

exports.listEvents = function(req, res) {
  Event.find({}, function(err, events) {
    if (err) {
      res.send(err);
    } else {
      res.json(events); 
    }
  });
};

exports.createEvent = function(req, res) {
  const socket = req.app.get('socket');
  const newEvent = new Event(req.body);
  newEvent.save(function(err, event) {
    if (err) {
      res.send(err);
    } else {
      res.json(event);
      // Emit a eventCreated event
      socket.emit('api:eventCreated', event); 
    }
  });
};

exports.deleteEvent = function(req, res) {
  const socket = req.app.get('socket');
  Event.remove({
    _id: req.params.id
  }, function(err, event) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Event successfully deleted' });
      // Emit a eventDeleted event
      socket.emit('api:eventDeleted', { '_id': req.params.id }); 
    }
  });
};
