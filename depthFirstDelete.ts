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
