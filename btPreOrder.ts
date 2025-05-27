import { tree } from "./tree";
import type { BinaryNode } from "./binaryNode";

function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
  if (!curr) {
    return path;
  }

  // recurse
  // pre
  path.push(curr.value);

  // recurse
  walk(curr.left, path);
  walk(curr.right, path);

  //post

  return path;
}

export default function preOrderSearch(head: BinaryNode<number>): number[] {
  return walk(head, []);
}

const result = preOrderSearch(tree);
console.log(result);
