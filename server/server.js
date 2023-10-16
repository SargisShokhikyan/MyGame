var express = require("express");
var app = express();

app.use(express.static("../client"));

var server = require('http').createServer(app); // add
var io = require('socket.io')(server); // add

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () { // add
    console.log("Example is running on port 3000");
});