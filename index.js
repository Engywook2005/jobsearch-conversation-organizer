/**
 * Created by Greg on 6/16/2017.
 */
const Starter = require('./src/api/starter');


(() => {
    new Starter(process.argv[2]).start();
})();



// @TODO is this actually needed?
module.exports.starter = Starter;
