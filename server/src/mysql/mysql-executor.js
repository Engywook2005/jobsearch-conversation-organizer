const InjexQuery = require('./inject.query');
const SelexQuery = require('./select.query');

class MySQLExecutor {
    constructor(mySqlConnex) {
        this.mySqlConnex = mySqlConnex;
    }

    execSelectQuery(callback, queryString) {
        const now = new Date();
        console.log(`executing selexquery ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
        const mysqlSelex = new SelexQuery(this.mySqlConnex);
        mysqlSelex.execQuery(callback, queryString);
    }

    execInjectQuery(callback, queryString) {
        const now = new Date();
        console.log(`executing injexQuery ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
        const mysqlInjex = new InjexQuery(this.mySqlConnex);
        mysqlInjex.execQuery(callback, queryString);
    }
}

module.exports = MySQLExecutor;