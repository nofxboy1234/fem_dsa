export default function foo(n: number): number {
  // Base Case
  if (n === 1) {
    console.log(`post: ${n}`);
    return 1;
  }

  // Recurse!
  console.log(`pre: ${n}+`);
  const out = n + foo(n - 1);
  console.log(`post: ${n}`);
  return out;
}

let result = foo(5);
console.log(result);
