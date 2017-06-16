/**
 * Created by Greg on 6/16/2017.
 */


class MySqlConnexJS {

    constructor() {
        this.mysqlInstance = require ('mysql');
    }

    conectToSQLServer(callback = function(err, connex) {
        console.log(err);
        console.log(connex);
    }) {
        const connection = this.mysqlInstance.createConnection({
            host: "localhost",
            user: "root",
            //TODO add argument to call to app to pass username and password
            password: "thisPasswordIntentionallyWrong"
        });
        connection.connect(function(err) {
            if(err) {
                callback(err)
            } else {
                callback(null, connection);
            }
        });
    }

    squawk() {
        console.log("squawk!");
    };
}

module.exports = MySqlConnexJS;