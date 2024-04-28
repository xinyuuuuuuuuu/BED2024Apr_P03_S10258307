const express = require('express');
const app = express();
const path = require('path');
const port = 3020;

app.use(express.static(path.join('/Users/leong/OneDrive/Desktop/y2 sem1/BED/BED2024Apr_P03_S10258307/wk_1/Practical_2/public', 'public')))

app.get('/', function(req,res, next) {
    res.render('home.ejs');
})

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Server listening on port', port);
    }
})