var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', (req, res, next) => {
  req.getConnection((error, conn) => {
    conn.query("SELECT name, time, lightIntensity, soilHumidity, soilTemperature, airTemperature from plant, conditions where id = plantID", (err, result, fields) => {
      if (err) throw err;
      var string = JSON.stringify(result);
      var data = JSON.parse(string);

      res.render('index', {
        pageTitle : "Home",
        data : data
      });
    });
  });
});

module.exports = router;
