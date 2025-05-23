type Node<T> = {
  value: T;
  prev?: Node<T>;
};

export default class Stack<T> {
  public length: number;
  private head?: Node<T>;

  constructor() {
    this.head = undefined;
    this.length = 0;
  }

  push(item: T): void {
    const node = { value: item } as Node<T>;

    this.length++;
    if (!this.head) {
      this.head = node;
      return;
    }

    node.prev = this.head;
    this.head = node;
  }

  pop(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    this.length--;
    const head = this.head;
    this.head = head.prev;

    head.prev = undefined;

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}

// Example 1: Basic number stack (LIFO - Last In, First Out)
const numberStack = new Stack<number>();

numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log("Stack length:", numberStack.length); // 3
console.log("Top item (peek):", numberStack.peek()); // 30

// Pop items - they come out in reverse order
console.log("Popped:", numberStack.pop()); // 30
console.log("Popped:", numberStack.pop()); // 20
console.log("Stack length:", numberStack.length); // 1
console.log("Top item:", numberStack.peek()); // 10
