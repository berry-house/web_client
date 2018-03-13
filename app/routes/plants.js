let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

function sleep(time) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
}

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/plants/createPlant', (req, res) => {
    res.render('createPlant',{
        pageTitle : "Create Plant"
    });
});

router.post('/plants/createPlant', (req, res) => {
    req.getConnection((error, con) => {
        con.query('INSERT INTO plant (name) VALUES (\'' + req.body['name'] + '\')', (err, result) => {
            if (err) throw err;
            con.query('SELECT LAST_INSERT_ID()', (err, result) => {
                if (err) throw err;
                let string = JSON.stringify(result);
                let json = JSON.parse(string);
                con.query('INSERT INTO conditions (plantID, time, lightIntensity, soilHumidity, soilTemperature, airTemperature) VALUES (' + json[0]['LAST_INSERT_ID()'] + ', \'2018-01-19 01:00:00\', 5.0, 5.0, 5.0, 5.0)', (err, result) => {
                    if (err) throw err;
                });
            });
        });
    });
    res.redirect('/');
});

router.get('/plants/deletePlant/:plantid', (req, res) => {
    res.render('deletePlant',{
        pageTitle : "Delete Plant"

    });
});

router.post('/plants/deletePlant/:plantid',  (req, res) => {
    req.getConnection((error, con) => {
        con.query('DELETE FROM conditions where plantID = ' + req.params.plantid + ' ;', (err, result) => {
            if (err) throw err;
        });
        con.query('DELETE FROM plant where id = ' + req.params.plantid + ' ;', (err, result) => {
            if (err) throw err;
        });
    });
    res.ok;
});

router.get('/plants/editPlant/:plantid', (req, res) => {
    res.render('editPlant',{
        pageTitle : "Edit Plant"
    });
});

router.post('/plants/editPlant/:plantid',  (req, res) => {
    req.getConnection((error, con) => {
        con.query('DELETE FROM conditions where plantID = ' + req.params.plantid + ' ;', (err, result) => {
            if (err) throw err;
        });
        con.query('DELETE FROM plant where id = ' + req.params.plantid + ' ;', (err, result) => {
            if (err) throw err;
        });
    });
});

module.exports = router;
