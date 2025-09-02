import mysql from 'mysql2/promise';
import {
    MYSQL_DB_NAME,
    MYSQL_HOSTNAME,
    MYSQL_PASSWORD,
    MYSQL_PORT,
    MYSQL_USERNAME
} from './env';

// const pool = mysql.createPool({
//     host: MYSQL_HOSTNAME,
//     user: MYSQL_USERNAME,
//     password: MYSQL_PASSWORD,
//     database: MYSQL_DB_NAME,
//     port: MYSQL_PORT,
//     waitForConnections: true,
//     connectionLimit: 1,
//     maxIdle: 1, // max idle connections, the default value is the same as `connectionLimit`
//     idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//     queueLimit: 0,
//     enableKeepAlive: true,
//     keepAliveInitialDelay: 0
// });

const connection = mysql.createConnection({
    host: MYSQL_HOSTNAME,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
    port: MYSQL_PORT
});

export { connection };
