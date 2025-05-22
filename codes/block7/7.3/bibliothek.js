const express = require("express");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

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
    return res.sendStatus(409);
  }
  res.send(book);
});

// ein buch hinzufügen
app.use(express.json());
app.post("/books", (req, res) => {
  const newBook = req.body;
  if (books.find((book) => book.isbn === newBook.isbn)) {
    return res.sendStatus(409);
  }
  books = [...books, newBook];
  res.send(newBook);
});

// ein Buch Löschen
app.delete("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  books = books.filter((book) => book.isbn !== isbn);
  res.sendStatus(204);
});
// überschreiben
app.put("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const updatedbook = req.body;
  if (!isValid(updatedbook)) {
    return res.sendStatus(420);
  }
  books = books.map((book) => (book.isbn === isbn ? updatedbook : book));
  res.send(updatedbook);
});

let lends = [
  {
    id: "1",
    isbn: "a",
    title: "aaa",
    personName: "Name",
  },
];

app.get("/lends", (req, res) => {
  res.send(lends);
});

app.get("/lends/:id", (req, res) => {
  const lend = lends.find((l) => l.id === req.params.id);
  if (!lend) {
    return res.status(404).send("Ausleihe nicht gefunden");
  }
  res.json(lend);
});

app.post("/lends", express.json(), (req, res) => {
  const newLend = req.body;

  if (!newLend.id || !newLend.isbn || !newLend.title || !newLend.personName) {
    return res.status(400).send("Fehlende Felder");
  }

  // doppelte ID verhindern
  if (lends.find((l) => l.id === newLend.id)) {
    return res.status(409).send("ID existiert bereits");
  }

  lends.push(newLend);
  res.status(201).json(newLend);
});

app.delete("/lends/:id", (req, res) => {
  const id = req.params.id;
  const initialLength = lends.length;
  lends = lends.filter((l) => l.id !== id);

  if (lends.length === initialLength) {
    return res.status(404).send("Keine Ausleihe mit dieser ID gefunden");
  }

  res.status(200).send("Buch zurückgegeben");
});

app.post("/login", (req, res) => {
  const username = req.headers["username"]; // Header 'username'
  const password = req.headers["password"]; // Header 'password'

  if (!username || !password) {
    return res
      .status(400)
      .send("Bitte Username und Passwort im Header senden.");
  }

  const bufferlogindata = Buffer.from(`${username}:${password}`, "utf8");
  const logindata64 = bufferlogindata.toString("base64");

  console.log("Base64 aus Header:", logindata64);

  const expectedBase64 = "emxpOnpsaTEyMzQ="; // zli:zli1234

  if (logindata64 === expectedBase64) {
    req.session.authenticated = true;
    req.session.username = username;

    return res.status(201).send("Eingeloggt!!!");
  } else {
    return res.status(401).send("Falsches Passwort oder Benutzername!!!");
  }
});

app.get("/verify", (req, res) => {
  const loginstatus = req.session.authenticated;
  if (loginstatus === true) {
    return res
      .status(200)
      .send("Sie sind eingeloggt, sie dürfen sachen ausleihen :)");
  }
  return res.status(403).send("log in first");
});

app.delete("/logout", (req, res) => {
  const logging = req.session.authenticated;
  if (logging === true) {
    req.session.authenticated = null;
    return res.status(200).send("ausgeloggt lol");
  }
  return res.status(404).send("du kannst dich nd ausloggen maga");
});

function isValid(book) {
  return book.isbn && book.title && book.author && book.year;
}

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, ".", "swagger.json"), "utf8")
);

// Swagger UI unter /swagger-ui verfügbar machen
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("server läuft auf http://localhost:3000");
});
