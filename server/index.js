const express = require("express");
const cookieParser = require("cookie-parser");

const foodRoutes = require("./routes/food.routes");
const userRoutes = require("./routes/user.routes");
const recipeRoutes = require("./routes/recipe.routes");

require("dotenv").config();
require("./config/database");
//const cors = require("cors");
const path = require("path");
const app = express();
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const verifyToken = require("./middleware/verifyToken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("welcome to the auth system");
});

/*jwt
app.get("*", verifyToken);
/* app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});


app.get("/api/user/profile", verifyToken, (req, res) => {
  res.send({ success: true, data: req.user });
});
*/

app.use("/api/food", foodRoutes);

app.use("/api/user", userRoutes);

app.use("/api/recipes", recipeRoutes);

//listening to server on available port from heroku or 5000 for
app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
