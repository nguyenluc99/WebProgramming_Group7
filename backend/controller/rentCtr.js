const PG_Handler = require('../PG_API/PG_Handler');
const vehicleCtr = require('../controller/vehicleCtr');
const rentCtr = {
    getAllRent(callback){
        let handler = new PG_Handler();
        const query = `SELECT * FROM Rent;`;
        handler.execute(query, (er, re) => {
            console.log(er, re);
            if(re[1].result!=undefined & !er){
                if(re[1].result.length !=0){
                    callback(null, re[1].result);
                }
                else{
                    callback(null, 'Not found');
                }
            }
            else{
                callback(er, 'Error');
            }
        })
    },
    insertRent(rent, callback){
        let {driverId, vehicleId, timeStart, timeEnd, startLocationId, destinationId} = rent
        let handler = new PG_Handler();
        const query = `INSERT INTO Rent(driverId, vehicleId, timeStart, timeEnd, startLocationId, destinationId) VALUES `+
                        `(${driverId}, \'${vehicleId}\', \'${timeStart}\', \'${timeEnd}\', ${startLocationId}, ${destinationId})`;
        console.log(query);
        vehicleCtr.getVehicleById(vehicleId, (e, r)=>{
            console.log(e, r);
            if(!e){
                if(r!=0){
                    handler.execute(query, (er, re) => {
                        if(!er){
                            callback(null, 'Insert Succesfully');
                        }
                        else{
                            callback(er, 'Error');
                        }
                    })
                }
                else{
                    callback(null, 'You do not have this vehicle');
                }
            }
            else{
                callback(er, 'Error in query');
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
    updateRent(){
        
    },
    selectRent(){

    }
}
module.exports = rentCtr;