const pool = require('../conexao');
const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

const cadastrarUsuario = async (req, res) => {
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

    const emailExiste = await pool.query('select * from usuarios where email = $1', [email]);

    if (emailExiste.rowCount > 0) {
        return res.status(400).json({ mensagem: 'Email já cadastrado. Por favor, tente novamente!' })
    }

    try {
        const senhaCriptografada = await hash(senha, 10);

        const novoUsuario = await pool.query(`insert into usuarios (nome, email, senha) 
        values ($1, $2, $3) returning *`, [nome, email, senhaCriptografada]);

        const { senha: _, ...usuario } = novoUsuario.rows[0]

        return res.status(201).json(usuario)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}





const listarTransacoes = async (req, res) => {

    const { authorization } = req.headers

    try {
        const resultado = await pool.query('select * from transacoes')
        return res.json(resultado)
    } catch (error) {
        console.log(error.message)
    }

}

const detalharTransacao = async (req, res) => {

    const { authorization } = req.headers
    const { id } = req.query

    try {
        const resultado = await pool.query('select * from transacoes where id = $id')
        return res.json(resultado)
    } catch (error) {
        console.log(error.message)
    }

}

const cadastrarTransacao = async (req, res) => {

}

const atualizarTransacao = async (req, res) => {

}

const excluirTransacao = async (req, res) => {

}

const obterExtrato = async (req, res) => {

}

module.exports = {
    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    excluirTransacao,
    obterExtrato
}