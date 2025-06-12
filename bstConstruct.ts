class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;

  // Method 1: Simple construction - insert elements one by one
  // Time: O(n²) worst case, O(n log n) average case
  // Space: O(n)
  static fromArraySimple<T>(arr: T[]): BinarySearchTree<T> {
    const bst = new BinarySearchTree<T>();

    for (const value of arr) {
      bst.insert(value);
    }

    return bst;
  }

  // Method 2: Balanced construction - sort first, then build balanced tree
  // Time: O(n log n) - due to sorting
  // Space: O(n)
  static fromArrayBalanced<T>(arr: T[]): BinarySearchTree<T> {
    const bst = new BinarySearchTree<T>();

    if (arr.length === 0) return bst;

    // Remove duplicates and sort
    const uniqueSorted = [...new Set(arr)].sort();

    bst.root = bst.buildBalancedTree(uniqueSorted, 0, uniqueSorted.length - 1);
    return bst;
  }

  private buildBalancedTree(
    sortedArr: T[],
    start: number,
    end: number
  ): TreeNode<T> | null {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new TreeNode(sortedArr[mid]);

    node.left = this.buildBalancedTree(sortedArr, start, mid - 1);
    node.right = this.buildBalancedTree(sortedArr, mid + 1, end);

    return node;
  }

  // Method 3: Custom construction with duplicate handling options
  static fromArrayCustom<T>(
    arr: T[],
    options: {
      allowDuplicates?: boolean;
      balanced?: boolean;
    } = {}
  ): BinarySearchTree<T> {
    const { allowDuplicates = false, balanced = false } = options;

    if (balanced) {
      return BinarySearchTree.fromArrayBalanced(arr);
    }

    const bst = new BinarySearchTree<T>();
    const processedValues = new Set<T>();

    for (const value of arr) {
      if (allowDuplicates || !processedValues.has(value)) {
        bst.insert(value);
        processedValues.add(value);
      }
    }

    return bst;
  }

  // Insert method
  insert(value: T): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: TreeNode<T> | null, value: T): TreeNode<T> {
    if (node === null) {
      return new TreeNode(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    }
    // Equal values are ignored (no duplicates)

    return node;
  }

  // Helper methods for testing
  inorderTraversal(): T[] {
    const result: T[] = [];
    this.inorder(this.root, result);
    return result;
  }

  private inorder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inorder(node.left, result);
      result.push(node.value);
      this.inorder(node.right, result);
    }
  }

  // Pre-order traversal (Root -> Left -> Right)
  preorderTraversal(): T[] {
    const result: T[] = [];
    this.preorder(this.root, result);
    return result;
  }

  private preorder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.value); // Visit root first
      this.preorder(node.left, result); // Then left subtree
      this.preorder(node.right, result); // Then right subtree
    }
  }

  // Post-order traversal (Left -> Right -> Root)
  postorderTraversal(): T[] {
    const result: T[] = [];
    this.postorder(this.root, result);
    return result;
  }

  private postorder(node: TreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postorder(node.left, result); // Visit left subtree first
      this.postorder(node.right, result); // Then right subtree
      result.push(node.value); // Finally root
    }
  }

  getHeight(): number {
    return this.calculateHeight(this.root);
  }

  private calculateHeight(node: TreeNode<T> | null): number {
    if (node === null) return -1;

    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Visualize tree structure (for small trees)
  visualize(): string {
    if (this.root === null) return "Empty tree";

    const lines: string[] = [];
    this.buildVisualization(this.root, "", true, lines);
    return lines.join("\n");
  }

  private buildVisualization(
    node: TreeNode<T> | null,
    prefix: string,
    isLast: boolean,
    lines: string[]
  ): void {
    if (node !== null) {
      lines.push(prefix + (isLast ? "└── " : "├── ") + node.value);

      const children = [node.left, node.right].filter(
        (child) => child !== null
      );

      if (node.left) {
        this.buildVisualization(
          node.left,
          prefix + (isLast ? "    " : "│   "),
          !node.right,
          lines
        );
      }

      if (node.right) {
        this.buildVisualization(
          node.right,
          prefix + (isLast ? "    " : "│   "),
          true,
          lines
        );
      }
    }
  }
}

// Example usage and comparisons
console.log("=== BST Construction from Unordered Array ===\n");

const unorderedArray = [15, 10, 20, 8, 12, 16, 25, 6, 11, 13, 27];
console.log("Original array:", unorderedArray);

// Method 1: Simple construction
console.log("\n1. Simple Construction (insert order matters):");
const bst1 = BinarySearchTree.fromArraySimple(unorderedArray);
console.log("Inorder traversal:", bst1.inorderTraversal());
console.log("Preorder traversal:", bst1.preorderTraversal());
console.log("Postorder traversal:", bst1.postorderTraversal());
console.log("Tree height:", bst1.getHeight());
console.log("Tree structure:");
console.log(bst1.visualize());

// Method 2: Balanced construction
console.log("\n2. Balanced Construction:");
const bst2 = BinarySearchTree.fromArrayBalanced(unorderedArray);
console.log("Inorder traversal:", bst2.inorderTraversal());
console.log("Preorder traversal:", bst2.preorderTraversal());
console.log("Postorder traversal:", bst2.postorderTraversal());
console.log("Tree height:", bst2.getHeight());
console.log("Tree structure:");
console.log(bst2.visualize());

// Test with different data types
console.log("\n=== String Array Example ===");
const stringArray = ["banana", "apple", "cherry", "date", "elderberry"];
console.log("Original array:", stringArray);

const stringBST = BinarySearchTree.fromArrayBalanced(stringArray);
console.log("Inorder traversal:", stringBST.inorderTraversal());
console.log("Preorder traversal:", stringBST.preorderTraversal());
console.log("Postorder traversal:", stringBST.postorderTraversal());

// Test with duplicates
console.log("\n=== Array with Duplicates ===");
const arrayWithDuplicates = [5, 3, 7, 3, 8, 5, 1, 9, 1];
console.log("Original array:", arrayWithDuplicates);

const bstNoDuplicates = BinarySearchTree.fromArrayCustom(arrayWithDuplicates, {
  allowDuplicates: false,
  balanced: true,
});
console.log(
  "Inorder (no duplicates, balanced):",
  bstNoDuplicates.inorderTraversal()
);
console.log(
  "Preorder (no duplicates, balanced):",
  bstNoDuplicates.preorderTraversal()
);
console.log(
  "Postorder (no duplicates, balanced):",
  bstNoDuplicates.postorderTraversal()
);

// Traversal comparison example
console.log("\n=== Traversal Comparison Example ===");
const comparisonArray = [50, 30, 70, 20, 40, 60, 80];
console.log("Array:", comparisonArray);

const comparisonBST = BinarySearchTree.fromArraySimple(comparisonArray);
console.log("Tree structure:");
console.log(comparisonBST.visualize());
console.log("Inorder (L-Root-R):", comparisonBST.inorderTraversal());
console.log("Preorder (Root-L-R):", comparisonBST.preorderTraversal());
console.log("Postorder (L-R-Root):", comparisonBST.postorderTraversal());

// Performance comparison for larger arrays
console.log("\n=== Performance Comparison ===");
const largeArray = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 1000)
);

console.time("Simple construction");
const largeBST1 = BinarySearchTree.fromArraySimple(largeArray);
console.timeEnd("Simple construction");
console.log("Simple BST height:", largeBST1.getHeight());

console.time("Balanced construction");
const largeBST2 = BinarySearchTree.fromArrayBalanced(largeArray);
console.timeEnd("Balanced construction");
console.log("Balanced BST height:", largeBST2.getHeight());
