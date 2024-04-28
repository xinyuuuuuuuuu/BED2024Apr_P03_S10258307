const express = require('express')
const app = express()
const port = 3020

app.get('/', (req, res) => {
    res.send('Hello World')
})

// POST request to the /user route
app.post('/', (req,res) => {
    res.send('Got a POST request')
})

// PUT request to the /user route
app.put('/user', (req,res) => {
    res.send('Got a PUT request at /user')
})

// DELETE request to the /user route
app.delete('/user', (req,res) => {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
}) 