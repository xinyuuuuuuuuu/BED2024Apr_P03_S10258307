// models - contain files representing data structures
// controllers - house function that handle API requests and interact w models

// import required modules
const express = require("express");                                // express.js framework
const bodyParser = require("body-parser");                         // middleware helps parse incoming request bodies, specifically data sent in json format
const booksController = require("./controllers/booksController");  // imports the controller functions from a separate file

// initialize
const app = express();

// configure middleware
app.use(bodyParser.json()); // parse incoming json data in request body
app.use(bodyParser.urlencoded({ extended: true })); // for form data handling

// define individual routes for each controller function
app.get("/books", booksController.getAllBooks);       // route that handles GET requests
app.get("/books/:id", booksController.getBookById);   
app.post("/books", booksController.createBook);       // route that handles POST requests (typical for creating new data)
app.put("/books/:id", booksController.updateBook);    //route that handles PUT request (typical for updating existing data)
app.delete("/books/:id", booksController.deleteBook); //route that handle DELETE requests (typical for deleting data)

const port = process.env.PORT || 3000;  // process.env.PORT -> environement variable for flexiiblity or a default port (3000) in this case

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
 });  

 // import validateBook
 const validateBook = require("./middleware/validateBook");

 // apply middleware to specific routes
 app.post("/books", validateBook, booksController.createBook); // Add validateBook before createBook
 app.put("/books/:id", validateBook, booksController.updateBook); // Add validateBook before updateBook

