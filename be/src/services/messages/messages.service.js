// Initializes the `messages` service on path `/messages`
const createService = require('feathers-mongodb');
const hooks = require('./messages.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/messages', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('messages');

  mongoClient.then(db => {
    service.Model = db.collection('messages');
  });

  service.hooks(hooks);
};
