//Reverse Array Nunber
const numberArray = [1, 2, 3, 4, 5, 6];

function reverseArray(params) {
  for (let left = 0, right = params.length - 1; left < right; left++, right--) {
    [params[left], params[right]] = [params[right], params[left]];
  }
  return params;
}
console.log(reverseArray(numberArray));

//Reverse String using Inbuilt function
function reverseUsingInBuilt(params) {
  const reverse = [...params].reduceRight((acc, cur) => {
    acc += cur;
    return acc;
  }, "");
  return reverse;
}
const name_1 = "Mahakal Mahadev Bholenath";
console.log(reverseUsingInBuilt(name_1));

//Step-2
function inBuilt2(params) {
  return params.split("").reverse().join("");
}
console.log(inBuilt2(name_1));

//Reverse String by word
const name = "Mahakal Mahadev Bholenath";

function reverseByWords(params) {
  let words = "";
  let reverseSentence = "";

  for (let index = params.length - 1; index >= 0; index--) {
    if (params[index] === " ") {
      reverseSentence += " " + words;
      words = "";
    } else {
      words = params[index] + words;
    }
  }
  reverseSentence += " " + words;

  return reverseSentence;
}
console.log(reverseByWords(name));
