// modal event listener
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
    // global variables for modal
    var modal = document.getElementById("ageModal");
    var verifyBtn = document.getElementById("ageBtn");
    var spanClose = document.getElementById("close");

    // open modal
    verifyBtn.onclick = ageVerify()
    // age verifying function
    function ageVerify() {
        var not21;
        not21 = Number(document.getElementById("age").value);
        if (not21 < 21) {
            window.location.replace("https://www.reddit.com/r/DrinkingGames/comments/efwv59/non_alcoholic_drinks_for_drinking_games/");
        } else {
            function letsDrink();
        }
    }
