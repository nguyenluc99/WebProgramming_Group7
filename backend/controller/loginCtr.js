const PG_Handler = require('../PG_API/PG_Handler');
const user = require('../user');
const jwt = require('jsonwebtoken');
const ENUM = require('../../const/enum');


const loginCtr = {
  login(account, callback) {
    let handler = new PG_Handler();
    const query = "SELECT username FROM users WHERE username='" + account.user + "' AND password='" + account.pass + "'";

    handler.execute(query, (er, re) => {
      if (re[1].result.length == 1 && !er) {
        console.log("DONE");
        const token = jwt.sign(
          { user_id: account.user },
          ENUM.TOKEN_KEY,
          {
            expiresIn: 30 // token now is automatically expired after 30 seconds.
                          // check by jwt.verify(user.token, ENUM.TOKEN_KEY, callback);
                          // as example below
          }
        );
        user.token = token;
        callback(null, "Login successfully!");
      } else {
        callback(er, "SOME ERROR RAISES!");
      }
    })
  },
  getSessionInfos(callback) {
    // const username = jwt.decode(user.token);
    // console.log("USERNAME IS ", username);
    if  (user.token == null) {
      callback("ACCOUNT IS NOT LOGGED!", "")
    } else {
      jwt.verify(user.token, ENUM.TOKEN_KEY, (er, re) => {
        if (er) {
          callback("Token has expired or is invalid!", "");
        } 
        else {
          callback(null, re);
        }
      });
    }
  },
  logout(callback) {
    user.token = null;
    callback();
  }
}

module.exports = loginCtr;