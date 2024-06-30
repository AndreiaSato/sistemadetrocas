const connection = require('../db/dbConnection.js');

module.exports = {
    getBooksByUserId: (fk_user_idUser) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM books WHERE fk_user_idUser = ?', [fk_user_idUser], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(results);
            });
        });
    },

    getAllBooks: () => {
        return new Promise((acpt, reject) => {
            connection.query('SELECT books.*, users.userClient AS ownerName FROM books JOIN users ON books.fk_user_idUser = users.id', (err, results) => {
                if(err) {
                    reject(err);
                    return;
                }

                acpt(results);
            });
        })
    },

    getBookByID: (id) => {
        return new Promise((acpt, reject) => {
            connection.query(`SELECT * FROM books WHERE ID = ?`, [id], (err, results) => {
                if(err) {
                    reject(err);
                    return;
                }

                if(results.length > 0) {
                    acpt(results[0]);
                } else {
                    acpt(false);
                }

                acpt(results);
            });
        })
    },

    createBook: (title, author, currentCondition, description, situation, fk_user_idUser) => {
        return new Promise((acpt, reject) => {
            connection.query(`INSERT INTO books (title, author, currentCondition, description, situation, fk_user_idUser) VALUES (?, ?, ?, ?, ?, ?)`, [title, author, currentCondition, description, situation, fk_user_idUser], (err, results) => {
                if(err) {
                    reject(err);
                    return;
                }
    
                acpt(results);
            })
        })
    },

    editBook: (id, title, author, currentCondition, description, situation) => {
        return new Promise((acpt, reject) => {
            connection.query(`UPDATE books SET title = ?, author = ?, currentCondition = ?, description = ?, situation = ? WHERE id = ?`, [title, author, currentCondition, description, situation, id], (err, results) => {
                if(err) {
                    reject(err);
                    return;
                }

                acpt(results);
            });
        })
    },

    removeBook: (id) => {
        return new Promise((acpt, reject) => {
            connection.query(`DELETE FROM books WHERE id = ?`, [id], (err, results) => {
                if(err) {
                    reject(err);
                    return;
                }

                acpt(results);
            });
        })
    }
}