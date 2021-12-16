const isEmailValid = (email) => {
  const emailRegex = /.+@\w+\.\w+(\.\w{2,3})?/;
  const validEmail = emailRegex.test(email);

  if (!email || !validEmail) return false;

  return true;
};

const isPasswordNotEmpty = (password) => {
  if (!password) return false;

  return true;
};

const isLoginValid = async (email, password) => isEmailValid(email) && isPasswordNotEmpty(password);

module.exports = async (email, password) => isLoginValid(email, password);
