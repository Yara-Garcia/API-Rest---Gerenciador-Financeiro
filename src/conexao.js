const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Caps@683',
    database: 'dindin',
})

module.exports = pool