function quickSort(arr: number[], start = 0, end = arr.length - 1): void {
  if (start >= end) return;

  const pivotIndex = partition(arr, start, end);

  quickSort(arr, start, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, end);
}

function partition(arr: number[], start: number, end: number): number {
  let pivotIndex = start;
  let storeIndex = pivotIndex + 1;

  for (let i = pivotIndex + 1; i <= end; i++) {
    if (arr[i]! <= arr[pivotIndex]!) {
      swap(arr, i, storeIndex);
      storeIndex++;
    }
  }

  swap(arr, pivotIndex, storeIndex - 1);
  return storeIndex - 1;
}

function swap(arr: number[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j]!, arr[i]!];
}

// Usage example
const numbers = [9, 3, 7, 4, 69, 420, 42];
quickSort(numbers);
console.log(numbers); // [3, 4, 7, 9, 42, 69, 420]

const numbers2 = [9, 3, 7, 4, 42, 50, 22];
quickSort(numbers2);
console.log(numbers2); // [3, 4, 7, 9, 42, 69, 420]

const numbers3 = [9, 27, 17, 29, 8, 37, 2, 6, 45, 7];
quickSort(numbers3);
console.log(numbers3);

const numbers4 = [4, 10, 24, 27, 30, 39, 47];
quickSort(numbers4);
console.log(numbers4);

const numbers5 = [1, 2, 3, 1, 4, 2, 2];
quickSort(numbers5);
console.log(numbers5);

export { quickSort };
