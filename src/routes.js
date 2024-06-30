const express = require('express');
const router = express.Router();

const BookController = require('./controllers/BookController.js');
const BookService = require('./models/BookService.js');

const UserController = require('./controllers/UserController.js');
const ProposalController = require('./controllers/ProposalController.js');

//Quando abre o site cai nesse index
router.get('/', (req, res) => {res.render('index');});

//Quando loga abre essa pagina
router.get('/home', (req, res) => {res.render('home');});

router.get('/login', (req, res) => {res.render('login');});
router.post('/login', UserController.loginUser);
router.get('/logout', UserController.logoutUser);

router.get('/registrar', (req, res) => {res.render('registrar');});
router.post('/registrar', UserController.createUser);

router.get('/livros', BookController.getAllBooks);
router.get('/livros/:id', BookController.getBookByID);

//Ir para cadastrar e listar os cadastrados.
router.get('/meusLivros', async (req, res) => {
    try {
        let fk_user_idUser = req.cookies.fk_user_idUser;
        let books = await BookService.getBooksByUserId(fk_user_idUser);
        res.render('meusLivros', { objLivros: books });
    } catch (err) {
        res.status(500).send('Erro ao buscar livros');
    }
});
router.post('/meusLivros', BookController.createBook);

//Ir para a edição do livro
router.get('/editLivro/:id', BookController.editBookForm);
router.post('/editLivro/:id', BookController.editBook);

//Deletar o livro
router.post('/deleteLivro/:id', BookController.deleteBook);

//Fazer as propostas depois
router.get('/minhasPropostas', ProposalController.getProposalsByUser);
router.post('/proporLivro', ProposalController.createProposal);


module.exports = router;