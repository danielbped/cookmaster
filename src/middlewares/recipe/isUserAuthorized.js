const jwt = require('jsonwebtoken');
const ErrorMessages = require('../../utils/errorMessages');

const senhasecreta = 'senhasecreta';

const isUserAuthorized = (token) => {
  if (!token) return false;

  if (token.length < 200) return ErrorMessages.wrongJWT;
  
  const decoded = jwt.verify(token, senhasecreta);

  return decoded;
};

module.exports = isUserAuthorized;