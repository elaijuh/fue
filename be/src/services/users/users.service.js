// Initializes the `users` service on path `/users`
const createService = require('feathers-mongodb');
const hooks = require('./users.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  mongoClient.then(db => {
    service.Model = db.collection('users');
  });

  mongoClient.then(db => {
    db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              bsonType: 'string',
              description: 'email',
            },
            password: {
              bsonType: 'string',
              description: 'password',
            },
            name: {
              bsonType: 'string',
              description: 'password',
            },
            roles: {
              bsonType: 'array',
              description: 'roles',
            },
          },
        },
      },
    })
      .then(c => {
        c.createIndex({ email: 1 }, { unique: true });
        service.Model = c;
      })
      // create init admin user
      .then(() => {
        return service.find({ query: { email: 'admin' } });
      })
      .then(data => {
        if (!data.total) {
          console.log('Init admin account');
          service.create({
            email: 'admin',
            password: 'wrongpassword',
            name: 'ADMIN',
            roles: ['admin'],
          });
        }
      });
  });

  service.hooks(hooks);
};
