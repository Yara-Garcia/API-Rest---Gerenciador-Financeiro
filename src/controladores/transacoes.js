const pool = require('../conexao');


const cadastrarTransacao = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body
    const { authorization } = req.headers

    if (!tipo) {
        return res.status(404).json({ mensagem: 'O campo tipo é obrigatório' })
    }

    if (!descricao) {
        return res.status(404).json({ mensagem: 'A descrição é obrigatória' })
    }

    if (!valor) {
        return res.status(404).json({ mensagem: 'O valor é obrigatório' })
    }

    if (!data) {
        return res.status(404).json({ mensagem: 'A data é obrigatória' })
    }

    if (!categoria_id) {
        return res.status(404).json({ mensagem: 'A categoria é obrigatória' })
    }

    const categoriaExiste = await pool.query('select * from categorias where id = $1', [categoria_id]);

    if (categoriaExiste.rowCount == 0) {
        return res.status(400).json({ mensagem: 'Categoria inexistente!' })
    }

    if (tipo != "entrada" || "saida") {
        return res.status(400).json({ mensagem: 'O tipo da categoria deve ser igual a entrada ou saida.' })
    }

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

        if (transacaoExiste.rowCount == 0) {
            return res.status(400).json({ mensagem: 'Transacao inexistente!' })
        }

        return res.json(transacaoExiste.rows)

    } catch (error) {
        console.log(error.message)
    }

    // não pertence ao usuario
    // id não encontrado

}


const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const { authorization } = req.headers
    const { id } = req.params

    if (!descricao) {
        return res.status(404).json({ mensagem: 'A descrição é obrigatória' })
    }

    if (!valor) {
        return res.status(404).json({ mensagem: 'O valor é obrigatório' })
    }

    if (!data) {
        return res.status(404).json({ mensagem: 'A data é obrigatória' })
    }

    if (!categoria_id) {
        return res.status(404).json({ mensagem: 'A categoria é obrigatória' })
    }

    if (!tipo) {
        return res.status(404).json({ mensagem: 'O campo tipo é obrigatório' })
    }

    const categoriaExiste = await pool.query('select * from categorias where id = $1', [categoria_id]);

    if (categoriaExiste.rowCount == 0) {
        return res.status(400).json({ mensagem: 'Categoria inexistente!' })
    }

    if (tipo != "entrada" && tipo != "saida") {
        return res.status(400).json({ mensagem: 'O tipo da categoria deve ser igual a entrada ou saida.' })
    }


    try {
        const resultado = await pool.query(`update transacoes
        set
        descricao = $1,
        valor = $2,
        data = $3,
        categoria_id = $4,
        tipo = $5
        where id = $6`, [descricao, valor, data, categoria_id, tipo, id]);

        return res.json()

    } catch (error) {
        console.log(error.message)
    }

}

const excluirTransacao = async (req, res) => {
    const { id } = req.query
    // Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
    try {
        const resultado = await pool.query('delete from transacoes where id = $1', [id])
        return res.json(resultado)
    } catch (error) {
        console.log(error.message)
    }

    //Excluir a transação no banco de dados.

}

const obterExtrato = async (req, res) => {
    // Em caso de não existir transações do tipo entrada cadastradas para o usuário logado, o valor retornado no corpo (body) da resposta deverá ser 0.
    // Em caso de não existir transações do tipo saida cadastradas para o usuário logado, o valor retornado no corpo (body) da resposta deverá ser 0.

    // A criação desta rota, no arquivo rotas.js, deverá acontecer antes da criação da rota de detalhamento de uma transação (GET /transacao/:id), caso contrário, esta rota nunca será possível ser acessada.

}

module.exports = {
    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    excluirTransacao,
    obterExtrato
}