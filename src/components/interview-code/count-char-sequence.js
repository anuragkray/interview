/**
 * Problem: Run-Length Encoding Algorithm
 * Input  : AABABBCCC
 * Output : 2A2B3C  (group consecutive same characters and prefix with their count)
 */

const sequence = "AABABBCCC";

// ─────────────────────────────────────────────
// Method 1: Classic for-loop (original solution)
// ─────────────────────────────────────────────
function characterWithCount(charSeries) {
  let counter = 1;
  let result = "";
  for (let char = 0; char <= charSeries.length - 1; char++) {
    if (charSeries[char] === charSeries[char + 1]) {
      counter++;
    } else {
      result += counter + charSeries[char];
      counter = 1;
    }
  }
  return result;
}
console.log("Method 1 (for-loop)         :", characterWithCount(sequence));

// ─────────────────────────────────────────────
// Method 2: Array.reduce()  — ES6
// Walk each character; if it matches the last character in the
// accumulator group, bump the count; otherwise start a new group.
// ─────────────────────────────────────────────
const characterWithCountReduce = (str) =>
  [...str]
    .reduce((acc, char) => {
      const last = acc[acc.length - 1];
      if (last && last.char === char) {
        last.count++;
      } else {
        acc.push({ char, count: 1 });
      }
      return acc;
    }, [])
    .map(({ count, char }) => `${count}${char}`)
    .join("");

console.log(
  "Method 2 (reduce)            :",
  characterWithCountReduce(sequence),
);

// ─────────────────────────────────────────────
// Method 3: Regex match()  — ES6
// The regex /(.)\1*/g captures a character followed by zero-or-more
// repetitions of itself, giving us each consecutive group in one shot.
// ─────────────────────────────────────────────
const characterWithCountRegex = (str) =>
  str
    .match(/(.)\1*/g)
    .map((group) => `${group.length}${group[0]}`)
    .join("");

console.log(
  "Method 3 (regex)             :",
  characterWithCountRegex(sequence),
);

// ─────────────────────────────────────────────
// Method 4: Generator function  — ES6
// Yields { char, count } objects lazily; good for very long strings.
// ─────────────────────────────────────────────
function* runLengthGenerator(str) {
  let i = 0;
  while (i < str.length) {
    let count = 1;
    while (i + count < str.length && str[i + count] === str[i]) count++;
    yield { char: str[i], count };
    i += count;
  }
}

const characterWithCountGenerator = (str) => {
  let result = "";
  for (const { char, count } of runLengthGenerator(str)) {
    result += `${count}${char}`;
  }
  return result;
};

console.log(
  "Method 4 (generator)         :",
  characterWithCountGenerator(sequence),
);

// ─────────────────────────────────────────────
// Method 5: Map + spread  — ES6
// Build a frequency map of CONSECUTIVE groups by treating each
// group start as a unique key combined with its position offset.
// Uses Map to preserve insertion order.
// ─────────────────────────────────────────────
const characterWithCountMap = (str) => {
  const groups = [...str].reduce((map, char, i, arr) => {
    if (i === 0 || arr[i - 1] !== char) {
      map.set(`${char}-${i}`, { char, count: 1 });
    } else {
      // Find the last group entry and increment
      const lastKey = [...map.keys()].at(-1);
      map.get(lastKey).count++;
    }
    return map;
  }, new Map());

  return [...groups.values()]
    .map(({ count, char }) => `${count}${char}`)
    .join("");
};

console.log("Method 5 (Map + spread)      :", characterWithCountMap(sequence));

// ─────────────────────────────────────────────
// Method 6: String.replaceAll() + template literals  — ES6
// Uses the same capturing-group regex but leverages the replacer
// function callback form of String.replace() for a functional style.
// ─────────────────────────────────────────────
const characterWithCountReplace = (str) =>
  str.replace(/(.)\1*/g, (group, char) => `${group.length}${char}`);

console.log(
  "Method 6 (replace callback)  :",
  characterWithCountReplace(sequence),
);
