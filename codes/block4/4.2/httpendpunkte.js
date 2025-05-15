const express = require("express");
const app = express();
// 1. aufgabe
app.get("/now", (req, res) => {
  let options = {
      timeZone: "Europe/London",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    },
    formatter = new Intl.DateTimeFormat([], options);
  time = formatter.format(new Date());
  console.log(formatter.format(new Date()));
  res.send("Es ist " + time + ".");
});
// 2te aufgabe
let names = [];
app.use(express.urlencoded({ extended: true }));
app.post("/names", (req, res) => {
  const name = req.body.name;

  if (name) {
    names.push(name);
    res.send(`Name "${name}" wurde hinzugefügt.`);
  } else {
    return;
  }
});
app.get("/nameadd", (req, res) => {
  res.send(`
    <h1>Name eingeben</h1>
    <form action="/names" method="POST">
      <input name="name" placeholder="Name eingeben" required />
      <button type="submit">Hinzufügen</button>
    </form>
    <p><a href="/names">Alle Namen anzeigen</a></p>
  `);
});

app.get("/names", (req, res) => {
  res.send("daten:" + names.join(", "));
});

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
