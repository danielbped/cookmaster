const MONGO_DB_ID_LENGTH = 24;

module.exports = (id) => id.length === MONGO_DB_ID_LENGTH;