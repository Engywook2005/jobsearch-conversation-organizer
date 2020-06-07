class MySqlConnexJS {

    constructor() {
        this.mysqlInstance = require ('mysql');
    }

    connectToSQLServer(
        callback = function(err, connex) { console.log("default callback: " + (connex && !err)); },
        password = "foo"
    ) {
        console.log(`connecting to mysql with password ${password}`)

        const connection = this.mysqlInstance.createConnection(
            {
                user: "root",
                host: "127.0.0.1",
                port: "3307",
                database: "jobConvos",
                password: password
            }
        );

        connection.connect(function(err) {
            //console.log(callback)
            if(err) {
                callback(err)
            } else {

                // Keep alive when server tries to go to sleep after about 10 minutes...
                connection.on('error', (err) => {
                    console.log(`Caught mysql error: ${err}`);
                    // @TODO will need to call connectToSQLServer again IF the error is Connection lost: The server closed the connection
                    // Actually will we be able to work with the same connection if we do this?
                });

                callback(null, connection);
            }
        });
    }
}

module.exports = MySqlConnexJS;