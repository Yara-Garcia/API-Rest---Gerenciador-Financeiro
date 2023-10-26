const express = require('express');
const categorias = require('./controladores/categorias');
const transacoes = require('./controladores/transacoes');
const usuarios = require('./controladores/usuarios');

const rotas = express();



module.exports = rotas;