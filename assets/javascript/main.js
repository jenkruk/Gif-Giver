var animals = ['bear cubs', 'bunnies', 'hamsters', 'alpacas', 'sloths', 'otters', 'kittens', 'hedgehogs', 'pandas', 'monkeys'];

$(document).ready(function () {

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
            a.addClass("row eachBtn mx-2 shadow text-uppercase");
            // Adding a data-attribute
            a.attr("data-name", animals[i]);
            // Providing the initial button text
            a.text(animals[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // displayQueryInfo function re-creates the HTML to display the api content
    function displayQueryInfo() {

        var topic = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&apikey=fCcSrayPKQOER3lhOq7le6eYVZeR3Ls3&limit=10";
        //var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=fCcSrayPKQOER3lhOq7le6eYVZeR3Ls3&tag=" + topic + "&limit=10";

        // Creating an AJAX call for the specific item button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < animals.length; i++) {
                // Creating a div to hold the results
                var resultsDiv = $("<div class='animal text-uppercase'>");
                // Storing the rating data
                var rating = response.data[0].rating;
                // Creating an element to have the rating displayed
                var pOne = $("<p>").text("Rating: " + response.data[i].rating);
                //Adds class to first paragraph (pOne)
                pOne.addClass('rating');
                // Displaying the rating
                resultsDiv.append(pOne);
                // Retrieving the URL for the image
                var imgURL = "";
                // Creating an element to hold the image
                var image = $("<img>").attr("src", response.data[i].images.fixed_height_small_still.url);
                //Adds class to the image
                image.addClass('pictures shadow');
                // Appending the image
                resultsDiv.append(image);
                // Putting the new results above the previous 
                $("#results-view").prepend(resultsDiv);
            };
        });
    }

    // This function handles events when the click-to-add button is used
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