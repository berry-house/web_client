'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var reload = require('reload');
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var expressValidator = require('express-validator');

var app = express();

var dbOptions = {
    host: process.argv[2],
    user: process.argv[3],
    password: process.argv[4],
    port: process.argv[5],
    database: process.argv[6]
};

app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'Berry House';

app.use(expressValidator());
app.use(myConnection(mysql, dbOptions, 'pool'));
app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/plants'));
app.use(bodyParser.urlencoded({ extended: true }));

reload(app);

app.listen(app.get('port'), function () {
    console.log('Listening on port ' + app.get('port'));
});
//# sourceMappingURL=app.js.map