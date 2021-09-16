const fs = require("fs");
let input = fs.readFileSync("./stdin", "utf-8").trim().split("\n");
input = input.map((line) => +(line.trim()));
const inputLength = input.shift();
const answer = [];
const minHeap = [];
const maxHeap = [];

const addMaxHeap = function (heap, addedNode) {
  heap.push(addedNode);
  let i = heap.length - 1;
  while (true) {
    let temp;
    if (i === 0) {
      return addedNode;
    }
    const parentIndex = Math.floor(i / 2);
    if (heap[i] > heap[parentIndex]) {
      temp = heap[i];
      heap[i] = heap[parentIndex];
      heap[parentIndex] = temp;
      i = parentIndex;
    }
    else {
      break;
    }
  }
  return heap[0];
}

const deleteMaxHeap = function (heap) {
  const root = heap[heap.length - 1];
  const tail = heap[0];
  heap[0] = root;
  heap.pop();
  let i = 0;
  while (true) {
    let temp;
    let leftIndex = i * 2 + 1;
    let rightIndex = i * 2 + 2;
    if (leftIndex >= heap.length) {
      break;
    }
    else {
      if (rightIndex < heap.length) { // 오른쪽이 존재한다.
        if (
          heap[leftIndex] > heap[rightIndex]
        ) {
          if (heap[leftIndex] > heap[i]) {
            temp = heap[i];
            heap[i] = heap[leftIndex];
            heap[leftIndex] = temp;
            i = leftIndex;
          }
          else {
            break;
          }
        }
        else if (heap[rightIndex] > heap[i]) {
          temp = heap[i];
          heap[i] = heap[rightIndex];
          heap[rightIndex] = temp;
          i = rightIndex;
        }
        else {
          break;
        }
      }
      else {
        if (heap[leftIndex] > heap[i]) {
          temp = heap[i];
          heap[i] = heap[leftIndex];
          heap[leftIndex] = temp;
          i = leftIndex;
        }
        else {
          break;
        }
      }
    }
  }

  return tail;
}

const deleteMinHeap = function (heap) {
  const root = heap[heap.length - 1];
  const tail = heap[0];
  heap[0] = root;
  heap.pop();
  let i = 0;
  while (true) {
    let temp;
    let leftIndex = i * 2 + 1;
    let rightIndex = i * 2 + 2;
    if (leftIndex >= heap.length) {
      break;
    }
    if (rightIndex < heap.length) {
      if ( // 오른쪽과 교체
        heap[leftIndex] > heap[rightIndex] &&
        heap[rightIndex] < heap[i]
      ) {
        temp = heap[rightIndex];
        heap[rightIndex] = heap[i];
        heap[i] = temp;
        i = rightIndex;
      }
      else if (heap[leftIndex] < heap[i]) {
        temp = heap[leftIndex];
        heap[leftIndex] = heap[i];
        heap[i] = temp;
        i = leftIndex;
      }
      else {
        break;
      }
    }
    else {
      if (heap[leftIndex] < heap[i]) {
        temp = heap[leftIndex];
        heap[leftIndex] = heap[i];
        heap[i] = temp;
        i = leftIndex;
      }
      else {
        break;
      }
    }
  }
  return tail;
}

const addMinHeap = function (heap, addedNode) {
  heap.push(addedNode);
  let i = heap.length - 1;
  while (true) {
    let temp;
    if (i === 0) {
      return;
    }
    const parentIndex = Math.floor(i / 2);
    if (heap[i] < heap[parentIndex]) {
      temp = heap[i];
      heap[i] = heap[parentIndex];
      heap[parentIndex] = temp;
      i = parentIndex;
    }
    else {
      break;
    }
  }
}

for (let i = 0; i < inputLength; i++) {
  const shifted = input.shift();

  if (maxHeap.length === minHeap.length) {
    addMaxHeap(maxHeap, shifted);
  }
  else {
    addMinHeap(minHeap, shifted);
  }

  if (maxHeap[0] > minHeap[0]) {
    const poppedMinHeap = deleteMinHeap(minHeap);
    const poppedMaxHeap = deleteMaxHeap(maxHeap);
    maxHeap.push(poppedMinHeap);
    minHeap.push(poppedMaxHeap);
  }
  answer.push(maxHeap[0]);
}

console.log(answer.join("\n"));
