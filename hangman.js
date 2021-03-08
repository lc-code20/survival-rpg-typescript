"use strict";
exports.__esModule = true;
exports.Hangman = void 0;
var readlineSync = require("readline-sync");
var Hangman = /** @class */ (function () {
    function Hangman(word, lives) {
        this.word = word;
        this.lives = lives;
    }
    Hangman.prototype.getOutput = function (word, guesses) {
        var formattedWord = "";
        for (var _i = 0, word_1 = word; _i < word_1.length; _i++) {
            var letter = word_1[_i];
            if (guesses.includes(letter)) {
                formattedWord += letter + " ";
            }
            else {
                formattedWord += "_ ";
            }
        }
        return "Guess the word: " + formattedWord + "\n";
    };
    Hangman.prototype.processGuess = function (word, guess, guesses) {
        if (!guesses.includes(guess)) {
            guesses.push(guess);
            return this.getOutput(word, guesses);
        }
        return "You have already guessed that letter! Try again.";
    };
    Hangman.prototype.isRoundWon = function (word, guesses) {
        return !word.split('').find(function (letter) { return !guesses.includes(letter); });
    };
    Hangman.prototype.isRoundLost = function (word, guesses) {
        var incorrectGuesses = guesses.filter(function (letter) { return !word.includes(letter); });
        return !(this.lives - incorrectGuesses.length);
    };
    Hangman.prototype.main = function () {
        var _this = this;
        var playerGuesses = [];
        console.log("Guess the " + this.word.length + " letter word to defeat it.");
        console.log(this.getOutput(this.word, playerGuesses));
        while (true) {
            var playerGuess = readlineSync.question(">");
            if (playerGuess.length != 1) {
                console.log("Error! Can only guess one letter at a time!");
            }
            else {
                console.log(this.processGuess(this.word, playerGuess, playerGuesses));
                if (this.isRoundWon(this.word, playerGuesses)) {
                    console.log("You won!");
                    break;
                }
                else if (this.isRoundLost(this.word, playerGuesses)) {
                    console.log("You lost!");
                    break;
                }
            }
        }
        var damage = playerGuesses.filter(function (letter) { return !_this.word.includes(letter); }).length;
        return damage;
    };
    return Hangman;
}());
exports.Hangman = Hangman;
