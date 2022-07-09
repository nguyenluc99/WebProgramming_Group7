const {Pool, Client} = require('pg');
const ENUM = require('./../const/enum')
var async = require('async');

class PG_Handler  {
  // connect to DB
  constructor() {
    this._conf = {
      user: ENUM.DB_USERNAME,
      host: ENUM.DB_LOCAL_HOST,
      database: ENUM.DB_NAME,
      password: ENUM.DB_PASSWORD,
      port: ENUM.DB_PORT
    };
  }

  getConfig() {
    return this._conf;
  }

  setConfig(config) {
    this._conf = config;
  }

  connectDB(session, callback) {
    session['connection'] = new Pool(this._conf);
    session['connection'].connect();
    if(callback) callback(null, "connectDB");
  }

  exitDB(session, callback) {
    session['connection'].end();
    if(callback) callback(null, "exitDB");
  }

  sendQuery(session, query, callback) {
    if (!session['connection']) callback("Connection interrupted", "");
    session['connection'].query(query, [], (err, res) => {
     if (err) 
       callback(err, "");
     else {
       if (res.command === 'SELECT')
         callback(null, {'command' : res.command, 'result': res.rows});
       else callback(null, {'command': res.command});
     }
    })
  }

  execute(transaction, exe_callback) {
    // Currently we repeat open and close connection to server whenever a new 
    // transaction is executed. We might keep the connection active for some 
    // amount of time later.
    const self = this;
    let session = {}; 

    session['connection'] = null;
    async.series([
      // connect to DB
      function(callback) {
        self.connectDB(session, callback);
      },
      // execute the transaction
      function(callback){
        self.sendQuery(session, transaction, callback);
      },
      // exit DB
      function(callback) {
        self.exitDB(session, callback);
      }
    ], exe_callback);
  }

  // // close connection to DB
  // destructor() {
  //   console.log("DESTRUCTING");
  //   this.API.end();
  // }
}

module.exports = PG_Handler;
// var handler = new PG_Handler();
// let query = 'SELECT count(*) from tmp;';
// handler.execute(query, (er, re) => {
//   console.log("STATUS:");
//   console.log(er, re);
//   if (re[1].command === 'SELECT')
//     console.log(re[1].result);
// });
// 