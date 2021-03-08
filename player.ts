import * as readlineSync from "readline-sync";
import { StringMappingType } from "typescript";

export class Player {
    name: string;
    health: number;
    inventory: Array<string>;
    position: Array<number>;
    constructor(name: string = "Player", health:number = 10) {
        this.name = name;
        this.health = health;
        this.inventory = [];
        this.position = [1, 1];
    }

    inputMovevement() {
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
                    console.log("implement item menu thingy")
                    this.move(0,0);
                    return;    
                default:
                    console.log("Error! Invalid choice!");
            }
        
    }

    move(direction:number, movement:number) {
        if(direction==0 && movement==0){
            return;
        }
        this.position[direction] += movement;
        if (!this.validatePosition()) {
            console.log("You are at the edge of the map. Teleporting you to a random position!");
            this.position = [...Array(2)].map(() => Math.floor(Math.random() * 4));
        }
    }

    validatePosition() {
        return (this.position[0] >= 0 && this.position[0] <= 3) && (this.position[1] >= 0 && this.position[1] <= 3);
    }

    getHealth() {
        return this.health;
    }

    getName() {
        return this.name;
    }

    setName(s: string) {
        return this.name = s;
    }

    addHealth(amount: number) {
        if (typeof amount !== "undefined") {
            this.health += amount
            console.log(`You have added ${amount} health.`);
        }
    }

    takeDamage(amount: number) {
        if (typeof amount !== "undefined") {
            this.health -= amount;
            console.log(`You have taken ${amount} damage.`);
        }
    }

    addToInventory(item: string) {
        if (typeof item !== "undefined") {
            this.inventory.push(item);
            //console.log(`${item.name} added to your inventory.`)
        }
    }

    useItem(item: string) {
        if (this.inventory.indexOf(item)!==-1) {
            console.log(`You do not have a ${item}.`);
        } else {
            this.inventory = this.inventory.filter(i => i !== item);
            console.log(`You used a ${item}.`);
        }
    }

    resetInventory() {
        this.inventory = [];
    }

    checkStatus() {
        console.log(`Name: ${this.name}\nHealth: ${this.health}`)
    }

    checkInventory() {
        let s: string;
        if (this.inventory.length !== 0) {
            for (var i of this.inventory) {
                s += `\n${i} `;
            };
        } else {
            s = "Your inventory is empty.";
        }
        console.log(`Inventory:\n------------\n${s}\n------------`);
    }

}