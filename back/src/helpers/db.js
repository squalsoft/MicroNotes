// Подключение к БД
const mysql = require("mysql2");
const config = require("../config");

const pool = mysql.createPool({
        host: config.dbHost,
        user: config.dbUser,
        database: config.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    console.log("pool created");

module.exports = pool;