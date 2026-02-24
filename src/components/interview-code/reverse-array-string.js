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

//Methods-2
function inBuilt2(params) {
  return params.split("").reverse().join("");
}
console.log(inBuilt2(name_1));

// Methods-3
const methods3 = (sentence) => {
  let result = "";
  for (let char = sentence.length - 1; char >= 0; char--) {
    result += sentence[char];
  }
  return result;
};
console.log(methods3(name_1));
