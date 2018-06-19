$(document).ready(function () {



  $.getJSON("/scrape", function (data) {
    // Call our function to generate a table body
    // displayResults(data);
  });

   $.getJSON("/articleNotes", function (data) {
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
    window.location.reload(true)
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
              class="col-md-12 btn btn-primary saveButton">Save Article</button>
          </div>
          <div class="row">
        <button type="button" class="col-md-12 btn btn-primary noteButton" data-toggle="modal" data-target="#exampleModalCenter" data-id=${data._id}>Make Notes</button></div>
        </div>
        </div>
      </div>

      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Add Notes!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="input-group input-group-lg">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-lg">Note:</span>
            </div>
            <input type="text" class="form-control note" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary noteButton" data-dismiss="modal">Close</button>
          <button type="button" data-id=${data._id} class="btn btn-primary saveNote">Save changes</button>
        </div>
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

  $(document).on("click", ".deleteButton", function () {
    // Grab the id associated with the article from the submit button
    var articleId = $(this).attr("data-id");
    let ajaxUrl = "/deletedArticles/" + articleId;
    //  $(this).parent().parent().hide();
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: ajaxUrl
      })
      // With that done
      .done(function (data) {

      });
    window.location.reload(true)
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
              class="col-md-12 btn btn-primary deleteButton" 
              >Delete Article</button>
          </div>
          <div class="row">
        <button type="button" class="col-md-12 btn btn-primary noteButton" data-toggle="modal" data-target="#exampleModalCenter" data-id=${data._id}>Make Notes</button></div>
        </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Add Notes!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="input-group input-group-lg">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-lg">Note:</span>
            </div>
            <input type="text" class="form-control note" aria-label="Large" aria-describedby="inputGroup-sizing-sm">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" data-id=${data._id} class="btn btn-primary saveNote">Save changes</button>
        </div>
      </div>
      `
      $(".savedHeader").append(savedArticles)
    });
  }

  $(document).on("click", ".saveNote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articleNotes/" + thisId,
        data: {
          // Value taken from title input
          // Value taken from note textarea
          body: $(".note").val()
        }
      })
      // With that done
      .then(function (data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  })

})