const express = require('express');
const verificarUsuarioLogado = require('./intermediarios/autenticacao');
const { cadastrarUsuario, fazerLogin, detalharUsuario, atualizarUsuario } = require('./controladores/usuarios');
const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', fazerLogin);
rotas.use(verificarUsuarioLogado);
rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario)


/*rotas.get('/transacao', transacoes.listarTransacoes);
rotas.get('/transacao/:id', transacoes.detalharTransacao);
rotas.post('/transacao', transacoes.cadastrarTransacao);
rotas.put('/transacao/:id', transacoes.atualizarTransacao);
rotas.delete('/transacao/:id', transacoes.excluirTransacao);
rotas.get('/transacao/extrato', transacoes.obterExtrato);*/


module.exports = rotas;