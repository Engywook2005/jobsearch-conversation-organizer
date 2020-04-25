/* global process */
/* global require */

const Starter = require('./api/starter');

new Starter(process.argv[2]).start();