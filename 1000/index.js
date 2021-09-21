const fs = require("fs");
const input = fs.readFileSync("./stdin", "utf-8").trim().split("\n");
const [a, b] = input.shift().trim().split(" ").map(Number);
console.log(a + b)