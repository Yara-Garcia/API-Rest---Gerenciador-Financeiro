const express = require('express');
const rotas = express();
const verificarUsuarioLogado = require('./intermediarios/autenticacao');
const verificarCamposObrigatorios = require('./intermediarios/verificadoresUsuarios');
const listarCategorias = require('./controladores/categorias');
const {
    verificarPreenchimentoDosCampos,
    verificarExistenciaDeCategoria,
    verificarEscritaDoCampoTipo,
    verificarExistenciaDeTransacao,
    verificarVinculoDaTransacaoComUsuario
} = require('./intermediarios/verificadoresTransacoes');

const {
    cadastrarUsuario,
    fazerLogin,
    detalharUsuario,
    atualizarUsuario
} = require('./controladores/usuarios');

const {
    cadastrarTransacao,
    listarTransacoes,
    detalharTransacao,
    obterExtrato,
    atualizarTransacao,
    excluirTransacao
} = require('./controladores/transacoes');

rotas.post('/usuario',
    verificarCamposObrigatorios,
    cadastrarUsuario
);

rotas.post('/login',
    verificarCamposObrigatorios,
    fazerLogin
);

rotas.use(verificarUsuarioLogado);

rotas.get('/usuario',
    detalharUsuario
)

rotas.put('/usuario',
    verificarCamposObrigatorios,
    atualizarUsuario
)

rotas.get('/categoria', listarCategorias);

rotas.get('/transacao',
    listarTransacoes
);

rotas.get('/transacao/extrato',
    obterExtrato
);

rotas.get('/transacao/:id',
    verificarExistenciaDeTransacao,
    verificarVinculoDaTransacaoComUsuario,
    detalharTransacao
);

rotas.post('/transacao',
    verificarPreenchimentoDosCampos,
    verificarExistenciaDeCategoria,
    verificarEscritaDoCampoTipo,
    cadastrarTransacao
);

rotas.put('/transacao/:id',
    verificarExistenciaDeTransacao,
    verificarVinculoDaTransacaoComUsuario,
    verificarPreenchimentoDosCampos,
    verificarExistenciaDeCategoria,
    verificarEscritaDoCampoTipo,
    atualizarTransacao
);

rotas.delete('/transacao/:id',
    verificarExistenciaDeTransacao,
    verificarVinculoDaTransacaoComUsuario,
    excluirTransacao
);

module.exports = rotas;