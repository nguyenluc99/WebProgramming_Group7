const PG_Handler = require("../PG_API/PG_Handler");
const User = require('./User')
const contractModel = null;

var Customer = {
  handler : new PG_Handler(),
  contract: contractModel,
  
  searchForJourney(specs, callback) {
    let query = "SELECT * FROM Journey WHERE";
    let condition = "";
    let first = true;

    if (specs.departureTime && specs.departureTime != '') 
      {
        condition += " departureTime<=" + specs.departureTime + "::date";
        first = false;
      }

    if (specs.arrivalTime && specs.arrivalTime != '') {
      if (!first)
        query += " AND";
      condition += " arrivalTime>=" + specs.arrivalTime + "::date";
      first = false;
    }

    if (specs.startLocationID && specs.startLocationID != '')  {
      if (!first)
        query += " AND";
      condition += " startLocationID=" + specs.startLocationID;
      first = false;
    }

    if (specs.destinationID && specs.destinationID != '')  {
      if (!first)
        query += " AND";
      condition += " destinationID=" + specs.destinationID;
    }

    // if (condition == "") {

    // } else 
    query += condition +  ";";
    this.handler.execute(query, callback);
  },

  requestForJourneySlot(journeyID) {

  }
}

module.exports = Customer;
