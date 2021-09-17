const fs = require("fs");
const input = fs.readFileSync("./stdin", "utf-8").trim().split("\n");
const array = input.shift().split(" ")
const subin = +array[0];
const destination = +array[1];
const visited = {};
const startQueue = [];
function bfs(startPosition) {
  startQueue.push(startPosition);
  visited[startPosition] = 1;
  while (startQueue.length) {
    if (visited[destination]) {
      return visited[destination];
    }
    const shifted = startQueue.shift();
    if (
      !visited[shifted + 1]
      && shifted + 1 <= 100000
    ) {
      visited[shifted + 1] = visited[shifted] + 1;
      startQueue.push(shifted + 1);
    }
    if (
      !visited[shifted * 2]
      && shifted + 1 <= 100000
    ) {
      visited[shifted * 2] = visited[shifted] + 1;
      startQueue.push(shifted * 2);
    }
    if (
      !visited[shifted - 1]
      && shifted - 1 >= 0
    ) {
      visited[shifted - 1] = visited[shifted] + 1;
      startQueue.push(shifted - 1)
    }
  }
}
console.log(bfs(subin) - 1);

