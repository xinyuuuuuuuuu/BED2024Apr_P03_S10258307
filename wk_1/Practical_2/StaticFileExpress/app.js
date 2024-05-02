const express = require('express');
const app = express();
const port = 3020;

// using public folder at the root of the project
app.use(express.static('public'));

// using the images folder at the route / images
app.use('/images', express.static('images')); // '/images' - the route, images are gg to be pull from the images folder

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})