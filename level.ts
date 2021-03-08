import { Hangman } from "./hangman.js";
import { Player } from "./player.js";
import { Item } from "./item.js";

export class Level {
    name: string;
    description: string;
    items: string;
    map = [];
	constructor(name, description, items) {
		this.name = name;
		this.description = description;
		this.items = items;
		// 0 = nothing, 1 = item, 2 = monster (hangman)
		this.map = Level.generateMap();
	}

	static generateMap() {
		return [...Array(4)].map(() => Array.from({length: 4}, () => Math.floor(Math.random() * 3)));
	}

	getOutcome(position, health) {
		let x = position[0];
		let y = position[1];
		let element = this.map[x][y];
		let outcome = {"newItem": undefined, "damage": undefined};
		if (element === 1) {
			console.log("You have found an item.");
			let item = this.getItem();
			outcome["newItem"] = item;
		} else if (element === 2) {
			console.log("You have encountered a monster.");
			let item = this.getItem();
			let hangman = new Hangman("monster", health);  // need to change hardcoded word
			let hangmanDamage = hangman.main();
			outcome["damage"] = hangmanDamage;
		} else {
			console.log("Nothing here. Keep looking!");
		}
		return outcome;
	}

	getItem() {
        let randomItem = this.items[Math.floor(Math.random() * this.items.length)]
        return randomItem;
    }

	getIntro() {
		return `This level is called: ${this.name}\n${this.description}`;
	}
}

// testing
let fish = new Item("Fish", 5);
let chips = new Item("Chips", 2);
let level = new Level("Level 1", "Easy level.", [fish, chips]);
let player = new Player();


// main loop
console.log(level.getIntro());
game: while (player.health > 0) {
	console.log("Move using 'WASD' keys.\n");
	player.inputMovevement();
	let outcome = level.getOutcome(player.position, player.health);
	player.takeDamage(outcome["damage"]);
	player.addToInventory(outcome["newItem"]);
	player.checkInventory();
}

