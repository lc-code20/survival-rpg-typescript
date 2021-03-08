"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.Player = void 0;
var readlineSync = require("readline-sync");
var Player = /** @class */ (function () {
    function Player(name, health) {
        if (name === void 0) { name = "Player"; }
        if (health === void 0) { health = 10; }
        this.name = name;
        this.health = health;
        this.inventory = [];
        this.position = [1, 1];
    }
    Player.prototype.inputMovevement = function () {
        console.log("Move using 'WASD' keys. i to open inventory");
        var playerMovement = readlineSync.question(">");
        switch (playerMovement) {
            case "w":
                this.move(0, -1);
                break;
            case "a":
                this.move(1, -1);
                break;
            case "s":
                this.move(0, 1);
                break;
            case "d":
                this.move(1, 1);
                break;
            case "i":
                //open item menu
                console.log("implement item menu thingy");
                this.move(0, 0);
                return;
            default:
                console.log("Error! Invalid choice!");
        }
    };
    Player.prototype.move = function (direction, movement) {
        if (direction == 0 && movement == 0) {
            return;
        }
        this.position[direction] += movement;
        if (!this.validatePosition()) {
            console.log("You are at the edge of the map. Teleporting you to a random position!");
            this.position = __spreadArray([], Array(2)).map(function () { return Math.floor(Math.random() * 4); });
        }
    };
    Player.prototype.validatePosition = function () {
        return (this.position[0] >= 0 && this.position[0] <= 3) && (this.position[1] >= 0 && this.position[1] <= 3);
    };
    Player.prototype.getHealth = function () {
        return this.health;
    };
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.setName = function (s) {
        return this.name = s;
    };
    Player.prototype.addHealth = function (amount) {
        if (typeof amount !== "undefined") {
            this.health += amount;
            console.log("You have added " + amount + " health.");
        }
    };
    Player.prototype.takeDamage = function (amount) {
        if (typeof amount !== "undefined") {
            this.health -= amount;
            console.log("You have taken " + amount + " damage.");
        }
    };
    Player.prototype.addToInventory = function (item) {
        if (typeof item !== "undefined") {
            this.inventory.push(item);
            //console.log(`${item.name} added to your inventory.`)
        }
    };
    Player.prototype.useItem = function (item) {
        if (this.inventory.indexOf(item) !== -1) {
            console.log("You do not have a " + item + ".");
        }
        else {
            this.inventory = this.inventory.filter(function (i) { return i !== item; });
            console.log("You used a " + item + ".");
        }
    };
    Player.prototype.resetInventory = function () {
        this.inventory = [];
    };
    Player.prototype.checkStatus = function () {
        console.log("Name: " + this.name + "\nHealth: " + this.health);
    };
    Player.prototype.checkInventory = function () {
        var s;
        if (this.inventory.length !== 0) {
            for (var _i = 0, _a = this.inventory; _i < _a.length; _i++) {
                var i = _a[_i];
                s += "\n" + i + " ";
            }
            ;
        }
        else {
            s = "Your inventory is empty.";
        }
        console.log("Inventory:\n------------\n" + s + "\n------------");
    };
    return Player;
}());
exports.Player = Player;
