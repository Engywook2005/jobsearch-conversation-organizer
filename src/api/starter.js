const HTTPServer = require('../server/http-server');

// @TODO should make some of this private.
class Starter {

    constructor(password) {
        this.password = password;
    }

    start() {
        new HTTPServer(this.password);
    }

}

module.exports = Starter;