const { AbilityBuilder, Ability } = require('@casl/ability');
const { toMongoQuery } = require('@casl/mongoose');

const { Forbidden } = require('@feathersjs/errors');
const TYPE_KEY = Symbol.for('type');

Ability.addAlias('update', 'patch');
Ability.addAlias('read', ['get', 'find']);
Ability.addAlias('remove', 'delete');
Ability.addAlias('manage', ['create', 'read', 'update', 'remove']);

function subjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  return subject[TYPE_KEY];
}

function defineAbilitiesFor(user) {
  const { rules, can } = AbilityBuilder.extract();

  if (user && user.roles.indexOf('admin') != -1) {
    can('manage', 'all');
  } else if (user && user.roles.indexOf('guest') != -1) {
    can('read', ['messages']);
    can('manage', ['messages'], { user: user.email });
    can(['read', 'update'], 'users', { _id: user._id });
  }

  return new Ability(rules, { subjectName });
}

function canReadQuery(query) {
  return query !== null;
}

module.exports = function authorize(name = null) {
  return async function(ctx) {
    const action = ctx.method;
    const service = name ? ctx.app.service(name) : ctx.service;
    const serviceName = name || ctx.path;
    const ability = defineAbilitiesFor(ctx.params.user);
    const throwUnlessCan = (action, resource) => {
      if (ability.cannot(action, resource)) {
        throw new Forbidden(`Not allowed to ${action} ${serviceName}`);
      }
    };

    ctx.params.ability = ability;

    if (ctx.method === 'create') {
      ctx.data[TYPE_KEY] = serviceName;
      throwUnlessCan('create', ctx.data);
    }

    if (!ctx.id) {
      const query = toMongoQuery(ability, serviceName, action);

      if (canReadQuery(query)) {
        Object.assign(ctx.params.query, query);
      } else {
        // The only issue with this is that user will see total amount of records in db
        // for the resources which he shouldn't know.
        // Alternative solution is to assign `__nonExistingField` property to query
        // but then feathers-mongoose will send a query to MongoDB which for sure will return empty result
        // and may be quite slow for big datasets
        ctx.params.query.$limit = 0;
      }

      return ctx;
    }

    const params = Object.assign({}, ctx.params, { provider: null });
    const result = await service.get(ctx.id, params);

    result[TYPE_KEY] = serviceName;
    throwUnlessCan(action, result);

    if (action === 'get') {
      ctx.result = result;
    }

    return ctx;
  };
};
