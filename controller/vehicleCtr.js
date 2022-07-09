const PG_Handler = require('../PG_API/PG_Handler');
const vehicleCtr = {
    getAllVehicle(callback){
        let handler = new PG_Handler();
        const query = 'SELECT * from vehicle;';
        handler.execute(query, (er, re) => {
            if (re[1].result.length != 0 && !er) {
              console.log("DONE");
              callback(null, re[1].result);
            } else {
              callback(er, "NOT FOUND");
            }
          })
    },
    getVehiclesByOwner(owner, callback){
      let handler = new PG_Handler();
        const query = 'SELECT * from vehicle WHERE owner = '+owner+';';
        handler.execute(query, (er, re) => {
            if (re[1].result.length != 0 && !er) {
              console.log("DONE");
              callback(null, re[1].result);
            } else {
              callback(er, "NOT FOUND");
            }
          })
    },
    getVehiclesByOwnerAndType(owner, type, callback){
      let handler = new PG_Handler();
      const query = 'SELECT * from vehicle WHERE owner = '+owner+' AND vehicleType = \''+type+'\';';
      handler.execute(query, (er, re) => {
          if (re[1].result.length != 0 && !er) {
            console.log("DONE");
            callback(null, re[1].result);
          } else {
            callback(er, "NOT FOUND");
          }
        })
    },
    insertVehicle(vehicle, callback){
      let vehicleId = vehicle.vehicleId;
      let vehicleType = vehicle.vehicleType;
      let owner = vehicle.owner;
      let peopleCapacity = vehicle.peopleCapacity;
      let weightCapacity = vehicle.weightCapacity;
      let volumeCapacity = vehicle.volumeCapacity;
      let description = vehicle.description;
      let handler = new PG_Handler();
      const query = 'INSERT INTO vehicle(vehicleId, vehicleType, owner, peopleCapacity, weightCapacity, volumeCapacity, description) '+
                    'VALUES (\''+vehicleId+'\',\''+vehicleType+'\','+owner+','+peopleCapacity+','+weightCapacity+','+volumeCapacity+',\''+description+'\');';
      handler.execute(query, (er, re) => {
        console.log(vehicle);
        console.log(query);
        if (re[1].command == 'INSERT' && !er) {
          console.log("DONE");
          callback(null, "Insert Successfully!");
        } else {
          callback(er, "NOT FOUND");
        }
      })
    },
    getVehicleById(id, callback){
      const query = 'SELECT * from vehicle WHERE vehicleID = \''+id+'\';';
      let handler = new PG_Handler();
      handler.execute(query, (er, re) => {
        console.log(id);
        console.log(query);
        if (re[1].result!=undefined){
          if (!er) {
            console.log("DONE");
            callback(null, re[1].result.length);
          } else {
            callback(er, "Error");
          }
        }
        else{
          callback(er, "Unknown result")
        }
        
      })
    },
    deleteVehicle(id, callback){
      const query ='DELETE from vehicle WHERE vehicleID = \''+id+'\';';
      let handler = new PG_Handler()
      handler.execute(query, (er, re) => {
        if(!er){
          callback(null, 'Sucessfully!');
        }
        else{
          callback(er, 'Error');
        }
      })
    },
    updateVehicle(vehicle, callback){
      let {vehicleId, vehicleType, owner, peopleCapacity, weightCapacity, volumeCapacity, description} = vehicle;
      let handler = new PG_Handler();
      const query = 'UPDATE vehicle SET vehicleType = \''+vehicleType+'\', peopleCapacity='+peopleCapacity+', weightCapacity='+weightCapacity+
                      ',volumeCapacity='+volumeCapacity+',description=\''+description +'\' WHERE vehicleId=\''+vehicleId+'\';';
      handler.execute(query, (er, re) => {
        console.log(vehicle);
        console.log(query);
        if (!er) {
          console.log("DONE");
          callback(null, "Update Successfully!");
        } else {
          callback(er, "Error");
        }
      })
    }
}
module.exports = vehicleCtr;