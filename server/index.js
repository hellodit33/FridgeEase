const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

require("dotenv").config();
const port = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.oyapy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => console.log(`server is running on port ${port}`));
  })
  .catch((err) => console.log(err));
