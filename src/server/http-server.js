/**
 * Created by Greg on 7/22/2017.
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const NodeJSDataServer = require('./node-js-data-server');
const mysql = require('../mysql');
const QueryConstants = require('../support/query-constants');

class HTTPServer {
    constructor(password) {
        this.createMySQLInstance(password);
        this.runWebPageServer();
    }

    createMySQLInstance(password) {
        const mySQLConnex = new mysql.MySqlConnexJS();
        mySQLConnex.connectToSQLServer(this.startServerOnMySQLReady, password);
    }


    runWebPageServer() {
        http.createServer(function(request, response) {
            console.log("http request received");
            const pathName = url.parse(request.url).pathname;
            let pagePath = "index.html";
            let fileType = "text/html";
            if(pathName !== "/") {
                pagePath = pathName;
            }
            const pagePathArray = pagePath.split("/");
            console.log(pagePathArray);
            let filePath = "public_html";
            if(pagePathArray.length > 1) {
                //todo - css
                if (pagePathArray[1] === "js") {
                    console.log("javascript file found");
                    fileType = "text/javascript";
                }
            } else if(pagePathArray.length === 1) {
                filePath += "/";
            }
            pagePath = filePath + pagePath;
            console.log("looking for: " + pagePath);
            fs.readFile(pagePath, function(err, data) {
               if(err) {
                   console.log(pagePath + " not found");
                   response.writeHead(404, {'Content-Type': 'text/html'});
               } else if(data) {
                   response.writeHead(200, {'Content-Type': fileType});
                   response.write(data.toString());
               }
               response.end();
            });
        }).listen("8098");
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
            const pathName = url.parse(request.url).pathname;
            console.log(pathName);
            const cb = pathName.split("&cb=")[1];
            //const queryString = "SELECT * FROM contactList";
            // for now make call to node-js-data-server

            const mySQLResponseCallback = function(err, mySQLResponse) {
                if(mySQLResponse) {
                    console.log("sql response OK");
                    response.writeHead(200, {'Content-Type': 'text/javascript'});
                    let jsonString = JSON.stringify(mySQLResponse);
                    jsonString = encodeURIComponent(jsonString);
                    const responseJS = 'window["' + cb + '"]("' + jsonString + '")';
                    response.write(responseJS);
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