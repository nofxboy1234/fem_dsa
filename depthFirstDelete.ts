import type { BinaryNode } from "./binaryNode";

export default function deleteNode(
  root: BinaryNode<number> | null,
  value: number
): BinaryNode<number> | null {
  // Base case: value not found
  if (!root) {
    return null;
  }

  // Navigate to the node to delete
  if (value < root.value) {
    root.left = deleteNode(root.left, value);
  } else if (value > root.value) {
    root.right = deleteNode(root.right, value);
  } else {
    // Found the node to delete - handle 3 cases

    // Case 1: Node has no children (leaf node)
    if (!root.left && !root.right) {
      return null;
    }

    // Case 2a: Node has only right child
    if (!root.left) {
      return root.right;
    }

    // Case 2b: Node has only left child
    if (!root.right) {
      return root.left;
    }

    // Case 3: Node has both children
    // Find the inorder successor (smallest value in right subtree)
    const successor = findMin(root.right);

    // Replace current node's value with successor's value
    root.value = successor.value;

    // Delete the successor (which will be a leaf or have only right child)
    root.right = deleteNode(root.right, successor.value);
  }

  return root;
}

// Helper function to find the minimum value node (leftmost node)
function findMin(node: BinaryNode<number>): BinaryNode<number> {
  while (node.left) {
    node = node.left;
  }
  return node;
}

// Alternative helper: find the maximum value node (rightmost node)
function findMax(node: BinaryNode<number>): BinaryNode<number> {
  while (node.right) {
    node = node.right;
  }
  return node;
}

// Utility function for tree visualization
function inOrderTraversal(node: BinaryNode<number> | null): number[] {
  if (!node) return [];
  return [
    ...inOrderTraversal(node.left),
    node.value,
    ...inOrderTraversal(node.right),
  ];
}

// Build a test tree
function buildTestTree(): BinaryNode<number> | null {
  let root: BinaryNode<number> | null = null;
  const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45];

  function insert(
    node: BinaryNode<number> | null,
    value: number
  ): BinaryNode<number> | null {
    if (!node) return { value, left: null, right: null } as BinaryNode<number>;
    if (value < node.value) node.left = insert(node.left, value);
    else if (value > node.value) node.right = insert(node.right, value);
    return node;
  }

  for (const val of values) {
    root = insert(root, val);
  }
  return root;
}

// Manual Tests
console.log("=== BST Delete Function Tests ===");

// const node = {
//   value: 0,
//   left: null,
//   right: null,
// };

let testTree: BinaryNode<number> | null = {
  value: 41,
  left: {
    value: 16,
    left: {
      value: 10,
      left: {
        value: 4,
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      value: 27,
      left: null,
      right: {
        value: 35,
        left: null,
        right: null,
      },
    },
  },
  right: {
    value: 65,
    left: {
      value: 46,
      left: {
        value: 44,
        left: null,
        right: {
          value: 45,
          left: null,
          right: null,
        },
      },
      right: {
        value: 53,
        left: {
          value: 52,
          left: null,
          right: null,
        },
        right: null,
      },
    },
    right: {
      value: 68,
      left: {
        value: 67,
        left: {
          value: 66,
          left: null,
          right: null,
        },
        right: null,
      },
      right: null,
    },
  },
};

console.log("Original tree (in-order):", inOrderTraversal(testTree));
console.log("Tree structure:", JSON.stringify(testTree, null, 2));

console.log("\n--- Test 1: Delete leaf node (4) ---");
testTree = deleteNode(testTree, 4);
console.log("After deleting 4:", inOrderTraversal(testTree));
console.log("Tree structure:", JSON.stringify(testTree, null, 2));

console.log("\n--- Test 2: Delete node with one right child (27) ---");
testTree = deleteNode(testTree, 27);
console.log("After deleting 27:", inOrderTraversal(testTree));
console.log("Tree structure:", JSON.stringify(testTree, null, 2));

console.log("\n--- Test 3: Delete node with one left child ---");
testTree = deleteNode(testTree, 53);
console.log("After deleting 53:", inOrderTraversal(testTree));
console.log("Tree structure:", JSON.stringify(testTree, null, 2));

console.log("\n--- Test 4: Delete node with two children (16) ---");
console.log("Before deleting 16:", inOrderTraversal(testTree));
testTree = deleteNode(testTree, 16);
console.log("After deleting 16:", inOrderTraversal(testTree));
console.log("Tree structure:", JSON.stringify(testTree, null, 2));

console.log("\n--- Test 4: Delete node with two children (46) ---");
console.log("Before deleting 46:", inOrderTraversal(testTree));
testTree = deleteNode(testTree, 46);
console.log("After deleting 46:", inOrderTraversal(testTree));
console.log("Tree structure:", JSON.stringify(testTree, null, 2));

console.log("\n--- Test 4: Delete node with two children (65) ---");
console.log("Before deleting 65:", inOrderTraversal(testTree));
testTree = deleteNode(testTree, 65);
console.log("After deleting 65:", inOrderTraversal(testTree));
console.log("Tree structure:", JSON.stringify(testTree, null, 2));

console.log("\n--- Test 5: Delete root node (41) ---");
console.log("Before deleting root:", inOrderTraversal(testTree));
testTree = deleteNode(testTree, 41);
console.log("After deleting root:", inOrderTraversal(testTree));
console.log("Tree structure:", JSON.stringify(testTree, null, 2));

console.log("\n--- Test 6: Delete non-existent value (999) ---");
const beforeNonExistent = inOrderTraversal(testTree);
testTree = deleteNode(testTree, 999);
const afterNonExistent = inOrderTraversal(testTree);
console.log(
  "Tree unchanged:",
  JSON.stringify(beforeNonExistent) === JSON.stringify(afterNonExistent)
);
console.log("Tree structure:", JSON.stringify(testTree, null, 2));

console.log("\n--- Test 7: Delete remaining nodes ---");
const remainingValues = inOrderTraversal(testTree);
console.log("Remaining values:", remainingValues);

for (const val of remainingValues) {
  testTree = deleteNode(testTree, val);
  console.log(`After deleting ${val}:`, inOrderTraversal(testTree));
}

console.log("Final tree (should be empty):", testTree);
console.log("Tree structure:", JSON.stringify(testTree, null, 2));

console.log("\n--- Test 8: Single node tree ---");
let singleNode: BinaryNode<number> | null = {
  value: 42,
  left: null,
  right: null,
};
console.log("Single node before deletion:", inOrderTraversal(singleNode));
singleNode = deleteNode(singleNode, 42);
console.log("After deleting single node:", singleNode);
console.log("Tree structure:", JSON.stringify(testTree, null, 2));
