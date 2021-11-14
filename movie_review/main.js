const express = require('express')
//const cors = require('cors')

const app = express()
const port = 5002
app.use(express.json());
//app.use(cors());

const reviewsByMovieID = {};

app.get('/movies/:id/reviews', (req, res) => {
    res.send(reviewsByMovieId[req.params.id] || [])
});

app.post('/movies/:id/reviews', (req, res) => {
    const reviewId = randomBytes(4).toString('hex');
    const { content } = req.body;
    
    const reviews = reviewsByMovieID[req.params.id] || [];
    reviews.push({id: reviewsByMovieID, content});
    reviewsByMovieID[req.params.id] = reviews;

    res.status(201).send(reviews);
});

app.listen(port, '0.0.0.0', () => {
    console.log('listening at http://localhost:${port}')
})