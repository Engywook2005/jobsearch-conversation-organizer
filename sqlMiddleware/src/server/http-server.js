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

            // @TODO add utils.js and to that add a timestamper function
            const now = new Date();
            console.log(`request received ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);

            const nodeJSDataServer = new NodeJSDataServer(mySQLConnex);

            const fullQuery = (queryString) => {
                this.fullQuery(response, nodeJSDataServer, queryString);
            }

            // @TODO set up separate routing class, be able to do something with query params. Should just be able to use a hash table to determine which query to use.
            // @TODO may need to set MIME types here as well.
            const routing = {
                '/fish.json' : {
                    'queryString' : QueryConstants.select.conversationMainTable,
                    'func' : (queryString) => {
                        fullQuery(queryString);
                    }
                },
                '/' : {
                    'queryString' : QueryConstants.select.activePositions,
                    'func' : (queryString) => {
                        fullQuery(queryString);
                    }
                },
                '/employers.json' : {
                    'queryString': QueryConstants.select.employers,
                    'func': (queryString) => {
                        fullQuery(queryString);
                    }
                },
                '/recruiters.json' : {
                    'queryString': QueryConstants.select.recruiters,
                    'func': (queryString) => {
                        fullQuery(queryString);
                    }
                },
                '/positionTypes.json': {
                    'queryString': QueryConstants.select.positionTypes,
                    'func': (queryString) => {
                        fullQuery(queryString);
                    }
                },
                '/applicationStatus.json': {
                    'queryString': QueryConstants.select.applicationStatus,
                    'func': (queryString) => {
                        fullQuery(queryString);
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