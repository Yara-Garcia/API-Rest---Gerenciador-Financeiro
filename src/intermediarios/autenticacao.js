const pool = require('../conexao')
const jwt = require('jsonwebtoken')
const senhaJwt = require('../senhaJwt')

const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Requisição não autorizada: você não tem permissão para acessar este recurso.' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, senhaJwt)

        const { rows, rowCount } = await pool.query('select * from usuarios where id = $1', [id])

        if (rowCount < 1) {
            return res.status(401).json({ mensagem: 'Requisição não autorizada: você não tem permissão para acessar este recurso.' })
        }

        req.usuario = rows[0];

        next()

    } catch (error) {
        console.log(error.name)
        if (error.name === 'JsonWebTokenError' || error.name === 'SyntaxError') {
            return res.status(401).json({ mensagem: 'Token de autenticação inválido.' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensagem: 'Token de autenticação expirado.' });
        } else {
            return res.status(500).json({ mensagem: 'Erro interno no servidor' });
        }
    }
}

module.exports = verificarUsuarioLogado