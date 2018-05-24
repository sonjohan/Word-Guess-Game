var game = {
    words: ['BATMAN', 'SUPERMAN', 'WONDER WOMAN', 'GREEN LANTERN', 'THE FLASH', 'AQUAMAN', 'CYBORG'],
    remaining: 8,
    wins: 0,
    defeats: 0,
    drawWord: [],
    lettersGuessed: [],
    lettersPressed: [],
    wordToGuess: '',
    userPick: '',
    playAgainStatus: true,
    letterFound: ['', 0, false],
    score: 0,
    decidedToPlay: false,
    validLetters: [/[A-Z]/, true],
    winCounter: [],

    drawMainCanvas: function () {
        return document.querySelector('#mainCanvas').innerHTML =
            '<div id="messageCanvas">' +
            '<h3>Please pick a letter, good luck!</h3>' +
            '</div>' +
            '<div>' +
            '<ul id="letters">' +

            '</ul>' +
            '</div>' +
            '<div id="scoreCanvas">' +
            '<h4>Remaining: ' + game.remaining + '</h4>' +
            '<p>Wins: ' + game.wins + '</p>' +
            '<p>Defeats: ' + game.defeats + '</p>' +
            '<p>Games played: ' + game.score + '</p>' +
            '</div>';
    },

    createWord: function () {
        game.drawWord = [];
        for (var i = 0; i < game.wordToGuess.length; i++) {
            if (game.wordToGuess.charAt(i) != ' ' && game.winCounter.indexOf(game.wordToGuess.charAt(i)) === -1) {
                game.winCounter.push(game.wordToGuess.charAt(i));
            };
            if (game.wordToGuess.charAt(i) === ' ') {
                game.drawWord.push("<li id='" + i + "' style='visibility:hidden;'>" + game.wordToGuess.charAt(i) + "</li>");
            } else {
                game.drawWord.push("<li id='" + i + "'>" + game.wordToGuess.charAt(i) + "</li>");
            };
        };
    },

    wordDraw: function () {
        document.querySelector('#letters').innerHTML = "";
        for (var j = 0; j < game.wordToGuess.length; j++) {
            document.querySelector('#letters').innerHTML += game.drawWord[j];
        };
    },

    checkWord: function () {
        game.letterFound = ['', 0];
        for (var k = 0; k < game.wordToGuess.length; k++) {
            if (game.userPick === game.wordToGuess.charAt(k)) {
                game.letterFound[0] = game.userPick;
                game.letterFound[1]++;
                game.drawWord[k] = "<li id='" + k + "' style='color:#000'>" + game.wordToGuess.charAt(k) + "</li>";
            }
        };
        return game.wordDraw();
    },

    validateLetter: function () {
        if (game.validLetters[0].test(game.userPick)) {
            game.validLetters[1] = true;
        } else {
            game.validLetters[1] = false;
        };
    },

    checkMatchedLetters: function () {
        for (var n = 0; n < game.lettersGuessed.length; n++) {
            if (game.userPick === game.lettersGuessed[n]) {
                return true;
            };
        };
        return false;
    },

    checkLettersTyped: function () {
        for (var m = 0; m < game.lettersPressed.length; m++) {
            if (game.userPick === game.lettersPressed[m]) {
                if (game.userPick === game.lettersPressed[m] && game.checkMatchedLetters()) {
                    return document.querySelector('#messageCanvas').innerHTML = '<h3 id="mainMessage">Again ' + game.userPick + '? I already said good job!</h3>';
                } else {
                    return document.querySelector('#messageCanvas').innerHTML = '<h3 id="mainMessage">Again ' + game.userPick + '? is not there!</h3>';
                };
            };
        };
        game.lettersPressed.push(game.userPick);
        if (game.wordToGuess.indexOf(game.userPick) != -1 && !game.checkMatchedLetters()) {
            game.lettersGuessed.push(game.userPick);
            if (game.letterFound[1] === 1) {
                return document.querySelector('#messageCanvas').innerHTML = '<h3 id="mainMessage">Good job, ' + game.userPick + ' was found once.</h3>';
            } else {
                return document.querySelector('#messageCanvas').innerHTML = '<h3 id="mainMessage">Good job, ' + game.userPick + ' was found ' + game.letterFound[1] + ' times</h3>';
            };
        };
        if (game.wordToGuess.indexOf(game.userPick) === -1) {
            game.remaining--;
            return document.querySelector('#messageCanvas').innerHTML = '<h3 id="mainMessage">Oops, ' + game.userPick + ' is not in there.</h3>';
        }
    },

    updateScoreCanvas: function () {
        return document.querySelector('#scoreCanvas').innerHTML =
            '<h4>Remaining: ' + game.remaining + '</h4>' +
            '<p>Wins: ' + game.wins + '</p>' +
            '<p>Defeats: ' + game.defeats + '</p>' +
            '<p>Games played: ' + game.score + '</p>';
    },

    checkWin: function () {
        if (game.lettersGuessed.length === game.winCounter.length && game.decidedToPlay) {
            game.wins++;
            game.score++;
            game.decidedToPlay = false;
            game.playAgainStatus = false;
            document.querySelector('#mainCanvas').innerHTML =
                '<div id="messageCanvas">' +
                '<h3>You Win, Congratulations!</h3>' +
                '</div>' +
                '<div id="scoreCanvas">' + game.updateScoreCanvas() + '</div>' +
                '<div id="buttons"><button>Press (P) to play again</button>';

            return true;
        } else if (game.remaining === 0) {
            game.score++;
            game.defeats++;
            game.decidedToPlay = false;
            game.playAgainStatus = false;
            document.querySelector('#mainCanvas').innerHTML =
                '<div id="messageCanvas">' +
                '<h3>You Lost, Thanks for playing!</h3>' +
                '</div>' +
                '<div id="scoreCanvas">' + game.updateScoreCanvas() + '</div>' +
                '<div id="buttons"><button>Press (P) to play again</button>';

            return true;
        } else if (game.decidedToPlay === true) {
            return false
        }
        return undefined;
    },

    playAgain: function () {
        if (game.userPick != 'P') {
            return document.querySelector('#mainCanvas').innerHTML =
                '<div id="messageCanvas">' +
                '<h3>Press (P) to play again</h3>' +
                '</div>' +
                '<div id="buttons"><button>Press (P) to play again</button>';
        }

        if (game.userPick === 'P') {
            game.remaining = 8;
            game.drawWord = [];
            game.lettersGuessed = [];
            game.lettersPressed = [];
            game.wordToGuess = '';
            game.letterFound = ['', 0, false];
            game.decidedToPlay = false;
            game.winCounter = [];
            game.playAgainStatus = true;
            document.querySelector('#mainCanvas').innerHTML =
                '<div id="mainCanvas">' +
                '<h3>Press any key to start!</h3>' +
                '</div>';
        }
    }
};

document.onkeyup = function (event) {
    game.userPick = event.key.toUpperCase();
    if (!game.decidedToPlay && game.playAgainStatus) {
        game.decidedToPlay = true;
        game.drawMainCanvas();
        game.wordToGuess = game.words[Math.floor(Math.random() * game.words.length)];
        game.createWord();
        game.wordDraw();
    } else if (game.decidedToPlay && game.playAgainStatus) {
        game.validateLetter();
        if (game.validLetters[1]) {
            game.checkWord();
            game.checkLettersTyped();
            game.updateScoreCanvas();
            game.checkWin();
        } else if (!game.validLetters[1]) {
            document.querySelector('#messageCanvas').innerHTML = '<h3 id="mainMessage">This is not a letter</h3>';
        };
    } else if (!game.decidedToPlay && !game.playAgainStatus) {
        game.playAgain();
    };
};