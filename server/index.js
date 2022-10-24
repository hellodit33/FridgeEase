const express = require("express");
const fridgeRoutes = require("./routes/fridge.routes");
require("dotenv").config();
require("./config/database");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.json());

app.use("/api/fridge", fridgeRoutes);

//listening to server on available port from heroku or 5000 for localhost
app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
