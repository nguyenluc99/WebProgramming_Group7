const PG_Handler = require("../PG_API/PG_Handler");
const User = require('./User')
const contractModel = null;

var Customer = {
  handler : new PG_Handler(),
  contract: contractModel,
  
  checkContract(specs, callback) {
    
  },

  respondRequest(journeyID) {

  }
}

module.exports = Customer;
