const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const generateToken = async (user) => {
  return jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.create({ email, password });
    const token = await generateToken(user);

    res.status(201).send({
      success: true,
      data: { id: user._id, email: user.email },
      token,
    });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ success: false, errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = await generateToken(user);
    res.status(201).send({
      email: user.email,
      id: user._id,
      success: true,
      message: "logged in successfully",
      token,
    });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).send({ success: false, errors });
  }
};

module.exports.logout = async (req, res) => {
  res.status(200).send({ success: false });
};
