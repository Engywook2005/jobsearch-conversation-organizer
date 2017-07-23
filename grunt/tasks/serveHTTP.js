/**
 * Created by Greg on 6/16/2017.
 */

//TODO get rid of this - not serving http this way
module.exports = function(grunt) {
    grunt.registerTask('serveHTTP', ['connect:serveHTTP']);
};