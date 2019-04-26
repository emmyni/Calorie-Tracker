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

router.post('/', function(req, res, next) {
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

router.post('/insert', function(req, res, next) {
  var item = {
    food: req.body.food,
    calorie: req.body.calorie
  };

  var data = new Today(item);
  data.save();

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var item = {
    food: req.body.food,
    calorie: req.body.calorie
  };

  var id = req.body.id;
  console.log(id);

  Today.findById(id, function(err, doc) {
    if (err) {
      console.log('error, no entry found');
    }
    doc.food = req.body.food;
    doc.calorie = req.body.calorie;
    doc.save();
  });
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  Today.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;
