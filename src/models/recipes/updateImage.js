const { getConnection } = require('../connection');

module.exports = async ({ id, image }) => getConnection()
  .then((db) => db.collection('recipes').updateOne(
    { id },
    { $set: {
      image,
    } },
  ));