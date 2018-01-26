var express = require('express');
var router = express.Router();
var mysql = require('mysql');

exports.index = function(req, res){
  var connection = req.app.get('connection');
}

router.get('/', function(req, res) {
  var connection = req.app.get('connection');
  connection.query("SELECT name, time, lightIntensity, soilHumidity, soilTemperature, airTemperature from plant, conditions where id = plantID", function(err, result, fields){
    if (err) throw err;
    var string = JSON.stringify(result);
    var data = JSON.parse(string);

    res.render('index', {
      pageTitle : "Home",
      data : data
    });
  });

  //res.render('index', {
  //  pageTitle : "Home",
  //});

});

module.exports = router;
