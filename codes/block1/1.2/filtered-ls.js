const input = process.argv[2];

function callback(err, list) {
  const fs = require("fs").promises;
  fs.readFile(input);
  return console.log(input);
}

callback();
