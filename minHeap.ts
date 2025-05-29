export default class MinHeap {
  public length: number;
  private data: number[];

  constructor() {
    this.data = [];
    this.length = 0;
  }

  insert(value: number): void {
    this.data[this.length] = value;
    this.heapifyUp(this.length);
    this.length++;
  }

  delete(): number | undefined {
    if (this.length === 0) {
      return undefined;
    }

    const out = this.data[0]!; // Non-null assertion - we know index 0 exists
    this.length--;

    if (this.length === 0) {
      this.data = [];
      return out;
    }

    // Move last element to root and remove it from the end
    this.data[0] = this.data[this.length]!; // Non-null assertion
    this.data.length = this.length; // Actually shrink the array
    this.heapifyDown(0);
    return out;
  }

  private heapifyDown(idx: number): void {
    let minIdx = idx;
    const lIdx = this.leftChild(idx);
    const rIdx = this.rightChild(idx);

    // Check left child
    if (lIdx < this.length && this.data[lIdx]! < this.data[minIdx]!) {
      minIdx = lIdx;
    }

    // Check right child
    if (rIdx < this.length && this.data[rIdx]! < this.data[minIdx]!) {
      minIdx = rIdx;
    }

    if (minIdx !== idx) {
      // Swap elements
      const temp = this.data[idx]!;
      this.data[idx] = this.data[minIdx]!;
      this.data[minIdx] = temp;
      this.heapifyDown(minIdx);
    }
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) {
      return;
    }

    const p = this.parent(idx);
    if (this.data[p]! > this.data[idx]!) {
      // Swap elements
      const temp = this.data[idx]!;
      this.data[idx] = this.data[p]!;
      this.data[p] = temp;
      this.heapifyUp(p);
    }
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private leftChild(idx: number): number {
    return idx * 2 + 1;
  }

  private rightChild(idx: number): number {
    return idx * 2 + 2;
  }

  // Helper method to peek at minimum without removing it
  peek(): number | undefined {
    return this.length > 0 ? this.data[0] : undefined;
  }

  // Helper method to check if heap is empty
  isEmpty(): boolean {
    return this.length === 0;
  }
}

// Test the implementation
const heap = new MinHeap();
console.log("Initial length:", heap.length);

heap.insert(5);
heap.insert(3);
heap.insert(69);
heap.insert(420);
heap.insert(4);
heap.insert(1);
heap.insert(8);
heap.insert(7);

console.log("Length after insertions:", heap.length);
console.log("Peek at minimum:", heap.peek());

console.log("Deleting elements:");
console.log(heap.delete()); // Should be 1 (minimum)
console.log(heap.delete()); // Should be 3
console.log(heap.delete()); // Should be 4
console.log(heap.delete()); // Should be 5
console.log("Length after 4 deletions:", heap.length);

console.log("Continuing to delete:");
console.log(heap.delete()); // Should be 7
console.log(heap.delete()); // Should be 8
console.log(heap.delete()); // Should be 69
console.log(heap.delete()); // Should be 420
console.log("Final length:", heap.length);
console.log("Delete from empty heap:", heap.delete()); // Should be undefined
