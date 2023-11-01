
const verificarCamposObrigatorios = async (req, res, next) => {
    if (req.url === '/usuario') {

        const { nome, email, senha } = req.body;

        if (!nome) {
            return res.status(400).json({ mensagem: 'O campo nome é obrigatório' })
        }

        if (!email) {
            return res.status(400).json({ mensagem: 'O campo email é obrigatório' })
        }

        if (!senha) {
            return res.status(400).json({ mensagem: 'O campo senha é obrigatório' })
        }
    }

    if (req.url === '/login') {

        const { email, senha } = req.body;

        if (!email) {
            return res.status(400).json({ mensagem: 'O campo email é obrigatório' })
        }

        if (!senha) {
            return res.status(400).json({ mensagem: 'O campo senha é obrigatório' })
        }
    }

    next()
}

module.exports = verificarCamposObrigatorios;