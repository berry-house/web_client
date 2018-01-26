var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/plants/createPlant', function(req, res){
  res.render('createPlant',{
    pageTitle : "Create Plant"
  });
});

router.post('/plants/createPlant', function (req, res) {
  var connection = req.app.get('connection');
  connection.query('INSERT INTO plant (name) VALUES (\'' + req.body['name'] + '\')', function (err, result) {
    if (err) throw err;
  });
  connection.query('INSERT INTO plant (name) VALUES (\'' + req.body['name'] + '\')', function (err, result) {
    if (err) throw err;
    connection.query('SELECT LAST_INSERT_ID()', function(err, result){
      if (err) throw err;
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      connection.query('INSERT INTO conditions (plantID, time, lightIntensity, soilHumidity, soilTemperature, airTemperature) VALUES (' + json[0]['LAST_INSERT_ID()'] + ', \'2018-01-19 01:00:00\', 5.0, 5.0, 5.0, 5.0)', function (err, result) {
        if (err) throw err;
      });
    });
  });
  res.redirect('/');
})

router.get('/plants/deletePlant/:plantid', function(req, res){
  res.render('deletePlant',{
    pageTitle : "Delete Plant"
  });
});

router.post('/plants/deletePlant/:plantid', function (req, res) {
  res.send('POST request to the homepage')
})

router.get('/plants/editPlant/:plantid', function(req, res){
  res.render('editPlant',{
    pageTitle : "Edit Plant"
  });
});

router.post('/plants/editPlant/:plantid', function (req, res) {
  res.send('POST request to the homepage')
})

module.exports = router;
