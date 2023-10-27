var socket = io();
var a = 400;

nowWeather = "summer";
GamaStop = undefined;

function setup() {
    //let canvas = createCanvas(matrix[0].length * side, matrix.length * side);
    createCanvas(a,a);
    background('#acacac');
    document.getElementById("weather").innerText = "Weather : "+nowWeather;
    document.getElementById("start").disabled = true;
}

function weather(weather){
    document.getElementById("weather").innerText = "Weather : "+weather;
    nowWeather = weather;
    socket.emit("Weather", nowWeather);
}

function StopGame(){
    GameStop = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("start").disabled = false;
    socket.emit("GameStop", GameStop);
}

function StartGame(){
    GameStop = false;
    document.getElementById("stop").disabled = false;
    document.getElementById("start").disabled = true;
    socket.emit("GameStop", GameStop);
}

function myDraw(matrix) {
    //console.log(matrix)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if(nowWeather == "winter"){
                    fill("white");
                } else if(nowWeather == "summer"){
                    fill("green");
                } else if(nowWeather == "spring"){
                    fill(51, 204, 51);
                } else if(nowWeather == "autumn"){
                    fill("#cc8033");
                }
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
            //console.log(a, matrix.length)
           rect(x * (a/matrix.length), y * (a/matrix.length), a/matrix.length, a/matrix.length);
        }
    }

}

socket.on('myMatrix', myDraw);

//io.on('connection', function (socket) {
//    io.sockets.emit("Weather", nowWeather);
//});

socket.on("statistics", getS);
    // socket.on("send message", function (data) { // ete clientic ban en uxarkum, dra vercnely
    // messages.push(data);
    // io.sockets.emit("display message", data); // noric uxarkely// serveric client
    // });
    //socket.on("exanak", nowWeather);
    //console.log(nowWeather);


var obj = undefined;

function getS(statistics){
    obj = JSON.parse(statistics);
}

function updateStats(){
    document.getElementById("grass").innerText = "Grass : "+obj.grassCount;
    document.getElementById("grassE").innerText = "Grass Eater : "+obj.grassEaterCount;
    document.getElementById("predator").innerText = "Predator : "+obj.PredatorCount;
    document.getElementById("hunter").innerText = "Hunter : "+obj.HunterCount;
    document.getElementById("die").innerText = "Die Object : "+obj.DieObjCount;
}