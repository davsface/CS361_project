// Course: CS361 - Software Engineering I
// Student Name: Dave Huston
// Assignment: Project
// Description: Project Index

//require express, express-handlebars, and body-parser
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');

//allow app to be able to accept request bodies formatted as BOTH URL encoded query strings or JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

//set port
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6951);

app.get('/',function(req,res){
    res.render('home.handlebars');
});

app.get('/reset-table', (req, res, next) => {
    mysql.pool.query("DROP TABLE IF EXISTS history", function(err){
        if(err) {
            next(err);
            return;
        }
        var createString = "CREATE TABLE history("+
            "id INT PRIMARY KEY AUTO_INCREMENT,"+
            "name VARCHAR(255) NOT NULL,"+
            "dates VARCHAR(255) NOT NULL";
        mysql.pool.query(createString, function(err){
            if(err) {
                next(err);
                return;
            }
            mysql.pool.query('SELECT * FROM history', function(err, rows, fields){
                if(err){
                    next(err);
                    return;
                }
                res.send(rows);
            });
        });
    });
});

app.get('/query',function(req,res,next){
    var context = {};
    mysql.pool.query('SELECT * FROM history', function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        res.send(rows);
    });
});

app.post('/add-entry', (req, res, next) => {
    var payload = []
    for (key in req.body) {
        payload.push(req.body[key]);
    }
    //insert into table
    mysql.pool.query("INSERT INTO history (`name`,`dates`) VALUES (?,?)", [req.body.name,req.body.dates], function(err, result){
        if(err){
            next(err);
            return;
        }
        //get updated table
        mysql.pool.query('SELECT * FROM history', function(err, rows, fields){
            if(err){
                next(err);
                return;
            }
            //send table
            res.json(rows);
        });
    });
});
