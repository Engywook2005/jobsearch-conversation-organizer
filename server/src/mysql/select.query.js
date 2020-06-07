class SelexQuery {
    constructor(connex) {
        this.connex = connex;
    }

    execQuery(callback = function(err, result) {
        if(err) {
            console.log("oops!");
        } else {
            console.log(result);
        }
    },
    queryString) {
        this.connex.query(queryString, callback);
    }
}

module.exports = SelexQuery;