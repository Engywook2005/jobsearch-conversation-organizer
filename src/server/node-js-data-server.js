/**
 * Created by Greg on 7/22/2017.
 */

const mysql = require('../mysql/');

class NodeJSDataServer {
    constructor(mySqlConnex) {
        console.log("node js data server running");
        this._mySqlConnex = mySqlConnex;
    }

    execSelectQuery(callback, queryString) {
        const mysqlSelex = new mysql.SelexQuery(this._mySqlConnex);
        mysqlSelex.execQuery(callback, queryString);
    }
}

module.exports = NodeJSDataServer;