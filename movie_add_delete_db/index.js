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
    console.log("[movielist-db] Received Event", req.body.type);

    const { type, data } = req.body;

    // If there is a MovieAdded event, insert it into the database.
    if (type === "MovieAdded") {
        const { id, movie_id, title, description } = data;
        const text = 'insert into userlist (id, movie_id, title, description) values ($1, $2, $3, $4)';
        const values = [id, movie_id, title, description];
        await client.query(text, values);
    }

    // If there is a MovieDeleted event, delete from database
    if (type === "MovieDeleted") {
        const { id, movie_id} = data;
        const text = 'delete from userlist WHERE id=($1) and movie_id=($2)';
        const values = [id, movie_id];
        await client.query(text, values);
    }

    if (type === "GetMovies") {
        const text = 'select * from userlist';
        const result = await client.query(text);

        await axios.post("http://localhost:5000/events", {
            type: "AllMovies",
            data: result.rows,
        });
    }
    res.send({});
});

const server = app.listen(6000, () => {
    console.log("[posts-db] Listening on 6000");
});
