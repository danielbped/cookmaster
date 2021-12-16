const isNameValid = (name) => {
  const nameRegex = /\w{4,}/i;
  const validName = nameRegex.test(name);

  if (!validName || !name) return false;

  return true;
};

const isEmailValid = (email) => {
  const emailRegex = /.+@\w+\.\w+(\.\w{2,3})?/;
  const validEmail = emailRegex.test(email);

  if (!email || !validEmail) return false;

  return true;
};

const isPasswordValid = (password) => {
  const passwordRegex = /^\w{5,}$/i;
  const validPassword = passwordRegex.test(password);

  if (!validPassword || !password) return false;

  return true;
};

const isUserValid = async ({ name, email, password }) => isNameValid(name)
  && isEmailValid(email)
  && isPasswordValid(password);

module.exports = async (user) => isUserValid(user);
