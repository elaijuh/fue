const { iff, isProvider } = require('feathers-hooks-common');
const { authenticate } = require('@feathersjs/authentication').hooks;
const authorize = require('../../hooks/authorize');

const {
  hashPassword,
  protect,
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [iff(isProvider('external'), authenticate('jwt'), authorize())],
    find: [],
    get: [],
    create: [hashPassword()],
    update: [hashPassword()],
    patch: [hashPassword()],
    remove: [],
  },

  after: {
    all: [iff(ctx => ctx.params.provider, protect('password'))],
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
};
