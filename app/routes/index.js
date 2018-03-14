let express = require('express');
let router = express.Router();
mysql = require('mysql');

router.get('/', (req, res) => {
  req.getConnection((error, conn) => {
    conn.query("SELECT id, name, (SELECT DATE_FORMAT(time, \"%Y/%m/%d %T\")) as time, lightIntensity, soilHumidity, soilTemperature, airTemperature from plant, conditions where id = plantID", (err, result, fields) => {
      if (err) throw err;
      console.log(result);
      let string = JSON.stringify(result);
      data = JSON.parse(string);

      res.render('index', {
          pageTitle : "Home",
          data : data
      });
    });
  });
});

module.exports = router;
