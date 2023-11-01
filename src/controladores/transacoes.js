const pool = require('../conexao');

const cadastrarTransacao = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body

    try {
        const { id } = req.usuario

        const cadastroTransacao = await pool.query(`insert into transacoes
        (tipo, descricao, valor, data, usuario_id, categoria_id )
        values ($1, $2, $3, $4, $5, $6) returning id`, [tipo, descricao, valor, data, id, categoria_id])
        //ta dando erro aqui

        const idTransacaoCriada = cadastroTransacao.rows[0].id

        const { rows } = await pool.query(
            `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id,
        c.descricao as categoria_nome
        from transacoes t join categorias c on t.usuario_id = $1 and t.id = $2`, [id, idTransacaoCriada])

        return res.status(201).json(rows)

    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro interno do servidor')
    }
}

const listarTransacoes = async (req, res) => {
    try {
        const { id } = req.usuario

        const { rows } = await pool.query(
            `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id,
        c.descricao as categoria_nome
        from transacoes t join categorias c on t.usuario_id = $1 and c.descricao = $2`, [id, descricao])

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: 'Não foi encontrada nenhuma transação' })
        }

        return res.status(200).json(rows)

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }

    // O usuário deverá ser identificado através do ID presente no token de validação
    // O endpoint deverá responder com um array de todas as transações associadas ao usuário. Caso não exista nenhuma transação associada ao usuário deverá responder com array vazio.

    //mensagem para caso nao encontre nenhuma transacao
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

        const resultadoEntrada = entrada.rows[0]
        const resultadoSaida = saida.rows[0]
        const resultado = {
            resultadoEntrada,
            resultadoSaida
        }
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