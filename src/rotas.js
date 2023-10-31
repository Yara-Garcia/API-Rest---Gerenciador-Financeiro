const express = require('express');
const rotas = express();

const verificarUsuarioLogado = require('./intermediarios/autenticacao');

const {
    cadastrarUsuario,
    fazerLogin,
    detalharUsuario,
    atualizarUsuario
} = require('./controladores/usuarios');

const listarCategorias = require('./controladores/categorias');

const {
    cadastrarTransacao,
    listarTransacoes,
    obterExtrato,
    detalharTransacao,
    atualizarTransacao,
    excluirTransacao
} = require('./controladores/transacoes');

const {
    verificarPreenchimentoDosCampos,
    verificarExistenciaDeCategoria,
    verificarEscritaDoCampoTipo,
    verificarExistenciaDeTransacao,
    verificarVinculoDaTransacaoComUsuario
} = require('./intermediarios/verificadoresTransacoes');


rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', fazerLogin);

rotas.use(verificarUsuarioLogado);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario)

rotas.get('/categoria', listarCategorias);

rotas.post('/transacao',
    verificarUsuarioLogado,
    verificarPreenchimentoDosCampos,
    verificarExistenciaDeCategoria,
    verificarEscritaDoCampoTipo,
    cadastrarTransacao
);

rotas.get('/transacao/extrato',
    verificarUsuarioLogado,
    obterExtrato
);

rotas.get('/transacao/:id',
    verificarUsuarioLogado,
    verificarExistenciaDeTransacao,
    verificarVinculoDaTransacaoComUsuario,
    detalharTransacao
);

rotas.put('/transacao/:id',
    verificarUsuarioLogado,
    verificarExistenciaDeTransacao,
    verificarVinculoDaTransacaoComUsuario,
    verificarPreenchimentoDosCampos,
    verificarExistenciaDeCategoria,
    verificarEscritaDoCampoTipo,
    atualizarTransacao
);

rotas.delete('/transacao/:id',
    verificarUsuarioLogado,
    verificarExistenciaDeTransacao,
    verificarVinculoDaTransacaoComUsuario,
    excluirTransacao
);

module.exports = rotas;