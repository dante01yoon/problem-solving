const fs = require("fs");
const input = fs.readFileSync("./stdin", "utf8").trim().split("\n");
const wholeComputer = input.shift();
const vertex = input.shift();

const graphVisited = {};
const graph = {}

for (let i = 0; i < vertex; i++) {
  const singlePair = input.shift().trim().split(" ");
  const start = +singlePair[0];
  const end = +singlePair[1];
  if (graph[start]) {
    graph[start].push(end);
  }
  else {
    graph[start] = [end];
  }
  if (graph[end]) {
    graph[end].push(start);
  }
  else {
    graph[end] = [start];
  }
}

const queue = [];
const answer = [];
function bfs(begin) {
  if (begin) {
    queue.push(begin);
    graphVisited[begin] = true;
    bfs();
  }
  else if (queue.length) {
    const topQueue = queue.shift();
    if (graph[topQueue]) {
      const toVisits = graph[topQueue].sort(function (a, b) { return a - b });
      while (toVisits.length) {
        const shifted = toVisits.shift();
        if (!graphVisited[shifted]) {
          queue.push(shifted);
          graphVisited[shifted] = true;
          answer.push(shifted);
        }
      }
    }
    bfs();
  }
}
bfs(1);
console.log(answer.length);