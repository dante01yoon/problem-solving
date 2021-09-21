const inputs = require("fs").readFileSync("./stdin", "utf-8").trim().split("\n");
const [row, col] = inputs.shift().trim().split(" ");
const array = [];
for (let i = 0; i < inputs.length; i++) {
  array.push(inputs[i].trim().split(" ").map(height => ({ height: Number(height), value: 0 })));
}
const visitedArray = Array(+row).fill().map((i) => Array(+col).fill(-1));

const dfs = (i, j) => {
  if (i === row - 1 && j === col - 1) {
    return 1;
  }
  if (visitedArray[i][j] === -1) {
    visitedArray[i][j] = 0;
  } else {
    return array[i][j].value;
  }
  if (i - 1 >= 0) {
    if (array[i - 1][j].height < array[i][j].height) {
      array[i][j].value = array[i][j].value + dfs(i - 1, j);
    }
  }
  if (i + 1 < row) {
    if (array[i + 1][j].height < array[i][j].height) {
      array[i][j].value = array[i][j].value + dfs(i + 1, j);
    }
  }
  if (j - 1 >= 0) {
    if (array[i][j - 1].height < array[i][j].height) {
      array[i][j].value = array[i][j].value + dfs(i, j - 1);
    }
  }
  if (j + 1 < col) {
    if (array[i][j + 1].height < array[i][j].height) {
      array[i][j].value = array[i][j].value + dfs(i, j + 1);
    }
  }
  return array[i][j].value;
}
console.log(dfs(0, 0));