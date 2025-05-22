export default function bubbleSort(arr: number[]): void {
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr.length - 1 - i; ++j) {
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
}

let result;
const arr = [1, 4, 3, 2];
console.log(arr);
result = bubbleSort(arr);
console.log(arr);
