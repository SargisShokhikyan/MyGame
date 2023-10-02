/*var matrix = [
    [3, 0, 1, 0, 0, 0, 1, 0, 2, 5, 1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 2, 0, 3, 0, 0, 0, 0, 0, 1, 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 4, 0, 2, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 4, 0, 1, 0, 0, 1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 3, 0, 1, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];*/


function matrixGenerator(l) {
    // Local matrix
    var m = [];
    // Fill matrix
    for (var i = 0; i < l; i++) {
        m[i] = [];
        for (var j = 0; j < l; j++) {
            // Stexcel random tiv
            var rand = random(0, 100);
            // Lcnel matrix tokosayin haraberutyamb
            if (rand <= 30) {
                // Xot
                m[i][j] = 1;    
            } else if (rand > 30 && rand <= 50) {
                // Xotaker
                m[i][j] = 2;     
            } else if (rand > 50 && rand <= 60) {
                // Gishatich
                m[i][j] = 3;     
            } else if (rand > 60 && rand <= 70) {
                // Nor kerpar 1
                m[i][j] = 4;     
            } else if (rand > 70 && rand <= 80) {
                // Nor kerpar 2
                m[i][j] = 5;     
            } else {
                // Datarkutyun
                m[i][j] = 0;     
            }
        }
    }
    // Veradarcnel matrix
    return m;
}

// Haytararel global matrix popoxakan
var matrix;

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var hunterArr = [];
var dieArr = [];

var side = 30;

function setup() {
    matrix = matrixGenerator(20);
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y, 2);
                grassEaterArr.push(ge);
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y, 3);
                predatorArr.push(pr);
            }
            else if (matrix[y][x] == 4) {
                var hn = new Hunter(x, y, 4);
                hunterArr.push(hn);
            }
            else if (matrix[y][x] == 5) {
                var die = new Hunter(x, y, 5);
                dieArr.push(die);
            }
        }
    }
}


function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in hunterArr) {
        hunterArr[i].eat();
    }
    for (var i in dieArr) {
        dieArr[i].mul();
    }

}

