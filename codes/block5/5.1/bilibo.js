const { json } = require("body-parser");
const express = require("express");
const app = express();

let books = [
  {
    isbn: "a",
    title: "aaa",
    author: "",
    year: 2012,
  },
];
// bücher anzeigen
app.get("/books", (req, res) => {
  const bookoverview = books.map((book) => {
    return { isbn: book.isbn, title: book.title };
  });
  res.json(bookoverview);
});

// Ein buch nach isbn finden
app.get("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books.find((book) => book.isbn === isbn);
  if (!book) {
    return res.sendStatus(404);
  }
  res.send(book);
});

// ein buch hinzufügen
app.use(express.json());
app.post("/books", (req, res) => {
  const newBook = req.body;
  if (books.find((book) => book.ispn === newBook.ispn)) {
    res.sendStatus(409);
  }
  books = [...books, newBook];
  res.send(newBook);
});

// ein Buch Löschen
app.delete("/books/:isbn", (req, res) => {
  const isbn = req.params.ispn;
  books = books.filter((book) => book.isbn !== isbn);
  res.sendStatus(204);
});
// überschreiben
app.put("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const updatedbook = req.body;
  if (!isValid(updatedbook)) {
    res.sendStatus(420);
  }
  books = books.map((book) => (book.isbn === isbn ? updatedbook : book));
  res.send(updatedbook);
});

let lends = [
  {
    isbn: "a",
    title: "aaa",
    personName: "Name",
  },
];

app.get("/lends", (req, res) => {
  res.send(lends);
});

function isValid(book) {
  return book.isbn && book.title && book.author && book.year;
}

app.listen(3000, () => {
  console.log("server started");
});
