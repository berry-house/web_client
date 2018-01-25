var express = require('express');
var reload = require('reload');
var mysql = require('mysql');

var app = express();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'a01631731',
  database: 'berry_house'
});

connection.connect();

app.set('port', process.env.PORT || 3000 );
app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.locals.siteTitle = 'Berry House';

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/plants'));

reload(app);

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
