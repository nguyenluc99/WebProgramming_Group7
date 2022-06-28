const express = require('express');
const Customer = require('../models/Customer.js')
const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res) {
  const cus = new Customer(21, 'luc');
  console.log(cus.present());
  console.log(cus.saySth());

  res.render(indexx, {title: "ase"});
});

module.exports = router;
