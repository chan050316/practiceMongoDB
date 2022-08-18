// ENV
require("dotenv").config();
// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");

const app = express();
const port = process.env.PORT || 4500;

// conneting cluster
// const MongoClient = mongodb.MongoClient;
// const url = `mongodb+srv://chankim:kingzone1234.@cluster0.q846kqz.mongodb.net/?retryWrites=true&w=majority`;

// MongoClient.connect(url)
//   .then(client => {
//     console.log("mongo connected");
//     console.log(client);
//   })
//   .catch(err => console.log(err));

// Static File Service
app.use(express.static("public"));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

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
