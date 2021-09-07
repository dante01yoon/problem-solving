const fs = require("fs");
const input = fs.readFileSync("./input", "utf-8").trim().split("\n");
const rowcol = input.shift().trim().split(" ");
const row = rowcol[1];
const array = [];
const start = [];
let toVisitCounts = 0;
const toVisitObject = {};

for (let i = 0; i < +row; i++) {
  array.push(input[i].trim().split(" "));
  for (let j = 0; j < array[i].length; j++) {
    if (+array[i][j] === 0) {
      toVisitCounts++;
    }
    else if (+array[i][j] !== -1) {
      start.push([i, j]);
    }
  }
}

let dayPassed = 0;

function search(x, y) {
  console.log({ array, x, y })
  // 동
  if (x + 1 < array[0].length && +array[x + 1][y] === 0 && !toVisitObject[(x + 1).toString() + y.toString()]) {
    toVisitObject[(x + 1).toString() + y.toString()] = true;
    toVisitCounts--;
    start.push([x + 1, y])
    array[x + 1][y] = 1;
  }
  // 서
  else if (x - 1 > -1 && +array[x - 1][y] === 0 && !toVisitObject[(x - 1).toString() + y.toString()]) {
    toVisitObject[(x - 1).toString() + y.toString()] = true;
    toVisitCounts--;
    start.push([x - 1, y]);
    array[x - 1][y] = 1;
  }
  // 남
  else if (y + 1 < +array.length && +array[x][y + 1] === 0 && !toVisitObject[x.toString() + (y + 1).toString()]) {
    toVisitObject[x.toString() + (y + 1).toString()] = true;
    toVisitCounts--;
    start.push([x, y + 1]);
    array[x][y + 1] = 1;
  }
  // 북
  else if (y - 1 > -1 && +array[x][y - 1] === 0 && !toVisitObject[x.toString() + (y - 1).toString()]) {
    toVisitObject[x.toString() + (y - 1).toString()] = true;
    toVisitCounts--;
    start.push([x, y - 1]);
    array[x][y - 1] = 1;
  }
  dayPassed++;
}


function dfs() {
  if (toVisitCounts === 0) {
    return;
  }
  let searchCountPerDay = start.length;
  while (searchCountPerDay) {
    const nextSearch = start.shift();
    searchCountPerDay--;
    const x = nextSearch[0];
    const y = nextSearch[1];
    search(x, y);
  }
  if (start.length) {
    dfs();
  }
}
dfs();
console.log(dayPassed);

