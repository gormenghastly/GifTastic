var actorArray = [
  'John Travolta',
  'Ryan Gosling',
  'Uma Thurman',
  'Samuel Jackson',
  'Angelina Jolie',
  'Viola Davis',
  'Steve Carell',
  'Keanu Reeves',
  'Idris Elba',
  'Tina Fey',
  'Kate McKinnon'
];

$(document).ready(function () {
  //creates a button for each actor in array
  function actorButtons() {
    for (var i = 0; i < actorArray.length; i++) {
      var actButton = $('<button>')
        .addClass('btn btn-md btnActor')
        .text(actorArray[i]);
      $('#buttons').append(actButton);
    }
  }

  actorButtons();

  //grabbing text input and creating new button with it
  $(document).on('click', '#submit', function () {
    event.preventDefault();

    var newActor = $('#add-actor').val();
    console.log(newActor);

    var actButton = $('<button>')
      .addClass('btn btnActor')
      .text(newActor);

    $('#buttons').prepend(actButton);

    $("#add-actor").val("");
  });



  function clearGif() {
    $('#gifs').empty();
  }

  $(document).on('click', '.btnActor', function () {
    event.preventDefault();

    clearGif();

    var person = $(this).text();
    console.log("hi" + person);

    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      person +
      '&api_key=4zBo15vrhRQspPNSGvxz226lfo1s1nb7&limit=10';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (response) {
      console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var rating = results[i].rating;
        var actorImage = results[i].images.fixed_width_still.url;
        var actorGif = results[i].images.fixed_width.url;

        var p = $('<p>').text('RATING: ' + rating);

        var gifCard = $("<div class='card' id='gif-card'>");

        var imageCard = $("<img class='card-img-top img-fluid'>");

        var gifCardBody = $("<div class='card-footer'>");

        imageCard.attr('src', results[i].images.fixed_width_still.url);
        imageCard.attr('width', '287px');
        imageCard.attr('data-still', results[i].images.fixed_width_still.url);
        imageCard.attr('data-animate', results[i].images.fixed_width.url);
        imageCard.attr('data-state', 'still');
        imageCard.attr('class', 'gif');

        gifCard.append(imageCard);
        gifCard.append(gifCardBody);
        gifCardBody.append(p);

        $('#gifs').prepend(gifCard);
      }
    });
  });

  $(document).on('click', '.gif', function () {
    event.preventDefault();

    var state = $(this).attr('data-state');

    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  });
});
