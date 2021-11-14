const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require('axios');
 
const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 5001
 
let likesByMovieId = {"1": 1, "2": 100, "3": 10};
 
app.get('/movies/:id/likes', (req, res) => {
    const id = req.params.id;
    if (!(id in likesByMovieId)) {
        res.status(400).send("Movie ID " + id + " does not exist.");
    } else {
        res.send(likesByMovieId[id].toString());
    }
   
});
 
app.put('/movies/:id/likes', async (req, res) => {
    const id = req.params.id;
    if (!(id in likesByMovieId)) {
        res.status(400).send("Movie ID " + id + " does not exist.");
    } else {
        likesByMovieId[id] = likesByMovieId[id] + 1;
        likes = likesByMovieId[id]
 
    await axios.post("http://localhost:5005/events", {
        type: "MovieLiked",
        data: {
            id,
            likes
        },
    });
 
        res.status(201).send(likesByMovieId);
    }
})
 
app.post('/events', (req, res) => {
    console.log('Event Received:', req.body.type);
 
    res.send({});
  });
 
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

