// Database connection using mysql2 pool
const mysql2 = require("mysql2");

const host = "127.0.0.1";
const user = "root";
const password = "BootEnte#0";
const database = "mira_cloud";

const pool = mysql2.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  waitForConnections: true,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database Connection Failed !!!", err);
  } else {
    console.log("Connected to Database " + host);
    connection.release();
  }
});

// test query

const select = `SELECT * FROM users;`;

pool.query(select, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});


module.exports = pool;
