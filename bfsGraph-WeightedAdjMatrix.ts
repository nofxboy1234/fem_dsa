type WeightedAdjacencyMatrix = number[][];
import { matrix2 } from "./graph";

export default function bfs(
  graph: WeightedAdjacencyMatrix,
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

  // Early return if source equals needle
  if (source === needle) {
    return [source];
  }

  const seen = new Array(graph.length).fill(false);
  const prev = new Array(graph.length).fill(-1);

  seen[source] = true;
  const queue: number[] = [source];

  while (queue.length > 0) {
    const curr = queue.shift()!; // We know queue is not empty due to while condition

    // Check adjacency list for current node
    const weights = graph[curr]!;
    for (let i = 0; i < weights.length; i++) {
      // Skip if no edge exists (weight is 0) or already visited
      if (weights[i] === 0 || seen[i]) {
        continue;
      }

      seen[i] = true;
      prev[i] = curr;
      queue.push(i);

      // Early termination when target is found
      if (i === needle) {
        // Reconstruct path
        const path: number[] = [];
        let current = needle;

        while (current !== -1) {
          path.push(current);
          current = prev[current];
        }

        return path.reverse();
      }
    }
  }

  // No path found
  return null;
}

let result = bfs(matrix2, 0, 6);
console.log(result);

result = bfs(matrix2, 0, 2);
console.log(result);

result = bfs(matrix2, 4, 3);
console.log(result);

result = bfs(matrix2, 2, 0);
console.log(result);
