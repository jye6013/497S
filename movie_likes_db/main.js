const express = require("express");     // Express HTTP Server Framework
const axios = require('axios');         // Axios HTTP Client Library
const { Client } = require('pg')        // pg Postgresql Library

// Create the Express App
const app = express();
app.use(express.json());

// Create a new client configuration object
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

// Connect to the database
client.connect();

// Listen for events from the event bus
app.post("/events", async (req, res) => {
    console.log("[movie_likes-db] Received Event", req.body.type);

    const { type, data } = req.body;

    if (type === "MovieLiked") {
        const { id, likes } = data;
        const text = 'update movie_likes set likes =$2, where id =$1'
        const values = [id, likes]
        await client.query(text, values);
    }

    if (type === "GetMovieLikes") {
        const text = 'select * from movie_likes'
        const result = await client.query(text);

        await axios.post("http://localhost:5005/events", {
            type: "AllMovieLikes",
            data: result.rows,
        });
    }

    res.send({});
});

const server = app.listen(6000, () => {
    console.log("[movie_likes-db] Listening on 6000");
});
