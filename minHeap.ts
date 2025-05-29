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

    const out = this.data[0];
    this.length--;

    if (this.length === 0) {
      this.data = [];
      return out;
    }

    this.data[0] = this.data[this.length];
    this.heapifyDown(0);
    return out;
  }

  private heapifyDown(idx: number): void {
    let minIdx = idx;
    const lIdx = this.leftChild(idx);
    const rIdx = this.rightChild(idx);

    if (lIdx < this.length && this.data[lIdx] < this.data[minIdx]) {
      minIdx = lIdx;
    }

    if (rIdx < this.length && this.data[rIdx] < this.data[minIdx]) {
      minIdx = rIdx;
    }

    if (minIdx !== idx) {
      // Swap
      const temp = this.data[idx];
      this.data[idx] = this.data[minIdx];
      this.data[minIdx] = temp;
      this.heapifyDown(minIdx);
    }
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) {
      return;
    }

    const p = this.parent(idx);
    if (this.data[p] > this.data[idx]) {
      // Swap
      const temp = this.data[idx];
      this.data[idx] = this.data[p];
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
}

const heap = new MinHeap();
console.log(heap.length);
heap.insert(5);
heap.insert(3);
heap.insert(69);
heap.insert(420);
heap.insert(4);
heap.insert(1);
heap.insert(8);
heap.insert(7);

console.log(heap.length);
console.log(heap.delete());
console.log(heap.delete());
console.log(heap.delete());
console.log(heap.delete());
console.log(heap.length);
console.log(heap.delete());
console.log(heap.delete());
console.log(heap.delete());
console.log(heap.delete());
console.log(heap.length);
