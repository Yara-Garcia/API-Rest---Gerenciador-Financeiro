const pool = require('../conexao');


const cadastrarTransacao = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body
    const { authorization } = req.headers

    try {
        const { id } = req.usuario

        const { rows } = await pool.query(`insert into transacoes
        (tipo, descricao, valor, data, categoria_id, usuario_id )
        values ($1, $2, $3, $4, $5, $6) returning *`, [tipo, descricao, valor, data, categoria_id, id])

        return res.status(201).json(rows)

        // faltou inserir a  "categoria_nome": "Salários" na resposta

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
        return res.status(200).json(rows)

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

        console.log(transacaoExiste)
        return res.status(200).json(transacaoExiste.rows)

        // faltou inserir a  "categoria_nome": "Salários" na resposta

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
}

const obterExtrato = async (req, res) => {
    const { authorization } = req.headers

    try {
        const id_usuario = req.usuario.id

        const entrada = await pool.query(`select sum(valor) as entrada from transacoes
        where usuario_id = $1 and tipo like 'entrada'`, [id_usuario]);

        const saida = await pool.query(`select sum(valor) as saida from transacoes
        where usuario_id = $1 and tipo like 'saida'`, [id_usuario]);

        const resultado = [entrada.rows[0], saida.rows[0]]
        // não consegui transformar em um único objeto
        return res.status(200).json(resultado)

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

        return res.status(204).json()

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

        return res.status(204).json()

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