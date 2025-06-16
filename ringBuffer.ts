/**
 * A generic Ring Buffer (Circular Buffer) implementation in TypeScript.
 * Provides O(1) enqueue and dequeue operations with fixed memory usage.
 */
export class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private head: number = 0; // Points to the next position to write
  private tail: number = 0; // Points to the next position to read
  private count: number = 0; // Number of elements currently in buffer
  private readonly capacity: number;

  /**
   * Creates a new Ring Buffer with the specified capacity.
   * @param capacity Maximum number of elements the buffer can hold
   */
  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("Capacity must be greater than 0");
    }
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  /**
   * Adds an element to the buffer. If buffer is full, overwrites the oldest element.
   * @param item The item to add
   * @returns true if item was added without overwriting, false if an item was overwritten
   */
  enqueue(item: T): boolean {
    const wasOverwritten = this.isFull();

    this.buffer[this.head] = item;
    this.head = (this.head + 1) % this.capacity;

    if (wasOverwritten) {
      // If we overwrote, move tail forward as well
      this.tail = (this.tail + 1) % this.capacity;
    } else {
      this.count++;
    }

    return !wasOverwritten;
  }

  /**
   * Removes and returns the oldest element from the buffer.
   * @returns The oldest element, or undefined if buffer is empty
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.buffer[this.tail];
    this.buffer[this.tail] = undefined; // Help GC
    this.tail = (this.tail + 1) % this.capacity;
    this.count--;

    return item;
  }

  /**
   * Returns the oldest element without removing it.
   * @returns The oldest element, or undefined if buffer is empty
   */
  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.buffer[this.tail];
  }

  /**
   * Returns the newest element without removing it.
   * @returns The newest element, or undefined if buffer is empty
   */
  peekLast(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const lastIndex = (this.head - 1 + this.capacity) % this.capacity;
    return this.buffer[lastIndex];
  }

  /**
   * Checks if the buffer is empty.
   */
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Checks if the buffer is full.
   */
  isFull(): boolean {
    return this.count === this.capacity;
  }

  /**
   * Returns the current number of elements in the buffer.
   */
  size(): number {
    return this.count;
  }

  /**
   * Returns the maximum capacity of the buffer.
   */
  getCapacity(): number {
    return this.capacity;
  }

  /**
   * Clears all elements from the buffer.
   */
  clear(): void {
    this.buffer.fill(undefined);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  /**
   * Returns an array containing all elements in order (oldest to newest).
   * This is O(n) operation and creates a new array.
   */
  toArray(): T[] {
    if (this.isEmpty()) {
      return [];
    }

    const result: T[] = [];
    let current = this.tail;

    for (let i = 0; i < this.count; i++) {
      result.push(this.buffer[current] as T);
      current = (current + 1) % this.capacity;
    }

    return result;
  }

  /**
   * Iterator implementation for for...of loops
   */
  *[Symbol.iterator](): Iterator<T> {
    let current = this.tail;
    for (let i = 0; i < this.count; i++) {
      yield this.buffer[current] as T;
      current = (current + 1) % this.capacity;
    }
  }

  /**
   * Returns a string representation of the buffer.
   */
  toString(): string {
    return `RingBuffer(${this.count}/${this.capacity}): [${this.toArray().join(
      ", "
    )}]`;
  }
}

// Example usage and tests
if (require.main === module) {
  console.log("=== Ring Buffer Demo ===\n");

  // Create a ring buffer with capacity 5
  const buffer = new RingBuffer<number>(5);

  console.log("1. Adding elements 1-7 (capacity is 5):");
  for (let i = 1; i <= 7; i++) {
    const added = buffer.enqueue(i);
    console.log(
      `  Added ${i}: ${
        added ? "success" : "overwrote old data"
      } | ${buffer.toString()}`
    );
  }

  console.log("\n2. Peeking at first and last elements:");
  console.log(`  First element: ${buffer.peek()}`);
  console.log(`  Last element: ${buffer.peekLast()}`);

  console.log("\n3. Dequeuing all elements:");
  while (!buffer.isEmpty()) {
    const item = buffer.dequeue();
    console.log(`  Dequeued: ${item} | Remaining: ${buffer.toString()}`);
  }

  console.log("\n4. Working with strings:");
  const stringBuffer = new RingBuffer<string>(3);
  ["hello", "world", "foo", "bar"].forEach((str) => {
    stringBuffer.enqueue(str);
    console.log(`  Added "${str}": ${stringBuffer.toString()}`);
  });

  console.log("\n5. Using iterator:");
  console.log("  Elements via for...of:", [...stringBuffer].join(" -> "));

  console.log("\n6. Performance characteristics:");
  const perfBuffer = new RingBuffer<number>(1000);

  console.time("  1000 enqueues");
  for (let i = 0; i < 1000; i++) {
    perfBuffer.enqueue(i);
  }
  console.timeEnd("  1000 enqueues");

  console.time("  1000 dequeues");
  for (let i = 0; i < 1000; i++) {
    perfBuffer.dequeue();
  }
  console.timeEnd("  1000 dequeues");
}
