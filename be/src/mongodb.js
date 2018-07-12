const MongoClient = require('mongodb').MongoClient

module.exports = function(app) {
  const config = app.get('mongodb')
  const promise = MongoClient.connect(config.connection).then(client => {
    // For mongodb <= 2.2
    if (client.collection) {
      return client
    }

    return client.db(config.db)
  })
  app.set('mongoClient', promise)
}
