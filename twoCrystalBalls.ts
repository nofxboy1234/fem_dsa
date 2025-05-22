export default function twoCrystalBalls(breaks: boolean[]): number {
  const jmpAmount = Math.floor(Math.sqrt(breaks.length));

  let i = jmpAmount;
  for (; i < breaks.length; i += jmpAmount) {
    if (breaks[i]) {
      break;
    }
  }

  i -= jmpAmount;

  for (let j = 0; j <= jmpAmount && i < breaks.length; ++j, ++i) {
    if (breaks[i]) {
      return i;
    }
  }

  return -1;
}

let result = twoCrystalBalls([false, false, false, false, true, true, true]);
console.log(result);
