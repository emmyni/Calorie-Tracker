let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nszw2025*",
  database: 'calories'
});

/*
<script
src="https://code.jquery.com/jquery-3.3.1.min.js"
integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
crossorigin="anonymous"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script src="app.js"></script>

let foodInput = document.querySelector('#item-name').value;
let calorieInput = document.querySelector('#item-calories').value;
*/
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
  console.log(app.document.querySelector('#item-name').value);

  var sql = util.format("INSERT INTO apr19 (food,calorie,id) VALUES (%s,%s,%i)",document.querySelector('#item-name').value,document.querySelector('#item-calories').value, 2);

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});