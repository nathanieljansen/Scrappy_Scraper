require('dotenv').config()

const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cheerio = require("cheerio")
const mongoose = require("mongoose")
const request = require("request")
const db = require("./models")
const app = express();
var axios = require("axios");

app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());



const MONGODB_URI = process.env.MONGODB_URI;





const port = process.env.PORT || 3000

app.use(express.static("public"));

mongoose.connect(MONGODB_URI);


app.get('/scrape', function (req, res) {

  axios.get("http://www.theawesomer.com").then(function (response) {

    // request("http://www.theawesomer.com", (error, response, html) => {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape


    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("div.storycontent").each(function (i, element) {

      let results = {}

      results.title = $(element).find("h2").text()

      results.articleURL = $(element).find("h2").find('a').attr("href")

      results.imageURL = ("https://www.theawesomer.com") + $(element).find("a").find("img").attr("src")

      results.description = $(element).children(".postbody").find("p").text()

      db.Articles.create(results)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          // return res.json(err);
        });
    });
  });


})

app.get("/articles", function (req, res) {
  db.Articles.find({})
    .then(function (dbArticle) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
  // TODO: Finish the route so it grabs all of the articles
});

app.get('/saved', function (req, res) {
  res.sendFile(__dirname + '/public/saved.html');
});

app.get("/savedArticles", function (req, res) {
  db.Articles.find({
      saved: true
    })
    .then(function (dbArticle) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
  // TODO: Finish the route so it grabs all of the articles
});


app.post("/savedArticles/:id", function (req, res) {
  db.Articles.findByIdAndUpdate(req.params.id, {
      $set: {
        saved: true
      }
    })
    .exec(function (err, data) {
      if (err) throw err;
      res.end();
    });
});

app.post("/deletedArticles/:id", function (req, res) {
  db.Articles.findByIdAndUpdate(req.params.id, {
      $set: {
        saved: false
      }
    })
    .exec(function (err, data) {
      if (err) throw err;
      res.end();
    });
});


app.get("/articleNote/:id", function (req, res) {
  // TODO
  // ====
  // Finish the route so it finds one article using the req.params.id,
  // and run the populate method with "note",
  // then responds with the article with the note included

  db.Article.findOne({
      _id: req.params.id
    })
    .populate("Note")
    .then(function (dbArticle) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });


});

// Route for saving/updating an Article's associated Note
app.post("/articleNotes/:id", function (req, res) {
  // TODO
  // ====
  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note
db.Articles.create(req.body)
    .then(function (dbNote) {
      // If a Note was created successfully, find one Article (there's only one) and push the new Note's _id to the User's `notes` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Articles.findOneAndUpdate({
        _id: req.params.id
      }, {
        $push: {
          notes: dbNote._id
        }
      }, {
        new: true
      });
    })
    .then(function (dbArticle) {
      // If the Article was updated successfully, send it back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

app.get("/articleNotes", function (req, res) {
  db.Notes.find({})
    .then(function (dbArticle) {
      // If all Notes are successfully found, send them back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
  // TODO: Finish the route so it grabs all of the articles
});

app.listen(port, function () {

  console.log("App running on port 3000!");
});



exports = module.exports = app;