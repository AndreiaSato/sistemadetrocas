const connection = require('../db/dbConnection.js');

module.exports = {
    createProposal: (fk_user_idUser, fk_book_idBook) => {
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO proposal (fk_user_idUser, fk_book_idBook) VALUES (?, ?)', [fk_user_idUser, fk_book_idBook], (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(results);
                }
            );
        });
    },

    getAllProposals: () => {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT p.idProposalBook, b.title AS bookTitle, u.userClient AS ownerName, u2.userClient AS proposerName, DATE_FORMAT(p.createdProposal, '%d/%m/%Y %H:%i') AS createdProposal
                FROM proposal p
                INNER JOIN books b ON p.fk_book_idBook = b.id
                INNER JOIN users u ON b.fk_user_idUser = u.id
                INNER JOIN users u2 ON p.fk_user_idUser = u2.id
            `, (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    },
    
    getProposalsByUserId: (fk_user_idUser) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT p.idProposalBook, b.title AS bookTitle, u.userClient AS ownerName, u2.userClient AS proposerName, DATE_FORMAT(p.createdProposal, '%d/%m/%Y %H:%i:%s') AS createdProposal
                FROM proposal p
                INNER JOIN books b ON p.fk_book_idBook = b.id
                INNER JOIN users u ON b.fk_user_idUser = u.id
                INNER JOIN users u2 ON p.fk_user_idUser = u2.id
                WHERE p.fk_user_idUser = ?
            `;
            connection.query(query, [fk_user_idUser], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    },

    getProposalsByBookId: (fk_book_idBook) => {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM proposal WHERE fk_book_idBook = ?', [fk_book_idBook], (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(results);
                }
            );
        });
    }
};
