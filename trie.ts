class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word
  insert(word: string): void {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }

    current.isEndOfWord = true;
  }

  // Search for a word
  search(word: string): boolean {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }

    return current.isEndOfWord;
  }

  // Check if any word start with the given prefix
  startsWith(prefix: string): boolean {
    let current = this.root;

    for (const char of prefix) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }

    return true;
  }

  // Delete a word
  delete(word: string): boolean {
    if (!word || !this.search(word)) {
      return false;
    }

    this.deleteHelper(this.root, word, 0);
    return true;
  }

  private deleteHelper(node: TrieNode, word: string, index: number): boolean {
    // Base case: reached the end of the word
    if (index === word.length) {
      // Unmark the end of word
      node.isEndOfWord = false;

      // Return true if current node has no children (can be deleted)
      return node.children.size === 0;
    }

    const char = word[index]!;
    const childNode = node.children.get(char)!; // We know it exists from search check

    // Recursively delete the rest of the word
    const shouldDeleteChild = this.deleteHelper(childNode, word, index + 1);

    // If child should be deleted, remove it
    if (shouldDeleteChild) {
      node.children.delete(char);

      // Return true if current node can be deleted
      // (has no children and is not the end of another word)
      return node.children.size === 0 && !node.isEndOfWord;
    }

    return false;
  }
}

// Example Usage
const trie = new Trie();

// Insert words
trie.insert("cat");
trie.insert("car");
trie.insert("card");
trie.insert("care");
trie.insert("careful");

console.log("Before deletion:");
console.log(trie.search("car")); // true
console.log(trie.search("card")); // true
console.log(trie.search("care")); // true
console.log(trie.search("careful")); // true

// Delete some words
console.log("\nDeleting 'car':", trie.delete("car")); // true
console.log("Deleting 'xyz':", trie.delete("xyz")); // false (doesn't exist)

console.log("\nAfter deletion:");
console.log(trie.search("car")); // false (deleted)
console.log(trie.search("card")); // true (still exists)
console.log(trie.search("care")); // true (still exists)
console.log(trie.search("careful")); // true (still exists)
console.log(trie.startsWith("ca")); // true (prefix still valid)

// Delete a word that is a prefix of another
console.log("\nDeleting 'care':", trie.delete("care")); // true
console.log(trie.search("care")); // false (deleted)
console.log(trie.search("careful")); // true (still exists)
