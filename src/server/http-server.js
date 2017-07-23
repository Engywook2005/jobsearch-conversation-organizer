/**
 * Created by Greg on 7/22/2017.
 */

const http = require('http');
const url = require('url');
const NodeJSDataServer = require('./node-js-data-server');
const mysql = require('../mysql');
const QueryConstants = require('../support/query-constants');

class HTTPServer {
    constructor(password) {
        this.createMySQLInstance(password);
    }

    createMySQLInstance(password) {
        const mySQLConnex = new mysql.MySqlConnexJS();
        mySQLConnex.connectToSQLServer(this.startServerOnMySQLReady, password);
    }

    startServerOnMySQLReady(err, mySQLConnex) {
        console.log("sql ready");
        if(err) {
            console.log("error connecting: " + err.message);
        }
        http.createServer(function (request, response) {
            console.log("received request");
            // TODO logic needed here to process request and choose query to run - constants?
            const nodeJSDataServer = new NodeJSDataServer(mySQLConnex);
            const queryString = QueryConstants.select.conversationMainTable;
            //const queryString = "SELECT * FROM contactList";
            // for now make call to node-js-data-server
            const mySQLResponseCallback = function(err, mySQLResponse) {
                if(mySQLResponse) {
                    console.log("sql response OK");
                    response.writeHead("200", {'Content-Type': 'text/json'});
                    response.write(JSON.stringify(mySQLResponse));
                } else if(err) {
                    console.log("oops, something went wrong: " + err.message);
                }
                response.end();
            };
            console.log("making query");
            nodeJSDataServer.execSelectQuery(mySQLResponseCallback, queryString);
        }).listen("8097");
    }
}

module.exports = HTTPServer;