var express = require('express');
var router = express.Router();
var loginCtr = require('../controller/loginCtr');
const user = require('../user');
// 'use strict';
// const util = require('util');

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Expresssss' });
});


router.post('/login', function(req, res, next) {
  const account = {
    'user' : req.body.user,
    'pass': req.body.pass
  }
  loginCtr.login(account, (er, re) => {
    console.log("Login router: ", er, re);
    if (er) res.send({
      "success": false,
      "error": er
    })
    else res.send({
      "success": true,
      "token": user.token
    });
  })
});


router.post('/getSessionInfos', function(req, res, next){
  loginCtr.getSessionInfos((er, re) => {
    console.log(er, re);
    res.send('index');
  });
});


router.post('/logout',(req, res) => {
  loginCtr.logout(() => {
    res.redirect('/');
  })
});


module.exports = router;
