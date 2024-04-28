const express = require('express');
const app = express();
const port = 3020;

// using public folder at the root of the project
app.use(express.static('public'));

// using image folder at the route 
app.use('/images', express.static('images'));

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})