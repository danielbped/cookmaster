const jwt = require('jsonwebtoken');
const ErrorMessages = require('../../utils/errorMessages');

const senhasecreta = 'senhasecreta';

const isUserAdmin = (token) => {
  if (!token) return false;
  
  if (token.length < 200) return ErrorMessages.wrongJWT;
  
  const decoded = jwt.verify(token, senhasecreta);
  
  const { admin } = decoded.data;

  return admin;
};

module.exports = isUserAdmin;