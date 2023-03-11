const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "7uNkXN4A8j8wTx35yW34",
    host: "virtual-collection.cywueo0ars7u.us-west-2.rds.amazonaws.com",
    port: 5432,
    database: "postgres"
});

module.exports = pool;