/**
 * Created by Greg on 7/11/2017.
 */

//console.log(process.argv[2]);
const mysql = require('./src/mysql');

const connexCallback = function(err, connex) {
    if(connex) {
        console.log("have connection!");
        console.log(connex.query);
    } else {
        console.log("oops! \n" + err);
    }
}

const testConnection = function(password) {
    console.log("call to devTest");
    const mysqlConnex = new mysql.MySqlConnexJS();
    const connex = mysqlConnex.connectToSQLServer(connexCallback, password);

}

testConnection(process.argv[2]);