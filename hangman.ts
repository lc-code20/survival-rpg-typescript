import * as readlineSync from "readline-sync";

export class Hangman {
    word: string;
    lives: number;
    constructor(word, lives) {
        this.word = word;
        this.lives = lives;
    }

    getOutput(word, guesses) {
        let formattedWord = "";
        for (let letter of word) {
            if (guesses.includes(letter)) {
                formattedWord += letter + " ";
            } else {
                formattedWord += "_ ";
            }
        }
        return `Guess the word: ${formattedWord}\n`;
    }

    processGuess(word, guess, guesses) {
        if (!guesses.includes(guess)) {
            guesses.push(guess);
            return this.getOutput(word, guesses);
        }
        return "You have already guessed that letter! Try again."
    }

    isRoundWon(word, guesses) {
        return !word.split('').find(letter => !guesses.includes(letter));
    }

    isRoundLost(word, guesses) {
        let incorrectGuesses = guesses.filter(letter => !word.includes(letter));
        return !(this.lives - incorrectGuesses.length);
    }

    main() {
        let playerGuesses = [];
        console.log(`Guess the ${this.word.length} letter word to defeat it.`);
        console.log(this.getOutput(this.word, playerGuesses));
        while (true) {
            var playerGuess = readlineSync.question(">");
            if (playerGuess.length != 1) {
                console.log("Error! Can only guess one letter at a time!")
            } else {
                console.log(this.processGuess(this.word, playerGuess, playerGuesses));
                if (this.isRoundWon(this.word, playerGuesses)) {
                    console.log("You won!");
                    break;
                } else if (this.isRoundLost(this.word, playerGuesses)) {
                    console.log("You lost!");
                    break;
                }
            }
        }
        let damage = playerGuesses.filter(letter => !this.word.includes(letter)).length;
        return damage;
    }
}
