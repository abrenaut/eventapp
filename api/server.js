const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const io = require('socket.io-client');

const port = 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// The connection to the database where events are stored
mongoose.connect(process.env.DB_URL); 
require('./src/models/event');

// The WebSocket client used to notify the WebSocket server when an event is deleted / created
const socket = io(process.env.WS_URL);
app.set('socket', socket);

// Initialize api routes
const apiRoutes = require('./src/routes/event');
apiRoutes(app);

// Default route if no matching route found
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port)
console.log("API Server started on port " + port)

module.exports = app; // for testing