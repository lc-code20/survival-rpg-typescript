"use strict";
exports.__esModule = true;
exports.Item = void 0;
var Item = /** @class */ (function () {
    function Item(name, healthBoost) {
        this.name = name;
        this.healthBoost = healthBoost;
    }
    Item.prototype.displayInfo = function () {
        console.log(this.name + " increases your health by " + this.healthBoost + "!");
    };
    Item.prototype.getHealthEffect = function () {
        return this.healthBoost;
    };
    Item.prototype.getName = function () {
        return this.name;
    };
    return Item;
}());
exports.Item = Item;
