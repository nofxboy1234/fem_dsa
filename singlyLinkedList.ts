/**
 * Node class representing each element in the linked list
 */
class ListNode<T> {
  data: T;
  next: ListNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

/**
 * Singly Linked List implementation with generic type support
 */
class SinglyLinkedList<T> {
  private head: ListNode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Returns the current size of the list
   * Time Complexity: O(1)
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Checks if the list is empty
   * Time Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Adds an element to the beginning of the list
   * Time Complexity: O(1)
   */
  prepend(data: T): void {
    const newNode = new ListNode(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  /**
   * Adds an element to the end of the list
   * Time Complexity: O(n)
   */
  append(data: T): void {
    const newNode = new ListNode(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  /**
   * Inserts an element at the specified index
   * Time Complexity: O(n)
   */
  insertAt(index: number, data: T): void {
    if (index < 0 || index > this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      this.prepend(data);
      return;
    }

    const newNode = new ListNode(data);
    let current = this.head!;

    for (let i = 0; i < index - 1; i++) {
      current = current.next!;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }

  /**
   * Removes and returns the first element
   * Time Complexity: O(1)
   */
  removeFirst(): T | null {
    if (!this.head) {
      return null;
    }

    const data = this.head.data;
    this.head = this.head.next;
    this.size--;
    return data;
  }

  /**
   * Removes and returns the last element
   * Time Complexity: O(n)
   */
  removeLast(): T | null {
    if (!this.head) {
      return null;
    }

    if (!this.head.next) {
      const data = this.head.data;
      this.head = null;
      this.size--;
      return data;
    }

    let current = this.head;
    while (current.next!.next) {
      current = current.next!;
    }

    const data = current.next!.data;
    current.next = null;
    this.size--;
    return data;
  }

  /**
   * Removes element at the specified index
   * Time Complexity: O(n)
   */
  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      return this.removeFirst();
    }

    let current = this.head!;
    for (let i = 0; i < index - 1; i++) {
      current = current.next!;
    }

    const data = current.next!.data;
    current.next = current.next!.next;
    this.size--;
    return data;
  }

  /**
   * Removes the first occurrence of the specified element
   * Time Complexity: O(n)
   */
  remove(data: T): boolean {
    if (!this.head) {
      return false;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      this.size--;
      return true;
    }

    return false;
  }

  /**
   * Returns the element at the specified index without removing it
   * Time Complexity: O(n)
   */
  get(index: number): T | null {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }

    let current = this.head!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }

    return current.data;
  }

  /**
   * Returns the first element without removing it
   * Time Complexity: O(1)
   */
  getFirst(): T | null {
    return this.head ? this.head.data : null;
  }

  /**
   * Returns the last element without removing it
   * Time Complexity: O(n)
   */
  getLast(): T | null {
    if (!this.head) {
      return null;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    return current.data;
  }

  /**
   * Finds the index of the first occurrence of the specified element
   * Time Complexity: O(n)
   */
  indexOf(data: T): number {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  /**
   * Checks if the list contains the specified element
   * Time Complexity: O(n)
   */
  contains(data: T): boolean {
    return this.indexOf(data) !== -1;
  }

  /**
   * Removes all elements from the list
   * Time Complexity: O(1)
   */
  clear(): void {
    this.head = null;
    this.size = 0;
  }

  /**
   * Reverses the linked list in place
   * Time Complexity: O(n)
   */
  reverse(): void {
    let prev: ListNode<T> | null = null;
    let current = this.head;
    let next: ListNode<T> | null = null;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }

  /**
   * Converts the list to an array
   * Time Complexity: O(n)
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  /**
   * Creates a string representation of the list
   * Time Complexity: O(n)
   */
  toString(): string {
    if (this.isEmpty()) {
      return "[]";
    }

    const values = this.toArray();
    return "[" + values.join(" -> ") + "]";
  }

  /**
   * Iterator implementation for for...of loops
   */
  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current) {
      yield current.data;
      current = current.next;
    }
  }
}

// Example usage and testing
const list = new SinglyLinkedList<number>();

// Test basic operations
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);

console.log("List after adding elements:", list.toString()); // [0 -> 1 -> 2 -> 3]
console.log("Size:", list.getSize()); // 4

// Test insertions
list.insertAt(2, 1.5);
console.log("After inserting 1.5 at index 2:", list.toString()); // [0 -> 1 -> 1.5 -> 2 -> 3]

// Test removals
console.log("Removed first:", list.removeFirst()); // 0
console.log("Removed last:", list.removeLast()); // 3
console.log("After removals:", list.toString()); // [1 -> 1.5 -> 2]

// Test search operations
console.log("Index of 1.5:", list.indexOf(1.5)); // 1
console.log("Contains 2:", list.contains(2)); // true
console.log("Get element at index 0:", list.get(0)); // 1

// Test iteration
console.log("Iterating with for...of:");
for (const value of list) {
  console.log(value);
}

// Test with strings
const stringList = new SinglyLinkedList<string>();
stringList.append("hello");
stringList.append("world");
stringList.prepend("hi");
console.log("String list:", stringList.toString()); // [hi -> hello -> world]

export { SinglyLinkedList, ListNode };
