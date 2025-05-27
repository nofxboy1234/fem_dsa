import { tree } from "./tree";
import type { BinaryNode } from "./binaryNode";

function find(node: BinaryNode<number> | null, value: number): boolean {
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

export default function depthFirstFind(
  head: BinaryNode<number>,
  value: number
): boolean {
  return find(head, value);
}

let result = depthFirstFind(tree, 29);
console.log(result);
result = depthFirstFind(tree, 99);
console.log(result);
