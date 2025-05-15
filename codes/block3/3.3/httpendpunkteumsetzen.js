const express = require("express");
const app = express();
const path = require("path");

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

const time = hours + ":" + minutes;
console.log(time);

app.get("/now", (req, res) => {
  res.send("Es ist " + time + ".");
});

app.get("/zli", (req, res) => {
  res.redirect("https://www.zli.ch/");
});

const namen = [
  "Anna",
  "Ben",
  "Clara",
  "David",
  "Emma",
  "Felix",
  "Greta",
  "Hannah",
  "Isabel",
  "Jonas",
  "Klara",
  "Lukas",
  "Mia",
  "Noah",
  "Oliver",
  "Paula",
  "Quentin",
  "Robin",
  "Sophie",
  "Tom",
];

app.get("/name", (req, res) => {
  const randomIndex = Math.floor(Math.random() * namen.length);
  const randomName = namen[randomIndex];
  res.send(randomName);
});

app.get("/html", async (req, res) => {
  try {
    const url = "https://http.cat/";
    const response = await fetch(url);
    const html = await response.text();

    // title extrahieren mit RegExp
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : "Kein Titel gefunden";

    // Optional: body extrahieren (als String, ungeparst)
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const body = bodyMatch ? bodyMatch[1] : "Kein Body gefunden";

    res.send(`<h1>${title}</h1><div>${body}</div>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Laden der Webseite.");
  }
});

app.get("/image", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "image.jpg"));
});

app.get("/teapot", (req, res) => {
  res.status(418).send("418");
});

app.get("/user-agent", (req, res) => {
  const userAgent = req.get("User-Agent");
  res.send(`Dein User-Agent ist: ${userAgent}`);
});

app.get("/secret", (req, res) => {
  res.status(403).send("nix");
});

app.get("/xml", (req, res) => {
  const filePath = path.join(__dirname, "public", "datei.xml"); // Pfad zur XML-Datei
  res.type("application/xml"); // Content-Type auf XML setzen
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("Fehler beim Senden der Datei.");
    }
  });
});

app.get("/me", (req, res) => {
  const person = {
    vorname: "Max",
    nachname: "Mustermann",
    alter: 30,
    wohnort: "Berlin",
    augenfarbe: "blau",
  };
  res.json(person);
});

// Server starten
app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
