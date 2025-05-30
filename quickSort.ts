function qs(arr: number[], lo: number, hi: number): void {
  if (lo >= hi) {
    return;
  }

  const pivotIdx = partition(arr, lo, hi);

  console.log(`partition at ${pivotIdx}, sort left ${lo} - ${pivotIdx - 1}`);
  qs(arr, lo, pivotIdx - 1);
  console.log(`partition at ${pivotIdx}, sort right ${pivotIdx + 1} - ${hi}`);
  qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi];

  let idx = lo - 1;

  for (let i = lo; i < hi; ++i) {
    if (arr[i] <= pivot) {
      idx++;
      const tmp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = tmp;
    }
  }

  idx++;
  arr[hi] = arr[idx];
  arr[idx] = pivot;

  return idx;
}

export default function quickSort(arr: number[]): void {
  qs(arr, 0, arr.length - 1);
}

const arr = [9, 3, 7, 4, 69, 420, 42];
quickSort(arr);

console.log(arr);
