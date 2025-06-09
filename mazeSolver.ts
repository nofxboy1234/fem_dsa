interface Point {
  x: number;
  y: number;
}

const DIRECTIONS = [
  [0, -1], // up
  [1, 0], // right
  [0, 1], // down
  [-1, 0], // left
] as const;

export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point
): Point[] {
  const rows = maze.length;
  const cols = maze[0]?.length ?? 0;
  const seen = Array.from({ length: rows }, () => Array(cols).fill(false));

  function isValid(p: Point): boolean {
    return (
      p.y >= 0 &&
      p.y < rows &&
      p.x >= 0 &&
      p.x < cols &&
      maze[p.y]![p.x] !== wall &&
      !seen[p.y]![p.x]
    );
  }

  function dfs(curr: Point, path: Point[]): boolean {
    // Found the end
    if (curr.x === end.x && curr.y === end.y) {
      path.push(curr);
      return true;
    }

    // Mark as visited and add to path
    seen[curr.y]![curr.x] = true;
    path.push(curr);

    // Try all directions
    for (const [dx, dy] of DIRECTIONS) {
      const next = { x: curr.x + dx, y: curr.y + dy };

      if (isValid(next) && dfs(next, path)) {
        return true;
      }
    }

    // Backtrack
    path.pop();
    return false;
  }

  const path: Point[] = [];

  // Early validation
  if (!isValid(start)) return path;

  dfs(start, path);
  return path;
}

// Test
const maze = [
  "xxxxxxxxxx x",
  "x        x x",
  "x        x x",
  "x xxxxxxxx x",
  "x          x",
  "x xxxxxxxxxx",
];

const solvedPath = solve(maze, "x", { x: 10, y: 0 }, { x: 1, y: 5 });
console.log(solvedPath);
