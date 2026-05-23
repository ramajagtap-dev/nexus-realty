const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Alterego#123', // 👈 Dhyan se dekho, yahan single quotes (' ') ke andar likha hai!
  database: 'NexusRealty',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log('❌ MySQL Database connection me error aayi!');
    console.log('--- ERROR DETAILS ---');
    console.error(err);
    console.log('---------------------');
  } else {
    console.log('⚡ MySQL Database se safalta-purvak connection ho gaya!');
    connection.release();
  }
});

module.exports = pool.promise();