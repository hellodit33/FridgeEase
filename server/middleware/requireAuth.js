const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  //Authorization === 'Bearer lksdhflsdhflisdh'
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.SECRET_TOKEN, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const { userId } = payload;

    const user = await UserModel.findById(userId);

    req.user = user;
    next();
  });
};
