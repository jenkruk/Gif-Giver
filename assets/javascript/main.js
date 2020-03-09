//


//Animals array from which the buttons will be created
var animals = ['puppies', 'bunnies', 'hamsters', 'alpacas', 'sloths', 'otters', 'kittens', 'hedgehogs', 'pandas', 'koalas'];


$(document).ready(function () {
    //Creates buttons from the above array
    function createButtons() {
        // Deleting the previous buttons prior to adding new buttons
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the topics array
        for (var i = 0; i < animals.length; i++) {
            // Then dynamicaly generating buttons for each item in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of eachBtn to our button
            a.addClass("row eachBtn mx-2 my-2 shadow text-uppercase");
            // Adding a data-attribute
            a.attr("data-name", animals[i]);
            // Providing the initial button text
            a.text(animals[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // displayQueryInfo function re-creates the HTML to display the api query content
    function displayQueryInfo() {

        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=fCcSrayPKQOER3lhOq7le6eYVZeR3Ls3&limit=10&rating=G";
        //var queryURL = "https://api.giphy.com/v1/gifs/random?&api_key=fCcSrayPKQOER3lhOq7le6eYVZeR3Ls3&tag=" + topic + "&limit=10";

        // Creating an AJAX call for the specific item button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //loop through the animals array
            for (var i = 0; i < animals.length; i++) {
                // Creating a div to hold the buttons created from the array
                var resultsDiv = $("<div class='animal text-uppercase'>");
                // Storing the rating data
                var rating = response.data[i].rating;
                // Retrieving the URL for the images
                // ?????? var imgURL = ""; ??????????????????? //
                // Variable to hold still image from Giphy Query Results
                var stillGifs = response.data[i].images.fixed_height_still.url;
                // Variable to hold animated image from Giphy Query Results
                var animatedGifs = response.data[i].images.fixed_height.url;
                // Creating image element
                var image = $("<img>").attr("src", stillGifs);
                //Add more image attributes to handle still and animate
                image.attr("data-still", stillGifs);
                image.attr("data-animate", animatedGifs);
                image.attr("data-state", "still");
                image.attr("id", "img" + i);
                //Adds class to the images
                image.addClass('gifs');
                // Appending the image to the html element
                resultsDiv.append(image);
                // Putting the new results above the previous 
                // Creating an element to have the rating displayed
                var pOne = $("<p>").text("Rating: " + rating);
                //Adds class to first paragraph (pOne)
                pOne.addClass('rating');
                // Displaying the rating
                resultsDiv.append(pOne);

                $("#results-view").prepend(resultsDiv);
            };
        });
    }

    // This event listener handles events when the click-to-add button is used
    $("#userChoice").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var userInput = $("#user-input").val().trim();

        // Adding topic from the textbox to our array
        animals.push(userInput);

        // Calling createButtons which handles the processing of our array
        createButtons();
    });

    // Adding a click event listener to all elements with a class of "eachBtn"
    $(document).on("click", ".eachBtn", displayQueryInfo);

    // Calling the createButtons function to display the intial buttons
    createButtons();
})

$(".instrx").hide();

// Add a listener for all elements with class of "gif"
$(document).on("click", ".gifs", animate);



function animate() {
    // when a particular button is clicked
    var pic = $(this).attr("id");
    pic = "#" + pic;
    var state = $(pic).attr("data-state");
    if (state === "still") {
        $(pic).attr("src", $(pic).attr("data-animate"));
        $(pic).attr("data-state", "animate");
    } else {
        $(pic).attr("src", $(pic).attr("data-still"));
        $(pic).attr("data-state", "still");
    };
};