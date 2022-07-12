var express = require('express');
var router = express.Router();
var requestCtr = require('./../controller/requestCtr');

router.get('/getAllRequests', function(req, res){
    requestCtr.getAllRequest((er, re) => {
        if( !er ){
            res.status(200).json(re)
        }
        else{
            res.status(500).json(re);
        }
    })
})

router.put('/setRequestStatus', function(req, res){
    let id = req.body.id;
    let status = req.body.status;
    requestCtr.setRequestStatus(id, status, (er, re) => {
        if( !er ){
            res.status(200).json('Successfully!');
        }
        else{
            res.status(500).json(er);
        }
    })
})

router.post('/insertRequest', function(req, res){
    let {journeyId, userId, startLocationId, destinationId, fee} = req.body;
    let requestStatus = 'PENDING';
    const request = {
        "journeyId":journeyId,
        "userId":userId,
        "startLocationId":startLocationId,
        "destinationId":destinationId,
        "fee":fee,
        "requestStatus":requestStatus
    }
    requestCtr.insertRequest(request, (er, re) => {
        if( !er ){
            res.status(200).json(re);
        }
        else{
            res.status(500).json(er);
        }
    })
})

module.exports = router;