const fs = require("fs");
let read = process.argv[2];
let input = fs.readFileSync(read);
console.log(input.toString().split("\n").length - 1);
