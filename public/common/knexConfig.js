knex = require('knex');

module.exports = {
    knexConn : function () {
        return knex({
            debug: false,
            client: "pg",
            connection: {
                user: "postgres",
                password: "pgadmin95",
                host: "localhost",
                port: 5432,
                database: "postgres",
                ssl: false
            }
        })
    }
};