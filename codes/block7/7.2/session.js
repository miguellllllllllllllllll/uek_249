const express = require("express");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

app.post("/name", (req, res) => {
  newname = req.headers.newname;

  if (!newname) {
    return res.status(400).send("Header 'newname' fehlt.");
  }

  req.session.name = newname;
  res.status(200).send("Name added: " + newname);
});

app.get("/name", (req, res) => {
  const name = req.session.name;
  if (!name) {
    return res.status(404).send("Name not found");
  }

  return res.send("Name in Session: " + name);
  if (!name) {
    return res.status(404).send("Name not found");
  }
  return res.send("Name in Session: " + name);
});

app.delete("/name", (req, res) => {
  soondeletedname = req.session.name;
  if (soondeletedname) {
    soondeletedname = null;
    return res.status(204).send("name deleted");
  }
  return res.status(404).send(soondeletedname + "not found");
});

app.listen(3000, () => {
  console.log("server läuft auf http://localhost:3000");
});
