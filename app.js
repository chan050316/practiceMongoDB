// ENV
require("dotenv").config();
// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");

const app = express();
const port = process.env.PORT || 4500;

// Static File Service
app.use(express.static("public"));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.use(methodOverride("_method"));

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully connected to mongodb"))
  .catch(e => console.error(e));

// ROUTERS
app.use("/", require("./routes/router"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
