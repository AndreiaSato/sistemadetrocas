const UserService = require('../models/UserService.js');

module.exports = {
    loginUser: async (req, res) => {
        const { emailClient, passClient } = req.body;

        try {
            const user = await UserService.getUserByEmailAndPassword(emailClient, passClient);

            if (user) {
                console.log(`Usuário logado: ${user.id}`);
                console.log(`Usuário logado: ${user.emailClient}`);
                res.cookie('fk_user_idUser', user.id, { httpOnly: true });
                res.cookie('emailClient', user.emailClient, { httpOnly: true });
                res.redirect('/home');
            } else {
                res.render('login', { error: 'Credenciais inválidas' });
            }
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            res.status(500).send('Erro interno ao fazer login');
        }
    },

    logoutUser: async (req, res) => {
        try {
            res.clearCookie('fk_user_idUser');
            res.clearCookie('emailClient');
            res.redirect('/login');
        } catch(err) {
            res.status(500).send('Erro interno ao fazer logout');
        }
    },

    createUser: async (req, res) => {
        try {
            let { userClient, emailClient, passClient, birthClient, phoneClient } = req.body;
        
            if(userClient && emailClient && passClient && birthClient && phoneClient) {
                await UserService.createUser(userClient, emailClient, passClient, birthClient, phoneClient);
                res.redirect('login');
            } else {
                res.status(500).send('Campos inválidos!');
            }
        } catch(err) {
            res.status(500).send('Erro ao criar usuário');
        }
    },

    getMyProposals: async (req, res) => {
        try {
            const fk_user_idUser = req.cookies.fk_user_idUser;
            const proposals = await ProposalService.getProposalsByUserId(fk_user_idUser);
            res.render('minhasPropostas', { proposals });
        } catch (err) {
            console.error('Erro ao buscar propostas do usuário:', err);
            res.status(500).send('Erro interno ao buscar propostas');
        }
    },
}