// knex-connector.js
const knex = require('knex')

// knex connector
const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "nodeprojdb.db"
    }
})

module.exports = connectedKnex;