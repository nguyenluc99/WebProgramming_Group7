const { Router } = require('express');
var express = require('express');
var router = express.Router();
var rentCtr = require('../controller/rentCtr');

router.get('/getAllRents', function(req, res, next){
    rentCtr.getAllRent((er, re) => {
        if(!er){
            res.status(200).json(re);
        }
        else{
            res.status(500).json(re);
        }
    })
})
router.post('/insertRent', function(req, res, next){
    const rent = {
        "driverId":req.body.driverId,
        "vehicleId":req.body.vehicleId,
        "timeStart":req.body.timeStart,
        "timeEnd":req.body.timeEnd,
        "startLocationId":req.body.startLocationId,
        "destinationId":req.body.destinationId
    }
    rentCtr.insertRent(rent, (er, re) => {
        console.log(er, re);
        if(!er){
            res.status(200).json(re)
        }
        else{
            res.status(500).json(re)
        }
    })
})
router.delete('/deleteRent', function(req, res, next){
    const id = req.body.id;
    rentCtr.deleteRent(id, (er, re)=>{
        if(!er){
            res.status(200).json(re)
        }
        else{
            res.status(500).json(er)
        }
    })
})
module.exports = router;