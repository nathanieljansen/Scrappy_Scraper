$(document).ready(function () {


  $.getJSON("/articles", function (data) {
    // Call our function to generate a table body
    displayResults(data);
  });

  // $.getJSON("/scrape", function (data) {
  //   // Call our function to generate a table body
  //   displayResults(data);
  // });

  $('.scrapeButton').on('click', () => {
    $(".header").empty()

    console.log("pushed it real good")

    $.getJSON("/scrape", function (data) {
      // Call our function to generate a table body
      displayResults(data);
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
              class="col-md-12 btn btn-primary saveButton" 
              >Save Article</button>
          </div>
          <div class="row">
        <button type="button" class="col-md-12 btn btn-primary noteButton" data-id=${data._id}>Make Notes</button></div>
        </div>
        </div>
      </div>
      `
      // let results = []
      // results.push(scrapeInfo)
      // results = results.slice(0,4)
      $(".header").append(scrapeInfo)
    });

    // $(document).on('click', '.saveButton', function () {
    //   const savedArticles = {
    //     savedArticle: $(this).attr('data-id')
    //   }
    //   console.log(savedArticles)
    //   $.ajax({
    //     method: "POST",
    //     url: "/savedArticles",
    //     data: savedArticles
    //   })
    // })
  }
})
