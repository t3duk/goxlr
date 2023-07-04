const goxlrjs = require("./index.js");

async function main() {
  const goxlr = await goxlrjs(14564);
  console.log(goxlr);
}

main();
