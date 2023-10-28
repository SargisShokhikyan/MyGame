LivingCreature  = require('./livingCreature.js')

module.exports = class Die extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    die() {
        for (var i in dieArr) {
            matrix[this.y][this.x] = 0;
            break; 
        }
    }
    mul() {
        this.multiply++;
        //var newCell = random(this.chooseCell(0));
        /*if (this.multiply >= 8 && newCell) {
            var dieArr = new Die(newCell[0], newCell[1], this.index);
            dieArr.push(dieArr);
            matrix[newCell[1]][newCell[0]] = 4;
            this.multiply = 0;
        }*/
    }
}