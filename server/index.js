const express = require("express");
const cookieParser = require("cookie-parser");

const foodRoutes = require("./routes/food.routes");
const userRoutes = require("./routes/user.routes");

require("dotenv").config();
require("./config/database");
//const cors = require("cors");
//const path = require("path");
const app = express();
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
app.use("/api/food", foodRoutes);

app.use("/api/user", userRoutes);

//listening to server on available port from heroku or 5000 for
app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
