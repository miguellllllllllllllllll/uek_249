const express = require("express");
const app = express();

let books = ["mein kampf", "mein krampf"];

let booksWithId = books.map((title, index) => ({
  id: index + 1,
  title,
}));

// List all books
app.get("/booklist", (req, res) => {
  res.json(booksWithId);
});

// List all books
app.get("/booklist", (req, res) => {
  res.json(booksWithId);
});

app.get("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  res.json(booksWithId);
});

app.listen(3000, () => {
  console.log("server läuft auf http://localhost:3000");
});
