/**
 * Created by Greg on 7/11/2017.
 */

class SelexQuery {
    constructor(connex) {
        this.connex = connex;
    }

    //TODO - streamlined list of frequently used select queries
    //TODO also add function to do something with the results row by row? may require an input function
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