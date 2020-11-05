// VARIABLE DECLARATIONS

var apiKey = "dc3b8a109d374b3399567c09cabd5e3e";
var gameQuestions = [
    {q: "Which platform do you prefer?",
     c: ["Dreamcast", "Genesis", "GameCube", "Atari"]},
    // {q: "What is your shoe size?",
    //  c: textinput},
    {q: "How do you like to eat your potatoes?",
     c: ["Mashed", "French Fries", "Potato Skins", "Baked"]},
    {q: "Which video game character would you want to have a drink with?", 
     c: ["Ms. Pac-Man", "Leon", "Bowser", "Sonic"]},
    {q: "Which alcohol do you like in your cocktails?",
     c: ["Gin", "Rum", "Tequila", "Vodka"]}
]

var dreamcast;
var genesis; 
var gameCube;
var atari;

var questionTitle = $("#questionTitle");
var questionChoices = $("#questionChoices");

var currentIndex = 0;
var userSelection = [];

// API Call to list all genres available
// $.ajax({
//     url: "https://api.rawg.io/api/genres?key=" + apiKey,
//     success: function (data) {
//         console.log(data);
//     }
// })


// API call to retrieve platforms and save array of games for selected platform in respective array variable
$.ajax({
    url: "https://api.rawg.io/api/platforms?key=" + apiKey,
    success: function (data) {
        console.log(data);
        dreamcast = data.results[45].games;
        genesis = data.results[40].games;
        gameCube = data.results[22].games;
        atari = data.results[33].games;
    }
})

// Display game questions and choices
function displayQuestions() {
    var currentQuestion = gameQuestions[currentIndex];
    questionTitle.text(currentQuestion.q); // Setting questionTitle content equal to current index in gameQuestions array
    questionChoices.text(""); // Setting questionChoices content to empty string
    // Creating buttons for all answer choices for current question
    $.each(currentQuestion.c, function(index, choice) {
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
        questionTitle.text("What is your shoe size?");
        questionChoices.text("");
        questionChoices.attr("class", "row input-field col s6");

        var inputIcon = $("<i>");
        var input = $("<input>");
        var enterButton = $("<button>");
        
        inputIcon.attr("class", "material-icons prefix");
        inputIcon.text("directions_walk");
        questionChoices.append(inputIcon);

        input.attr({
            id: "icon_prefix",
            type: "text",
            placeholder: "Shoe Size",
        });
        input.css({
           "width": "85px",
           "margin-right": "8px"
        });
        questionChoices.append(input);
        
        enterButton.attr({
            class: "btn waves-effect waves-light",
            type: "submit",
            name: "action"
        })

        enterButton.text("Enter");
        questionChoices.append(enterButton);
        enterButton.on("click", function(){
            // userSelection.push($(this).sibling.text()); 
            // console.log(userSelection);
            gameEnded();
        });
    }
}

function gameEnded() {
    questionTitle.text("You've finished!");
    questionChoices.text("Your game and cocktail are: ...");
}

displayQuestions();

// STEPS:
// Narrow down by genre
// Randomly generate game from options
// Create/Add image to buttons for questions
