const pool = require('../conexao');

const cadastrarTransacao = async (req, res) => {
    const { tipo, descricao, valor, data, categoria_id } = req.body

    try {
        const { id } = req.usuario

        const cadastroTransacao = await pool.query(`insert into transacoes
        (tipo, descricao, valor, data, usuario_id, categoria_id )
        values ($1, $2, $3, $4, $5, $6) returning *`, [tipo, descricao, valor, data, id, categoria_id])

        const idTransacaoCriada = cadastroTransacao.rows[0].id

        const { rows } = await pool.query(
            `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id,
        c.descricao as categoria_nome
        from transacoes t join categorias c on t.categoria_id = c.id
        where t.usuario_id = $1 and t.id = $2`, [id, idTransacaoCriada])

        return res.status(201).json(rows)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

const listarTransacoes = async (req, res) => {
    try {
        const { id } = req.usuario
        const { filtro } = req.query

        if (!filtro) {
            const query = await pool.query(
                `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id,
            c.descricao as categoria_nome
            from transacoes t join categorias c on t.categoria_id = c.id
            where t.usuario_id = $1`, [id])

            return res.status(200).json(query.rows)
        }

        const transacoesFiltradas = []
        const categoriasQuery = await pool.query('select * from categorias');
        const listaCategorias = categoriasQuery.rows

        for (let i = 0; i < filtro.length; i++) {

            const categoriaDoFiltro = filtro[i];
            const categoriaDoFiltroMinusculo = categoriaDoFiltro.toLowerCase()

            for (let categoria of listaCategorias) {

                if (categoria.descricao.toLowerCase() === categoriaDoFiltroMinusculo) {
                    const queryFiltro = await pool.query(
                        `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id,
                    c.descricao as categoria_nome
                    from transacoes t join categorias c 
                    on t.categoria_id = c.id
                    where t.usuario_id = $1 and c.descricao ilike $2`, [id, categoriaDoFiltroMinusculo])

                    transacoesFiltradas.push(...queryFiltro.rows)
                }
            }
        }

        return res.status(200).json(transacoesFiltradas)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Erro interno do servidor')
    }
}

const detalharTransacao = async (req, res) => {

    const { id } = req.params

    try {
        const id_usuario = req.usuario.id

        const { rows } = await pool.query(
            `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id,
        c.descricao as categoria_nome
        from transacoes t join categorias c on t.categoria_id = c.id
        where t.usuario_id = $1 and t.id = $2`, [id_usuario, id])

        return res.status(200).json(rows[0])

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
}

const obterExtrato = async (req, res) => {

    try {
        const id_usuario = req.usuario.id

        const somaEntradas = await pool.query(`select sum(valor) as entradas from transacoes
        where usuario_id = $1 and lower(tipo) like 'entrada'`, [id_usuario]);

        const somaSaidas = await pool.query(`select sum(valor) as saidas from transacoes
        where usuario_id = $1 and lower(tipo) like 'saida'`, [id_usuario]);

        const resultadoEntrada = somaEntradas.rows[0]
        const resultadoSaida = somaSaidas.rows[0]

        const entradas = resultadoEntrada.entradas === null ? 0 : resultadoEntrada.entradas
        const saidas = resultadoSaida.saidas === null ? 0 : resultadoSaida.saidas

        const resultado = {
            entradas,
            saidas
        }

        return res.status(200).json(resultado)

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
}

const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body
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

        return res.status(204).json(resultado)

    } catch (error) {
        return res.status(500).json('Erro interno do servidor')
    }
}

const excluirTransacao = async (req, res) => {
    const { id } = req.params

    try {
        const resultado = await pool.query('delete from transacoes where id = $1', [id])

        return res.status(204).json(resultado)

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