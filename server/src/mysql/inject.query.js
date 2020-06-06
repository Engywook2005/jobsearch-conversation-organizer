const SelexQuery = require('./select.query.js');

class InjexQuery extends SelexQuery {

    // @TODO I suspect that a separate class for inject queries is not necessary.
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

module.exports = InjexQuery;