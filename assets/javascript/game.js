

var game = {
    words: ['BATMAN', 'SUPERMAN', 'WONDER WOMAN', 'GREEN LANTERN', 'THE FLASH', 'AQUAMAN', 'CYBORG'],
    remaining: 8,
    wins: 0,
    loses: 0,
    drawWord: '',
    wordToGuess: '',
    userPick: '',
    playAgain: true,
    played: 0,
    score: 0,
    decidedToPlay: false,

    createWord: function () {
        for (var i = 0; i < game.wordToGuess.length; i++) {
            game.drawWord = game.drawWord + '<li id="' + i + '">' + game.wordToGuess.charAt(i) + '</li>';
        };
    },

    checkWord: function () {
        for (var j = 0; j < game.wordToGuess.length; j++) {

            if (game.userPick === game.wordToGuess.charAt(j)) {
                // for (var k = 0; k < game.wordToGuess.length; k++) {
                //     document.querySelector('#' + k + '').innerHTML = '<li id="' + i + '">' + game.wordToGuess.charAt(i) + '</li>'

                // };
                return game.remaining++;
            } else {
                
                return game.remaining--;
            };
        };
    }


};

document.onkeyup = function (event) {
    if (game.decidedToPlay === false) {
        game.decidedToPlay = true;
        document.querySelector('#mainCanvas').innerHTML = '<h3>press a key, good luck!</h3>' +
            '<div>' +
            '<ul id="letters">' +

            '</ul>' +
            '</div>' +
            '<div id="scoreCanvas">' +
            '<h4>Remaining: </h4>' + game.remaining +
            '<p>Wins: </p>' + game.wins +
            '<p>Loses: </p>' + game.loses +
            '<p>Games played: </p>' + game.played +
            '</div>' +
            '<div class="buttonCanvas">' +
            '<button>Play again</button>' +
            '<button>Stop Playing</button>' +
            '</div>';
        game.wordToGuess = game.words[Math.floor(Math.random() * game.words.length)];
        game.createWord();
        console.log(game.wordToGuess);
        console.log(game.drawWord);
        document.querySelector('#letters').innerHTML = game.drawWord;
    } else if (game.decidedToPlay && game.remaining > 0) {
        game.userPick = event.key.toUpperCase();
        game.checkWord();
        console.log(game.userPick);
        console.log(game.remaining);
    } else if (game.decidedToPlay && game.remaining === 0) {
        document.querySelector('#mainCanvas').innerHTML = '<h3>You loose, Thanks for playing!</h3>';
    }
};

// any key > start > pick the word > 