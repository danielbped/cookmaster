const { getConnection } = require('../connection');

module.exports = async ({ id, ...recipe }) => getConnection()
  .then((db) => db.collection('recipes').updateOne(
    { id },
    { $set: recipe },
  ));