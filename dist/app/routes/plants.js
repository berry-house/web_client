'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

function sleep(time) {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {
        ;
    }
}

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/plants/createPlant', function (req, res) {
    res.render('createPlant', {
        pageTitle: "Create Plant"
    });
});

router.post('/plants/createPlant', function (req, res) {
    req.getConnection(function (error, con) {
        con.query('INSERT INTO plant (name) VALUES (\'' + req.body['name'] + '\')', function (err, result) {
            if (err) throw err;
            con.query('SELECT LAST_INSERT_ID()', function (err, result) {
                if (err) throw err;
                var string = JSON.stringify(result);
                var json = JSON.parse(string);
                con.query('INSERT INTO conditions (plantID, time, lightIntensity, soilHumidity, soilTemperature, airTemperature) VALUES (' + json[0]['LAST_INSERT_ID()'] + ', \'2018-01-19 01:00:00\', 5.0, 5.0, 5.0, 5.0)', function (err, result) {
                    if (err) throw err;
                });
            });
        });
    });
    res.redirect('/');
});

router.get('/plants/deletePlant/:plantid', function (req, res) {
    res.render('deletePlant', {
        pageTitle: "Delete Plant"

    });
});

router.post('/plants/deletePlant/:plantid', function (req, res) {
    req.getConnection(function (error, con) {
        con.query('DELETE FROM conditions where plantID = ' + req.params.plantid + ' ;', function (err, result) {
            if (err) throw err;
        });
        con.query('DELETE FROM plant where id = ' + req.params.plantid + ' ;', function (err, result) {
            if (err) throw err;
        });
    });
    res.ok;
});

router.get('/plants/editPlant/:plantid', function (req, res) {
    res.render('editPlant', {
        pageTitle: "Edit Plant"
    });
});

router.post('/plants/editPlant/:plantid', function (req, res) {
    req.getConnection(function (error, con) {
        con.query('DELETE FROM conditions where plantID = ' + req.params.plantid + ' ;', function (err, result) {
            if (err) throw err;
        });
        con.query('DELETE FROM plant where id = ' + req.params.plantid + ' ;', function (err, result) {
            if (err) throw err;
        });
    });
});

module.exports = router;
//# sourceMappingURL=plants.js.map