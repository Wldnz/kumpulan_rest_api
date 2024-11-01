

import mysql from 'mysql';

const {SERVERNAME,USERNAMESQL,PASSWORDSQL,DATABASESQL,PORTSQL} = process.env;

const db =  mysql.createConnection({
    host : SERVERNAME,
    user : USERNAMESQL,
    password : PASSWORDSQL,
    database : DATABASESQL,
    port : PORTSQL
});

export default db;