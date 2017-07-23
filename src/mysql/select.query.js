/**
 * Created by Greg on 7/11/2017.
 */

class SelexQuery {
    constructor(connex) {
        this.connex = connex;
    }

    execQuery(callback = function(err, result) {
        if(err) {
            console.log("oope!");
        } else {
            console.log(result);
        }
    },
    queryString) {
        this.connex.query(queryString, callback);
    }
}

module.exports = SelexQuery;