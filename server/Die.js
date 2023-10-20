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
    mul() {
        this.multiply++;
        this.energy++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 8 && newCell) {
            var newHunter = new Hunter(newCell[0], newCell[1], this.index);
            hunterArr.push(newHunter);
            matrix[newCell[1]][newCell[0]] = 4;
            this.multiply = 0;
        }
    }
}