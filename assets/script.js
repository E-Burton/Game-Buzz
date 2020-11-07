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

$(document).ready(function() {
    $("#modal1").modal({dismissible: false});
    $("#modal1").modal("open");
})

// VARIABLE DECLARATIONS for Game Questions and API's

var apiKey = "dc3b8a109d374b3399567c09cabd5e3e";
var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
var gameQuestions = [
    {
        q: "Which platform do you prefer?",
        c: ["Dreamcast", "Genesis", "GameCube", "Atari 5200"],
        src: ["https://cdn.pixabay.com/photo/2017/04/04/18/05/video-game-console-2202546__340.jpg", "https://cdn.pixabay.com/photo/2017/04/04/18/13/video-game-console-2202623__340.jpg", "https://cdn.pixabay.com/photo/2017/04/04/18/06/video-game-console-2202554__340.jpg", "https://cdn.pixabay.com/photo/2017/04/04/18/03/video-game-console-2202527__340.jpg"]
    },
    {
        q: "How do you like to eat your potatoes?",
        c: ["Mashed", "French Fries", "Potato Skins", "Baked"],
        src: ["https://media.istockphoto.com/photos/homemade-thanksgiving-garlic-mashed-potatoes-picture-id1186406905?b=1&k=6&m=1186406905&s=170667a&w=0&h=7anpkAh9DRXF3hy8vyssBEWDke9wKiBNVi8r6USBqOc=", "https://cdn.pixabay.com/photo/2015/09/05/01/05/french-fries-923687__340.jpg", "https://t3.ftcdn.net/jpg/02/45/50/44/240_F_245504412_jkRGg18QgbCIG7wrgSMJumxzLI0ib53B.jpg", "https://cdn.pixabay.com/photo/2014/11/08/17/01/baked-potato-522482__340.jpg"]
    },
    {
        q: "Which video game character would you want to have a drink with?",
        c: ["Ms. Pac-Man", "Leon", "Bowser", "Sonic"],
        src: ["https://image.shutterstock.com/image-photo/phoenix-azusa-july-18-2020-600w-1787524028.jpg", "https://cdn.pixabay.com/photo/2017/07/28/23/18/coming-soon-2550190__340.jpg", "https://image.shutterstock.com/image-photo/osaka-japan-09092019-browser-link-600w-1526701268.jpg", "https://image.shutterstock.com/image-photo/tokyo-japan-04082017-sonics-fulllength-600w-1600352524.jpg"]
    },
    {
        q: "Do you think that Carol Baskin killed her husband?",
        c: ["Yes", "No"],
        src: ["https://cdn.pixabay.com/photo/2015/01/09/07/43/yes-593834__340.jpg", "https://images.unsplash.com/photo-1547751550-b62e1c2e9770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"]
    },
    {
        q: "Pick your poison!?",
        c: ["Gin", "Rum", "Tequila", "Vodka"],
        src: ["https://cdn.pixabay.com/photo/2015/03/03/22/23/hendricks-658003__340.jpg", "https://cdn.pixabay.com/photo/2017/11/12/17/36/rum-2943237_960_720.jpg", "https://cdn.pixabay.com/photo/2017/06/21/23/58/tequila-2429114_960_720.jpg", "https://cdn.pixabay.com/photo/2016/07/13/20/59/vodka-1515544_960_720.jpg"]
    }
]

var questionTitle = $("#questionTitle");
var questionChoices = $("#questionChoices");
var startGame = $("#startGame");

var currentIndex = 0;
var userSelection = [];

// Variable declarations to evaluate drink options based on drink selected
var userDrink;
var drinksArray = [];
var drinkNames = [];
var drinkOpsEven = [];
var drinkOpsOdd = [];
var drinkSelected;

// Variable declarations to evaluate game options based on platform selected 
var dreamcast;
var genesis;
var gameCube;
var atari;
var gameOptions = [];
var gameEvenOps = [];
var gameOddOps = [];
var gameSelected;

// Adding event listener for when startGame (i.e. Let's Drink) button is clicked
startGame.on("click", function() {
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
    startGame.css("visibility", "hidden"); // Hide startGame (Let's Drink) button
    setTimeout(displayQuestions, 300); // Call function dsiplayQuestions after 1 second
});

