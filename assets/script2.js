//Javascript for the cocktail API call

$(document).ready(function () {
    //JS METHODS GO WILL GO HERE
    var apiKey = "1"
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"


    function get() {
        $.ajax({
            url: "apiUrl",
            type: 'POST',
            function(data) {
                console.log(data);
            },

        });
    }































});