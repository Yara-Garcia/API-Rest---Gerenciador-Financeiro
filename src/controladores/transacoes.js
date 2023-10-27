
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