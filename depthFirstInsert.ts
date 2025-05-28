import { tree } from "./tree";
import type { BinaryNode } from "./binaryNode";
import inOrderSearch from "./btInOrder";

export default function insert(
  node: BinaryNode<number> | null,
  value: number
): BinaryNode<number> | null {
  // Base case: create new node if current position is null
  if (!node) {
    return { value: value, left: null, right: null } as BinaryNode<number>;
  }

  if (value > node.value) {
    node.right = insert(node.right, value);
  } else if (value < node.value) {
    node.left = insert(node.left, value);
  }
  // If value equals node.value, do nothing (no duplicates)

  return node;
}

// Manual Tests
console.log("=== BST Insert Tests ===");

// Test 1: Insert into empty tree
console.log("\nTest 1: Insert into empty tree");
let root1 = insert(null, 10);
console.log("Root after inserting 10:", root1);

// Test 2: Insert multiple values to build a tree
console.log("\nTest 2: Build tree with values [10, 5, 15, 3, 7, 12, 20]");
let root2: BinaryNode<number> | null = null;
const values = [10, 5, 15, 3, 7, 12, 20];
for (const val of values) {
  root2 = insert(root2, val);
}
console.log("Final tree structure:", JSON.stringify(root2, null, 2));

// Test 3: Insert duplicate values (should not add duplicates)
console.log("\nTest 3: Insert duplicate value 10");
const beforeDuplicate = JSON.stringify(root2);
root2 = insert(root2, 10);
const afterDuplicate = JSON.stringify(root2);
console.log(
  "Tree unchanged after duplicate:",
  beforeDuplicate === afterDuplicate
);

// Test 4: Insert values that go left and right
console.log(
  "\nTest 4: Insert 1 (should go far left) and 25 (should go far right)"
);
root2 = insert(root2, 1);
root2 = insert(root2, 25);
console.log("Tree after inserting 1 and 25:", JSON.stringify(root2, null, 2));

// Test 5: Verify BST property with in-order traversal
console.log("\nTest 5: Verify BST property (in-order should be sorted)");
function inOrderTraversal(node: BinaryNode<number> | null): number[] {
  if (!node) return [];
  return [
    ...inOrderTraversal(node.left),
    node.value,
    ...inOrderTraversal(node.right),
  ];
}
const inOrderResult = inOrderTraversal(root2);
console.log("In-order traversal:", inOrderResult);
console.log(
  "Is sorted:",
  JSON.stringify(inOrderResult) ===
    JSON.stringify([...inOrderResult].sort((a, b) => a - b))
);

// Test 6: Single node operations
console.log("\nTest 6: Single node tree operations");
let singleNode = insert(null, 42);
console.log("Single node tree:", singleNode);
singleNode = insert(singleNode, 30);
singleNode = insert(singleNode, 50);
console.log("After adding 30 and 50:", JSON.stringify(singleNode, null, 2));
