/**
 * Created by Greg on 6/16/2017.
 */


class MySqlConnexJS {

    constructor() {
        this.mysqlInstance = require ('mysql');
    }

    connectToSQLServer(callback = function(err, connex) {
        console.log("default callback: " + (connex && !err));
    },
    password = "foo") {
        console.log(password);
        const connection = this.mysqlInstance.createConnection({
            host: "localhost",
            user: "root",
            password
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