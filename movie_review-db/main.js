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
    port: 6543,
});

// Connect to the database
client.connect();

// Listen for events from the event bus
app.post("/events", async (req, res) => {
    console.log("[movie_reviews-db] Received Event", req.body.type);

    const { type, data } = req.body;

    // // If there is a PostCreated event, insert it into the database.
    if (type === "ReviewCreated") {
        const { user_id, review_text} = data;
        const text = 'insert into reviews (user_id, review_text) values ($1, $2)';
        const values = [user_id, review_text];
        await client.query(text, values);
    }

    // // If there is a PostsOnBoot event, query the database for all
    // // posts and post a PostsInit event with all the posts as the data.
    if (type === "GetReviews") {
        const text = 'select * from reviews';
        const result = await client.query(text);

        await axios.post("http://localhost:5005/events", {
            type: "AllReviews",
            data: result.rows,
        });
    }

    res.send({});
});

const server = app.listen(6000, () => {
    console.log("[movie_review-db] Listening on 6000");
});
