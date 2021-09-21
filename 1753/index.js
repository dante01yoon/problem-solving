const input = require("fs").readFileSync("./stdin", "utf-8").trim().split("\n");
const [vertex, edge] = input.shift().trim().split(" ").map(char => +char);
const array = new Array(vertex).fill([]).map(array => new Array(vertex).fill("INF"));
const startVertex = +input.shift().trim();
const wayDict = {};

for (let i = 0; i < edge; i++) {
  const [start, end, weight] = input.shift().trim().split(" ").map(Number);
  array[start - 1][end - 1] = weight;
}

for (let i = 0; i < vertex; i++) {
  if (startVertex - 1 === i) {
  }
  else {
    wayDict[i + 1] = array[startVertex - 1][i]
  }
  array[i][i] = 0;
}
const sortVisit = (visit) => visit
  .sort((a, b) => {
    if (a[1] === 0 || a[1] === "INF") {
      return 1;
    }
    if (b[1] === 0 || b[1] === "INF") {
      return -1;
    }
    if (a[1] !== "INF" && b[1] !== "INF" && a < b) {
      return -1;
    }
    return 0;
  })
  .reduce((acc, curr) => {
    acc[curr[0]] = curr[1];
    return acc;
  }, {})

let sortedVisit = sortVisit(Object.entries(wayDict));
let willShift = Object.entries(sortedVisit);
while (true) {
  if (willShift.length < 1) {
    break;
  }
  willShift = Object.entries(sortVisit(willShift));
  let [v, w] = willShift.shift()
  for (let i = 0; i < vertex; i++) {
    v = +v;
    if (
      w !== "INF" &&
      array[v - 1][i] !== "INF" && (
        w + array[v - 1][i] < array[startVertex - 1][i] ||
        array[startVertex - 1][i] === "INF")
    ) {

      array[startVertex - 1][i] = w + array[v - 1][i]
    }
  }
}

console.log(array[startVertex - 1].join("\n"))