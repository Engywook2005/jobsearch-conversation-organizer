/**
 * Created by Greg on 7/22/2017.
 */

const HTTPServer = require('./src/server/http-server');

const serveHTTPQueryResults = function(password) {
    new HTTPServer(password);
};

//testConnection(process.argv[2]);
serveHTTPQueryResults(process.argv[2]);