// books array 
const books = [
    { id: 1, title: "The Lord of the Rings", author: "J.R.R Tolkien" },
    { id: 2, title: "Pride and Prejudice", author: "Jane Austen" }
]

// book class defines structure of a book obj
class Book {
    constructor(id, title, author) /* constructor function is called to create a new Book instance*/ {
        this.id = id;
        this.title = title;
        this.author = author;
    }

    // methods for CRUD operations

    // getAllBooks -> returns the books array
    static async getAllBooks() {
        return books; 
    }

    // getBookById -> find a book by its ID within the books array
    static async getBookById(id) {
        const books = await this.getAllBooks(); // await the promise to get books
        const newBook = new Book(
            books.length + 1,
            newBookData.title,
            newBookData.author
        );

        books.push(newBook);
        return newBook;
    }

    // createBook -> generates unique ID, create new Book obj, pushes it to the books array n return new book
    static async createBook(newBookData) {
        const books = await this.getAllBooks(); // await the promise to get book
        const newBook = new Book(
            books.length + 1,
            newBookData.title,
            newBookData.author
        );

        books.push(newBook); 
        return newBook;
    }

    // updateBook -> finds book by ID, update its properties w the provided newBookData, returns updated book obj, else returns nu;;
    static async updateBook(id, newBookData) {
        const books = await this.getAllBooks(); // await the promise to get book
        const existingBookIndex = books.findIndex((book) => book.id === id);
        if (existingBookIndex === -1) {
            return null; // indicate book not found
        }

        const updatedBook = {
            ...books[existingBookIndex],
            ...newBookData,
        };

        books[existingBookIndex] = updatedBook;
        return updatedBook;
    }

    // deleteBook -> finds book by ID, removes it from the books array using splice, return true for success, false if book is not found
    static async deleteBook(id) {
        const books = await this.getAllBooks(); // await the promise to get book
        const bookIndex =books.findIndex((book) => book.id === id);
        if (bookIndex === -1) {
            return false; // indicate book not founc
        }

        books.splice(bookIndex, 1);
        return true;
    }
}

module.exports = Book;
