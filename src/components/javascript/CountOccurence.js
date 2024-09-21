//------------Count Occurence of chracter--------------------------//
const name = "AnuRaG KuMaR raY";
function countOccurence(value) {
  const result = Array.from(value.toLowerCase()).reduce((acc, cur) => {
    if (cur !== " ") acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});
  return result;
}
console.log(countOccurence(name));

//----------Count the vowel from charcter--------------------------//

function countVowel(value) {
  const vowel = ["a", "e", "i", "o", "u"];
  const result = Array.from(value.toLowerCase()).reduce((acc, cur) => {
    if (vowel.includes(cur) && cur !== "") acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});
  return result;
}
console.log("ONLY_VOWEL", countVowel(name));
