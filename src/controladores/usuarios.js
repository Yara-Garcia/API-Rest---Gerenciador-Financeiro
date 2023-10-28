const pool = require('../conexao');
const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt')

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

const fazerLogin = async (req, res) => {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório' })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório' })
    }

    try {
        const { rows, rowCount } = await pool.query('select * from usuarios where email = $1', [email]);

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: 'Email não encontrado. Por favor, tente novamente!' })
        }

        const senhaCriptografada = rows[0].senha;

        const senhaValida = await compare(senha, senhaCriptografada)

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Senha inválida. Por favor, tente novamente!' })
        }

        const token = jwt.sign({ id: rows[0].id }, senhaJwt, { expiresIn: '8h' })

        const { senha: _, ...usuarioLogado } = rows[0];

        return res.status(200).json({ usuarioLogado, token })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = {
    cadastrarUsuario,
    fazerLogin
}
