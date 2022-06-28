var express = require('express');
var router = express.Router();
var loginCtr = require('../controller/loginCtr');


/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Expresssss' });
});


router.post('/login', function(req, res, next) {
  console.log(req.body);
  const account = {
    'user' : req.body.user,
    'pass': req.body.pass
  }
  console.log(req.body, account);
  loginCtr.login(account, (er, re) => {
    console.log(er, re);
    res.render('index');
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
