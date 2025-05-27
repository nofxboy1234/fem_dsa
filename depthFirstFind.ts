import { tree } from "./tree";
import type { BinaryNode } from "./binaryNode";

export default function find(
  node: BinaryNode<number> | null,
  value: number
): boolean {
  if (!node) {
    return false;
  }

  if (node.value === value) {
    return true;
  }

  if (node.value < value) {
    return find(node.right, value);
  }

  return find(node.left, value);
}

let result = find(tree, 29);
console.log(result);
result = find(tree, 99);
console.log(result);
result = find(tree, 7);
console.log(result);
