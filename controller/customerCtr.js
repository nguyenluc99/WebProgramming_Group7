const PG_Handler = require('../PG_API/PG_Handler');
const user = require('../user');
const jwt = require('jsonwebtoken');
const ENUM = require('./../const/enum');
const customerModel = require('./../models/Customer');

const customerCtr = {
  model: customerModel,
  searchForJourney(specs, callback) {
    if (!specs.customerID)
      callback("Error happen", null);
    // timeStart and timeEnd are supported with day alignment only.
    // hour, minute might be supported in next versions.
    else if (!specs.departureTime && !specs.arrivalTime && !specs.startLocationID && !specs.destinationID)
      callback("At least departureTime, arrivalTime, startLocation, or destination must be provided!", null);
    else 
      this.model.searchForJourney(specs, callback);
  }
}

module.exports = customerCtr;
