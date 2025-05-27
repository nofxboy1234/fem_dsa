import type { BinaryNode } from "./binaryNode";
import { tree } from "./tree";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  const q: (BinaryNode<number> | null)[] = [head];

  while (q.length) {
    const curr = q.shift() as BinaryNode<number> | undefined | null;
    if (!curr) {
      continue;
    }

    // search
    if (curr.value === needle) {
      return true;
    }

    q.push(curr.left);
    q.push(curr.right);
  }

  return false;
}

let result = bfs(tree, 45);
console.log(result);
result = bfs(tree, 7);
console.log(result);
result = bfs(tree, 69);
console.log(result);
