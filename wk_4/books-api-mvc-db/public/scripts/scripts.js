async function fetchBooks () {
    const response = await fetch("/books");
    const data = await response.json;

    const bookList = document.getElementById("book-list");

    data.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book"); // add a css class for styling

        // create elements for title, author, etc. and populate w book data
        const titleElement = document.createElement("h2");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("p");
        authorElement.textContent = `By: ${book.author}`;

        bookItem.appendChild(titleElement);
        bookItem.appendChild(authorElement);
        bookList.appendChild(bookItem);
    });
}

fetchBooks(); // call the func to fetch n display book data