const PG_Handler = require("../PG_API/PG_Handler_dev");
const async = require('async');

let handle = new PG_Handler();

let users = [
  {'username' : "admin", 'password': "admin"},
  {'username' : "ad1", 'password': "ad1"},
  {'username' : "ad2", 'password': "ad2"},
  {'username' : "viet", 'password': "viet1"},
  {'username' : "luc", 'password': "luc"}
] 
let ses = {};

function initUser(session, handler, allUsers, callback) {
  const tbname = 'users';
  async.series([ (cb) => {
    if (!session['connection']) {
      handler.connectDB(session, cb);
    } else cb(null, "Use previous connection");
  }, (cb) => {
    handler.dropTB(tbname, session['connection'], cb);
  }, (cb) => {
    session['connection'].query('CREATE TABLE ' + tbname + ' (username text, password text);', [], (er, re) => {
      console.log(er ? er.stack : re.command);
      if (er) {
        session['connection'].end();
        cb(er, re.command);
      } else cb(null, re.command);
    });
  }, (cb) => {
    const que = "INSERT INTO " + tbname + " VALUES($1, $2);"
    async.map(allUsers, (u, next) => {
      session['connection'].query(que, [u['username'], u['password']], (er, re) => {
        if (er) next(er, "INSERT users error at " + u['username']);
        else next(null, re.command);
      });
    }, (err, res) => {
      if (err) cb(err, "INSERT ERROR:" + res);
      else cb(null, res);
    })
  }, (cb) => {
    handler.exitDB(session, cb);
  }], (er, re) => {
    console.log("INIT USERS DONE!!");
    console.log(er, re);
  })
 //  async.map(allUsers, (u, cb) => {
 //    session['session'].query("INSERT INTO " + )
 //  })
}

initUser(ses, handle, users);
console.log("INIT HAS BEEN STARTED");