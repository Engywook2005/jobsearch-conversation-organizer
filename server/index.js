/* global module */
/* global require */

const express = require('express');
const http = require('http');
const url =  require('url');
const MySQLExecutor = require('./src/mysql/mysql-executor');
const mysql = require('./src/mysql');
const ConversationQuery = require('./src/support/conversation-query');
const InjectConstructor = require('./src/support/inject-constructor');
const QueryConstants = require('./src/support/query-constants');

const app = express();

class HTTPServer {
    constructor(password) {
        this.createMySQLInstance(password);
    }

    createMySQLInstance(password) {
        new mysql.MySqlConnexJS().connectToSQLServer(this.startServerOnMySQLReady.bind(this), password);
    }

    /**
     * 
     * @param {*} response          Response object where output will be written.
     * @param {MySQLExecutor}    Data server handling the query
     * @param {String} query        Query string passed through 
     * @param {*} params            Query params on request. 
     */
    fullQuery(response, mysqlExecutor, query, params = null) {

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
        mysqlExecutor.execSelectQuery(mySQLResponseCallback, query);
    }

    // @TODO do we need a separate injectQuery?
    injectQuery(response, mysqlExecutor, query, params = null) {

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

        mysqlExecutor.execInjectQuery(mySQLresponseCallback, query);
    }

    startServerOnMySQLReady(err, mySQLConnex) {
        console.log("sql ready");
        if(err) {
            console.log("error connecting with SQL: " + err.message);
        }

        const mysqlExecutor = new MySQLExecutor(mySQLConnex);

        const routing = {
            '/defaultq.json' : {
                'queryString' : QueryConstants.select.activePositions,
                'func': this.fullQuery
            },
            '/employers.json' : {
                'queryString': QueryConstants.select.employers,
                'func': this.fullQuery
            },
            '/recruiters.json' : {
                'queryString': QueryConstants.select.recruiters,
                'func': this.fullQuery
            },
            '/positionTypes.json': {
                'queryString': QueryConstants.select.positionTypes,
                'func': this.fullQuery
            },
            '/applicationStatus.json': {
                'queryString': QueryConstants.select.applicationStatus,
                'func': this.fullQuery
            },
            '/resumeVersions.json': {
                'queryString': QueryConstants.select.resumeVersions,
                'func': this.fullQuery
            },
            '/positionData.json': {
                'constructQuery': (queryParams) => {
                    return `${QueryConstants.select.positionData} WHERE positionID=${queryParams.posid};`;
                },
                'func': this.fullQuery
            },
            '/conversations.json': {
                'constructQuery': (queryParams) => {
                    return `${QueryConstants.select.conversations} WHERE specificPositionID=${queryParams.posid} ORDER BY conversationDate DESC, conversationTime DESC;`
                },
                'func': this.fullQuery
            },
            '/insertSQL.json' : {
                'constructQuery': (queryParams) => {

                    console.log(`CONSTRUCTING QUERY: ${JSON.stringify(queryParams)}`);

                    return InjectConstructor.constructInjexQuery(queryParams.table, queryParams.props, queryParams.values);
                },
                'func': this.injectQuery
            },
            '/updateSQL.json' : {
                'constructQuery' : (queryParams) => {
                    console.log(`CONSTRUCTING QUERY: ${JSON.stringify(queryParams)}`);

                    return InjectConstructor.constructUpdateQuery(queryParams.table, queryParams.updatedata, queryParams.where);
                },
                'func': this.injectQuery
            },
            '/convoq.json': {
                'constructQuery': (queryParams) => {
                    return ConversationQuery(queryParams.pid);
                },
                'func': this.injectQuery
            }
        };

        app.use(express.static('public'));

        app.get('/[A-Za-z0-9_-]*\.json', (request, response) => {
            const urlParts = url.parse(request.url, true),
                now = new Date(),
                pathName = urlParts.pathname,
                queryParams = urlParts.query;

            console.log(`request received ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);

            if(!routing[pathName]) {
                response.writeHead("404", {'Content-Type': 'text/json'});
                response.write(`url ${pathName} not found`);
                response.end();
                return;
            }

            if(routing[pathName].queryString) {
                routing[pathName].func(response, mysqlExecutor, routing[pathName].queryString);
            } else if(routing[pathName].constructQuery) {
                routing[pathName].func(response, mysqlExecutor, routing[pathName].constructQuery(queryParams));
            }

        });

        console.log('server is running');
    }
}

new HTTPServer(process.argv[2]);

app.listen(8081);