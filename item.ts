export class Item {
    name: string;
    healthBoost: number;

    constructor(name:string, healthBoost:number) {
        this.name = name;
        this.healthBoost = healthBoost;
    }

    displayInfo() {
        console.log(`${this.name} increases your health by ${this.healthBoost}!`);
    }

    getHealthEffect(){
        return this.healthBoost;
    }

    getName(){
        return this.name;
    }
}