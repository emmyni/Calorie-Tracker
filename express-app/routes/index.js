var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/calories', {useNewUrlParser: true});
var Schema = mongoose.Schema;

/* GET home page. */
router.get('/', function(req, res, next) {
  Today.find()
    .then(function(doc) {
      res.render('index', {items: doc});
    });
});

var testSchema = new Schema({
  food: {type: String, required: true},
  calorie: {type: Number, required: true}
}, {collection: 'today'});

var Today = mongoose.model('Today', testSchema);

router.get('/get-data', function(req, res, next) {
  Today.find()
    .then(function(doc) {
      res.render('index', {items: doc});
    });
})

router.post('/insert', function(req, res, next) {
  var item = {
    food: req.body.food,
    calorie: req.body.calorie
  };

  var data = new Today(item);
  data.save();

  res.redirect('/');
});

module.exports = router;
