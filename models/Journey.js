const PG_Handler = require('../PG_API/PG_Handler');

var Journey = {
    handler: new PG_Handler(),
    getAllRents(callback){
        const query = `SELECT * FROM Journey;`;
        this.handler.execute(query, (er, re) => {
            console.log(er, re);
            if(re!=undefined & !er){
                if(re[1].result.length !=0){
                    callback(null, re[1].result);
                }
                else{
                    callback('Not found',null);
                }
            }
            else{
                callback(er, null);
            }
        })
    },
    insertJourney(journey, callback){
        let {driverId, vehicleId, timeStart, timeEnd, startLocationId, destinationId} = journey;
        let journeyStatus = 'OPEN';
        const query = `INSERT INTO Journey(driverId, requestId, vehicleId, timeStart, timeEnd, startLocationId, destinationId, journeyStatus) VALUES `+
                        `(${driverId},\'{}\' ,\'${vehicleId}\', \'${timeStart}\', \'${timeEnd}\', ${startLocationId}, ${destinationId}, \'${journeyStatus}\');`;
        this.handler.execute(query, (er, re) => {
            if(!er){
                if( re != undefined ){
                    callback(null, 'Insert Succesfully');
                } 
                else{
                    callback('Error in query', null);
                }
            }
            else{
                callback('Error', null);
            }
        })
    },
    addRequestToJourney(requestId, journeyId, callback){
        const query = `UPDATE Journey SET requestId = array_append(requestId, ${requestId}) WHERE journeyId = ${journeyId};`;
        this.handler.execute(query, (er, re) => {
            if ( !er ){
                callback(null, 'Sucessfully');
            }
            else{
                callback(er, null);
            }
        })
    },
    setJourneyStatus(id, status, callback){
        const query = `UPDATE Journey SET journeyStatus = \'${status}\' WHERE journeyId = ${id};`;
        this.handler.execute(query, (er, re) => {
            console.log(query);
            if( !er ){
                callback(null, 'Sucessfully!');
            }
            else{
                callback('Error', null);
            }
        })
    }
}

module.exports = Journey;