/* global module */
/* global require */

const http = require('http');
const NodeJSDataServer = require('./node-js-data-server');
const mysql = require('../mysql/index');
const QueryConstants = require('../support/query-constants');

class HTTPServer {
    constructor(password) {
        this.createMySQLInstance(password);
    }

    createMySQLInstance(password) {
        // const mySQLConnex = new mysql.MySqlConnexJS();
        new mysql.MySqlConnexJS().connectToSQLServer(this.startServerOnMySQLReady.bind(this), password);
    }

    /**
     * 
     * @param {*} response          Response object where output will be written.
     * @param {NodeJSDataServer}    Data server handling the query
     * @param {String} query        Query string passed through 
     * @param {*} params            Query params on request. 
     */
    fullQuery(response, nodeJSDataServer, query, params = null) {

        const mySQLResponseCallback = function(err, mySQLResponse) {

            // @TODO this should be consolidated in one function to handle all ultimate output.
            response.writeHead("200", {'Content-Type': 'text/json'});
            if(mySQLResponse) {
                response.write(JSON.stringify(mySQLResponse));
            } else if(err) {
                console.log('oops: ' + err);
                response.write("oops, something went wrong: " + err.message);
            }
            response.end();
        };
        nodeJSDataServer.execSelectQuery(mySQLResponseCallback, query);
    };

    startServerOnMySQLReady(err, mySQLConnex) {
        console.log("sql ready");
        if(err) {
            console.log("error connecting with SQL: " + err.message);
        }
        http.createServer((request, response) => {
            console.log('request received');

            const nodeJSDataServer = new NodeJSDataServer(mySQLConnex);

            // @TODO set up separate routing class, be able to do something with query params.
            // @TODO may need to set MIME types here as well.
            const routing = {
                '/fish.json' : {
                    'queryString' : QueryConstants.select.conversationMainTable,     
                    'func' : (queryString) => {
                        this.fullQuery(response, nodeJSDataServer, queryString);
                    }
                }, 
                '/' : {
                    'queryString' : '',
                    'func' : () => {
                        response.writeHead("404", {'Content-Type': 'text/json'});
                        response.write('We would love to welcome you home, but this site does not have a home. No method to call.');
                        response.end();
                    }
                }
            };

            const url = request.url;

            if(!routing[url]) {
                response.writeHead("404", {'Content-Type': 'text/json'});
                response.write(`url ${url} not found`);
                response.end();
                return;
            }

            routing[url].func(routing[url].queryString);

        }).listen("8081");

        console.log('server is running');
    }
}

module.exports = HTTPServer;