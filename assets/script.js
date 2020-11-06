// modal event listener
// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems, options);
//     // global variables for modal
//     var modal = document.getElementById("ageModal");
//     var verifyBtn = document.getElementById("ageBtn");
//     var spanClose = document.getElementById("close");

//     // open modal
//     verifyBtn.onclick = ageVerify()
//     // age verifying function
//     function ageVerify() {
//         var not21;
//         not21 = Number(document.getElementById("age").value);
//         if (not21 < 21) {
//             window.location.replace("https://www.reddit.com/r/DrinkingGames/comments/efwv59/non_alcoholic_drinks_for_drinking_games/");
//         } else {
//             function letsDrink();
//         }
//     }

// API & Question VARIABLE DECLARATIONS

var apiKey = "dc3b8a109d374b3399567c09cabd5e3e";
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
        q: "Do you think that Carol Baskin killed her husband?",
        c: ["Yes", "No"]
    },
    {
        q: "Pick your poison!?",
        c: ["Gin", "Rum", "Tequila", "Vodka"]
    }
]

var dreamcast;
var genesis;
var gameCube;
var atari;
var userDrink;

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
        gameEnded();
    }
}

function gameEnded() {
    $.ajax({
        url: apiUrl + userDrink,
        success: function (data) {
            console.log(data);
        }
    })

    var gameOptions;
    var gameEvenOps = [];
    var gameOddOps = [];
    var gameSelected;

    if (gameQuestions[0] === "Dreamcast") {
        gameOptions = dreamcast;
        console.log(gameOptions);
    } else if (gameQuestions[0] === "Genesis") {
        gameOptions = genesis;
        console.log(gameOptions);
    } else if (gameQuestions[0] === "GameCube") {
        gameOptions = gameCube;
        console.log(gameOptions);
    } else {
        gameOptions = atari;
        console.log(gameOptions);
    }

    for (i = 0; i < gameOptions.length; i++) {

        if (i % 2 === 0) {
            gameEvenOps.push(gameOptions[i]);
        } else {
            gameOddOps.push(gameOptions[i]);
        }
    }

    if (gameQuestions[3] === "Yes") {
        gameSelected = Math.floor(Math.random() * gameEvenOps)
    } else {
        gameSelected = Math.floor(Math.random() * gameOddOps)
    }

    questionTitle.text("You've finished!");
    questionChoices.text("Your game is: " + gameSelected + "and your cocktail is: ...");
}

displayQuestions();

// STEPS:
// Narrow down by genre
// Randomly generate game from options
// Create/Add image to buttons for questions

// function drawBackground() {
//     context.strokeStyle = '#001900';
//     for (let i = 0; i <= canvas.width / unit + 2; i += 2) {
//       for (let j = 0; j <= canvas.height / unit + 2; j += 2) {
//         context.strokeRect(0, 0, unit * i, unit * j);
//       };
//     };
//     context.strokeStyle = '#000000';
//     context.lineWidth = 2;
//     for (let i = 1; i <= canvas.width / unit; i += 2) {
//       for (let j = 1; j <= canvas.height / unit; j += 2) {
//         context.strokeRect(0, 0, unit * i, unit * j);
//       };
//     };
//     context.lineWidth = 1;
//   };
//   drawBackground();
