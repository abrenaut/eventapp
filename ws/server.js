const request = require('request');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3002;

// The URL of the API used for CRUD operations on events
const apiUrl = process.env.API_URL + /events/;

io.on('connection', function (socket) {
  // Events emitted from the web client
  socket.on('client:deleteEvent', function (data) {
    // Delete the event using the API and send a "eventDeleted" event on success
    request.del(apiUrl + data._id, function (error, response, body) {
      if(!error) {
        socket.broadcast.emit('server:eventDeleted', data);
      }
    });
  });
  socket.on('client:getEvents', function (data) {
    // Send the list of events to the client which requested it
    request(apiUrl, function (error, response, body) {
      socket.emit('server:newEvents', body);
    });
  });

  // Events emitted from the API
  // Those events are forwarded to the web clients
  socket.on('api:eventCreated', function (data) {
    socket.broadcast.emit('server:eventCreated', data);
  });
  socket.on('api:eventDeleted', function (data) {
    socket.broadcast.emit('server:eventDeleted', data);
  });
});

server.listen(port, function() {
    console.log("WebSocket Server started on port " + port)
});
