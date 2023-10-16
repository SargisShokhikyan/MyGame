module.exports = class Hunter extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 9;
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
    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
    }
    die() {
        for (var i in hunterArr) {
            if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                hunterArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }
    }
    eat() {
        var newCell = random(this.chooseCell(2));
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            this.energy++;
            this.mul();
            for (var i in predatorArr) {
                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }

        var newCelld = random(this.chooseCell(5));
        if (newCelld) {
            var x = newCelld[0];
            var y = newCelld[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            for (var i in dieArr) {
                if (x == dieArr[i].x && y == dieArr[i].y) {
                    dieArr.splice(i, 1);
                    this.die();
                    //hunterArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
            this.energy--;
            if (this.energy < 1) {
                this.die();
            }
        }
    }
}