import { tree } from "./tree";
import type { BinaryNode } from "./binaryNode";

function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
  if (!curr) {
    return path;
  }

  // recurse
  // pre

  // recurse
  walk(curr.left, path);
  path.push(curr.value);
  walk(curr.right, path);

  //post

  return path;
}

export default function inOrderSearch(head: BinaryNode<number>): number[] {
  return walk(head, []);
}

const result = inOrderSearch(tree);
console.log(result);
