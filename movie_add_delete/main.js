const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const port = 5000

const movie_list = {}

app.get('/movies', (req, res) => {
    res.send(movie_list)
})

app.post('/movies/:id/update', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const title = data.title;
    const description = data.description;
    movie_list[id] ={
        title,
        description
    }
    res.status(201).send(movie_list);

})

app.delete('/movies/:id/delete/', (req, res) => {
    const id = req.params.id;
    delete movie_list[id]
    res.status(201).send(movie_list)
})
app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})