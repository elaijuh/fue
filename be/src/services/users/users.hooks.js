const { iff, setNow } = require('feathers-hooks-common')
const auth = require('@feathersjs/authentication')
const local = require('@feathersjs/authentication-local')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      local.hooks.hashPassword({ passwordField: 'password' }),
      setNow('createdAt', 'updatedAt'),
    ],
    update: [
      local.hooks.hashPassword({ passwordField: 'password' }),
      setNow('updatedAt'),
    ],
    patch: [
      local.hooks.hashPassword({ passwordField: 'password' }),
      setNow('updatedAt'),
    ],
    remove: [],
  },

  after: {
    all: [iff(ctx => ctx.params.provider, local.hooks.protect('password'))],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}
