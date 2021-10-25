const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send({ 'Hello': 'World' })
})

app.get('/item/:item_id', (req, res) => {
    res.send({
        'item_id': req.params.item_id,
        'q': req.query.q === undefined ? null : req.query.q
    })
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`)
})