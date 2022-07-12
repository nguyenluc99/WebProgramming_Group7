const PG_Handler = require("../PG_API/PG_Handler");

var Request = {
    handler : new PG_Handler(),
    getAllRequest(callback){
        var query = `Select * from Request;`
        this.handler.execute(query, (er, re) => {
            console.log(er, re);
            if( !er ){
                if( re != undefined ){
                    if ( re[1].result.length != 0 ){
                        callback(null, re[1].result);
                    }
                    else{
                        callback('Not found', null);
                    }
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
    setRequestStatus(id, status, callback){
        var query = `UPDATE request SET requestStatus = \'${status}\' WHERE requestId = ${id}`;
        this.handler.execute(query, (er, re) => {
            if( !er ){
                if( re!= undefined ){
                    callback(null, 'Update successfully!');
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
    insertRequest(request, callback){
        let {journeyId, userId, startLocationId, destinationId, fee, requestStatus} = request;
        var query = `INSERT INTO Request(journeyId, userId, startLocationId, destinationId, fee, requestStatus)`+
                    `VALUES (${journeyId}, ${userId}, ${startLocationId}, ${destinationId}, ${fee}, \'${requestStatus}\');`;
        this.handler.execute(query, (er, re) => {
            if( !er ){
                if(re != undefined){
                    callback(null, 'Sucessfully!');
                }
                else{
                    callback('Error in query', null);
                }
            }
            else{
                callback(er, 'Error');
            }
        })
    },
    getRequestById(id, callback){
        let query = `SELECT * FROM Request WHERE requestId = ${id}`;
        this.handler.execute(query, (er, re) => {
            if( !er ){
                if( re != undefined ){
                    if(re[1].result.length!=0){
                        callback(null, re[1].result);
                    }
                    else{
                        callback('Not found', null);
                    }
                }
                else{
                    callback('Error in query', null);
                }
            }
            else{
                callback(er, null);
            }
        })
    }
}

module.exports = Request;