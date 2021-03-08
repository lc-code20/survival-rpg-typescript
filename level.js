"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.Level = void 0;
var hangman_js_1 = require("./hangman.js");
var player_js_1 = require("./player.js");
var item_js_1 = require("./item.js");
var Level = /** @class */ (function () {
    function Level(name, description, items) {
        this.map = [];
        this.name = name;
        this.description = description;
        this.items = items;
        // 0 = nothing, 1 = item, 2 = monster (hangman)
        this.map = Level.generateMap();
    }
    Level.generateMap = function () {
        return __spreadArray([], Array(4)).map(function () { return Array.from({ length: 4 }, function () { return Math.floor(Math.random() * 3); }); });
    };
    Level.prototype.getOutcome = function (position, health) {
        var x = position[0];
        var y = position[1];
        var element = this.map[x][y];
        var outcome = { "newItem": undefined, "damage": undefined };
        if (element === 1) {
            console.log("You have found an item.");
            var item = this.getItem();
            outcome["newItem"] = item;
        }
        else if (element === 2) {
            console.log("You have encountered a monster.");
            var item = this.getItem();
            var hangman = new hangman_js_1.Hangman("monster", health); // need to change hardcoded word
            var hangmanDamage = hangman.main();
            outcome["damage"] = hangmanDamage;
        }
        else {
            console.log("Nothing here. Keep looking!");
        }
        return outcome;
    };
    Level.prototype.getItem = function () {
        var randomItem = this.items[Math.floor(Math.random() * this.items.length)];
        return randomItem;
    };
    Level.prototype.getIntro = function () {
        return "This level is called: " + this.name + "\n" + this.description;
    };
    return Level;
}());
exports.Level = Level;
// testing
var fish = new item_js_1.Item("Fish", 5);
var chips = new item_js_1.Item("Chips", 2);
var level = new Level("Level 1", "Easy level.", [fish, chips]);
var player = new player_js_1.Player();
// main loop
console.log(level.getIntro());
game: while (player.health > 0) {
    console.log("Move using 'WASD' keys.\n");
    player.inputMovevement();
    var outcome = level.getOutcome(player.position, player.health);
    player.takeDamage(outcome["damage"]);
    player.addToInventory(outcome["newItem"]);
    player.checkInventory();
}
