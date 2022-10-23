var express = require('express');
var router = express.Router();
var response = require('./indexResponse');

router.get('/', function(req, res, next) {
  res.respond(response.IndexResponse());
});

module.exports = router;
