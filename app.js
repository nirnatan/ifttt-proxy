var express = require('express');
var request = require('request');
var cors = require('cors');
var API_KEY = 'bozeXoDhGzNfn-w5bnRhcL';
var app = express();

app.use(cors());

app.get('/', function(req, res) {
	res.send('init');
});

app.get('/:event/:value1?/:value2?/:value3?', function(req, res) {
  var iftttUrl = 'https://maker.ifttt.com/trigger/' + req.params.event + '/with/key/' + API_KEY + '?value1=' + (req.params.value1 || '') + '&value2=' + (req.params.value2 || '') + '&value3=' + (req.params.value3 || '');
  console.log(iftttUrl);
  request(iftttUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.listen(8080, function() {
  console.log('Start listening to IFTTT requests on port 8080!');
});
