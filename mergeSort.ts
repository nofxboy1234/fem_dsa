function mergeSort<T>(arr: T[]): T[] {
  // Base case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Divide: split array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Conquer: recursively sort both halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Combine: merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

function merge<T>(left: T[], right: T[]): T[] {
  const result: T[] = [];
  let i = 0; // pointer for left array
  let j = 0; // pointer for right array

  // Compare elements and merge in sorted order
  while (i < left.length && j < right.length) {
    if (left[i]! <= right[j]!) {
      result.push(left[i]!);
      i++;
    } else {
      result.push(right[j]!);
      j++;
    }
  }

  // Add remaining elements from left array (if any)
  while (i < left.length) {
    result.push(left[i]!);
    i++;
  }

  // Add remaining elements from right array (if any)
  while (j < right.length) {
    result.push(right[j]!);
    j++;
  }

  return result;
}

// Example usage:
const numbers = [8, 1, 6, 4, 44, 15, 15];
const sortedNumbers = mergeSort(numbers);
console.log("Original:", numbers);
console.log("Sorted:", sortedNumbers);

const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = mergeSort(strings);
console.log("Original strings:", strings);
console.log("Sorted strings:", sortedStrings);
