$(document).ready(function () {

  $.getJSON("/scrape", function (data) {
    // Call our function to generate a table body
    displayResults(data);
  });

  $('.scrapeButton').on('click', () => {

    console.log("pushed")
    $.getJSON("/scrape", function (data) {
      // Call our function to generate a table body
      displayResults(data);
    });

  })

  function displayResults(data) {
    // console.log(data)
    data.forEach(data => {

      let imageDescription = `<div> <h1>${data.title}</h1> <div class="row">
      <div class="col-md-4 text-center"> 
      <img src = "${data.image}"</img>
      </div>
      <div class="col-md-6">${data.description}</div>
      <div class="col-md-2 text-center link"><a target="_blank" href ="${data.link}">Link</a>
      <div class="row">
      <button type="button" class="col-md-12 btn btn-primary saveButton">Save Article</button></div>
      <div class="row" >
      <button type="button" class="col-md-12 btn btn-primary noteButton">Make Notes</button></div>
      </div>
      </div>
      </div>
      `
      // $(".header").append(header)
      $(".header").append(imageDescription)
    });

    // $(document).on('click', '.saveButton', function () {
    //   const savedArticles = imageDescription
    //   $.ajax({
    //     method: "POST",
    //     url: "./savedarticles",
    //     data: savedArticles
    //   }).then((savedArticles) => {
    //     console.log('Quit it!!', savedArticles)
    //   });

    //   console.log(JSON.stringify(responseFromBackEnd) + "hi")
    // })
  }


})