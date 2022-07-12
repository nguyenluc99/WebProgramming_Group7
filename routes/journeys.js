const { Router } = require('express');
var express = require('express');
var router = express.Router();
var journeyCtr = require('../controller/journeyCtr');

router.get('/getAllJourneys', function(req, res, next){
    journeyCtr.getAllRent((er, re) => {
        if(!er){
            res.status(200).json(re);
        }
        else{
            res.status(500).json(re);
        }
    })
})
router.post('/insertJourney', function(req, res, next){
    const rent = {
        "driverId":req.body.driverId,
        "vehicleId":req.body.vehicleId,
        "timeStart":req.body.timeStart,
        "timeEnd":req.body.timeEnd,
        "startLocationId":req.body.startLocationId,
        "destinationId":req.body.destinationId
    }
    journeyCtr.insertRent(rent, (er, re) => {
        console.log(er, re);
        if(!er){
            res.status(200).json(re)
        }
        else{
            res.status(500).json(re)
        }
    })
})
router.delete('/deleteJourney', function(req, res, next){
    const id = req.body.id;
    journeyCtr.deleteRent(id, (er, re)=>{
        if(!er){
            res.status(200).json(re)
        }
        else{
            res.status(500).json(er)
        }
    })
})

router.post('/acceptRequest', function(req, res, next){
    const requestId = req.body.requestId;
    const journeyId = req.body.requestId;
    journeyCtr.acceptRequest(requestId, journeyId, (er, re) => {
        if( !er ){
            res.status(200).json(re);
        }
        else{
            res.status(500).json(er);
        }
    })
})

router.post('/setJourneyStatus', function(req, res, next){
    const id = req.body.journeyId;
    const status = req.body.journeyStatus;
    journeyCtr.setJourneyStatus(id, status, (er, re) => {
        if( !er ){
            res.status(200).json(re);
        }
        else{
            res.status(500).json(er);
        }
    })
})
module.exports = router;