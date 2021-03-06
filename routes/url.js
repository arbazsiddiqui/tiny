var redis = require('redis');
var client = redis.createClient();
var express = require('express');
var router = express.Router();
client.on("error", function (err) {
  console.log("Error " + err);
});

function generateHash() {
  var hash = "";
  var possible = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
  for (var i = 0; i < 5; i++)
    hash += possible.charAt(Math.floor(Math.random() * possible.length));
  return hash;
}

router.post('/createUrl', function(req, res) {
  var hashedUrl = generateHash();
  var url = req.body.url;
  client.set(hashedUrl, url);
  data = {
    "url": "ti.ny/" + hashedUrl
  };
  return res.json(data);
});

router.get('/getUrl/:url', function(req, res) {
  var url = req.params.url;
  client.get(url, function(err, reply) {
    if (reply != null) {
      return res.json(reply)
    } else {
      res.send('Not found');
    }
  });
});

module.exports = router;