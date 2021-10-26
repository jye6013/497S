const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const port = 5000

const movie_list = {}

app.get('/movies', (req, res) => {
    res.status(201).send(movie_list);
})

app.post('/movies/:id/add', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const title = data.title;
    const description = data.description;
    if (Object.keys(data).length === 0 || title.length === 0 || description.length === 0) {
        res.status(400).send("Invalid data");
    }
    else {
        movie_list[id] ={
            title,
            description
        }
        res.status(201).send(movie_list);
    }
})

app.delete('/movies/:id/delete', (req, res) => {
    const id = req.params.id;
    if (!(id in movie_list)) {
        res.status(400).send("Movie ID " + id + " does not exist.");
    } else {
        delete movie_list[id]
        res.status(201).send(movie_list)
    }
})
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})