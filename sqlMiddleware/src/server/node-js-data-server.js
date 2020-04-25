/**
 * Created by Greg on 7/22/2017.
 */

const mysql = require('../mysql/index');

class NodeJSDataServer {
    constructor(mySqlConnex) {
        this.mySqlConnex = mySqlConnex;
    }

    execSelectQuery(callback, queryString) {
        console.log('executing query');
        const mysqlSelex = new mysql.SelexQuery(this.mySqlConnex);
        mysqlSelex.execQuery(callback, queryString);
    }
}

module.exports = NodeJSDataServer;