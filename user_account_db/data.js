const express = require("express")    // Express HTTP Server Framework
const axios = require('axios')         // Axios HTTP Client Library
const { Client } = require('pg') 

const userDB = []
module.exports = { userDB }

const app = express()
app.use(express.json())

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'postgres',
//     password: 'postgres',
//     port: 5003,
// })

// client.connect()

app.post("/events", async (req, res) => {
    console.log("[posts-db] Received Event: ", req.body.type)

    const { type, data } = req.body

    // If there is a PostCreated event, insert it into the database.
    if (type === "AccountCreated") {
        console.log('Okay gurl')
    }

    // If there is a PostsOnBoot event, query the database for all
    // posts and post a PostsInit event with all the posts as the data.
    res.send({});
})

const server = app.listen(8000, () => {
    console.log("[posts-db] Listening on 8000");
});