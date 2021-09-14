let fs = require("fs");
let input = fs.readFileSync("./stdin", "utf8").trim().split("\n");
const splited = input.shift().trim().split(" ");
const node = splited[0];
const vertex = splited[1];
const begin = splited[2];
let numbers = [];

for (let i = 0; i < parseInt(vertex); i++) {
  numbers.push(input[i].split(" ").map(function (char) { return parseInt(char) }));
}

const graphObject = {}

for (let i = 0; i < numbers.length; i++) {
  const start = numbers[i][0];
  const end = numbers[i][1];
  if (graphObject[start]) {
    graphObject[start].push(end);
  } else {
    graphObject[start] = [end];
  }
  if (graphObject[end]) {
    graphObject[end].push(start);
  } else {
    graphObject[end] = [start];
  }
}

const dfsAnswer = [];
const copiedDfsGraph = JSON.parse(JSON.stringify(graphObject));
const visitedDfs = {
};

function dfs(begin) {
  visitedDfs[begin] = true;
  dfsAnswer.push(begin);
  if (copiedDfsGraph[begin]) {
    const sortedArray = copiedDfsGraph[begin].sort(function (a, b) { return a - b });
    while (sortedArray.length) {
      const shifted = sortedArray.shift();
      if (!visitedDfs[shifted]) {
        dfs(shifted);
      }
    }
  }
}

const visitedBfs = {};
const bfsAnswer = [];
const copiedBfsGraph = JSON.parse(JSON.stringify(graphObject));
let bfsQueue = [];
function bfs(begin) {
  if (begin) {
    bfsQueue.push(begin);
    visitedBfs[begin] = true;
    bfsAnswer.push(begin);
    bfs();
  }
  else if (bfsQueue.length) {
    const shift = bfsQueue.shift();
    let sortedArray;
    if (copiedBfsGraph[shift]) {
      sortedArray = copiedBfsGraph[shift].sort(function (a, b) { return a - b });
    }
    else {
      sortedArray = [];
    }
    while (sortedArray.length) {
      const shifted = sortedArray.shift();

      if (!visitedBfs[shifted]) {
        bfsQueue.push(shifted);
        visitedBfs[shifted] = true;
        bfsAnswer.push(shifted)
      }
    }
    bfs();
  }
}
dfs(begin);
bfs(begin);
console.log([dfsAnswer.join(" ").trim(), bfsAnswer.join(" ").trim()].join("\n"));