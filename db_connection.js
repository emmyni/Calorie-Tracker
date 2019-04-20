let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'calories'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});