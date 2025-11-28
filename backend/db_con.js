// db.js
require("dotenv").config();
const mysql2 = require("mysql2");

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
});

// Test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Database Connection Failed !!!", err);
    } else {
        console.log("Connected to Database " + process.env.DB_HOST);
        connection.release();
    }
});

// Optional test query
const select = `SELECT * FROM users;`;
pool.query(select, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
    }
});

module.exports = pool;