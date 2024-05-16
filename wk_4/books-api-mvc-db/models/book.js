/* 
MVC promotes separation of concerns by dividing the application into distinct layers:
Model: represents data n business logic e., Book  class
View: handles presentation and user interface (not directly involve here)
Controller: receives request, interacts w the model, and prepares responses

database abstraction:
Book class acts as a model layer abstraction. It interacts w the db 
using generic methods (getAllBooks, getBookById) that can be implemented depending 
on the chosen db tech (e.g, using mssql for SQL server in this case).

*/


const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }

    // retrieve all book records from the Books table
    static async getAllBooks() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Books`;

        const request = connection.request();
        const result = await request.query(sqlQuery);
        
        connection.close();

        return result.recordset.map(
            (row) => new Book(row.id, row.title, row.author)
        ); // convert rows to Book objects
    }

    // retrieve a specific book record by its id from the Books table
    static async getBookById(id) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Books WHERE id = @id`; // parameterized query

        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset[0]
        ? new Book(
            result.recordset[0].id,     // result.recordset - holds the actual data retrieved form the SQL server db aft executing a query    
            result.recordset[0].title,  // structure: result.recordset is an array of javascript object
            result.recordset[0].author  // object mapping: each obj in the array represents a single row returned by the SQL query
        )                               // property mapping: the properties of each obj in the array correspond to the column names from the queried table 
        : null; // handle book not found
    }

    // create a new book record
    static async createBook(newBookData) {   // this method takes a newBookData obj containing the title and author of the new book
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `INSERT INTO Books (title, author) VALUES (@title, @author); SELECT SCOPE_IDENTITY() AS id;`; // retrieve Id of inserted record
        // INSERT INTO Books (title, author) VALUES (@title, @author) - inserts the new book data using parameterized queries 
        // SELECT SCOPE_IDENTITY() AS id - retrieves the Id of the last inserted record using SCOPE_IDENTIFY()
        // SCOPE_IDENTITY() - a Transact-SQL func that retrieves the identity value generated for the 
        // last INSERT statement executed within the same scope (e.g, stored procedure, trigger or batch)     

        const request = connection.request();
        request.input("title", newBookData.title);
        request.input("author", newBookData.author);

        const result = await request.query(sqlQuery);   // sqlQuery - uses a single statem for both insertion n Id retrieval

        connection.close();

        // retrieve the newly created book using its Id
        return this.getBookById(result.recordset[0].id);
    }

    // Update book record
    static async updateBook(id, newBookData) {      
        /*
        static - indcates a class method, meaning it can be called directly on the class itself w/o creating an instance of the class
        async - signifies that the function is asynchronous, allowing it to handle async operations like db queries
        id - parameter represents the Id of the book to be updated
        newBookData - parameter is an obj containing the updated title n author information
        */
        const connection = await sql.connect(dbCOnfig); // establishes a connection to the db using the mssql package n the configuration defined in dbConfig

        const sqlQuery = `UPDATE Books SET title = @title, author = @author WHERE id = @id`; // parameterized query
        // const sqlQuery - defines the SQL query string for updating a book record, uses 
        // parameterized queries w the placeholders (@title, @author, @id) to prevent SQL injection vulnerabilities

        const request = connection.request();
        // request.input - used to set vals for the defined param
        request.input("id", id); 
        request.input("title", newBookData.title || null);  // handle optional fields
        request.input("author", newBookData.author || null);

        await request.query(sqlQuery); // async executes the prepared SQL query w the set parameters

        connection.close(); // close db connection

        return this.getBookById(id); // return the updated book data
        // retrieves the updated book record using the getBookById method 
    }

    // delete book record
    static async deleteBook(id) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `DELETE FROM Books WHERE id = @id`; // parameterized query

        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.rowsAffected > 0; // indicate success based on affected rows
    }

}

module.exports = Book;
