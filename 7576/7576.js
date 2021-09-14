const fs = require("fs");
const input = fs.readFileSync("./input", "utf-8").trim().split("\n");
const rowcol = input.shift().trim().split(" ");
const row = +rowcol[1];
const array = [];
const start = [];
let toVisitCounts = 0;

for (let i = 0; i < row; i++) {
  array.push(input[i].trim().split(" "));
  for (let j = 0; j < array[i].length; j++) {
    array[i][j] = +array[i][j]
    if (array[i][j] === 0) {
      toVisitCounts++;
    }
    else if (array[i][j] !== -1) {
      start.push([i, j]);
    }
  }
}

let dayPassed = 0;

function search(x, y) {
  const toNewSearch = [];
  if (y + 1 < array[0].length && array[x][y + 1] === 0) {
    toVisitCounts--;
    toNewSearch.push([x, y + 1])
    array[x][y + 1] = 1;
  }
  if (y - 1 > -1 && array[x][y - 1] === 0) {
    toVisitCounts--;
    toNewSearch.push([x, y - 1]);
    array[x][y - 1] = 1;
  }
  if (x + 1 < array.length && array[x + 1][y] === 0) {
    toVisitCounts--;
    toNewSearch.push([x + 1, y]);
    array[x + 1][y] = 1;
  }
  if (x - 1 > -1 && array[x - 1][y] === 0) {
    toVisitCounts--;
    toNewSearch.push([x - 1, y]);
    array[x - 1][y] = 1;
  }
  return toNewSearch;
}


function bfs(toPopped) {
  let newArray = [];
  if (toVisitCounts === 0) {
    return;
  }
  let searchCountPerDay = toPopped.length;
  while (searchCountPerDay) {
    const nextSearch = toPopped.shift();
    searchCountPerDay--;
    const x = nextSearch[0];
    const y = nextSearch[1];
    const searchedArray = search(x, y);
    if (searchedArray.length) {
      newArray = newArray.concat(searchedArray)
    }
  }
  dayPassed++;
  if (newArray.length) {
    bfs(newArray);
  }
}
bfs(start);
if (toVisitCounts) {
  console.log(-1);
  return;
}
console.log(dayPassed);

