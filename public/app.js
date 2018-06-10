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
      let row = `
    <tr>
      <td>${data.title}</td>
      <td><img src = "${data.image}"></td>
      <td>${data.description}</td>
      <td><a href ="${data.link}">Link</a></td>
      
    </tr>
    `
      console.log(row);
      $('tbody').append(row);
    });
  }
})