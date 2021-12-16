const User = require('../../models/users');

const createUser = async (user) => User.createUser(user);

module.exports = createUser;