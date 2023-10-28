var express = require("express");
var app = express();

app.use(express.static("../client"));

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});

var fs = require('fs');
const grassEater = require("./grassEater.js");
var file = "statisticsGame.json";
//fs.appendFileSync(file, "Hello world\n");

Grass = require("./grass.js");
GrassEater = require("./grassEater.js");
Predator = require("./predator.js");
Hunter = require("./hunter.js");
Die = require("./Die.js");
random = require("./random");

function matrixGenerator(l) {
    // Local matrix
    m = [];
    // Fill matrix
    for (var i = 0; i < l; i++) {
        m[i] = [];
        for (var j = 0; j < l; j++) {
            // Stexcel random tiv
            // var rand = random(0, 100);
            // // Lcnel matrix tokosayin haraberutyamb
            // if (rand <= 30) {
            //     // Xot
            //     m[i][j] = 1;
            // } else if (rand > 30 && rand <= 50) {
            //     // Xotaker
            //     m[i][j] = 2;
            // } else if (rand > 50 && rand <= 60) {
            //     // Gishatich
            //     m[i][j] = 3;
            // } else if (rand > 60 && rand <= 70) {
            //     // Nor kerpar 1
            //     m[i][j] = 4;
            // } else if (rand > 70 && rand <= 80) {
            //     // Nor kerpar 2
            //     m[i][j] = 5;
            // } else {
            //     // Datarkutyun
            //     m[i][j] = 0;
            // }
            m[i].push(0)
        }
    }
    return m;
}

const a = 20;

grassArr = [];
grassEaterArr = [];
predatorArr = [];
hunterArr = [];
dieArr = [];

side = 30;

//let k = Math.floor(Math.random()* a)
function fillC(count ,character){
    let p = 0;
    while (p < count) {
        
        //let l = Math.floor(Math.random()* a)
        let k = Math.floor(random(a))
        let l = Math.floor(random(a))
        if(matrix[k][l] == 0){
            matrix[k][l] = character;
        }
        p++;
    }
}

matrix = matrixGenerator(a);
//fillC(200,1);
//fillC(10,5);
fillC(Math.floor(Math.random()* a),5);
fillC(Math.floor(Math.random()* a),4);
fillC(Math.floor(Math.random()* a),3);
fillC(Math.floor(Math.random()* a + 20),2);
fillC(Math.floor(Math.random()* a + 50),1);


function createObj(){
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
                var die = new Die(x, y, 5);
                dieArr.push(die);
            }
        }
    }
}


function start(){
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

    io.sockets.emit("myMatrix", matrix);
    gameStatistics = {
        grassCount : grassArr.length, 
        grassEaterCount : grassEaterArr.length,
        PredatorCount: predatorArr.length,
        HunterCount: hunterArr.length,
        DieObjCount: dieArr.length
    };
    
    /*fs.writeFileSync(file, JSON.stringify(
        { 
            
        }
    ));*/
    fs.writeFileSync(file,JSON.stringify(gameStatistics));
    //io.sockets.emit("statistics", gameStatistics);
}

//fps = 500;
//t = 500; //timer
createObj();
intervalID = setInterval(start, 300);
setInterval(sendInfo, 2000);

function sendInfo(){
    text = fs.readFileSync("statisticsGame.json").toString();
    io.sockets.emit("statistics", text);
}

function serverGameStop(serverGameStop){
    if(serverGameStop){;
        clearInterval(intervalID);
        //clearTimeout(intervalID);
        //intervalID._repeat = 0;
        //intervalID._idleTimeout = 0;
        //intervalID._destroyed = true;
        intervalID = null;
    } else {
        clearInterval(intervalID);
        intervalID = setInterval(start, 200);
    }
}

function changeWeather(nowWeather){
    if(nowWeather == "winter"){
        clearInterval(intervalID);
        intervalID = null;
        intervalID = setInterval(start, 1000);
        //console.log(intervalID);
        for (var i in grassEaterArr) {
            grassEaterArr[i].energy -= 7;
        }
        for (var i in predatorArr) {
            predatorArr[i].energy -= 10;
        }
        for (var i in hunterArr) {
            hunterArr[i].energy -= 10;
        } 
    }
    if(nowWeather == "spring"){
        clearInterval(intervalID);
        intervalID = null;
        intervalID = setInterval(start, 250);
        //intervalID._repeat = 1;
        //intervalID._idleTimeout = 1;
        //console.log(intervalID);
    }
    if(nowWeather == "summer"){
        clearInterval(intervalID);
        intervalID = null;
        intervalID = setInterval(start, 100);
    }
    if(nowWeather == "autumn"){
        clearInterval(intervalID);
        intervalID = null;
        intervalID = setInterval(start, 550);
    }
}
function killGrassEater(){
    for (var i in grassEaterArr) {
        grassEaterArr[i].energy = 0;
        //grassEaterArr[i].die();
    }
}
function killPredator(){
    for (var i in predatorArr) {
        predatorArr[i].energy = 0;
    }
}
function killHunter(){
    for (var i in hunterArr) {
        hunterArr[i].energy = 0;
    } 
}
function killDieObj(){
    for (var i in dieArr) {
        dieArr[i].die();
    }
}

function killAll(){
    for (var i in grassEaterArr) {
        //grassEaterArr[i].energy = 0;
    }
    for (var i in predatorArr) {
        predatorArr[i].energy = 0;
    }
    for (var i in hunterArr) {
        hunterArr[i].energy = 0;
    } 
    for (var i in dieArr) {
        dieArr[i].die();
    }
}

io.on('connection', function (socket) {
    socket.emit("myMatrix", matrix);

    // socket.on("send message", function (data) { // ete clientic ban en uxarkum, dra vercnely
    // messages.push(data);
    // io.sockets.emit("display message", data); // noric uxarkely// serveric client
    // });
    socket.on("Weather", function (SendExanak) {
        changeWeather(SendExanak);
    });

    socket.on("GameStop", function (GameStop) {
        serverGameStop(GameStop);
    });

    socket.on("killGrassEater", function (killGrEater) {
        killGrassEater();
    });

    socket.on("killPredator", function (killPr) {
        killPredator();
    });

    socket.on("killHunter", function (killHu) {
        killHunter();
    });

    socket.on("killDieObj", function (killDie) {
        killDieObj();
    });

    socket.on("killAll", function (killAllObj) {
        killAll();
    });

});