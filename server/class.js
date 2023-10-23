class Grass {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.multiply = 0;
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
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  mul() {
    this.multiply++;
    var newCell = random(this.chooseCell(0));
    if (this.multiply >= 8 && newCell) {
      var newGrass = new Grass(newCell[0], newCell[1], this.index);
      grassArr.push(newGrass);
      matrix[newCell[1]][newCell[0]] = 1;
      this.multiply = 0;
    }

  }
}

class GrassEater {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.energy = 16;
    this.index = index;
    this.multiply = 0;
    this.directions = [
    ];

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
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  mul() {
    this.multiply++;
    var newCell = random(this.chooseCell(0));
    if (this.multiply >= 8 && newCell) {
      var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
      grassEaterArr.push(newGrassEater);
      matrix[newCell[1]][newCell[0]] = 2;
      this.multiply = 0;
    }
  }
  move() {
    this.energy--;
    var newCell = random(this.chooseCell(0));
    if (newCell) {
      var x = newCell[0];
      var y = newCell[1];
      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
    }
    if (this.energy < 0) {
      this.die();
    }

  }
  die() {
    matrix[this.y][this.x] = 0;
    for (var i in grassEaterArr) {
      if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
        grassEaterArr.splice(i, 1);
        break;
      }
    }
  }
  eat() {
    var newCell = random(this.chooseCell(1));
    if (newCell) {
      var x = newCell[0];
      var y = newCell[1];
      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
      this.energy++;
      this.mul();
      for (var i in grassArr) {
        if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
          grassArr.splice(i, 1);
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
      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
      for (var i in dieArr) {
        if (x == dieArr[i].x && y == dieArr[i].y) {
          dieArr.splice(i, 1);
          this.die();
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

class Predator {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.energy = 9;
    this.multiply = 0;
    this.index = index;
    this.directions = [];
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
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  mul() {
    this.multiply++;
    this.energy++;
    var newCell = random(this.chooseCell(0));
    if (this.multiply >= 8 && newCell) {
      var newPredator = new Predator(newCell[0], newCell[1], this.index);
      grassArr.push(newPredator);
      matrix[newCell[1]][newCell[0]] = 3;
      this.multiply = 0;
    }
  }
  move() {
    var newCell = random(this.chooseCell(0));
    if (newCell) {
      var x = newCell[0];
      var y = newCell[1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
    }
  }
  die() {
    for (var i in predatorArr) {
      if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
        predatorArr.splice(i, 1);
        matrix[this.y][this.x] = 0;
        break;
      }
    }
  }
  eat() {
    /*var newCell = random(this.chooseCell(2));
    if (newCell) {
        var x = newCell[0];
        var y = newCell[1];
        matrix[y][x] = 3;
        matrix[this.y][this.x] = 0;
        this.y = y;
        this.x = x;
        for (var i in grassEaterArr) {
            if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
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
    }*/

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
      for (var i in grassEaterArr) {
        if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
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
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
      for (var i in dieArr) {
        if (x == dieArr[i].x && y == dieArr[i].y) {
          dieArr.splice(i, 1);
          this.die();
          //predatorArr.splice(i, 1);
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

class Hunter {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.energy = 7;
    this.multiply = 0;
    this.index = index;
    this.directions = [];
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
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
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
    /*var newCell = random(this.chooseCell(3));
    if (newCell) {
        var x = newCell[0];
        var y = newCell[1];
        matrix[y][x] = 4;
        matrix[this.y][this.x] = 0;
        this.y = y;
        this.x = x;
        for (var i in predatorArr) {
            if (x == predatorArr[i].x && y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
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
    }*/

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


class Die {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.multiply = 0;
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
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  mul() {
    this.multiply++;
    var newCell = random(this.chooseCell(0));
    if (this.multiply >= 20 && newCell) {
      var newDie = new Die(newCell[0], newCell[1], this.index);
      dieArr.push(newDie);
      matrix[newCell[1]][newCell[0]] = 5;
      this.multiply = 0;
    }

  }
}

