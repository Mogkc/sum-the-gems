var won = false;
var lost = false;
var overspending = 0;

var crystalGame = {
    newGame: function() {
        won = false;
        lost = false;
        //Create random values for this game
        this.goal = 19 + Math.floor(Math.random() * 100);
        this.spent = 0;
        this.emerald = 1 + Math.floor(Math.random() * 11);
        this.sapphire = 1 + Math.floor(Math.random() * 11);
        this.amethyst = 1 + Math.floor(Math.random() * 11);
        this.topaz = 1 + Math.floor(Math.random() * 11);
    },
    buyGem: function(gem) {
        if(gem === "emerald") {
            this.spent += this.emerald;
        } else if(gem === "sapphire") {
            this.spent += this.sapphire;
        } else if(gem === "amethyst") {
            this.spent += this.amethyst;
        } else if(gem === "topaz") {
            this.spent += this.topaz;
        }

        if(this.goal === this.spent) {
            won = true;
        } else if(this.goal < this.spent) {
            lost = true;
            overspending += this.spent - this.goal;
        }
    }   
}

var showResults = function() {
    $("#goal").text(crystalGame.goal);
    $("#spent").text(crystalGame.spent);
}

$(document).ready(function() {
    crystalGame.newGame();
    showResults();

    $(".gem").on("click", function(event) {
        crystalGame.buyGem(event.target.id);
        if(lost) {
            alert("Overspending: $" + (crystalGame.spent - crystalGame.goal));
            $("#results").append("<img src='assets/images/flawed-skull.gif'>");
            crystalGame.newGame();
        } else if(won) {
            alert("Congratulations, you get a free gem!");
            $("#results").append("<img src='assets/images/flawless-diamond.gif'>");
            crystalGame.newGame();
        }

        showResults();
    });

    //If extra time, add "I refuse" button for when the player realizes the game is unwinnable
});