// Display game questions and choices
function displayQuestions() {
    var currentQuestion = gameQuestions[currentIndex];
    questionTitle.text(currentQuestion.q); // Setting questionTitle content equal to current index in gameQuestions array
    questionChoices.text(""); // Setting questionChoices content to empty string
    // Creating buttons with images and caption for all answer choices for current question
    $.each(currentQuestion.c, function (index, choice) {
        var choiceButton = $("<button>");
        var buttonFigure = $("<figure>");
        var buttonImg = $("<img>");
        var figCaption = $("<figcaption>");
        choiceButton.attr("class", "waves-effect waves-light btn"); // Setting class attribute for choiceButton element
        // Setting height and width styling for buttonImg element
        buttonImg.css({
            maxHeight: "200px",
            maxWidth: "350px",
            height: "auto",
            width: "auto"
        }); 
        // Setting height, width, margin, and background styling for choiceButton element
        choiceButton.css({
            height: "300px",
            width: '500px',
            marginBottom: "8px",
            marginRight: "8px",
            backgroundColor: "black"
        })
        buttonImg.attr({
            src: currentQuestion.src[index],
            alt: "Choice Image"
        })
        // choiceButton.text(choice); // Setting content of choiceButton to display the value for the current index in gameQuestions array

        figCaption.text(choice); // Setting figCaption element text content equal to choice (i.e. index value) for current index in currentQuestions.c array
        buttonFigure.append(buttonImg); // Append buttonImg element to buttonFigure element
        buttonFigure.append(figCaption); // Append figCaption element to buttonFigure element
        choiceButton.append(buttonFigure); // Append buttonFigure element to choiceButton
        questionChoices.append(choiceButton); // Append choiceButton element to HTML document

        // When choiceButton is clicked for current question save text value of button in userSelection array
        choiceButton.on("click", function () {
            userSelection.push($(this).text());
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
        // Set var userDrink equal to value for index 4 in userSelection array (i.e. question five for alchol choice)
        userDrink = userSelection[4];
        // API call to retrive list of cocktails based on userDrink selection
        $.ajax({
            url: apiUrl + userDrink,
            success: function (data) {
                console.log(data);
                drinksArray = data.drinks; // Store value of data.drinks in array drinksArray
                console.log(drinksArray);
                pullDrinks(); // Call function pullDrinks
            }
        })
        gameEnded(); // Call function gameEnded once all questions have been displayed
    }
}

// Create function called pullDrinks
function pullDrinks() {
    // For each index of drinksArray push drink name (strDrink) to drinkNames array
    for (i = 0; i < drinksArray.length; i++) {
        drinkNames.push(drinksArray[i].strDrink);
    }

    // For each index in the array drinkNames
    for (i = 0; i < drinkNames.length; i++) {
        // If the remainder for index divided by 2 is 0
        if (i % 2 === 0) {
            drinkOpsEven.push(drinkNames[i]); // Then push value of index in drinkNames to array drinkOpsEven
        } else {
            drinkOpsOdd.push(drinkNames[i]); // Else, push value of index in drinkNames to array drinkOpsOdd
        }
    }

    // If index 3 of array userSelection is equal to Yes 
    if (userSelection[3] === "Yes") {
        // Set value of var drinkSelected equal to random value from drinkEvenOps array
        drinkSelected = drinkOpsEven[Math.floor(Math.random() * drinkOpsEven.length)];
    } else {
        drinkSelected = drinkOpsOdd[Math.floor(Math.random() * drinkOpsOdd.length)]; // Else (i.e. if answer is No), set value of var drinkSelected to random value from drinkOddOps
    }
}

// Create function called gameEnded
function gameEnded() {
    console.log(userSelection);

    // // API call to retrive list of cocktails based on userDrink selection
    // $.ajax({
    //     url: apiUrl + userDrink,
    //     success: function (data) {
    //         console.log(data);
    //         drinksArray = data.drinks; // Store value of data.drinks in array drinksArray
    //         console.log(drinksArray);
    //         pullDrinks(); // Call function pullDrinks
    //     }
    // })

    // If index 0 of userSelection array is equal to respective game platform, then set var gameOptions equal to respective game platform array
    if (userSelection[0] === "Dreamcast") {
        for (i = 0; i < dreamcast.length; i++) {
            gameOptions.push(dreamcast[i].name);
        }
    } else if (userSelection[0] === "Genesis") {
        for (i = 0; i < genesis.length; i++) {
            gameOptions.push(genesis[i].name);
        }
    } else if (userSelection[0] === "GameCube") {
        for (i = 0; i < gameCube.length; i++) {
            gameOptions.push(gameCube[i].name);
        }
    } else if (userSelection[0] === "Atari 5200") {
        for (i = 0; i < atari.length; i++) {
            gameOptions.push(atari[i].name);
        }
    }

    // For each index in the array gameOptions 
    for (i = 0; i < gameOptions.length; i++) {

        // If the remainder for index divided by 2 is 0
        if (i % 2 === 0) {
            gameEvenOps.push(gameOptions[i]); // Then push value of index in gameOptions to array gameEvenOps
        } else {
            gameOddOps.push(gameOptions[i]); // Else (i.e. if index is odd), push value of index in gameOptions to array gameOddOps
        }
    }

    // If index 3 of array userSelection is equal to Yes 
    if (userSelection[3] === "Yes") {
        // Set value of var gameSelected equal to random value from gameEvenOps array
        gameSelected = gameEvenOps[Math.floor(Math.random() * gameEvenOps.length)]; 
        // Set value of var drinkSelected equal to random value from drinkEvenOps array
        // drinkSelected = drinkOpsEven[Math.floor(Math.random() * drinkOpsEven.length)];
    } else {
        gameSelected = gameOddOps[Math.floor(Math.random() * gameOddOps.length)]; // Else (i.e. if answer is No), set value of var gameSelected equal to random value from gameOddOps array
        // drinkSelected = drinkOpsOdd[Math.floor(Math.random() * drinkOpsOdd.length)]; // Else (i.e. if answer is No), set value of var drinkSelected to random value from drinkOddOps
    }

    console.log(gameOptions);
    console.log(drinkNames);
    console.log(gameEvenOps);
    console.log(gameOddOps);
    console.log(drinkOpsEven);
    console.log(drinkOpsOdd);
    console.log(drinkSelected);
    console.log(drinkNames.length)
    console.log(drinkOpsEven.length);
    console.log(drinkOpsOdd.length);

    questionTitle.text("You've finished!"); // Set text value of questionTitle element equal to 'You've finished!'
    questionChoices.text("Your game is: " + gameSelected + " and your cocktail is: " + drinkSelected); // Set value of questionChoice element equal to gameSelected and drinkSelected
}

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
