/**
 * Created by Greg on 6/16/2017.
 */

//TODO get rid of this - not serving http this way
module.exports = {
    serveHTTP: {
        options: {
            port: 8907,
            base: './public_html/',
            keepalive: true
        }
    }
};

