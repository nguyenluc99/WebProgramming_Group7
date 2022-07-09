const user = require('../user');
const jwt = require('jsonwebtoken');
const ENUM = require('./../const/enum');
const userModel = require('./../models/User');


const loginCtr = {

  login(account, callback) {
    userModel.searchUser(account, (er, re) => {
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
        callback("Login failed", "SOME ERROR RAISES!");
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
