var mysql = require('mysql');
/*
var pool = mysql.createPool({
    host  : 'localhost',
    user  : 'student',
    password: 'default',
    database: 'student'
});
*/

var pool = mysql.createPool({
    host  : 'classmysql.engr.oregonstate.edu',
    user  : 'cs361_hustond',
    password: '6459',
    database: 'cs361_hustond'
});

module.exports.pool = pool;

