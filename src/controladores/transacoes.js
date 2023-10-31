const pool = require('../conexao');


const cadastrarTransacao = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body
    const { authorization } = req.headers

    try {
        const { id } = req.usuario

        const { rows } = await pool.query(`insert into transacoes
        (tipo, descricao, valor, data, categoria_id, usuario_id )
        values ($1, $2, $3, $4, $5, $6) returning *`, [tipo, descricao, valor, data, categoria_id, id])
        return res.json(rows)

    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro interno do servidor')
    }
}


const listarTransacoes = async (req, res) => {
    const { authorization } = req.headers

    try {
        const { id } = req.usuario

        const { rows } = await pool.query('select * from transacoes where usuario_id = $1', [id])
        return res.json(rows)

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }

}


const detalharTransacao = async (req, res) => {

    const { authorization } = req.headers
    const { id } = req.params

    try {
        const id_usuario = req.usuario.id

        const transacaoExiste = await pool.query(`select * from transacoes
        where id = $1 and usuario_id = $2`, [id, id_usuario]);

        return res.status(200).json(transacaoExiste.rows)

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }

}


const obterExtrato = async (req, res) => {
    const { authorization } = req.headers

    try {
        const id_usuario = req.usuario.id

        const resultado = await pool.query(`select * from transacoes
        where usuario_id = $1`, [id_usuario]);

        return res.json(resultado.rows)

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
}


const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const { authorization } = req.headers
    const { id } = req.params

    try {
        const resultado = await pool.query(`update transacoes
        set
        descricao = $1,
        valor = $2,
        data = $3,
        categoria_id = $4,
        tipo = $5
        where id = $6`, [descricao, valor, data, categoria_id, tipo, id]);

        return res.status(201).json()

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }

}


const excluirTransacao = async (req, res) => {
    const { id } = req.params

    try {
        const id_usuario = req.usuario.id

        const transacaoExiste = await pool.query(`select * from transacoes
        where id = $1 and usuario_id = $2`, [id, id_usuario]);

        if (transacaoExiste.rowCount == 0) {
            return res.status(400).json({ mensagem: 'Transacao inexistente!' })
        }

        const resultado = await pool.query('delete from transacoes where id = $1', [id])

        return res.status(200).json()

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
}


module.exports = {
    cadastrarTransacao,
    listarTransacoes,
    detalharTransacao,
    obterExtrato,
    atualizarTransacao,
    excluirTransacao
}