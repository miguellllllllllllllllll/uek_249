let total = 0;

function addletters(firstnumber, secondnumber, thirdnumber) {
  for (let i = 2; i < process.argv.length; i++) {
    total += Number(process.argv[i]);
  }
  return total;
}

let math = addletters();

console.log(math);
