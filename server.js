var express = require('express');
var ejs = require('ejs');
var app = express();
var path = require('path');
var cors = require('cors');

app.use(cors());

// viewed at http://localhost:8080
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function(req, res) {
  return res.render('index');
});

app.listen(3000);
