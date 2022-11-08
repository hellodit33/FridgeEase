module.exports.signUpErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "your email is invalid";

  if (err.message.includes("password"))
    errors.password = "the password needs to be at least 6 characters";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "this email is already existing as a user";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.message.includes("email")) errors.email = "Unknown email";

  if (err.message.includes("password"))
    errors.password = "your password is not valid, try again";

  return errors;
};
