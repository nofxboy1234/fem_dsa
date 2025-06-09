export default function bubbleSort(arr) {
  // Create a copy to avoid mutating the original array
  const sorted = [...arr];
  const n = sorted.length;

  // Outer loop for number of passes
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Inner loop for comparisons in current pass
    // Reduce range each pass since largest elements bubble to the end
    for (let j = 0; j < n - i - 1; j++) {
      if (sorted[j] > sorted[j + 1]) {
        // Swap elements using destructuring assignment
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
        swapped = true;
      }
    }

    // If no swaps occurred, array is already sorted
    if (!swapped) break;
  }

  return sorted;
}

const arr = [1, 4, 3, 2];
console.log(arr);
const result = bubbleSort(arr);
console.log(result);

// Example usage and testing
const testArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", testArray);
console.log("Sorted array:", bubbleSort(testArray));

// Test with edge cases
console.log("Empty array:", bubbleSort([]));
console.log("Single element:", bubbleSort([42]));
console.log("Already sorted:", bubbleSort([1, 2, 3, 4, 5]));
console.log("Reverse sorted:", bubbleSort([5, 4, 3, 2, 1]));
