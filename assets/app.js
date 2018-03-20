var actorArray = ["John Travolta", "Ryan Gosling", "Uma Thurman", "Samuel Jackson", "Angelina Jolie", "Viola Davis", "Steve Carell", "Keanu Reeves", "Idris Elba", "Tina Fey", "Kate McKinnon"]

$(document).ready(function() {

//creates a button for each actor in array
function actorButtons() {
    
    for( var i = 0; i < actorArray.length; i++) {

        var actButton = $("<button>").addClass("btn btn-md").text(actorArray[i]);
        $("#buttons").append(actButton);
    }
}

actorButtons();


//grabbing text input and creating new button with it
$(document).on("click", "#submit", function() {

    var newActor = $("#add-actor").val();
    console.log(newActor);

    var actButton = $("<button>").addClass("btn btn-md").text(newActor);

        $("#buttons").append(actButton);
    
});



var person = $(".btn").val();

person = "Keanu Reeves";

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=4zBo15vrhRQspPNSGvxz226lfo1s1nb7&limit=10";



$.ajax({
    url: queryURL,
    method: "GET"


}).then(function(response) {
        console.log(response);

        var results = response.data;

        for(var i = 0; i < results.length; i++) {

            var rating = results[i].rating;

            var p = $("<p>").text("RATING: " + rating);
   
            var actorImage =  results[i].images.fixed_width_still.url;
   
            var gifCard = $("<div class='card'>");

            var imageCard =  $("<img class='card-img-top'>");

            var  gifCardBody = $("<div class='card-body'>");

            imageCard.attr("src", actorImage);
         
            gifCard.append(imageCard);
            gifCard.append(gifCardBody);
            gifCardBody.append(p)
 
         $("#gifs").prepend(gifCard);

        }


    })

});