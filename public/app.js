$(document).ready(function () {


  $.getJSON("/scrape", function (data) {
    // Call our function to generate a table body
    // displayResults(data);
  });

  $.getJSON("/articles", function (data) {
    // Call our function to generate a table body
    displayResults(data);
  });

  $.getJSON("/saved", function (data) {
    savedResults(data)
  });

  $.getJSON("/savedArticles", function (data) {
    savedResults(data)
  });

  $('.scrapeButton').on('click', () => {
    $(".header").empty()

    console.log("pushed it real good")

    $.getJSON("/scrape", function (data) {
      // Call our function to generate a table body
      displayResults(data);
    });
    window.location.reload(true)
  })

  $('.savedArticles').on('click', () => {
    $(".savedHeader").empty()
    console.log("pushed it better")
    $.getJSON("/savedArticles", function (data) {
      // Call our function to generate a table body
      savedResults(data);
    });
    // window.location.reload(true)
  })

  function displayResults(data) {
    data.forEach(data => {
      let scrapeInfo = `
      <div> 
        <h1>${data.title}</h1> <div class="row">
        <div class="col-md-4 text-center"> 
          <img src = "${data.imageURL}"</img>
        </div>
        <div class="col-md-6">${data.description}</div>
        <div class="col-md-2 text-center link">
          <a target="_blank" href ="${data.articleURL}">Link</a>
          <div class="row">
            <button type="button" data-id=${data._id}
              class="col-md-12 btn btn-primary saveButton" 
              >Save Article</button>
          </div>
          <div class="row">
        <button type="button" class="col-md-12 btn btn-primary noteButton" data-toggle="modal" data-target="#exampleModalCenter" data-id=${data._id}>Make Notes</button></div>
        </div>
        </div>
      </div>
      `
      $(".header").prepend(scrapeInfo)
    });
  }
  

  $(document).on("click", ".saveButton", function () {
    // Grab the id associated with the article from the submit button
    var articleId = $(this).attr("data-id");
    let ajaxUrl = "/savedArticles/" + articleId;
    //  $(this).parent().parent().hide();
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: ajaxUrl
      })
      // With that done
      .done(function (data) {
    
      });
  });

   function savedResults(data) {
     data.forEach(data => {
       let savedArticles = `
      <div> 
        <h1>${data.title}</h1> <div class="row">
        <div class="col-md-4 text-center"> 
          <img src = "${data.imageURL}"</img>
        </div>
        <div class="col-md-6">${data.description}</div>
        <div class="col-md-2 text-center link">
          <a target="_blank" href ="${data.articleURL}">Link</a>
          <div class="row">
            <button type="button" data-id=${data._id}
              class="col-md-12 btn btn-primary saveButton" 
              >Save Article</button>
          </div>
          <div class="row">
        <button type="button" class="col-md-12 btn btn-primary noteButton" data-toggle="modal" data-target="#exampleModalCenter" data-id=${data._id}>Make Notes</button></div>
        </div>
        </div>
      </div>
      `
       $(".savedHeader").prepend(savedArticles)
     });
   }

})