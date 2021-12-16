const { getConnection } = require('../connection');

module.exports = async (user) => getConnection()
  .then((db) => db.collection('users').insertOne({ ...user }));