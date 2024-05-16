// import dbConfig obj into app.js
const express = require("express");
const sql = require("mssql");
const dbConfig = require("./dbConfig");

const app = express();
const port = process.env.PORT || 3000; // use environmental variable or default value

// integrate the controllers n define routes 
const booksController = require("./controllers/booksController");


// routes for GET requests 
// import booksController module
app.get("/books", booksController.getAllBooks);       // route maps to the getAllBooks function in the booksController, upon receiving this GET request,controller function retrieves all book records
app.get("/books/:id", booksController.getBookById);   // route w a dynamic parameter ":id" maps to the getBookById function, controller func will extract ID from the request parameter n use it to retrieve corresponding book record

// import body-parser
const bodyParser = require("body-parser"); 

// import validateBook
const validateBook = require("./middlewares/validateBook");

// include body-parser middleware to handle JSON data from the request body
app.use(bodyParser.json());   // to parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // for form data handling

/*
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById); 
*/

app.post("/books", validateBook, booksController.createBook);  // POST for creating books (can handle JSON data)
app.put("/books/:id", booksController.updateBook);  // PUT for updating books
app.delete("/books/:id", booksController.deleteBook); // DELETE fro deleting book 

app.listen(port, async () => {
    try{
        // connect to database
        await sql.connect(dbConfig);   // establish connection to db using configuration details
        console.log("Database connection established successfully");
    } catch(err){
        console.error("Database connection error:", err);
        // terminate the application with an error code (opt)
        process.exit(1); // exit with code 1 indicating an error
    }
    
    console.log(`Server listening on port ${port}`);
})

// close the connection pool on SIGINT signal
process.on("SIGINT", async () => {                       // SIGINT signal handler to manage graceful shutdown
    console.log("Server is gracefully shutting down");

    // perform cleanup tasks (e.g, close database connections)
    await sql.close();
    console.log("Database connection closed");
    process.exit(0); // exit with code 0 indicating successful shutdown
});

// code 



