console.log("hello");
const mysql = require('mysql');
var connection = mysql.createConnection({
    host:"urgentcare.c1ssetuk2fby.us-east-1.rds.amazonaws.com",
    user:"admin",
    password:"Urgent_6",
    port:"3306",
    database:"Urgent_Care"
})

connection.connect(function(err){
    if(err){
        console.error('connection failed'+err.stack);
        return;
    }

    console.log('Connected to Database');   

});

let sql = `SELECT * FROM Patient`;
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
});

connection.end();