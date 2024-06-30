const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'changeOfBooks',
    port: 3307
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log("Conexão ao banco de dados estabelecida com sucesso!");
});

module.exports = connection;
