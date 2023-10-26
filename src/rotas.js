const express = require('express');
const categorias = require('./controladores/categorias');
const transacoes = require('./controladores/transacoes');
const { cadastrarUsuario } = require('./controladores/usuarios');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario)

module.exports = rotas;