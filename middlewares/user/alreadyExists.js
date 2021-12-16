const User = require('../../services/users');

const userAlreadyExists = async ({ email }) => {
  const user = await User.findUserByEmail(email);

  if (!user) return false;

  return true;
};

module.exports = userAlreadyExists;