require('dotenv').config()

const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cheerio = require("cheerio")
const mongoose = require("mongoose")
const request = require("request")


const app = express();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

const port = process.env.PORT || 3000


// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;


app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send(index.html);
});

app.listen(port, function () {
  mongoose.connect(MONGODB_URI);
  console.log("App running on port 3000!");
});

