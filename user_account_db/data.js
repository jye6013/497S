const express = require("express")    // Express HTTP Server Framework
const axios = require('axios')         // Axios HTTP Client Library
const { Client } = require('pg') 

const userDB = []
module.exports = { userDB }

const app = express()
app.use(express.json())

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123456',
    port: 5432,
});

// Connect to the database
client.connect();

app.post("/events", async (req, res) => {
    console.log("[accountlist-db] Received Event: ", req.body.type)

    const { type, data } = req.body

    // If there is a AccountCreated event, insert it into the database.
    if (type === "AccountCreated") {
        console.log('Okay gurl')
        const { id, username, email, password } = data
        const text = 'INSERT INTO account_list_by_ray (id, username, email, password) values ($1, $2, $3, $4);'
        const values = [id, username, email, password]
        await client.query(text, values)
    }
    // posts and post a PostsInit event with all the posts as the data.
    res.send({});
})

app.listen(7000, () => {
    console.log("[accountlist-db] Listening on 7000");
});