$(document).ready(function () {

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
      let header = `
        <h1>${data.title}</h1>
      `

      let imageDescription = `<div class="row"> 
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
      `
      $(".header").append(header)
      $(".header").append(imageDescription)

      let description = ``

      // $(".header").append(description)


      //   let row = `
      // <tr>
      //   <td>${data.title}</td>
      //   <td><img src = "${data.image}"></td>
      //   <td>${data.description}</td>
      //   <td><a target="_blank" href ="${data.link}">Link</a></td>

      // </tr>
      // `
      //   console.log(row);
      //   $('tbody').append(row);
    });

     $(document).on('click', '.saveButton', function () {
    
       $.ajax({
         method: "POST",
         url: "./savedarticles",
         data: this(data)
       }).then((responseFromBackEnd) => {
         console.log('Quit it!!', responseFromBackEnd)
       });

       console.log(JSON.stringify(pairingRecord) + "hi")
     })
  }

 
})

