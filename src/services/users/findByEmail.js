const User = require('../../models/users');

const findUserByEmail = async (email) => User.findUserByEmail(email);

module.exports = findUserByEmail;