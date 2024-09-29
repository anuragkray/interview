//STRING
const duplicate = "aabdfgcdfhgegcdbe";
//Method_1
let result = "";
for (let char of duplicate) {
  if (!result.includes(char)) result += char;
}

/**---------------------------------------------- */
//METHOD_2
const result_1 = Array.from(duplicate).reduce((acc, cur) => {
  if (!acc.includes(cur)) acc += cur;
  return acc;
}, "");

//Method_3 without any inbuilt methods
function removeDuplicate(duplicateString) {
  const len = duplicateString.length;
  let result = "";
  // If you want to remove duplicate from Array intilize
  //With empty array and and push it in the last
  //Looping over the string
  for (let outer = 0; outer < len; outer++) {
    let breakingFlag = false;
    for (let inner = 0; inner < result.length; inner++) {
      if (duplicateString[outer] === result[inner]) {
        breakingFlag = true;
        break;
      }
    }
    if (!breakingFlag) result += duplicateString[outer];
  }
  return result;
}
console.log(removeDuplicate(duplicate));

/**--------------ARRAY---------------------------- */
const duplicateArray = [1, 2, 3, 6, 9, 3, 6, 9, 5, 6, 4, 3, 5, 8, 7, 8];
const set = [...Array.from(new Set(duplicateArray))];
//OR --> [...new Set(duplicateArray]
console.log(set);
