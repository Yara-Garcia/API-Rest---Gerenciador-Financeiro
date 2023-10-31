const pool = require('../conexao');

const listarCategorias = async (req, res) => {
    try {
        const { rows, rowCount } = await pool.query('select * from categorias')

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: 'Não há categorias cadastradas.' })
        }

        return res.status(200).json(rows)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = listarCategorias