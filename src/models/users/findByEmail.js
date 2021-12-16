const { getConnection } = require('../connection');

module.exports = async (email) => {
  const user = await getConnection()
    .then((db) => db.collection('users').findOne({ email }));

  return user;
};
