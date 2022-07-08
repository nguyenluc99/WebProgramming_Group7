const {Pool, Client} = require('pg');
const ENUM = require('./../const/enum.js')
var async = require('async');

function connectDB(executor, callback) {
  executor.connect();
  callback(null, "connectDB");
}

function exitDB(executor, callback) {
  executor.end();
  callback(null, null);
}

function dropDB(executor, callback) {
  const query = "DROP DATABASE IF EXISTS " + ENUM.DB_NAME + ";";
  console.log("QUERY IS", query);
  executor.query(query, [], (er, re) => {
    if (er) {
      console.log("Error DROP DATABASE:", er);
      executor.end();
      callback(er, re.command);
    } else callback(null, "DROP DATABASE");
  })
}

function createDB(executor, callback) {
  executor.query("CREATE DATABASE " + ENUM.DB_NAME, [], (er, re) => {
    if (er) {
      console.log("Error CREATE DATABASE:", er);
      callback(er, "CREATE DATABASE");
    }
    else callback(null, re.command);
  })
}

const tableName = 'tmp';
// Pool remain working window, while Client does not.
const pool = new Client({
  user: ENUM.DB_USERNAME,
  host: ENUM.DB_LOCAL_HOST,
  database: 'postgres',
  password: ENUM.DB_PASSWORD,
  port: ENUM.DB_PORT,
});

async.series([
  function(callback) {
    connectDB(pool, callback);
  },
  function(callback) {
    dropDB(pool, callback);
  },
  function(callback) {
    createDB(pool, callback);
  },
  function(callback) {
    exitDB(pool, callback);
  }
], function(err, res) {
  console.assert(!err);
  if (err) throw new Error("Error in database creation.");
  console.log("DATABASE '" + ENUM.DB_NAME + "' has been created.");
})

