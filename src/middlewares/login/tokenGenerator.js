const jwt = require('jsonwebtoken');
const User = require('../../services/users');

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const senhasecreta = 'senhasecreta';

const tokenGenerator = async (email, password) => {
  const { role } = await User.findUserByEmail(email);

  const payload = {
    email,
    password,
    admin: (role === 'admin').toString(),
  };

  const token = jwt.sign({ data: payload }, senhasecreta, jwtConfig);

  return token;
};

module.exports = tokenGenerator;