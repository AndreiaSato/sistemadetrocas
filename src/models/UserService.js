const connection = require('../db/dbConnection.js');

module.exports = {
    getUserByEmailAndPassword: (email, password) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE emailClient = ? AND passClient = ?', [email, password], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    },

    createUser: (userClient, emailClient, passClient, birthClient, phoneClient) => {
        return new Promise((acpt, reject) => {
            connection.query(`INSERT INTO users (userClient, emailClient, passClient, birthClient, phoneClient) VALUES (?, ?, ?, ?, ?)`, [userClient, emailClient, passClient, birthClient, phoneClient], (err, results) => {
                if(err) {
                    reject(err);
                    return;
                }
    
                acpt(results);
            })
        })
    },
}