const requestModel = require('./../models/Request');

const requestCtr = {
    model : requestModel,
    getAllRequest(callback){
        this.model.getAllRequest(callback);
    },
    setRequestStatus(id, status, callback){
        if( id != null & status != null ){
            this.model.setRequestStatus(id, status, callback);
        }
        else{
            callback('Invalid parameters', null);
        }
    },
    insertRequest(request, callback){
        let {journeyId, userId, startLocationId, destinationId, fee, requestStatus} = request;
        if(journeyId == null | userId == null | startLocationId == null | destinationId == null | fee == null){
            console.log(request);
            if(request != null ){
                this.model.insertRequest(request, callback);
            }
            else{
                callback('Invalid input!', null);
            }
        }
        else{
            callback('Null parameters', null);
        }
    }
}

module.exports = requestCtr;