function quickSort(arr: number[], start = 0, end = arr.length - 1): void {
  if (start >= end) return;

  const pivotIndex = partition(arr, start, end);

  quickSort(arr, start, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, end);
}

function partition(arr: number[], start: number, end: number): number {
  const pivot = arr[end]!;
  let partitionIndex = start;

  for (let i = start; i < end; i++) {
    if (arr[i]! <= pivot) {
      swap(arr, partitionIndex, i);
      partitionIndex++;
    }
  }

  swap(arr, partitionIndex, end);
  return partitionIndex;
}

function swap(arr: number[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j]!, arr[i]!];
}

// Usage example
const numbers = [9, 3, 7, 4, 69, 420, 42];
quickSort(numbers);
console.log(numbers); // [3, 4, 7, 9, 42, 69, 420]

export { quickSort };
