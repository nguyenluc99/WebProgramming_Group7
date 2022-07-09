var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("=========================")
  console.log(req.body['user']);
  console.log(req.body.pass);
  console.log("=========================")
  res.send('respond with a resource');
});

module.exports = router;
