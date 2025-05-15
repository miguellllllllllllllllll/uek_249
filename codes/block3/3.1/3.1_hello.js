const express = require("express");
const { request } = require("http");
const app = express();

// http://localhost:3000/hallo
app.get("/hallo", (request, response) => {
  response.send("hallo Modul 295!");
});

app.listen(3000, () => {
  console.log("example app listening on port 3000");
});
