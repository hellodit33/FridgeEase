const express = require("express");
const foodRoutes = require("./routes/food.routes");
const userFoodRoutes = require("./routes/userfood.routes");

require("dotenv").config();
require("./config/database");
//const cors = require("cors");
//const path = require("path");
const app = express();

app.use(express.json());

app.use("/api/food", foodRoutes);

app.use("/api/post", userFoodRoutes);

//listening to server on available port from heroku or 5000 for
app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
