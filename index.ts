import * as readlineSync from "readline-sync";
import {Player} from "./player.js";
//import {run} from "./hangman.js";
import {Level} from "./level.js";
import {Item} from "./item.js";

/*
const readline = readlineSync.createInterface({
	input: process.stdin,
	output: process.stdout,
});
*/

var player = new Player();
var lobbyOptions = `\n1: Explore \n2: Inventory \n3: Player Status\nQ: Quit Game\n`;
var inventoryOptions = `\n1: Use item \n2: Back to menu\n`;
var level = new Level("Level 1", "Easy level.", player);
/* Initialise player name
readline.question(`Game Start \nEnter your name: `, (answer) => {
  player.setName(answer);
  menu();
});
*/

// offer options 1: Explore 2: Inventory 3: Player Status
function menu(){
  //console.log(`Welcome ${player.getName()}`);

    let menuOption = readlineSync.question(`\nMenu\nChoose your option:${lobbyOptions}`);

    switch(menuOption){
      case '1': 
        explore(); // game/explore
        break;
      case '2': 
        inventoryMenu();
        break;
      case '3': 
        printPlayerStatus();
        break;
      case 'Q':
      case 'q':
        console.log("You have quit the game");
        break;
      default: 
        console.log("You have logged an invalid value");
        menu();
    }
}

function explore(){
  let count = 0;
  console.log(level.getIntro());

  game: while (player.health > 0) {
	console.log("Move using 'WASD' keys.\n");
	player.inputMovevement();
	let outcome = level.getOutcome(player.position, player.health);
	player.takeDamage(outcome["damage"]);
	player.addToInventory(outcome["newItem"]);
	player.checkInventory();
    }


  console.log("end of lvl, returned to lobby/index file");
  menu();
}

function inventoryMenu(){
  console.log(`\nInventory`);
  player.checkInventory();

  let inventoryOption = readlineSync.question(`Choose your option: ${inventoryOptions}`);
  switch(inventoryOption){
    case '1': 
      playerUseItem(); // use item
      break;
    default: 
      //menu();
      return;
  }
}

function printPlayerStatus(){
  console.log(``);
  player.checkStatus();
  menu();
}

function playerUseItem(){
  console.log("yet to be implemented");
  inventoryMenu();
}

menu();