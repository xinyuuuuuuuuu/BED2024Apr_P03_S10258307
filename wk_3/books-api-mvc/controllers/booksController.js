// import the Book Model
const Book = require("../models/Book");

// understanding the concepts
/*
require()
- used to import modules form external files or built-in node.js modules

async/await
- a way to handle asynchronous operations(like network request, database interactions)
in a more synchronous-looking way.
- simplifies asynchronous code by allowing you to write it as if it were synchronous code with the use of await

error handling w try...catch
- handling errors in the code
try block:
- code you expect to run normally
catch block:
- catch any error that may occur within the try block
*/

// define controller functions
// getAllBooks
const getAllBooks = async (req, res) => {           /* async/await -> asynchronous handling of model operations*/      
    try {                                           /*error handling implemented using try/catch */ 
        const books = await Book.getAllBooks();
        res.json(books);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error retrieving books");
    }
};

// getBookById
const getBookById = async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        const book = await Book.getBookById(bookId);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.json(book);
    } catch (error){
        console.error(error);
        res.status(500).send("Error retrieving book");
    }
};

// createBook 
const createBook = async (req, res) => {
    const newBook = req.body;
    try {
        const createdBook = await Book.createBook(newBook);
        res.status(201).json(createdBook);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creatin book");
    }
};

// updateBook
const updateBook = async (req,res) => {
    const bookId = parseInt(req.params.id);
    const newBookData = req.body;

    try {
        const updatedBook = await Book.updatedBook(bookId, newBookData);
        if (!updatedBook) {
            return res.status(404).send("Book not found");
        }
        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating book");
    }
};

// deleteBook
const deleteBook = async(res,res) => {
    const bookId = parseInt(req.params.id);

    try {
        const success = await Book.deleteBook(bookId);
        if (!success) {
            return res.status(404).send("Book not found");
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting book");
    }
};

module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook
};

