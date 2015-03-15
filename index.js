// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
//var mongojs = require('mongojs');
//var db = mongojs('contactlist', ['contactlist']);
//var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
 

//app.use(bodyParser.json()); 

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening to you on port ' + port + ' .... ');

