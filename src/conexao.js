const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '@Kb4manamara',
    database: 'dindin',
})

module.exports = pool