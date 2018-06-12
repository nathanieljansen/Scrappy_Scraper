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

app.get('/scrape', function (req, res) {

  request("http://www.theawesomer.com", (error, response, html) => {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var results = [];

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("div.storycontent").each(function (i, element) {

      const title = $(element).find("h2").text()

      const link = $(element).find("h2").find('a').attr("href")
      
      const image =$(element).find("a").find("img").attr("src")

      const description = $(element).children(".postbody").find("p").text()

      // var title = $(element).text();

      // var link = $(element).find("a").attr("href");

      // var image = $(element).find("a").attr('img');

      results.push({
        image: ("https://www.theawesomer.com") + image,
        title: title,
        description: description,
        link: link
      });

      // Save these results in an object that we'll push into the results array we defined earlier
    });

    // Log the results once you've looped through each of the elements found with cheerio
    res.json(results);
  });

})

app.listen(port, function () {
  mongoose.connect(MONGODB_URI);
  console.log("App running on port 3000!");
});

exports = module.exports = app;



const Cat = mongoose.model('Cat', {
  name: String
});

const kitty = new Cat({
  name: 'Zildjian'
});
kitty.save().then(() => console.log('meow'));