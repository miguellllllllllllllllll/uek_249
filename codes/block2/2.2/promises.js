const { resolve } = require("path");

const fs = require("fs").promises;

function leseDateiInhalt(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath);
  });
}

leseDateiInhalt("beispiel.txt")
  .then((inhalt) => {
    console.log("Die Länge des Dateiinhalts beträgt:", inhalt.length);
  })
  .catch((err) => {
    console.error("Fehler beim Lesen der Datei:", err);
  });
