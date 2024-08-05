const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '165.232.96.161',
    user: 'developer1',
    password: 'twe$QmSASTY9b#v',
    database: 'trektales'  
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
