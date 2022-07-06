const PG_Handler = require('../PG_API/PG_Handler');
const user = require('../user');
const jwt = require('jsonwebtoken');
const ENUM = require('../../const/enum');


const customerCtr = {
  demo() {
    console.log("DEMO");
  }
}
module.exports = customerCtr;