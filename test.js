var faker = require('faker');
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host     : 'db',
	user     : 'user',
	database : 'join_us',
	password : 'password',
	port : '3306'
});

// app.listen(3000, function () {
// 	console.log('This line is working and is from app.js copied into docker image!');
// });

connection.connect(function(err) {
if (err) {
  console.error('error connecting: ' + err.stack);
  return;
}
console.log('connected as id ' + connection.threadId);
});

connection.end();