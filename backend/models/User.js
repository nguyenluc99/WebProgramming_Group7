const PG_Handler = require("../PG_API/PG_Handler");

class User {

  constructor(age) {
    this._age = age;
  }

  saySth() {
    return 'I am ' + this._age + ' years old!';
  }

  getData(dbname, target, callback) {
    const query = 'SELECT ' + target + ' from ' + dbname + ';';
    const handler = new PG_Handler();
    handler.execute(query, callback);
  }
}

module.exports = User;