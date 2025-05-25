interface Point {
  x: number;
  y: number;
}

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function walk(
  maze: string[],
  wall: string,
  curr: Point,
  end: Point,
  seen: boolean[][],
  path: Point[]
): boolean {
  // -- base case
  // off the map
  if (curr.y < 0 || curr.y >= maze.length) {
    return false;
  }

  // on a wall
  if (maze[curr.y][curr.x] === wall) {
    return false;
  }

  // at end
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end);
    return true;
  }

  // already seen tile
  if (seen[curr.y][curr.x]) {
    return false;
  }

  // -- recurse
  // pre
  seen[curr.y][curr.x] = true;
  path.push(curr);
  // recurse
  for (let i = 0; i < dir.length; ++i) {
    const [x, y] = dir[i];
    if (
      walk(
        maze,
        wall,
        {
          x: curr.x + x,
          y: curr.y + y,
        },
        end,
        seen,
        path
      )
    ) {
      return true;
    }
  }

  // post
  path.pop();

  return false;
}

export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point
): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; ++i) {
    seen.push(new Array(maze[i].length).fill(false));
  }

  walk(maze, wall, start, end, seen, path);

  return path;
}

// x: 0 - 11
// y: 0 - 5

// there is only one path through
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
