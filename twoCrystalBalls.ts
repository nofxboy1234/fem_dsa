// You have 2 crystal balls and a building with N floors.
// You need to find the highest floor from which you can drop a crystal ball
// without it breaking. The balls are identical - if one breaks at floor X,
// the other will also break at floor X or any higher floor.

// The key constraints are:
// You only have 2 balls
// Once a ball breaks, you can't use it anymore
// You want to minimize the worst-case number of drops

// Naive Approaches
// Linear Search: Start from floor 1 and go up until the first ball breaks. Then you know the answer. This takes O(N) drops in the worst case.
// Binary Search: This would be optimal with unlimited balls, but with only 2 balls, if the first ball breaks, you're forced to do linear search from the last safe floor, potentially making it O(N) drops total.
// Optimal Solution
// The optimal strategy uses square root jumps:

// Jump by √N floors with the first ball
// When it breaks, use the second ball to search linearly in the previous interval

// Why This Works
// The magic is in the math:

// With the first ball, you make at most √N jumps
// When it breaks, you search linearly in an interval of size √N
// Total worst case: √N + √N = 2√N = O(√N)

// Key Insights

// Balance: The √N strategy balances the cost of the jumping phase with the linear search phase
// Worst Case Optimization: This minimizes the maximum number of drops needed
// Two-Phase Strategy: Use the first ball for coarse-grained search, second for fine-grained

// This problem teaches you to think about optimizing for worst-case scenarios
// rather than average cases, which is crucial in algorithm design and system reliability.

export default function twoCrystalBalls(breaks: boolean[]): number {
  const jmpAmount = Math.floor(Math.sqrt(breaks.length));

  let i = jmpAmount;
  for (; i < breaks.length; i += jmpAmount) {
    if (breaks[i]) {
      break;
    }
  }

  i -= jmpAmount;

  for (let j = 0; j <= jmpAmount && i < breaks.length; ++j, ++i) {
    if (breaks[i]) {
      return i;
    }
  }

  return -1;
}

let result = twoCrystalBalls([false, false, false, false, true, true, true]);
console.log(result);
