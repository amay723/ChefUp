var express = require('express');
var app = express();

var mysql = require('mysql');
var db  = require('./db_connection.js');

var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection(db.config);

var PORT = 8142;

var server = app.listen(PORT, function() {
    var host = server.address().address;
    var host = server.address().port;
});

con.connect(function(error) {
    if(error) console.log(error);
    else console.log("Connected, listening on Port:", PORT);
});

app.get('/AllRecipes', function(req, res){
    var query = 'select * from Recipe';
    console.log(query);
    con.query(query, function(error, rows, fields){
	if(error) console.log(error);
	else {
	    res.send(rows);
	}
    });
});

app.post('/recipeById', function(req, res){
    var id = req.body.id;
    var query = 'select * from Recipe where id = ?';
    console.log(query);
    con.query(query, [id], function(error, rows, fields){
	if(error) console.log(error);
	else {
	    res.send(rows);
	}
    });
});


app.post('/ingredientsById', function(req, res){
    var id = req.body.id;
    var query = 'select * from ingredients where Recipe_ID = ?';
    console.log(query);
    con.query(query, [id], function(error, rows, fields){
	if(error) console.log(error);
	else {
	    res.send(rows);
	}
    });
});

app.post('/stepsById', function(req, res){
    var id = req.body.id;
    var query = 'select * from Show_Steps where Recipe_ID = ?';
    console.log(query);
    con.query(query, [id], function(error, rows, fields){
	if(error) console.log(error);
	else {
	    res.send(rows);
	}
    });
});

app.get('/allDietary', function(req, res){

    var query = 'select id, Dname from recipe_test order by id';
    console.log(query);
    con.query(query, function(error, rows, fields){
	if(error) console.log(error);
	else {
	    res.send(rows);
	}
    });
});
