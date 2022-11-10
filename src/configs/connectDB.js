const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "Haianhem123@",
  database: 'node-crud'
});

// simple query


module.exports = connection;
// with placeholder
