const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Read books from JSON file
const getBooks = () => {
  const data = fs.readFileSync(path.join(__dirname, 'books.json'));
  return JSON.parse(data);
};

// Write books to JSON file
const saveBooks = (books) => {
  fs.writeFileSync(path.join(__dirname, 'books.json'), JSON.stringify(books, null, 2));
};

// Get all books
app.get('/api/books', (req, res) => {
  const books = getBooks();
  res.json(books);
});

// Add a new book
app.post('/api/books', (req, res) => {
  const books = getBooks();
  const newBook = req.body;
  books.push(newBook);
  saveBooks(books);
  res.status(201).json(newBook);
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const books = getBooks();
  const id = req.params.id;
  const updatedBooks = books.filter(book => book.id !== id);
  saveBooks(updatedBooks);
  res.status(200).json({ message: 'Book deleted successfully' });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
