const controller = require('../controllers/event');

module.exports = function(app) {
  app.route('/events')
    .get(controller.listEvents)
    .post(controller.createEvent);

  app.route('/events/:id')
    .delete(controller.deleteEvent);
};
