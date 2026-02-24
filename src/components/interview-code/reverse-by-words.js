const data = "Har Har Mahadev Jay Bholenath";

/**
 * Input: Har Har Mahadev Jay Bholenath
 * Output: Bholenath Jay Mahadev Har Har
 */
// Method 1: Reverse Iteration Algorithm
function reverseByWords(sentence) {
  let words = "";
  let reverseResult = "";

  for (let char = sentence.length - 1; char >= 0; char--) {
    if (sentence[char] === " ") {
      reverseResult += " " + words;
      words = "";
    } else {
      words = sentence[char] + words;
    }
  }
  reverseResult += " " + words;
  return reverseResult;
}
console.log(reverseByWords(data));

//Method 2 : Inbuilt Methods
function reverseByWordsInBuilt(sentence) {
  return sentence.split(" ").reverse().join(" ");
}
console.log(reverseByWordsInBuilt(data));
