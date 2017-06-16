// for instructions on streamlining gruntfile...
// http://ericnish.io/blog/how-to-neatly-separate-grunt-files/

module.exports = function(grunt) {
    const path = require('path');

    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt/config'),
        jitGrunt: {
            customTasksDir: 'grunt/tasks'
        }
    });
};