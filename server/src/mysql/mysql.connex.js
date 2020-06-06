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
                host: "mariadb",
                port: "3306",
                database: "jobConvos",
                password: "root"
            }
        );

        connection.connect(function(err) {
            //console.log(callback)
            if(err) {
                callback(err)
            } else {
                callback(null, connection);
            }
        });
    }
}

module.exports = MySqlConnexJS;