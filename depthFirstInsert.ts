import { tree } from "./tree";
import type { BinaryNode } from "./binaryNode";
import inOrderSearch from "./btInOrder";

export default function insert(
  node: BinaryNode<number> | null,
  value: number
): void {
  if (!node) {
    return;
  }

  if (node!.value < value) {
    if (!node.right) {
      node.right = { value: value } as BinaryNode<number>;
    } else {
      insert(node.right, value);
    }
  } else if (node.value >= value) {
    if (!node.left) {
      node.left = { value: value } as BinaryNode<number>;
    } else {
      insert(node.left, value);
    }
  }
}

console.log(inOrderSearch(tree));
insert(tree, 12);
insert(tree, 99);
console.log(inOrderSearch(tree));
