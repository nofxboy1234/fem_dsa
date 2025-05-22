export default function linearSearch(
  haystack: number[],
  needle: number
): boolean {
  for (let i = 0; i < haystack.length; ++i) {
    if (haystack[i] === needle) {
      return true;
    }
  }

  return false;
}

let result;

result = linearSearch([1, 2, 3, 4], 3);
console.log(result);

result = linearSearch([1, 2, 3, 4], 9);
console.log(result);
