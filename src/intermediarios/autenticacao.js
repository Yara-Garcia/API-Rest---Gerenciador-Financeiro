const jwt = require('jsonwebtoken')
const senhaJwt = require('../senhaJwt')

const verificarUsuarioLogado = async (req, resp, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return resp.status(401).json({ mensagem: 'Não autorizado' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, senhaJwt)

        const { rows, rowCount } = await pool.query('select * from usuarios where id = $1', [id])

        if (rowCount < 1) {
            return resp.status(401).json({ mensagem: 'Não autorizado' })
        }

        req.usuario = rows[0];

        next()

    } catch (error) {
        console.log(error.message)
        return resp.status(401).json({ mensagem: 'Não autorizado' })
    }
}

module.exports = verificarUsuarioLogado