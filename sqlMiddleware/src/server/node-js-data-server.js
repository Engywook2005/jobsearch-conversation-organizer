const mysql = require('../mysql/index');

class NodeJSDataServer {
    constructor(mySqlConnex) {
        this.mySqlConnex = mySqlConnex;
    }

    execSelectQuery(callback, queryString) {
        const now = new Date();
        console.log(`executing selexquery ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
        const mysqlSelex = new mysql.SelexQuery(this.mySqlConnex);
        mysqlSelex.execQuery(callback, queryString);
    }

    execInjectQuery(callback, queryString) {
        const now = new Date();
        console.log(`executing injexQuery ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
        const mysqlInjex = new mysql.InjexQuery(this.mySqlConnex);
        mysqlInjex.execQuery(callback, queryString);
    }
}

module.exports = NodeJSDataServer;