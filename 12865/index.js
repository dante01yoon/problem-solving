const fs = require("fs");
const input = fs.readFileSync("./stdin", "utf-8").trim().split("\n");
const firstLineShifted = input.shift();
const trimmed = firstLineShifted.trim().split(" ");
const maxWeight = +trimmed[1];
const memo = [];
const itemsDict = {};

input.reduce((acc, curr) => {
  const thisPair = curr.trim().split(" ");
  acc[+thisPair[0]] = +thisPair[1];
  return acc;
}, itemsDict);

function getMax(n) {
  if (memo[n]) {
    return memo[n];
  }
  if (n === 0) {
    memo[0] = 0;
    return 0;
  }
  if (n === 1) {
    if (itemsDict[1]) {
      return itemsDict[1];
    }
    return 0;
  }


  const nthMemo = [];
  let q = 0;
  for (let i = 0; i < n; i++) {
    for (let j = n - i; j > 0; j--) {
      if (memo[j]) {
        q = Math.max(q, getMax(i) + memo[j]);
        break;
      }
      if (itemsDict[j]) {
        q = Math.max(q, getMax(i) + itemsDict[j]);
        break;
      }
      if (j === 0) {
        q = Math.max(q, getMax(i) + 0)
      }
    }
  }
  memo[n] = q;
  return memo[n];
}
getMax(maxWeight)
console.log(memo[maxWeight]);