type GraphEdge = { to: number; weight: number };
type WeightedAdjacencyList = GraphEdge[][];

function walk(
  graph: WeightedAdjacencyList,
  curr: number,
  needle: number,
  seen: boolean[],
  path: number[]
): boolean {
  // Mark current node as visited before any other operations
  seen[curr] = true;

  // Pre-order: add current node to path
  path.push(curr);

  // Check if we found the target
  if (curr === needle) {
    return true;
  }

  // Explore all adjacent nodes
  const adjacentNodes = graph[curr];
  if (adjacentNodes) {
    // Add null check for safety
    for (const edge of adjacentNodes) {
      // Only visit unvisited nodes
      if (!seen[edge.to] && walk(graph, edge.to, needle, seen, path)) {
        return true;
      }
    }
  }

  // Post-order: backtrack by removing current node from path
  path.pop();

  return false;
}

export function dfs(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number
): number[] | null {
  // Input validation
  if (
    source < 0 ||
    source >= graph.length ||
    needle < 0 ||
    needle >= graph.length
  ) {
    return null;
  }

  const seen: boolean[] = new Array(graph.length).fill(false);
  const path: number[] = [];

  const found = walk(graph, source, needle, seen, path);

  return found ? path : null;
}

// Alternative iterative implementation for comparison
export function dfsIterative(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number
): number[] | null {
  if (
    source < 0 ||
    source >= graph.length ||
    needle < 0 ||
    needle >= graph.length
  ) {
    return null;
  }

  const seen: boolean[] = new Array(graph.length).fill(false);
  const stack: { node: number; path: number[] }[] = [
    { node: source, path: [source] },
  ];

  while (stack.length > 0) {
    const { node, path } = stack.pop()!;

    if (seen[node]) continue;
    seen[node] = true;

    if (node === needle) {
      return path;
    }

    const adjacentNodes = graph[node];
    if (adjacentNodes) {
      // Add neighbors to stack in reverse order to maintain left-to-right traversal
      for (let i = adjacentNodes.length - 1; i >= 0; i--) {
        const edge = adjacentNodes[i]!;
        if (!seen[edge.to]) {
          stack.push({ node: edge.to, path: [...path, edge.to] });
        }
      }
    }
  }

  return null;
}

// Example usage (assuming list2 is imported)
import { list2 } from "./graph";

let result = dfs(list2, 0, 6);
console.log(result);

result = dfs(list2, 6, 0);
console.log(result);

result = dfs(list2, 0, 2);
console.log(result);
