const BookService = require('../models/BookService');

module.exports = {
    getBooksByUserId: async (req, res) => {
        try {
            let fk_user_idUser = req.cookies.fk_user_idUser;

            if (userId) {
                await BookService.getBooksByUserId(fk_user_idUser);
            } else {
                res.status(500).send('Usuário não autenticado');
            }
        } catch (err) {
            console.error('Erro ao buscar livros:', err);
            res.status(500).send('Erro ao buscar livros');
        }
    },

    getAllBooks: async (req, res) => {
        try {   
            let books = await BookService.getAllBooks();
            res.render('livros', { objLivros: books });
        } catch(err) {
            res.status(500).json(err);
        }
    },

    getBookByID: async (req, res) => {
        let id = req.params.id;
        let book = await BookService.getBookByID(id);
        res.json(book);
    },

    createBook: async (req, res) => {
        try {
            let { title, author, currentCondition, description, situation } = req.body;

            let fk_user_idUser = req.cookies.fk_user_idUser;
            console.log(`ID do usuário logado: ${fk_user_idUser}`);
        
            if(title && author && currentCondition && description && situation && fk_user_idUser) {
                await BookService.createBook(title, author, currentCondition, description, situation, fk_user_idUser);
                let books = await BookService.getAllBooks();
                res.render('meusLivros', { objLivros: books });
            } else {
                res.status(500).send('Campos inválidos!');
            }
        } catch(err) {
            res.status(500).send('Erro ao criar livro');
        }
    },

    editBookForm: async (req, res) => {
        try {
            let id = req.params.id;
            let book = await BookService.getBookByID(id);
            
            if (!book) {
                res.status(404).send('Livro não encontrado');
                return;
            }
    
            res.render('editLivro', { book });
        } catch (err) {
            res.status(500).send('Erro ao carregar formulário de edição');
        }
    },

    editBook: async (req, res) => {
        try {
            let id = req.params.id;
            let { title, author, currentCondition, description, situation } = req.body;

            if (title && author && currentCondition && description && situation) {
                await BookService.editBook(id, title, author, currentCondition, description, situation);
                res.redirect('/meusLivros');
            } else {
                res.status(400).send('Campos não enviados ou incorretos');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao atualizar livro');
        }
    },

    deleteBook: async(req, res) => {
        try {
            let id = req.params.id;
            await BookService.removeBook(id);
            res.redirect('/meusLivros');
        } catch(err) {
            res.status(500).send('Erro ao deletar livro');
        }
    }
}