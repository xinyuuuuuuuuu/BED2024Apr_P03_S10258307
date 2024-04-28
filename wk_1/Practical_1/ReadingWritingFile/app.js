// getting information out of a path
const path = require('node:path');

const notes = '/Users/leong/OneDrive/Desktop/y2 sem1/BED/BED2024Apr_P03_S10258307/wk_1/Practical_1/ReadingWritingFile/notes.txt';

path.dirname(notes); // /Users/leong/OneDrive/Desktop
path.basename(notes); // notes.txt
path.extname(notes); //.txt

// reading files with node.js
const fs = require('node:fs');

fs.readFile('/Users/leong/OneDrive/Desktop/y2 sem1/BED/BED2024Apr_P03_S10258307/wk_1/Practical_1/ReadingWritingFile/notes.txt', 'utf8', (err,data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

/*
// write something into notes.txt since it is empty
const World = 'Bye World';

fs.writeFile('/Users/leong/OneDrive/Desktop/y2 sem1/BED/BED2024Apr_P03_S10258307/wk_1/Practical_1/ReadingWritingFile/notes.txt', World, err => {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Successful') // file written successfully 
    }
});
*/


// writing files with node.js
// writing a file
const content = 'Some Content!';

fs.writeFile('/Users/leong/OneDrive/Desktop/y2 sem1/BED/BED2024Apr_P03_S10258307/wk_1/Practical_1/ReadingWritingFile/test.txt', content, err => {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Successful') // file written successfully
    }
});