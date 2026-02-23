/**
 * Algorithm/Approach: Frequency Counter (hash map/dictionary tally of occurrences)
 * Input: Ab Baa Cbab Dea
 * Output: { A: 5, B: 4, C: 1, D: 1, E: 1 }
 */
const sequence = "Ab Baa Cbab Dea";

function characterCount(series) {
  const countResult = [...series].reduce((acc, cur) => {
    if (cur !== " ") acc[cur.toUpperCase()] = (acc[cur.toUpperCase()] || 0) + 1;
    return acc;
  }, {});
  return countResult;
}
console.log(characterCount(sequence));

//Method 2 Without Inbuilt function
function characterCount_1(series) {
  let result = {};
  for (let item of series) {
    if (item !== " ") {
      result[item] = (result[item] || 0) + 1;
    }
  }
  return result;
}
console.log(characterCount_1(sequence));
