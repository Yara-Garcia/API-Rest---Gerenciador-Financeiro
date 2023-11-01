const pool = require('../conexao');
const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

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

    try {
        const { rows, rowCount } = await pool.query('select * from usuarios where email = $1', [email]);

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: 'Email ou senha inválidos. Por favor, tente novamente!' })
        }

        const senhaCriptografada = rows[0].senha;

        const senhaValida = await compare(senha, senhaCriptografada)

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou senha inválidos. Por favor, tente novamente!' })
        }

        const token = jwt.sign({ id: rows[0].id }, senhaJwt, { expiresIn: '8h' })

        const { senha: _, ...usuario } = rows[0];

        return res.status(200).json({ usuario, token })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

const detalharUsuario = async (req, res) => {
    try {

        const { rowCount, rows } = await pool.query('select * from usuarios where id = $1', [req.usuario.id])

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' })
        }

        const { senha: _, ...usuario } = rows[0]

        return res.status(200).json(usuario)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    const { rowCount } = await pool.query('select * from usuarios where email = $1 and id != $2', [email, req.usuario.id]);

    if (rowCount > 0) {
        return res.status(400).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário.' })
    }

    try {
        const senhaCriptografada = await hash(senha, 10);

        const atualizacaoUsuario = await pool.query(`update usuarios 
        set nome = $1, 
        email = $2,
        senha = $3
        where id = $4`, [nome, email, senhaCriptografada, req.usuario.id]);

        return res.status(200).json(atualizacaoUsuario.rows[0])
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    cadastrarUsuario,
    fazerLogin,
    detalharUsuario,
    atualizarUsuario
}
