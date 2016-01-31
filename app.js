var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var request = require('request');
var facebook = require('./facebook');
var cors = require('cors');
var API_KEY = 'bozeXoDhGzNfn-w5bnRhcL';
var app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));


app.get('/', function(req, res) {
  request('https://maker.ifttt.com/trigger/button_clicked/with/key/' + API_KEY, function(error, response, body) {
    res.send(body);
  })
});
app.get('/ifttt/:event/:value1?/:value2?/:value3?', function(req, res) {
  var iftttUrl = 'https://maker.ifttt.com/trigger/' + req.params.event + '/with/key/' + API_KEY + '?value1=' + (req.params.value1 || '') + '&value2=' + (req.params.value2 || '') + '&value3=' + (req.params.value3 || '');
  console.log(iftttUrl);
  request(iftttUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

facebook.init(app);

app.listen(8080, function() {
  console.log('Start listening to IFTTT requests on port 8080!');
});
