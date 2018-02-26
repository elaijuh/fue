const auth = require('@feathersjs/authentication')
const { NotAuthenticated } = require('@feathersjs/errors')
const { to } = require('await-to-js')

function hasToken(ctx) {
  return ctx.params.headers.authorization || ctx.data.accessToken
}

module.exports = async function authenticate(ctx) {
  let res, err
  ;[err, res] = await to(auth.hooks.authenticate('jwt')(ctx))
  if (err) {
    if (err instanceof NotAuthenticated && !hasToken(ctx)) {
      return ctx
    }
    throw error
  }
  return res
}
