const express = require('express');
const bodyParser = require('body-parser')
const reload = require('reload');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const expressValidator = require('express-validator');

const app = express();

var dbOptions = {
  host:	    'localhost',
	user: 	  'root',
	password: 'a01631731',
	port: 	   3306,
	database: 'berry_house'
};

app.set('port', process.env.PORT || 3000 );
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'Berry House';

app.use(expressValidator())
app.use(myConnection(mysql, dbOptions, 'pool'));
app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/plants'));
app.use(bodyParser.urlencoded({extended: true}))

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

reload(app);
