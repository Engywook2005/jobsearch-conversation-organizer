/**
 * Created by Greg on 6/16/2017.
 */
const mysql = require('./mysql');

const mysqlConnex = new mysql.MySqlConnexJS();
mysqlConnex.conectToSQLServer();


module.exports.mysql = mysql;
