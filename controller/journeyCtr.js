const vehicleCtr = require('./vehicleCtr');
const journeyModel = require('./../models/Journey');
const requestModel = require('./../models/Request');
const rentCtr = {
    model: journeyModel,
    request_model: requestModel,
    getAllRent(callback){
        this.model.getAllRents(callback);        
    },
    insertRent(journey, callback){
        let vehicleId = journey.vehicleId;
        vehicleCtr.getVehicleById(vehicleId, (e, r)=>{
            console.log(e, r);
            if(!e){
                if(r!=0){
                    this.model.insertJourney(journey, callback);
                }
                else{
                    callback(null, 'You do not have this vehicle');
                }
            }
            else{
                callback(er, null);
            }
        })
    },
    deleteRent(id, callback){
        let handler = new PG_Handler();
        const query = `DELETE FROM Rent WHERE rentId = ${id}`;
        handler.execute(query, (er, re) => {
            console.log(er, re);
            if(!er){
                callback(null, 'Successfully!');
            }
            else{
                callback(er, 'Error');
            }
        })
    },
    acceptRequest(requestId, journeyId, callback){
        let status = 'ACCEPTED';
        this.request_model.getRequestById(requestId, (er, re) => {
            if( !er ){
                if( re != null ){
                    this.request_model.setRequestStatus(requestId, status, (err, res) => {

                    });
                    this.model.addRequestToJourney(requestId, journeyId, (err, res) => {
                        if( !err ){
                            callback(null, res);
                        }
                        else{
                            callback(err, null)
                        }
                    })
                }
                else{
                    callback('Error in query', null);
                }
            }
            else{
                callback(er, null);
            }
        })
    },
    setJourneyStatus(id, status, callback){
        this.model.setJourneyStatus(id, status, (er, re) => {
            if( !er ){
                callback(null, re);
            }
            else{
                callback(er, null);
            }
        })
    },
}
module.exports = rentCtr;