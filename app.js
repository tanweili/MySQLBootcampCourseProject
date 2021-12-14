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

connection.connect(function(err) {
if (err) {
  console.error('error connecting: ' + err.stack);
  return;
}
console.log('connected as id ' + connection.threadId);
});

var q = "CREATE TABLE users (email VARCHAR(100) UNIQUE, created_at TIMESTAMP DEFAULT NOW());";

connection.query(q, function (error, results, fields) {
   if (error) throw error;
   console.log(results);
});

var data = [];
for(var i = 0; i < 300; i++){
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}

var q = 'INSERT INTO users (email, created_at) VALUES ?';
 
connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

var q = "SELECT COUNT(*) FROM users;";

connection.query(q, function (error, results, fields) {
   if (error) throw error;
   console.log("COUNT(*) is:" + results[0]);
});

app.listen(3000, function () {
	console.log('This line is working and is from app.js copied into docker image!');
});

app.get("/", function(request, response) {
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function (error1, results1) {
		if (error1) throw error1;
		var count = results1[0].count;
		var p = "SELECT email AS randemail FROM users ORDER BY RAND() LIMIT 1";
		connection.query(p, function (error2, results2) {
			if (error2) throw error2;
			var randemail = results2[0].randemail;
			response.render("home", {count: count,randemail: randemail});
		});
	});
});

app.post("/register",function(request,response) {
	var person = {
		email: request.body.email
	};
	if (request.body.email === "") {
		response.redirect("/");
	}
	else {
		connection.query("INSERT INTO users SET ?", person, function(error, result) {
		if (error) throw error;
		response.redirect("/");
		});
	}
});