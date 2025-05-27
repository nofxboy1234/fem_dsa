import type { BinaryNode } from "./binaryNode";
import { tree, tree2 } from "./tree";

export default function compare(
  a: BinaryNode<number> | null,
  b: BinaryNode<number> | null
): boolean {
  // a and b are structurally the same
  if (a === null && b === null) {
    return true;
  }

  // a and b are structurally NOT the same
  if (a === null || b === null) {
    return false;
  }

  // value check
  if (a.value !== b.value) {
    return false;
  }

  return compare(a.left, b.left) && compare(a.right, b.right);
}

let result = compare(tree, tree);
console.log(result);
result = compare(tree, tree2);
console.log(result);
