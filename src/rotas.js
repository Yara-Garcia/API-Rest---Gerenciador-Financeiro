const express = require('express');
const categorias = require('./controladores/categorias');
const transacoes = require('./controladores/transacoes');
<<<<<<< HEAD
const usuarios = require('./controladores/usuarios');
const autenticacao = require('./intermediarios/autenticacao');
const verificarUsuarioLogado = require('./intermediarios/autenticacao');

const rotas = express();

rotas.use(verificarUsuarioLogado);
rotas.get('/transacao', transacoes.listarTransacoes);
rotas.get('/transacao/:id', transacoes.detalharTransacao);
rotas.post('/transacao', transacoes.cadastrarTransacao);
rotas.put('/transacao/:id', transacoes.atualizarTransacao);
rotas.delete('/transacao/:id', transacoes.excluirTransacao);
rotas.get('/transacao/extrato', transacoes.obterExtrato);
=======
const { cadastrarUsuario } = require('./controladores/usuarios');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario)
>>>>>>> 274875cc55adff9901dda63a9cf477a661a8d019

module.exports = rotas;