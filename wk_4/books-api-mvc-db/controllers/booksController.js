const Book = require("../models/book");

// function utilizes Book.getAllBooks method to retrieve all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving books");
    }
};

// function retrieves a book by book id using Book.getAllBooks
const getBookById = async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        const book = await Book.getBookById(bookId);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving book");
    }
};

// function that retrieves the new book data from the request body
const createBook = async (req, res) => {
    const newBook = req.body;
    try {
        const createdBook = await Book.createBook(newBook);
        res.status(201).json(createdBook);
    } catch (error){
        console.error(error);
        res.status(500).send("Error creating book");
    }
};

// function that updates book record
const updateBook = async (req, res) => {
    const bookId = parseInt(req.params.id);
    const newBookData = req.body;

    try {
        const updatedBook = await Book.updateBook(bookId, newBookData);
        if (!updatedBook) {
            return res.status(404).send("Book not found");
        }
        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating book");
    }

};

// function that deletes book record
const deleteBook = async (req, res) => {
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
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};