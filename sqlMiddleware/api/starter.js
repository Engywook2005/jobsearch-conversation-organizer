/* global module */
/* global require */

const HTTPServer = require('../server/http-server');

class Starter {

    constructor(password) {
        this.password = password;
    }

    start() {
        new HTTPServer(this.password);
    }

}

module.exports = Starter;