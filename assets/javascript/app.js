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

  //on click to submit text input
  $(document).on('click', '#submit', function () {
    event.preventDefault();

    //grabbing text input for new actor
    var newActor = $('#add-actor').val();
    console.log(newActor);

    //adding button
    var actButton = $('<button>')
      .addClass('btn btnActor')
      .text(newActor);

    $('#buttons').prepend(actButton);

    //clear text input
    $("#add-actor").val("");
  });


  //function to clear gifs between actors
  function clearGif() {
    $('#gifs').empty();
  }
  //onclick to get actor gifs 
  $(document).on('click', '.btnActor', function () {
    event.preventDefault();

    //clear previous gifs
    clearGif();

    //variable for text input
    var person = $(this).text();
    console.log(person);

    //variable fof api query
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      person +
      '&api_key=4zBo15vrhRQspPNSGvxz226lfo1s1nb7&limit=10';

    //query function for api
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (response) {
      console.log(response);

      var results = response.data;

      //for loop for gif response results
      for (var i = 0; i < results.length; i++) {

        //variables for response data
        var rating = results[i].rating;
        var actorImage = results[i].images.fixed_width_still.url;
        var actorGif = results[i].images.fixed_width.url;

        //variables creating divs for gifs
        var p = $('<p>').text('RATING: ' + rating);

        var gifCard = $("<div class='card' id='gif-card'>");

        var imageCard = $("<img class='card-img-top img-fluid'>");

        var gifCardBody = $("<div class='card-footer'>");

        //adding image attributes for animation
        imageCard.attr('src', results[i].images.fixed_width_still.url);
        imageCard.attr('width', '287px');
        imageCard.attr('data-still', actorImage);
        imageCard.attr('data-animate', actorGif);
        imageCard.attr('data-state', 'still');
        imageCard.attr('class', 'gif');

        //append image and text to gif cards
        gifCard.append(imageCard);
        gifCard.append(gifCardBody);
        gifCardBody.append(p);

        //hide image and prepend gif cards
        $('#image').hide();
        $('#gifs').prepend(gifCard);
      }
    });
  });

  //onclick of gif to animate
  $(document).on('click', '.gif', function () {
    event.preventDefault();

    //create variable for data-state
    var state = $(this).attr('data-state');

    //if statement to switch still to animate
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  });
});
