const input = process.argv[2];
const fs = require("fs").promises;

fs.readFile(input, "utf8")
  .then((data) => {
    const newlineCount = data.split("\n").length - 1;
    console.log(newlineCount);
  })
  .catch((err) => {
    console.error(err);
  });
