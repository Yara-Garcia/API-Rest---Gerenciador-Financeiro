const express = require('express');
const { cadastrarUsuario, fazerLogin } = require('./controladores/usuarios');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', fazerLogin)

module.exports = rotas;