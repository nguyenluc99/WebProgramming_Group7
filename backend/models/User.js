const PG_Handler = require("../PG_API/PG_Handler");

var User = {
  handler : new PG_Handler(),
  // This method can work both in case of either login or register
  // Just returning the number of user found.
  // If login => nrows = 1, if regsiter => nrow = 0.
  // We might generalize it later in case of searching for user
  // using userID, as Driver needs to query their customer.
  searchUser: function(account, callback) {
    let query = "SELECT username FROM Users WHERE username='" + account.user;
    if (account.pass && account.pass != '')
      query += "' AND password='" + account.pass;
    query += "';";
    // console.log("QUERY IS: ", query);
    this.handler.execute(query, callback);
  }
}


module.exports = User;
