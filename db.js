const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'registration_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
