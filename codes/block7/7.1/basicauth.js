const express = require("express");
const app = express();

app.get("/public", (req, res) => {
  res.send("Ohne login");
});

const expectedBase64 = "emxpOnpsaTEyMzQ=";

app.get("/private", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    console.log("Authorization Header:", authHeader);

    res.status(401).send("Authorization Header fehlt oder ist ned richtig.");
    return;
  }
  const base64Credentials = authHeader.split(" ")[1];

  if (base64Credentials === expectedBase64) {
    return res.send("Willkommen im privaten Bereich!");
  } else {
    return res.status(401).send("Zugriff verweigert");
  }
});

app.listen(3000, () => {
  console.log("server läuft auf http://localhost:3000");
});
