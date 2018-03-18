$(document) .ready(function() {
    var puppers = [ "Running", "Eating", "Playing", "Silly", "Love", "Trouble", "Shame", "Surprise","Scare","Dramatic"];

  function displayButtons() {
      $("#gifButtons").empty();
      for (var i=0; i < puppers.length; i++){
         var viewGifButton = $("<button>");
         viewGifButton.addClass("action");
         viewGifButton.addClass("btn btn-primary")
         viewGifButton.attr("data-name", puppers[i]);
         viewGifButton.text(puppers[i]);
         $("#gifButtons").append(viewGifButton);
      }
  }
//  function to add new button
    function addNewButton(){
        $("#addGif").on("click", function(){
            var search = $("#search-input").val().trim();
            if (search == ""){
                return false;
            }
            puppers.push(search);
           
        displayButtons();
        return false;
        });
    }    
  
// Clears added buttons 
    function removeButtons(){
        $("removeLastGif").on("click",function(){
            puppers.pop(search);
            displayButtons();
            return false;
        });
    }

// View GIFs searched....
// Tinkered with this for a while and nothing was pulling up even after changing the http to https. 
// I checked the API url and it worked with my key but still not displaying results...
function viewGif(){
    var action = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=doggo+" + action + "&api_key=1osmnosvKYDSRsGSzZzMF1goSdxg1dAD&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })

    .done(function(response) {
        console.log(response);
 //clears the div 
        $("#displayGifs").empty();
        //displays results of GIF searched 
        var results = response.data;
        if (results == ""){
            alert("No Doggo GIF for selected button");
        }
    for (var i=0; i<results.length; i++){
// creating a div for the GIFs
            var gifDiv = $("<div>");
        gifDiv.addClass("gifDiv");

        //displays GF rating
        var gifRating = $("<p>").text("Rating:" + results[i].rating);
        gifDiv.append(gifRating);
        // adding rating to the GIF div section
 
 
 

 // displaying GIF
        var gifDisplay = $("<img>");
// accessing still image src
        gifDisplay.attr("src",results[i].images.fixed_height_small_still.url);
//accessing still image data    
        gifDisplay.attr("data-still",results[i].images.fixed_height_small_still.url);
// accessing animated image data  
        gifDisplay.attr("data-animate",results[i].images.fixed_height_small.url);
// setting state of image 
        gifDisplay.attr("data-state","still");
// accessing still image
        gifDisplay.addClass("image");
// adding GIF to the GIF div 
        gifDiv.append(gifDisplay);
        $("#gifDisplay").prepend(gifDiv);
        }
    });
} 


// calling functions!
displayButtons();
addNewButton();
removeButtons();


// event listeners!
$(document).on("click", ".action", displayButtons);
$(document).on("click",".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src',$(this).data('animate'));
        $(this).attr('data-state','still');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});


