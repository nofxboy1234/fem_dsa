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

export default function twoCrystalBalls(breaks) {
  const n = breaks.length;
  const jumpSize = Math.floor(Math.sqrt(n));

  // Phase 1: Use first ball with √N jumps
  let firstBallPosition = jumpSize;
  while (firstBallPosition < n) {
    if (breaks[firstBallPosition]) {
      break;
    }
    firstBallPosition += jumpSize;
  }

  // Phase 2: Use second ball for linear search
  // Go back to the last safe position
  let searchStart = firstBallPosition - jumpSize;
  let searchEnd = firstBallPosition < n ? firstBallPosition + 1 : n; // Include the breaking position!

  // Linear search from last safe position
  for (let i = searchStart; i < searchEnd; i++) {
    if (i >= 0 && breaks[i]) {
      return i;
    }
  }

  return -1;
}

function testCrystalBalls() {
  // Test case 1: Breaking point at index 14
  const floors1 = new Array(20).fill(false);
  for (let i = 14; i < 20; i++) {
    floors1[i] = true;
  }

  console.log("Test 1 - Breaking floor:", twoCrystalBalls(floors1)); // Should return 14

  // Test case 2: Breaking point at index 7
  const floors2 = new Array(15).fill(false);
  for (let i = 7; i < 15; i++) {
    floors2[i] = true;
  }

  console.log("Test 2 - Breaking floor:", twoCrystalBalls(floors2)); // Should return 7

  // Test case 3: No breaking point
  const floors3 = new Array(10).fill(false);
  console.log("Test 3 - Breaking floor:", twoCrystalBalls(floors3)); // Should return -1

  // Test case 4: Your failing test case: breaking point at index 4
  const floors4 = new Array(7).fill(false);
  for (let i = 4; i < 7; i++) {
    floors4[i] = true;
  }
  console.log("Test 4 - Breaking floor:", twoCrystalBalls(floors4)); // Should return 4

  // Test case 5: Breaking point at index 7
  const floors5 = new Array(7).fill(false);
  for (let i = 6; i < 7; i++) {
    floors5[i] = true;
  }
  console.log("Test 4 - Breaking floor:", twoCrystalBalls(floors5)); // Should return 6
}

// Run tests
testCrystalBalls();
