const ProposalService = require('../models/ProposalService');

module.exports = {
    createProposal: async (req, res) => {
        const { fk_book_idBook } = req.body;
        const fk_user_idUser = req.cookies.fk_user_idUser;

        try {
            await ProposalService.createProposal(fk_user_idUser, fk_book_idBook);
            res.redirect('/minhasPropostas');
        } catch (err) {
            console.error('Erro ao criar proposta:', err);
            res.status(500).send('Erro ao criar proposta');
        }
    },

    getAllProposals: async (req, res) => {
        try {
            const proposals = await ProposalService.getAllProposals();
            res.render('minhasPropostas', { proposals });
        } catch (err) {
            console.error('Erro ao buscar propostas:', err);
            res.status(500).send('Erro interno ao buscar propostas');
        }
    },

    getProposalsByUser: async (req, res) => {
        const fk_user_idUser = req.cookies.fk_user_idUser;

        try {
            const proposals = await ProposalService.getProposalsByUserId(fk_user_idUser);
            res.render('minhasPropostas', { proposals });
        } catch (err) {
            console.error('Erro ao buscar propostas:', err);
            res.status(500).send('Erro ao buscar propostas');
        }
    },

    getProposalsByBook: async (req, res) => {
        const { fk_book_idBook } = req.params;

        try {
            const proposals = await ProposalService.getProposalsByBookId(fk_book_idBook);
            res.render('propostasDoLivro', { proposals });
        } catch (err) {
            console.error('Erro ao buscar propostas:', err);
            res.status(500).send('Erro ao buscar propostas');
        }
    }
};
