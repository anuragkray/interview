//In this section we will cover the palindrom from string
//Or calcualte how many Palindrom in string

function isPalindrome(value) {
  const reverseString = Array.from(value).reduceRight((acc, cur) => {
    acc += cur;
    return acc;
  }, "");
  return value === reverseString ? true : false;
}
//Count the palindrom
function countPalindrome(value) {
  const palindromContainer = [];
  const len = value.length - 1;

  for (let start = 0; start < len; start++) {
    for (let end = start + 1; end <= len; end++) {
      const subPart = value.substring(start, end);
      if (isPalindrome(subPart) && subPart.length > 2)
        palindromContainer.push(subPart);
    }
  }
  //If you want count of palindrome you can use length method
  return palindromContainer;
}
// console.log(countPalindrome("anafaafanuraglaalxasde"));

//Same way we will find anagram from string
function isAnagram(value_a, value_b) {
  //Instead of localeCompare we can simply use sort()
  const value_1 = Array.from(value_a.toLowerCase())
    .sort((a, b) => b.localeCompare(a))
    .join("");
  const value_2 = Array.from(value_b.toLowerCase())
    .sort((a, b) => b.localeCompare(a))
    .join("");
  return value_1 === value_2 ? true : false;
}
// console.log(isAnagram("AnuRag", "UrAang"));

// ADVANCE WAY OF SORTING  STRING :BUBBLE_SORT
const name = "anurag kumar ray";
const charArray = Array.from(name).filter((char) => char !== " "); // Filter out spaces

// Perform bubble sort
for (let i = 0; i < charArray.length; i++) {
  for (let j = 0; j < charArray.length - 1 - i; j++) {
    if (charArray[j] > charArray[j + 1]) {
      // Swap characters
      [charArray[j], charArray[j + 1]] = [charArray[j + 1], charArray[j]];
    }
  }
}

// Join sorted characters and reinsert spaces
let sortedName = "";
let spaceIndex = 0;
for (const char of name) {
  if (char === " ") {
    sortedName += " "; // Maintain original spaces
  } else {
    sortedName += charArray[spaceIndex++]; // Add sorted characters
  }
}

console.log(sortedName);

console.log(charArray.join(""));
