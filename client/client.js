var socket = io();
var a = 400;

function setup() {
    //let canvas = createCanvas(matrix[0].length * side, matrix.length * side);
    createCanvas(a,a);
    background('#acacac');
}


function myDraw(matrix) {
    console.log(matrix)
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
            console.log(a, matrix.length)
            
           rect(x * (a/matrix.length), y * (a/matrix.length), a/matrix.length, a/matrix.length);
           // rect(50,50,200,200)
        }
    }

}

socket.on('myMatrix', myDraw);


// function handleMatrix(info){
//    console.log(info)
// }