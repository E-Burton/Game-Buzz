//Javascript for the cocktail API call

$(document).ready(function () {
    //JS METHODS GO WILL GO HERE

    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
    var ingredient = "Rum"
    //Need an event listener for the choice of liquor
    //Need an if/else statement for user input
    //Need to concatnate the user input to url
    //Need to Finish!!!!

    $.ajax({
        url: apiUrl + ingredient,
        success: function (data) {
            console.log(data);




            //var div = document.createElement("div");
            //document.getElementById("myDiv").appendChild(div);



        },


    })






















});