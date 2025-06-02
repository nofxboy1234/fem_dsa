type GraphEdge = { to: number; weight: number };
type WeightedAdjacencyList = GraphEdge[][];
import { list1 } from "./graph";

function walk(
  graph: WeightedAdjacencyList,
  curr: number,
  needle: number,
  seen: boolean[],
  path: number[]
): boolean {
  //
}

export default function dfs(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number
): number[] | null {
  //
}
