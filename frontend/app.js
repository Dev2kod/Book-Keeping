const apiUrl = 'http://localhost:3000/api/books';

// Fetch and display books
const fetchBooks = async () => {
    const response = await fetch(apiUrl);
    const books = await response.json();
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <strong>${book.title}</strong> by ${book.author}
            <button onclick="deleteBook('${book.id}')">Delete</button>
        `;
        bookList.appendChild(bookItem);
    });
};

// Add a new book
document.getElementById('book-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    const newBook = { id: Date.now().toString(), title, author };

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    });

    document.getElementById('book-form').reset();
    fetchBooks();
});

// Delete a book
const deleteBook = async (id) => {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    fetchBooks();
};

// Initial fetch
fetchBooks();
