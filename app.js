const http = require("http");
const hostname = '127.0.0.1';
const port = 5000;
const { knexSnakeCaseMappers, Model } = require('objection');
const Knex = require('knex');
const express = require("express");
const app = express()

const connection = {
    host: "localhost",
    user: "postgres",
    database: "genesis",
    port: 5434,
    password: "",
    debug: true,
    asyncStackTraces: true,
}


const knex = Knex({
    client: 'pg',
    connection,
    pool: {
        min: 0,
        max: 20,
    },
    acquireConnectionTimeout: 10000,
    ...knexSnakeCaseMappers(),
});
Model.knex(knex);


app.get("/get_db", async (req, res) => {
    const statuses = await knex('order_statuses').select('id', 'status');
    console.log(statuses);
    res.send("ddd");
})

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})