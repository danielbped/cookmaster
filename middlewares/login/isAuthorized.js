const User = require('../../services/users');

const isAuthorized = async (email, password) => {
  const passwordRegex = /^\w{5,}$/i;
  const validPassword = passwordRegex.test(password);

  const user = await User.findUserByEmail(email);

  if (!user) return false;

  if (password !== user.password || !validPassword) return false;

  return true;
};

module.exports = isAuthorized;