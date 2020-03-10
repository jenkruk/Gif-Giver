//Creating a little space at the top for easier readability

//Animals array from which the buttons will be created
var animals = ['puppies', 'bunnies', 'hamsters', 'alpacas', 'sloths', 'otters', 'kittens', 'hedgehogs', 'pandas', 'koalas'];

//Document ready jQuery function - to ensure the html is loaded prior to running any script
$(document).ready(function () {
    //Hides the line in the html with the id="instrx"
    $("#instrx").hide();
    //Creates buttons from the above array
    function createButtons() {
        //Deletes the previous buttons prior to adding new buttons
        //(this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        //Loops through the animals array
        for (var i = 0; i < animals.length; i++) {
            //Then dynamicaly generates buttons for each item in the array
            //This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            //Adds a class of eachBtn to our button along with some bootstrap css styling
            a.addClass("row eachBtn mx-2 my-2 shadow text-uppercase");
            //Adds a data-attribute
            a.attr("data-name", animals[i]);
            //Provides the button text
            a.text(animals[i]);
            //Adds the buttons to the DOM via the buttons-view div
            $("#buttons-view").append(a);
        }; //end of loop
    }; //end of createButtons function

    // This displayQueryInfo function creates the HTML in which to display the api query content
    function displayQueryInfo() {
        //Shows or "unhides" the line in the html with the id="instrx"
        $("#instrx").show();
        //Defines topic equal to the specific button in the animal array that the user has clicked
        var topic = $(this).attr("data-name");

        //**** This line returns an object array as expected & works but is not random
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=fCcSrayPKQOER3lhOq7le6eYVZeR3Ls3&limit=10&rating=G";

        //*** This line does not return an array and does not work but I would like to figure it out so that my results can be random
        //var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=fCcSrayPKQOER3lhOq7le6eYVZeR3Ls3&tag=" + topic + "&rating=G&limit=10";

        //Creates an AJAX call for the specific item button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //Shows the response from the query in the console log
            console.log(response);
            //loops through the response array
            for (var i = 0; i < animals.length; i++) {
                //Creates a div to hold the response (gifs and rating)
                var resultsDiv = $("<div class='animal text-uppercase'>");
                //Stores the rating data
                var rating = response.data[i].rating;
                //Stores the still image from Giphy Query Results
                var stillGifs = response.data[i].images.fixed_height_still.url;
                //Stores the animated image from Giphy Query Results
                var animatedGifs = response.data[i].images.fixed_height.url;
                //Creates an image element and assigns attributes
                var image = $("<img>").attr("src", stillGifs);
                //Adds more image attributes to handle still and animate
                image.attr("data-still", stillGifs);
                image.attr("data-animate", animatedGifs);
                image.attr("data-state", "still");
                image.attr("id", "img" + i);
                //Adds class to the images
                image.addClass('gifs');
                //Appends the images to the html element
                resultsDiv.append(image);
                //Creates an element in which to display the rating
                var pOne = $("<p>").text("Rating: " + rating);
                //Adds class to first paragraph (pOne)
                pOne.addClass('rating');
                //Displays the rating
                resultsDiv.append(pOne);
                //Places the new results above the previous 
                $("#results-view").prepend(resultsDiv);
            }; //end of loop
        }); //end of response function
    }; //end of displayQueryInfo function

    //Adds functionality when the user clicks on the button which has and id of userChoice and value (text) of 'click to add'
    $("#userChoice").on("click", function (event) {
        //Prevents the page from refreshing when the button is clicked
        event.preventDefault();
        //Stores the input from the textbox and trims any unnecessary spaces
        var userInput = $("#user-input").val().trim();
        //Adds topic from the textbox to our array
        animals.push(userInput);
        //Calls (invokes) the createButtons function which will display our animal array buttons
        //and also the new button(s) generated by the user's input
        createButtons();
    }); //end of event listener

    //Adds a click event listener to all elements with a class of "eachBtn"
    $(document).on("click", ".eachBtn", displayQueryInfo);

    //Calls (invokes) the createButtons function which will display our animal array buttons
    createButtons();

    //Adds a listener for all elements with class of "gif"
    $(document).on("click", ".gifs", animate);

    //Adds functionality so that the gif will animate when clicked and return back to still when clicked again
    function animate() {
        //When a particular array button is clicked assign it to the variable 'pic'
        var pic = $(this).attr("id");
        //The pic is equal to any text requested (rating) and the images requested from the response 
        pic = "#" + pic;
        //Stores the 'data-state' attribute of the gifs in the variable 'state'
        var state = $(pic).attr("data-state");
        //if else statement - if the data-state of the gif is still before the user clicks on it...
        if (state === "still") {
            //...then replace the pic source with the pic that has the attribute of data-animate...
            $(pic).attr("src", $(pic).attr("data-animate"));
            //and assign the new source with the data-state of animate
            $(pic).attr("data-state", "animate");
        } else { //else if the state of the gif is not still before the user clicks on it...
            //...then replace the pic source with the pic that has the attribute of data-still...
            $(pic).attr("src", $(pic).attr("data-still"));
            //and assign the new source with the data-state of still
            $(pic).attr("data-state", "still");
        }; //end of if/else statement
    }; //end of animate function

}); //end of document.ready function