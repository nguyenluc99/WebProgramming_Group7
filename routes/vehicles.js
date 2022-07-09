var express = require('express');
var router = express.Router();
var vehicleCtr = require('../controller/vehicleCtr');

router.get('/getAllVehicles', function(req, res, next){
    vehicleCtr.getAllVehicle((er, re) => {
        console.log(er, re);
        //res.render('index');
        res.status(200).json(re);
    })
});
router.get('/getVehiclesByOwner', function(req, res, next){
    let owner = req.body.owner;
    vehicleCtr.getVehiclesByOwner(owner, (er, re) => {
        console.log(er, re);
        //res.render('index');
        res.status(200).json(re);
    })
});
router.get('/getVehiclesByOwnerAndType', function(req, res, next){
    let owner = req.body.owner;
    let type = req.body.type;
    vehicleCtr.getVehiclesByOwnerAndType(owner, type, (er, re) => {
        console.log(er, re);
        //res.render('index');
        res.status(200).json(re);
    })
});
router.post('/insertVehicle', function(req, res, next){
    const vehicle = {
        'vehicleId':req.body.vehicleId,
        'vehicleType':req.body.vehicleType,
        'owner':req.body.owner,
        'peopleCapacity':req.body.peopleCapacity,
        'weightCapacity':req.body.weightCapacity,
        'volumeCapacity':req.body.volumeCapacity,
        'description':req.body.description
    }
    vehicleCtr.getVehicleById(vehicle.vehicleId, (e, r) => {
        console.log(e, r);
        if(r!=0){
            res.status(200).json('Invalid Id');
        }
        else{
            vehicleCtr.insertVehicle(vehicle, (er, re) => {
                console.log(er, re);
                //res.render('index');
                res.status(200).json(re);
            })
        }
    })
});
router.delete('/deleteVehicle', function(req, res, next){
    let id = req.body.id;
    vehicleCtr.deleteVehicle(id, (er, re) => {
        console.log(er, re);
        //res.render('index');
        if(!er){
            res.status(200).json(re);
        }
        else{
            res.status(500).json(re);
        }
    })
});
router.put('/updateVehicle', function(req, res, next){
    const vehicle = {
        'vehicleId':req.body.vehicleId,
        'vehicleType':req.body.vehicleType,
        'owner':req.body.owner,
        'peopleCapacity':req.body.peopleCapacity,
        'weightCapacity':req.body.weightCapacity,
        'volumeCapacity':req.body.volumeCapacity,
        'description':req.body.description
    }
    vehicleCtr.getVehicleById(vehicle.vehicleId, (e, r) => {
        console.log(e, r);
        if(r==0){
            res.status(200).json('This vehicle does not exist!');
        }
        else{
            vehicleCtr.updateVehicle(vehicle, (er, re) => {
                console.log(er, re);
                //res.render('index');
                res.status(200).json(re);
            })
        }
    })
})
module.exports = router;