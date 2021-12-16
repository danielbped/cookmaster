const { getConnection } = require('../connection');

module.exports = async (recipe) => getConnection()
  .then((db) => db.collection('recipes').insertOne({ ...recipe }));