const express = require('express')
const app = express()
const port = 5000

app.use(express.json());

let likesByMovieId = {"1": 1, "2": 100, "3": 10};

app.get('/movies/:id/likes', (req, res) => {
    const id = req.params.id;
    if (!(id in likesByMovieId)) {
        res.status(400).send("Movie ID " + id + " does not exist.");
    } else {
        res.send(likesByMovieId[id].toString());
    }
   
});

app.put('/movies/:id/likes', (req, res) => {
    const id = req.params.id;
    if (!(id in likesByMovieId)) {
        res.status(400).send("Movie ID " + id + " does not exist.");
    } else {
        likesByMovieId[id] = likesByMovieId[id] + 1;
        res.status(201).send(likesByMovieId);
    }
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})