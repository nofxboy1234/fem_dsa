type GraphEdge = { to: number; weight: number };
type WeightedAdjacencyList = GraphEdge[][];
import { list1 } from "./graph";

class MinHeap {
  private heap: { node: number; distance: number }[] = [];

  constructor() {}

  push(node: number, distance: number): void {
    this.heap.push({ node, distance });
    this.heapifyUp(this.heap.length - 1);
  }

  pop(): { node: number; distance: number } | undefined {
    if (this.heap.length === 0) return undefined;

    const min = this.heap[0];
    const last = this.heap.pop()!;

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }

    return min;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  private heapifyUp(index: number): void {
    if (index === 0) return;

    const parentIndex = Math.floor((index - 1) / 2);

    if (this.heap[index]!.distance < this.heap[parentIndex]!.distance) {
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex]!,
        this.heap[index]!,
      ];
      this.heapifyUp(parentIndex);
    }
  }

  private heapifyDown(index: number): void {
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    let smallest = index;

    if (
      leftChild < this.heap.length &&
      this.heap[leftChild]!.distance < this.heap[smallest]!.distance
    ) {
      smallest = leftChild;
    }

    if (
      rightChild < this.heap.length &&
      this.heap[rightChild]!.distance < this.heap[smallest]!.distance
    ) {
      smallest = rightChild;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest]!,
        this.heap[index]!,
      ];
    }
  }
}

export default function dijkstraListMinHeap(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList
): number[] {
  const seen = new Array(arr.length).fill(false);
  const prev = new Array(arr.length).fill(-1);
  const dists = new Array(arr.length).fill(Infinity);

  dists[source] = 0;
  const heap = new MinHeap();
  heap.push(source, 0);

  while (!heap.isEmpty()) {
    const current = heap.pop();
    const curr = current!.node;

    if (seen[curr]) continue;

    seen[curr] = true;

    if (curr === sink) break;

    const adjs = arr[curr]! || [];
    for (const edge of adjs) {
      if (seen[edge.to]) continue;

      const newDist = dists[curr] + edge.weight;

      if (newDist < dists[edge.to]) {
        dists[edge.to] = newDist;
        prev[edge.to] = curr;
        heap.push(edge.to, newDist);
      }
    }
  }

  if (dists[sink] === Infinity) {
    return [];
  }

  const path: number[] = [];
  let curr = sink;

  while (prev[curr] !== -1) {
    path.push(curr);
    curr = prev[curr];
  }

  path.push(source);
  return path.reverse();
}

let result = dijkstraListMinHeap(0, 6, list1);
console.log(result);
