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

app.post('/movies/:id/reviews', async (req, res) => {
    const reviewId = randomBytes(4).toString('hex');
    const { content } = req.body;
    
    const reviews = reviewsByMovieID[req.params.id] || [];

    reviews.push({id: reviewsByMovieID, content, status: 'pending'});

    reviewsByMovieID[req.params.id] = reviews;

    await axios.post('https://localhost:5005/events', {
        type: 'ReviewCreated',
        data:{
            id: reviewId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    });
    res.status(201).send(reviews);
});

app.post('/events', (req,res) =>{
    console.log('Event: Receieved:', req.body.type);
    res.send({});
})
app.listen(5002,  () => {
    console.log('listening at 5002')
})