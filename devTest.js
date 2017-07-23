/**
 * Created by Greg on 7/11/2017.
 */

//console.log(process.argv[2]);
const mysql = require('./src/mysql');
const HTTPServer = require('./src/server/http-server');

const testSelectQuery = function(connex) {
    const selexQueries = new mysql.SelexQuery(connex);
    const selexCallback = function(err, response) {
        for(var i = 0; i < response.length; i++) {
            console.log("contact: " + response[i].firstName + " " + response[i].lastName);
        }
    };
    selexQueries.execQuery(selexCallback, "SELECT * FROM contactList");
}

const connexCallback = function(err, connex) {
    if(connex) {
        console.log("have connection!");
        connex.query("use jobConvos");
        testSelectQuery(connex);
    } else {
        console.log("oops! \n" + err);
    }
}

const testConnection = function(password) {
    console.log("call to devTest");
    const mysqlConnex = new mysql.MySqlConnexJS();
    const connex = mysqlConnex.connectToSQLServer(connexCallback, password);

}

const serveHTTPQueryResults = function(password) {
    new HTTPServer(password);
};

//testConnection(process.argv[2]);
serveHTTPQueryResults(process.argv[2]);