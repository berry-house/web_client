'use strict';

var express = require('express');
var router = express.Router();
mysql = require('mysql');

router.get('/', function (req, res) {
  req.getConnection(function (error, conn) {
    conn.query("SELECT name, time, lightIntensity, soilHumidity, soilTemperature, airTemperature from plant, conditions where id = plantID", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      var string = JSON.stringify(result);
      data = JSON.parse(string);

      res.render('index', {
        pageTitle: "Home",
        data: data
      });
    });
  });
});

module.exports = router;
//# sourceMappingURL=index.js.map