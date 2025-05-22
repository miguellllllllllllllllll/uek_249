const express = require("express");
const app = express();

app.get("/1", (req, res) => {
  res.send("expressmachtkeinspass");
});

app.get("/urlparameter", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  res.send(a + b);
});

let numbers = [17, 25];

app.get("/numbers/sum", (req, res) => {
  let summe = 0;
  for (let i = 0; i < numbers.length; i++) summe += numbers[i];
  res.send(summe);
});

// json wird angeschaut
app.use(express.json());

app.post("/numbers/new", (req, res) => {
  console.log(req.body);
  const newnumber = req.body.number;
  numbers.push(newnumber);
  res.send(newnumber + "hinzugefügt");
});
app.use(express.urlencoded());
app.post("/numbers/form", (req, res) => {
  const newnumber = Number(req.body.number);
  numbers.push(newnumber);
  console.log(req.body);
  res.send(newnumber);
});
// DELETE /numebers/17
app.delete("/numbers:numberToDelete", (req, res) => {
  const numberToDelete = Number(req.params.number);
  numbers = numbers.filter((number) => number !== numberToDelete);
  res.sendStatus(204);
});

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

//3te Aufgabe
app.delete("/number/:numbertodelete", (req, res) => {
  const numbertodelete = req.params.numbertodelete;
  res.send(numbertodelete + "entfernt");
});

app.get("/names", (req, res) => {
  res.send("daten:" + names.join(", "));
});

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});

//4
app.get("/secret2:input", (req, res) => {
  const header = new Headers();
  input = req.params.input;
  res.send("aaa");
  if (input == header) {
    res.sendstatus(200);
  } else {
    res.sendstatus(401);
  }
});
