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
  walk(curr.right, path);

  //post
  path.push(curr.value);

  return path;
}

export default function postOrderSearch(head: BinaryNode<number>): number[] {
  return walk(head, []);
}

const result = postOrderSearch(tree);
console.log(result);
