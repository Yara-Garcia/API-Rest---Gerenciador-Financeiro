const pool = require('../conexao');
const jwt = require('jsonwebtoken')
const senhaJwt = require('../senhaJwt')

const listarTransacoes = async (req, res) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }

    const token = authorization.split('')[1]

    try {
        const tokenUsuario = jwt.verify(token, senhaJwt)
        const { rows } = await pool.query('select * from transacoes')
        return res.json(rows)
    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
    // O usuário deverá ser identificado através do ID presente no token de validação
    // O endpoint deverá responder com um array de todas as transações associadas ao usuário. Caso não exista nenhuma transação associada ao usuário deverá responder com array vazio.

}

const detalharTransacao = async (req, res) => {

    const { authorization } = req.headers
    const { id } = req.query

    try {
        const resultado = await pool.query('select * from transacoes where id = $1', [id]);
        return res.json(resultado)
    } catch (error) {
        console.log(error.message)
    }

    // Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado

}

const cadastrarTransacao = async (req, res) => {
    const { id } = req.query
    const { descricao, valor, data, categoria_id, tipo } = req.body

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

    // Validar se existe categoria para o id enviado no corpo (body) da requisição.
    // Validar se o tipo enviado no corpo (body) da requisição corresponde a palavra entrada ou saida, exatamente como descrito.
    // Cadastrar a transação associada ao usuário logado.


}

const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body

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

    // Validar se existe categoria para o id enviado no corpo (body) da requisição.

    const categoriaExiste = await pool.query('select * from usuarios where email = $1', [email]);

    if (categoriaExiste.rowCount > 0) {
        return res.status(400).json({ mensagem: 'Email já cadastrado. Por favor, tente novamente!' })
    }

    try {
        const resultado = await pool.query('select * from transacoes where id = $1', [id]);
        return res.json(resultado)
    } catch (error) {
        console.log(error.message)
    }

    // Validar se o tipo enviado no corpo (body) da requisição corresponde a palavra entrada ou saida, exatamente como descrito.
    // Atualizar a transação no banco de dados

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