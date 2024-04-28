// Pt 2: Building the API server
// import express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// in-memory book data
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R Tolkien'},
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen'},
];

//parse incoming JSON data in requests
app.use(express.json())

// configure body-parser to handle url-encoded form data
app.use(bodyParser.urlencoded({ extended: true})); // set extended: true for nested objects

// create the route for Getting all books (GET)
app.get('/books', (req, res) => {
    res.json(books); // send the array of books as JSON response
}) 

// Pt 3: implementing CRUD operations
// adding the route for Creating a book (POST)
app.post('/books', (req, res) => {
    const newBook = req.body; // Get the new book data from the request body
    newBook.id = books.length + 1; // Assign a unique ID
    books.push(newBook); // Add the new book to the array
    res.status(201).json(newBook); // Send created book with status code 201
});

// route for getting a single book (GET book by ID)
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.Id); // Get book id from url parameter
    const book = books.find(book => book.id === bookId);

    if (book) {
        res.json(book); // send the book data if found
    }
    else {
        res.status(404).send('Book not found'); // send error for non-existent book
    }
})

// route for updating a book (PUT books by ID)
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const updatedBook = req.body; // Get updated book data from request body
  
    const bookIndex = books.findIndex(book => book.id === bookId); // to locate index of book with the matching ID in the books array
  
    if (bookIndex !== -1) {
      updatedBook.id = bookId;
      books[bookIndex] = updatedBook; // Update book data in the array
      res.json(updatedBook); // Send updated book data
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
  });

  // route for deleting a book (DELETE book by ID)
  app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
  
    const bookIndex = books.findIndex(book => book.id === bookId);
  
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1); // Remove book from the array
      res.status(204).send(); // Send empty response with status code 204 (No Content)
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
  });

  // Pt 4: starting the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
 });  
