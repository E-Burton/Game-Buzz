//Javascript for the cocktail API call

$(document).ready(function () {
    //JS METHODS GO WILL GO HERE
    //Need an event listener for the choice of liquor
    //Need an if/else statement for user input
    //Need to concatnate the user input to url
    //Need to Finish!!!!


    //API URL Variable
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="

    var gameQuestions = [
        {
            q: "Which platform do you prefer?",
            c: ["Dreamcast", "Genesis", "GameCube", "Atari"]
        },

        {
            q: "How do you like to eat your potatoes?",
            c: ["Mashed", "French Fries", "Potato Skins", "Baked"]
        },

        {
            q: "Which video game character would you want to have a drink with?",
            c: ["Ms. Pac-Man", "Leon", "Bowser", "Sonic"]
        },

        {
            q: "Did Carole Baskin kill her husband?",
            c: ["Yes", "No"]
        },

        {
            q: "Pick your poison!?",
            c: ["Gin", "Rum", "Tequila", "Vodka"]
        }
    ]

    var userDrink;

    var questionTitle = $("#questionTitle");

    var questionChoices = $("#questionChoices");

    var currentIndex = 0;

    var userSelection = [];



    // Display game questions and choices
    function displayQuestions() {
        var currentQuestion = gameQuestions[currentIndex];
        questionTitle.text(currentQuestion.q); // Setting questionTitle content equal to current index in gameQuestions array
        questionChoices.text(""); // Setting questionChoices content to empty string
        // Creating buttons for all answer choices for current question
        $.each(currentQuestion.c, function (index, choice) {
            var choiceButton = $("<button>");
            choiceButton.attr("class", "waves-effect waves-light btn"); // Setting class attribute for choiceButton element
            choiceButton.css("marginBottom", "4px"); // Setting bottom margin for choiceButton element
            choiceButton.text(choice); // Setting content of choiceButton to display the value for the current index in gameQuestions array
            questionChoices.append(choiceButton); // Adding choiceButton to HTML document
            questionChoices.append($("<br>"));; // Creating and appending line break between choiceButtons's

            // When choiceButton is clicked for current question save text value of button in userSelection array
            choiceButton.on("click", function () {
                userSelection.push($(this).text());
                console.log(userSelection);
                setTimeout(nextQuestion, 500); // Call function nextQuestion after 0.5 seconds
            });
        })
    }

    // Display next question once user input is stored
    function nextQuestion() {
        // If currentIndex is less than length of gameQuestions increment currentIndex by 1 and call displayQuestions function to display the next question in array
        if (currentIndex < gameQuestions.length - 1) {
            currentIndex += 1;
            displayQuestions();
        } else {
            userDrink = userSelection[4];
            gameEnded()
        }
    }

    function gameEnded() {
        $.ajax({
            url: apiUrl + userDrink,
            success: function (data) {
                console.log(data);
            },




        })
        questionTitle.text("You've finished!");
        questionChoices.text("Your game and cocktail are: ...");
    }

    displayQuestions();










});