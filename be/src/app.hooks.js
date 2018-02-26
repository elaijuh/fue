// Application hooks that run for every service
const logger = require('./hooks/logger')
const { iff } = require('feathers-hooks-common')
const auth = require('@feathersjs/authentication')
const authorize = require('./hooks/authorize')
const authenticate = require('./hooks/authenticate')

module.exports = {
  before: {
    all: [
      iff(
        ctx =>
          ctx.params.provider &&
          `/${ctx.path}` !== ctx.app.get('authentication').path,
        authenticate,
        authorize(),
      ),
      logger(),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [logger()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [logger()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
