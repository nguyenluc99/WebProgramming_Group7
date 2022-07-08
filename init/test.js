const {Pool, Client} = require('pg');
const ENUM = require('./../const/enum.js')
var async = require('async');

// console.log(pool);

// const connectionString = 'postgresql://macbook@0.0.0.0:5432/postgres'

function connectDB(executor, callback) {
  executor.connect();
  callback(null, "connectDB");
}

function exitDB(executor, callback) {
  executor.end();
  callback(null, "exitDB");
}

// function dropDB(executor) {
//   return new Promise((resolve, reject) => {
//     const query = "DROP DATABASE IF EXISTS " + ENUM.DB_NAME + ";";
//     console.log("QUERY IS", query);
//     executor.query(query, [], (er, re) => {
//       if (er) {
//         console.log("Error inside:", er);
//         executor.end();
//         reject(er);
//       }
//       resolve(re.command);
//     })
//   })
// }

// function createDB(executor) {
//   executor.query("CREATE DATABASE IF NOT EXISTS " + ENUM.DB_NAME, [], (er, re) => {
//     if (er) {
//       console.log("Error inside:", er);
//       callback(er, re.command);
//     }
//     callback(null, re.command);
//   })
// }

function dropTB(tbname, executor, callback) {
  executor.query('DROP TABLE IF EXISTS ' + tbname + ';')
  .then(res => {
    console.log(res.command);
    callback(null, res.command);
  })
  .catch(err => {
    console.log(err);
    callback(err, res.command);
  })
}

function createTB(tbname, executor, callback) {
  executor.query('CREATE TABLE ' + tbname + ' (a int, b text);', [], (er, re) => {
    console.log(er ? er.stack : re.command);
    if (er) {
      executor.end();
      callback(er, re.command);
    } else callback(null, re.command);
  });
}

function insert(tbname, executor, callback) {
  let cmd = "INSERT";
  for (let i = 0; i < 100; i++) {
    executor.query('INSERT INTO ' + tbname + ' VALUES($1, $2);', [i, i + '.0'], (er, re) => {
      if (er) {
        executor.end();
        callback(er, cmd);
      }
    });
  }
  console.log(cmd);
  callback(null, cmd);
}

function select(tbname, executor, callback) {
    executor.query("SELECT count(*) FROM " + tbname + ";", [], (er, re) => {
    console.log(er ? er.stack : re.command);
    if (er) {
      executor.end();
      callback(er, re.command);
    } else callback(null, re.rows);
  });
}

const tableName = 'tmp';
// Pool remain working window, while Client does not.
const pool = new Client({
  user: ENUM.DB_USERNAME,
  host: ENUM.DB_LOCAL_HOST,
  database: ENUM.DB_NAME,
  password: ENUM.DB_PASSWORD,
  port: ENUM.DB_PORT,
});
// a bit callback hell here :)
// drop(tbname, pool).then(() => {
//   create(tbname, pool).then(() => {
//     insert(tbname, pool).then(() => {
//       select(tbname, pool).then(() => {
//         pool.end();
//       })
//     })
//   })
// })

// function runAsync() {
//   async.parallel({ // not parallel
//     // doDrop: function(callback) {
//     //   drop(tbname, pool).then().catch(callback("ERROR DROP", ""));
//     // },
//     // doCreate: function(callback) {
//     //   create(tbname, pool).then().catch(callback("ERROR CREATE", ""));
//     // },
//     // doInsert: function(callback) {
//     //   insert(tbname, pool).then().catch(callback("ERROR INSERT", ""));
//     // },
//     // doSelect: function(callback) {
//     //   drop(tbname, pool).then().catch(callback("ERROR SELECT", ""));
//     // }
//   }, (error, result) => {
//     console.log('error', error);
//     console.log('result', result);
//     pool.end();
//   })
// }

// let funcList = [connectDB, dropTB, createTB, insert, select, exitDB];
// let order = [0, 1, 2, 5];

// let queue = async.queue((ord, executed) => {
//   console.log("Executing task", ord, funcList[ord]);
//   if (ord == 0 || ord == 5) {
//     funcList[ord](pool);
//   } else {
//     funcList[ord](tableName, pool);
//   }
//   const tasksRemaining = queue.length();
//   executed(null, {ord, tasksRemaining});
// }, 1);

// order.forEach((e) => {
//   console.log("Pushing ", e, funcList[e]);
//   queue.push(e, (error, {task, tasksRemaining}) => {
//     if(error){
//       console.log(`An error occurred while processing task ${task}`);
//     } else {
//       console.log(`Finished processing task ${task}. ${tasksRemaining} tasks remaining`);
//     }
//   })
// })

// queue.drain(() => {
// // pool.end();
// console.log('All items are succesfully processed !');
// })

async.series([
  function(callback) {
    connectDB(pool, callback);
  },
  function(callback) {
    dropTB(tableName, pool, callback);
  },
  function(callback) {
    createTB(tableName, pool, callback);
  },
  function(callback) {
    insert(tableName, pool, callback);
  },
  function(callback) {
    select(tableName, pool, callback);
  },
  function(callback) {
    exitDB(pool, callback);
  }
], function(err, res) {
  console.log("ERROR ARE", err);
  console.log("RESULTS ARE", res);
  if (err) throw new Error("Error in database initialization");
  console.log("DATABASE '" + ENUM.DB_NAME + "' has been initialized.");
})
