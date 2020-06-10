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

        connection.connect((err) => {

            if(err) {
                callback(err)
            } else {

                // Not much we can do about it right now, but we learn from our mistakes. And yours.
                connection.on('error', (err) => {
                    console.log(`Caught mysql error: ${err}`);
                });

                callback(null, connection);

                this.keepAlive(connection);
            }
        });
    }

    keepAlive(connex) {
        console.log(`whacking that dead man's switch`);

        connex.query('SELECT 1;', () => {
            setTimeout(() => {
                this.keepAlive(connex);
            }, 540000);
        });
    }
}

module.exports = MySqlConnexJS;