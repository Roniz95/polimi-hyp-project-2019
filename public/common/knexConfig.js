knex = require('knex');
let test = false;
module.exports = {
    knexConn: function () {
        if(test) {
            return knex({
                debug: false,
                client: "pg",
                connection: {
                    user: "grznjjohncvgyj",
                    password: "277680c3b3ed316a28e0fbbe993e96139d997f8392abe868a2371367cc9115b7",
                    host: "ec2-23-21-160-38.compute-1.amazonaws.com",
                    port: 5432,
                    database: "d6nb309co79e8p",
                    ssl: true
                }
            })
        } else {
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
    }
}