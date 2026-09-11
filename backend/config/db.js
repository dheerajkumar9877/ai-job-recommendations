const mysql = require('mysql2/promise');

require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

// db.getConnection((error, connection) => {
//     if (error) {
//         console.log("Unable to connect with database:", error.message);
//         return;
//     }

//     console.log("Database Connected");

//     connection.release();
// });

module.exports = db ;