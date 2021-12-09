// var faker = require('faker');
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	database : 'join_us'
});

// var q = "SELECT COUNT(*) AS 'num' FROM users;";

// connection.query(q, function (error, results, fields) {
//    if (error) throw error;
//    console.log(results);
// });

// var data = [];
// for(var i = 0; i < 500; i++){
//     data.push([
//         faker.internet.email(),
//         faker.date.past()
//     ]);
// }
 
// var q = "SELECT DATE_FORMAT(created_at,'%b %D %Y') AS 'earliest_date' FROM users ORDER BY created_at ASC LIMIT 1";
 
// connection.query(q, function(err, result) {
//   console.log(err);
//   console.log(result[0]);
// });
// connection.end();

app.get("/", function(request, response) {
	var q = 'SELECT COUNT(*) as count FROM users';
	connection.query(q, function (error, results) {
		if (error) throw error;
		var count = results[0].count;
		response.render("home", {count: count});
	});
});

app.get("/joke", function(request, response){
	var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
	response.send(joke);
});

app.get("/random_num", function(request, response){
	var num = Math.floor((Math.random() * 10) + 1);
	response.send("Your lucky number is " + num);
});

app.post("/register",function(request,response) {
	var person = {
		email: request.body.email
	};
	connection.query("INSERT INTO users SET ?", person, function(error, result) {
		if (error) throw error;
		response.redirect("/");
	});
});

app.listen(3000, function () {
	console.log('App listening on port 3000!');
});