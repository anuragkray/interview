/**
 * Input: Har Har Mahadev Jay Bholenath
 * Output: raH raH vedahaM yaJ htaneloB
 */
const data = "Har Har Mahadev Jay Bholenath";

//Method 1: Without Inbuilt function (Two Pointer Technique)
const withoutInbuiltFun = (sentence) => {
  let result = "";
  let wordStart = 0;

  for (let i = 0; i <= sentence.length; i++) {
    if (sentence[i] === " " || i === sentence.length) {
      for (let j = i - 1; j >= wordStart; j--) {
        result += sentence[j];
      }

      if (i !== sentence.length) result += " ";

      wordStart = i + 1;
    }
  }

  return result;
};
console.log(withoutInbuiltFun(data));
