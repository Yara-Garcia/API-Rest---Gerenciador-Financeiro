const pool = require('../conexao');

const verificarPreenchimentoDosCampos = (req, res, next) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body

    if (!tipo || !descricao || !valor || !data || !categoria_id) {
        return res.status(404).json({ mensagem: 'Todos os campos possuem preenchimento obrigatório' })
    }
    next()
}

const verificarExistenciaDeCategoria = async (req, res, next) => {
    const { categoria_id } = req.body
    const categoriaExiste = await pool.query('select * from categorias where id = $1', [categoria_id]);

    if (categoriaExiste.rowCount == 0) {
        return res.status(404).json({ mensagem: 'Categoria inexistente!' })
    }
    next()
}

const verificarEscritaDoCampoTipo = async (req, res, next) => {
    const { tipo } = req.body

    const tipoMinusculo = tipo.toLowerCase()

    if (tipoMinusculo !== "entrada" && tipoMinusculo !== "saida") {
        return res.status(400).json({ mensagem: 'O tipo da categoria deve ter escrita exatamente igual as palavras entrada ou saida.' })
    }
    next()
}

const verificarExistenciaDeTransacao = async (req, res, next) => {
    const id = req.params.id
    const idTransacaoExiste = await pool.query(`select * from transacoes where id = $1`, [id]);

    if (idTransacaoExiste.rowCount == 0) {
        return res.status(404).json({ mensagem: 'Id transação inexistente!' })
    }
    next()
}

const verificarVinculoDaTransacaoComUsuario = async (req, res, next) => {
    const id_usuario = req.usuario.id
    const { id } = req.params

    const transacaoPertenceAoUsuario = await pool.query(`select * from transacoes where
    usuario_id = $1 and id = $2`, [id_usuario, id])

    if (transacaoPertenceAoUsuario.rowCount == 0) {
        return res.status(403).json({ mensagem: 'Transacao inexistente para este usuário!' })
    }
    next()
}

module.exports = {
    verificarPreenchimentoDosCampos,
    verificarExistenciaDeCategoria,
    verificarEscritaDoCampoTipo,
    verificarExistenciaDeTransacao,
    verificarVinculoDaTransacaoComUsuario
}
