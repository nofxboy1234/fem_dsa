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

let testTree = buildTestTree();
console.log("Original tree (in-order):", inOrderTraversal(testTree));
console.log("Tree structure:", JSON.stringify(testTree, null, 2));

// Test 1: Delete leaf node (no children)
console.log("\n--- Test 1: Delete leaf node (10) ---");
testTree = deleteNode(testTree, 10);
console.log("After deleting 10:", inOrderTraversal(testTree));

// Test 2: Delete node with only right child (25)
console.log("\n--- Test 2: Delete node with one child (25) ---");
testTree = deleteNode(testTree, 25);
console.log("After deleting 25:", inOrderTraversal(testTree));

// Test 3: Delete node with only left child
// First, let's create this scenario by deleting 45
console.log("\n--- Test 3: Delete node with only left child ---");
testTree = deleteNode(testTree, 45);
console.log("After deleting 45:", inOrderTraversal(testTree));

// Test 4: Delete node with two children (30)
console.log("\n--- Test 4: Delete node with two children (30) ---");
console.log("Before deleting 30:", inOrderTraversal(testTree));
testTree = deleteNode(testTree, 30);
console.log("After deleting 30:", inOrderTraversal(testTree));

// Test 5: Delete root node
console.log("\n--- Test 5: Delete root node (50) ---");
console.log("Before deleting root:", inOrderTraversal(testTree));
testTree = deleteNode(testTree, 50);
console.log("After deleting root:", inOrderTraversal(testTree));

// Test 6: Delete non-existent value
console.log("\n--- Test 6: Delete non-existent value (999) ---");
const beforeNonExistent = inOrderTraversal(testTree);
testTree = deleteNode(testTree, 999);
const afterNonExistent = inOrderTraversal(testTree);
console.log(
  "Tree unchanged:",
  JSON.stringify(beforeNonExistent) === JSON.stringify(afterNonExistent)
);

// Test 7: Delete all nodes one by one
console.log("\n--- Test 7: Delete remaining nodes ---");
const remainingValues = inOrderTraversal(testTree);
console.log("Remaining values:", remainingValues);

for (const val of remainingValues) {
  testTree = deleteNode(testTree, val);
  console.log(`After deleting ${val}:`, inOrderTraversal(testTree));
}

console.log("Final tree (should be empty):", testTree);

// Test 8: Edge case - single node tree
console.log("\n--- Test 8: Single node tree ---");
let singleNode: BinaryNode<number> | null = {
  value: 42,
  left: null,
  right: null,
};
console.log("Single node before deletion:", inOrderTraversal(singleNode));
singleNode = deleteNode(singleNode, 42);
console.log("After deleting single node:", singleNode);
