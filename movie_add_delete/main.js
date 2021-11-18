const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const axios = require('axios');

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 5000

const movie_list = {}

app.get('/movies', (req, res) => {
    res.status(201).send(movie_list);
})

app.post('/movies/:id/add', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const movie_id = data.movie_id;
    const title = data.title;
    const description = data.description;
    if (Object.keys(data).length === 0 || title.length === 0 || description.length === 0) {
        res.status(400).send("Invalid data");
    }
    else {
        if  (!movie_list[id]) {
            movie_list[id] = [];
        }
        obj = {
            movie_id,
            title,
            description
        }
        movie_list[id].push(obj);

        await axios.post('http://localhost:5005/events', {
            type: 'MovieAdded',
            data: {
            id: id,
            movie_id: movie_id,
            title: title,
            description: description,
            status: 'pending'
            }
        });
        res.status(201).send(movie_list);
    }
})

app.delete('/movies/:id/delete', async (req, res) => {
    const id = req.params.id;
    const movie_id = req.body.movie_id;
    if (!(id in movie_list)) {
        res.status(400).send("Movie ID " + id + " does not exist.");
    } else {
        movie_list[id] = movie_list[id].filter(x => x.movie_id != movie_id)
        await axios.post('http://localhost:5005/events', {
            type: 'MovieDeleted',
            data: {
            id: id,
            movie_id: movie_id,
            status: 'pending'
            }
        });
        res.status(201).send(movie_list)
    }
})

app.post("/events", (req, res) => {
    console.log("Received Event", req.body.type);
    res.send({});
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

