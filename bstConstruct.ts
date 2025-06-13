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
  static fromArrayBalanced<T>(
    arr: T[],
    compareFn?: (a: T, b: T) => number
  ): BinarySearchTree<T> {
    const bst = new BinarySearchTree<T>();

    if (arr.length === 0) return bst;

    // Remove duplicates and sort
    const uniqueSorted = [...new Set(arr)].sort(compareFn);

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
    const node = new TreeNode<T>(sortedArr[mid]!);

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
    } = {},
    compareFn?: (a: T, b: T) => number
  ): BinarySearchTree<T> {
    const { allowDuplicates = false, balanced = false } = options;

    if (balanced) {
      return BinarySearchTree.fromArrayBalanced(arr, compareFn);
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

  // Find method using Depth-First Search
  // Returns true if value exists in the tree, false otherwise
  // Time: O(h) where h is the height of the tree
  // Space: O(h) due to recursion stack
  find(value: T): boolean {
    return this.findNode(this.root, value) !== null;
  }

  // Find and return the node (useful for getting reference to the actual node)
  findNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    // Base case: empty tree or value not found
    if (node === null) {
      return null;
    }

    // Found the value
    if (node.value === value) {
      return node;
    }

    // Use BST property to search efficiently
    if (value < node.value) {
      return this.findNode(node.left, value);
    } else {
      return this.findNode(node.right, value);
    }
  }

  // Alternative find methods for different DFS approaches
  findPreorder(value: T): boolean {
    return this.findPreorderHelper(this.root, value);
  }

  private findPreorderHelper(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;

    // Check current node first (preorder: Root-Left-Right)
    if (node.value === value) return true;

    // Then search left and right subtrees
    return (
      this.findPreorderHelper(node.left, value) ||
      this.findPreorderHelper(node.right, value)
    );
  }

  findInorder(value: T): boolean {
    return this.findInorderHelper(this.root, value);
  }

  private findInorderHelper(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;

    // Search left subtree first (inorder: Left-Root-Right)
    if (this.findInorderHelper(node.left, value)) return true;

    // Check current node
    if (node.value === value) return true;

    // Search right subtree
    return this.findInorderHelper(node.right, value);
  }

  findPostorder(value: T): boolean {
    return this.findPostorderHelper(this.root, value);
  }

  private findPostorderHelper(node: TreeNode<T> | null, value: T): boolean {
    if (node === null) return false;

    // Search left and right subtrees first (postorder: Left-Right-Root)
    if (
      this.findPostorderHelper(node.left, value) ||
      this.findPostorderHelper(node.right, value)
    ) {
      return true;
    }

    // Check current node last
    return node.value === value;
  }

  // Delete method using Depth-First Search
  // Time: O(h) where h is the height of the tree
  // Space: O(h) due to recursion stack
  delete(value: T): boolean {
    const originalSize = this.size();
    this.root = this.deleteNode(this.root, value);
    return this.size() < originalSize; // Return true if deletion occurred
  }

  private deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    // Base case: value not found
    if (node === null) {
      return null;
    }

    // Navigate to the node to be deleted using DFS
    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Found the node to delete - handle three cases:

      // Case 1: Leaf node (no children)
      if (node.left === null && node.right === null) {
        return null;
      }

      // Case 2: Node with one child
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      // Case 3: Node with two children
      // Find the inorder successor (smallest value in right subtree)
      const successor = this.findMin(node.right);

      // Replace the node's value with successor's value
      node.value = successor.value;

      // Delete the successor (which will have at most one child)
      node.right = this.deleteNode(node.right, successor.value);
    }

    return node;
  }

  // Helper method to find minimum value node (used in deletion)
  private findMin(node: TreeNode<T>): TreeNode<T> {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Helper method to find maximum value node
  private findMax(node: TreeNode<T>): TreeNode<T> {
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  }

  // Get the size of the tree (number of nodes)
  size(): number {
    return this.countNodes(this.root);
  }

  private countNodes(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }

  // Check if tree is empty
  isEmpty(): boolean {
    return this.root === null;
  }

  // Find minimum value in the tree
  findMinValue(): T | null {
    if (this.root === null) return null;
    return this.findMin(this.root).value;
  }

  // Find maximum value in the tree
  findMaxValue(): T | null {
    if (this.root === null) return null;
    return this.findMax(this.root).value;
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

  // Breadth-first traversal (Level-order traversal)
  // Time: O(n) - visits each node once
  // Space: O(w) where w is the maximum width of the tree
  breadthFirstTraversal(): T[] {
    const result: T[] = [];

    if (this.root === null) {
      return result;
    }

    const queue: TreeNode<T>[] = [this.root];

    while (queue.length > 0) {
      const node = queue.shift()!; // Remove from front of queue
      result.push(node.value);

      // Add children to queue (left first, then right)
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }

    return result;
  }

  // Alternative: Breadth-first traversal that returns nodes grouped by level
  breadthFirstTraversalByLevel(): T[][] {
    const result: T[][] = [];

    if (this.root === null) {
      return result;
    }

    let currentLevel: TreeNode<T>[] = [this.root];

    while (currentLevel.length > 0) {
      const levelValues: T[] = [];
      const nextLevel: TreeNode<T>[] = [];

      for (const node of currentLevel) {
        levelValues.push(node.value);

        if (node.left !== null) {
          nextLevel.push(node.left);
        }
        if (node.right !== null) {
          nextLevel.push(node.right);
        }
      }

      result.push(levelValues);
      currentLevel = nextLevel;
    }

    return result;
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

  // Get the depth of a specific value in the tree
  getDepth(value: T): number {
    return this.calculateDepth(this.root, value, 0);
  }

  private calculateDepth(
    node: TreeNode<T> | null,
    value: T,
    currentDepth: number
  ): number {
    if (node === null) return -1; // Value not found

    if (node.value === value) {
      return currentDepth;
    }

    if (value < node.value) {
      return this.calculateDepth(node.left, value, currentDepth + 1);
    } else {
      return this.calculateDepth(node.right, value, currentDepth + 1);
    }
  }

  // Get all nodes at a specific depth level
  getNodesAtDepth(depth: number): T[] {
    const result: T[] = [];
    this.collectNodesAtDepth(this.root, depth, 0, result);
    return result;
  }

  private collectNodesAtDepth(
    node: TreeNode<T> | null,
    targetDepth: number,
    currentDepth: number,
    result: T[]
  ): void {
    if (node === null) return;

    if (currentDepth === targetDepth) {
      result.push(node.value);
      return;
    }

    this.collectNodesAtDepth(node.left, targetDepth, currentDepth + 1, result);
    this.collectNodesAtDepth(node.right, targetDepth, currentDepth + 1, result);
  }

  // Get depth information for all nodes
  getDepthMap(): Map<T, number> {
    const depthMap = new Map<T, number>();
    this.buildDepthMap(this.root, 0, depthMap);
    return depthMap;
  }

  private buildDepthMap(
    node: TreeNode<T> | null,
    depth: number,
    depthMap: Map<T, number>
  ): void {
    if (node !== null) {
      depthMap.set(node.value, depth);
      this.buildDepthMap(node.left, depth + 1, depthMap);
      this.buildDepthMap(node.right, depth + 1, depthMap);
    }
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
console.log("Breadth-first traversal:", bst1.breadthFirstTraversal());
console.log("Breadth-first by level:", bst1.breadthFirstTraversalByLevel());
console.log("Tree height:", bst1.getHeight());
console.log("Tree structure:");
console.log(bst1.visualize());

// Method 2: Balanced construction
console.log("\n2. Balanced Construction:");
const bst2 = BinarySearchTree.fromArrayBalanced(
  unorderedArray,
  (a, b) => a - b
);
console.log("Inorder traversal:", bst2.inorderTraversal());
console.log("Preorder traversal:", bst2.preorderTraversal());
console.log("Postorder traversal:", bst2.postorderTraversal());
console.log("Breadth-first traversal:", bst2.breadthFirstTraversal());
console.log("Breadth-first by level:", bst2.breadthFirstTraversalByLevel());
console.log("Tree height:", bst2.getHeight());
console.log("Tree structure:");
console.log(bst2.visualize());
// bst2.delete(8);
// bst2.delete(6);
bst2.delete(10);

// Test with different data types
console.log("\n=== String Array Example ===");
const stringArray = ["banana", "apple", "cherry", "date", "elderberry"];
console.log("Original array:", stringArray);

const stringBST = BinarySearchTree.fromArrayBalanced(stringArray);
console.log("Inorder traversal:", stringBST.inorderTraversal());
console.log("Preorder traversal:", stringBST.preorderTraversal());
console.log("Postorder traversal:", stringBST.postorderTraversal());
console.log("Breadth-first traversal:", stringBST.breadthFirstTraversal());

// Test with duplicates
console.log("\n=== Array with Duplicates ===");
const arrayWithDuplicates = [5, 3, 7, 3, 8, 5, 1, 9, 1];
console.log("Original array:", arrayWithDuplicates);

const bstNoDuplicates = BinarySearchTree.fromArrayCustom(
  arrayWithDuplicates,
  {
    allowDuplicates: false,
    balanced: true,
  },
  (a, b) => a - b
);
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
console.log(
  "Breadth-first (no duplicates, balanced):",
  bstNoDuplicates.breadthFirstTraversal()
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
console.log(
  "Breadth-first (Level-order):",
  comparisonBST.breadthFirstTraversal()
);
console.log(
  "Breadth-first by level:",
  comparisonBST.breadthFirstTraversalByLevel()
);

// Depth analysis
console.log("\n=== Depth Analysis ===");
console.log("Tree height:", comparisonBST.getHeight());
console.log("Depth of 50:", comparisonBST.getDepth(50)); // Root
console.log("Depth of 30:", comparisonBST.getDepth(30)); // Level 1
console.log("Depth of 20:", comparisonBST.getDepth(20)); // Level 2
console.log("Depth of 99:", comparisonBST.getDepth(99)); // Not found

console.log("Nodes at depth 0:", comparisonBST.getNodesAtDepth(0)); // Root level
console.log("Nodes at depth 1:", comparisonBST.getNodesAtDepth(1)); // Second level
console.log("Nodes at depth 2:", comparisonBST.getNodesAtDepth(2)); // Third level
console.log("Nodes at depth 3:", comparisonBST.getNodesAtDepth(3)); // Empty level

const depthMap = comparisonBST.getDepthMap();
console.log("Complete depth mapping:");
for (const [value, depth] of depthMap) {
  console.log(`  Value ${value} is at depth ${depth}`);
}

// Compare depth distributions between simple and balanced trees
console.log("\n=== Depth Distribution Comparison ===");
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const simpleBST = BinarySearchTree.fromArraySimple(testArray);
const balancedBST = BinarySearchTree.fromArrayBalanced(
  testArray,
  (a, b) => a - b
);

console.log("Simple BST (sequential insertion):");
console.log("  Height:", simpleBST.getHeight());
console.log("  Depth map:", Array.from(simpleBST.getDepthMap().entries()));
console.log("  Breadth-first:", simpleBST.breadthFirstTraversal());

console.log("Balanced BST:");
console.log("  Height:", balancedBST.getHeight());
console.log("  Depth map:", Array.from(balancedBST.getDepthMap().entries()));
console.log("  Breadth-first:", balancedBST.breadthFirstTraversal());

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
const largeBST2 = BinarySearchTree.fromArrayBalanced(
  largeArray,
  (a, b) => a - b
);
console.timeEnd("Balanced construction");
console.log("Balanced BST height:", largeBST2.getHeight());

// Demonstrate breadth-first traversal characteristics
console.log("\n=== Breadth-First Traversal Characteristics ===");
const demoArray = [4, 2, 6, 1, 3, 5, 7];
const demoBST = BinarySearchTree.fromArraySimple(demoArray);
console.log("Demo tree structure:");
console.log(demoBST.visualize());
console.log("Breadth-first traversal visits nodes level by level:");
console.log("  Result:", demoBST.breadthFirstTraversal());
console.log("  By level:", demoBST.breadthFirstTraversalByLevel());

// Test Find and Delete methods
console.log("\n=== Find and Delete Methods Demo ===");
const testTree = BinarySearchTree.fromArraySimple([
  50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45,
]);
console.log("Initial tree:");
console.log(testTree.visualize());
console.log("Tree size:", testTree.size());

// Test find methods
console.log("\n--- Find Method Tests ---");
console.log("find(40):", testTree.find(40)); // true
console.log("find(99):", testTree.find(99)); // false
console.log("find(10):", testTree.find(10)); // true

// Test different DFS find approaches
console.log("findPreorder(40):", testTree.findPreorder(40)); // true
console.log("findInorder(40):", testTree.findInorder(40)); // true
console.log("findPostorder(40):", testTree.findPostorder(40)); // true

// Test min/max
console.log("Min value:", testTree.findMinValue()); // 10
console.log("Max value:", testTree.findMaxValue()); // 80

// Test deletions
console.log("\n--- Delete Method Tests ---");

// Delete leaf node
console.log("Deleting leaf node (10):", testTree.delete(10));
console.log("Tree after deleting 10:");
console.log(testTree.visualize());
console.log("Tree size:", testTree.size());

// Delete node with one child
console.log("\nDeleting node with one child (25):", testTree.delete(25));
console.log("Tree after deleting 25:");
console.log(testTree.visualize());
console.log("Tree size:", testTree.size());

// Delete node with two children
console.log("\nDeleting node with two children (30):", testTree.delete(30));
console.log("Tree after deleting 30:");
console.log(testTree.visualize());
console.log("Tree size:", testTree.size());

// Delete root node
console.log("\nDeleting root node (50):", testTree.delete(50));
console.log("Tree after deleting root (50):");
console.log(testTree.visualize());
console.log("Tree size:", testTree.size());

// Try to delete non-existent value
console.log("\nTrying to delete non-existent value (99):", testTree.delete(99));
console.log("Tree unchanged:");
console.log(testTree.visualize());

// Verify tree properties after deletions
console.log("\n--- Tree Properties After Deletions ---");
console.log(
  "Inorder traversal (should still be sorted):",
  testTree.inorderTraversal()
);
console.log("Tree height:", testTree.getHeight());
console.log("Is empty:", testTree.isEmpty());

// Test edge cases
console.log("\n--- Edge Case Tests ---");
const emptyTree = new BinarySearchTree<number>();
console.log("Empty tree - find(5):", emptyTree.find(5)); // false
console.log("Empty tree - delete(5):", emptyTree.delete(5)); // false
console.log("Empty tree - min value:", emptyTree.findMinValue()); // null
console.log("Empty tree - max value:", emptyTree.findMaxValue()); // null
console.log("Empty tree - size:", emptyTree.size()); // 0
console.log("Empty tree - is empty:", emptyTree.isEmpty()); // true

// Test single node tree
const singleNodeTree = BinarySearchTree.fromArraySimple([42]);
console.log("\nSingle node tree:");
console.log(singleNodeTree.visualize());
console.log("find(42):", singleNodeTree.find(42)); // true
console.log("delete(42):", singleNodeTree.delete(42)); // true
console.log("After deletion - is empty:", singleNodeTree.isEmpty()); // true

// Performance comparison of find methods
console.log("\n=== Find Method Performance Comparison ===");
const perfArray = Array.from({ length: 100 }, (_, i) => i + 1);
const perfTree = BinarySearchTree.fromArrayBalanced(perfArray, (a, b) => a - b);

const searchValue = 75;
console.log(`Searching for ${searchValue} in balanced tree with 100 nodes:`);

console.time("Standard find (BST optimized)");
for (let i = 0; i < 1000; i++) {
  perfTree.find(searchValue);
}
console.timeEnd("Standard find (BST optimized)");

console.time("Preorder find (visits nodes: Root-Left-Right)");
for (let i = 0; i < 1000; i++) {
  perfTree.findPreorder(searchValue);
}
console.timeEnd("Preorder find (visits nodes: Root-Left-Right)");

console.time("Inorder find (visits nodes: Left-Root-Right)");
for (let i = 0; i < 1000; i++) {
  perfTree.findInorder(searchValue);
}
console.timeEnd("Inorder find (visits nodes: Left-Root-Right)");

console.time("Postorder find (visits nodes: Left-Right-Root)");
for (let i = 0; i < 1000; i++) {
  perfTree.findPostorder(searchValue);
}
console.timeEnd("Postorder find (visits nodes: Left-Right-Root)");

console.log(
  "\nNote: Standard find() is most efficient for BST as it uses the ordering property,"
);
console.log(
  "while other DFS methods are provided for educational purposes and special use cases."
);
