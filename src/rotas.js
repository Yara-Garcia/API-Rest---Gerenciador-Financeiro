const express = require('express');
const rotas = express();
const verificarUsuarioLogado = require('./intermediarios/autenticacao');
const verificarCamposObrigatorios = require('./intermediarios/verificadoresUsuarios');
const listarCategorias = require('./controladores/categorias');

const {
    cadastrarUsuario,
    fazerLogin,
    detalharUsuario,
    atualizarUsuario
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

rotas.post('/transacao',
    verificarPreenchimentoDosCampos,
    verificarExistenciaDeCategoria,
    verificarEscritaDoCampoTipo,
    cadastrarTransacao
);

rotas.get('/transacao',
    listarTransacoes
)

rotas.get('/transacao/:id',
    verificarExistenciaDeTransacao,
    verificarVinculoDaTransacaoComUsuario,
    detalharTransacao
);

rotas.get('/transacao/extrato',
    obterExtrato
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