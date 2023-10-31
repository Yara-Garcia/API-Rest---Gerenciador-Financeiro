const express = require('express');

const verificarUsuarioLogado = require('./intermediarios/autenticacao');

const {
    cadastrarUsuario,
    fazerLogin
} = require('./controladores/usuarios');

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

const rotas = express();


rotas.post('/usuario', cadastrarUsuario);

rotas.post('/login', fazerLogin);

rotas.post('/transacao',
    verificarUsuarioLogado,
    verificarPreenchimentoDosCampos,
    verificarExistenciaDeCategoria,
    verificarEscritaDoCampoTipo,
    cadastrarTransacao
);

rotas.get('/transacao',
    verificarUsuarioLogado,
    listarTransacoes
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