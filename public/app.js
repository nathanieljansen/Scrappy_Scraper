$(document).ready(function () {

  $('.scrapButton').on('click', () => {
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

      let images = `<div class="row"> 
      <div class="col-md-4 text-center"> 
      <img src = "${data.image}"</img>
      </div>
      <div class="col-md-6">${data.description}</div>
      <div class="col-md-2 text-center"><a target="_blank" href ="${data.link}">Link</a></div>
      </div>
      `
      $(".header").append(header)
      $(".header").append(images)

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
  }
})