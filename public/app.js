request("http://www.theawesomer.com", (error, response, html) => {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("img.pix").each(function (i, element) {

    var link = $(element).parent().attr("href");

    var image = $(element).attr("src")

    results.push({
      link: link,
      image: image
    });

    // Save these results in an object that we'll push into the results array we defined earlier
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});