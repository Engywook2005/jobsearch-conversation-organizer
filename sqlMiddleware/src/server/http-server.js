/* global module */
/* global require */

const http = require('http');
const url =  require('url');
const NodeJSDataServer = require('./node-js-data-server');
const mysql = require('../mysql/index');
const InjectConstructor = require('../support/inject-constructor');
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
    }

    // @TODO do we need a separate injectQuery?
    injectQuery(response, nodeJSDataServer, query, params = null) {

        const mySQLresponseCallback = function(err, mySQLResponse) {
            response.writeHead("200", {'Content-Type': 'text/json'});
            if(mySQLResponse) {
                response.write(JSON.stringify(mySQLResponse));
            } else if(err) {


                console.log('oops: ' + err);
                response.write("oops, something went wrong: " + err.message);
            }
            response.end();
        };

        nodeJSDataServer.execInjectQuery(mySQLresponseCallback, query);
    }

    startServerOnMySQLReady(err, mySQLConnex) {
        console.log("sql ready");
        if(err) {
            console.log("error connecting with SQL: " + err.message);
        }
        http.createServer((request, response) => {

            const requestParts = url.parse(request.url,true),
                pathName = requestParts.pathname,
                queryParams = requestParts.query;

            // @TODO add utils.js and to that add a timestamper function
            const now = new Date();
            console.log(`request received ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);

            const nodeJSDataServer = new NodeJSDataServer(mySQLConnex);

            const fullQuery = (queryString) => {
                    this.fullQuery(response, nodeJSDataServer, queryString);
                },
                injectQuery = (queryString) => {
                    this.injectQuery(response, nodeJSDataServer, queryString);
                };

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
                },
                '/resumeVersions.json': {
                    'queryString': QueryConstants.select.resumeVersions,
                    'func': (queryString) => {
                        fullQuery(queryString);
                    }
                },
                '/positionData.json': {
                    'queryString': `${QueryConstants.select.positionData} WHERE positionID=${queryParams.posid};`,
                    'func': (queryString) => {
                        fullQuery(queryString);
                    }
                },
                '/conversations.json': {
                    'queryString': `${QueryConstants.select.conversations} WHERE specificPositionID=${queryParams.posid} ORDER BY conversationDate DESC, conversationTime DESC;`,
                    'func': (queryString) => {
                        fullQuery(queryString);
                    }
                },
                '/insertSQL.json' : {
                    'constructQuery': () => {

                        console.log(`CONSTRUCTING QUERY: ${JSON.stringify(queryParams)}`);

                        return InjectConstructor.constructInjexQuery(queryParams.table, queryParams.props, queryParams.values);
                    },
                    'func': (queryString) => {
                        // @TODO there is a response that included insertId... do something with that....
                        injectQuery(queryString);
                    }
                },
                '/updateSQL.json' : {
                    'constructQuery' : () => {
                        console.log(`CONSTRUCTING QUERY: ${JSON.stringify(queryParams)}`);

                        return InjectConstructor.constructUpdateQuery(queryParams.table, queryParams.updatedata, queryParams.where);
                    },
                    'func': (queryString) => {
                        injectQuery(queryString);
                    }
                }
            };

            if(!routing[pathName]) {
                response.writeHead("404", {'Content-Type': 'text/json'});
                response.write(`url ${pathName} not found`);
                response.end();
                return;
            }

            if(routing[pathName].queryString) {
                routing[pathName].func(routing[pathName].queryString);
            } else if(routing[pathName].constructQuery) {
              routing[pathName].func(routing[pathName].constructQuery());
            }

        }).listen("8081");

        console.log('server is running');
    }
}

module.exports = HTTPServer;