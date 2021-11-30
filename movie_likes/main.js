const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require('axios');
 
const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 5001
 
let likesByMovieId = {};
 
app.get('/movies/:id/likes', (req, res) => {
    const id = req.params.id;

   if (!(id in likesByMovieId)) {
    res.status(400).send("Movie ID " + id + " does not exist.");
   } else {
    res.send(likesByMovieId[id].likes.toString());
   }
});

app.put('/movies/:id/like', async (req, res) => {
    const id = req.params.id;

    if (!(id in likesByMovieId)) {
        res.status(400).send("Movie ID " + id + " does not exist.");
        exit();
    } else {
        const likes = likesByMovieId[id].likes + 1;
        likesByMovieId[id].likes = likes;
 
        await axios.post("http://localhost:5005/events", {
            type: "MovieLiked",
            data: {
                id: id,
                likes: likes
            },
        });
        res.status(201).send(likesByMovieId[id]);
    } 
})
 
app.put('/movies/:id/unlike', async (req, res) => {
    const id = req.params.id;

    if (!(id in likesByMovieId)) {
        res.status(400).send("Movie ID " + id + " does not exist.");
        exit();
    } else if (likesByMovieId[id].likes == 0) {
        res.status(400).send("Movie likes for ID " + id + " cannnot go below 0.");
        exit();
    } else {
        const likes = likesByMovieId[id].likes - 1;
        likesByMovieId[id].likes = likes;
 
        await axios.post("http://localhost:5005/events", {
            type: "MovieUnliked",
            data: {
                id: id,
                likes: likes
            },
        });
        res.status(201).send(likesByMovieId[id]);
    } 
})

app.post('/events', (req, res) => {
    console.log('Event Received:', req.body.type);
 
    const { type, data } = req.body;

    if (type == 'AllMovieLikes') {
        for (const {id, likes} of data) {
            likesByMovieId[id] = {
                id: id,
                likes: likes
            }
        }
    }

    res.send({});
});


async function initOnBoot() {
    await axios.post("http://localhost:5005/events", {
        type: "GetMovieLikes",
        data: {},
    });
}

 
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)

    initOnBoot();
})

