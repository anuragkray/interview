//STRING
const duplicate = "aabdfgcdfhgegcdbe";
//Method_1
let result = "";
for (let char of duplicate) {
  if (!result.includes(char)) result += char;
}
// console.log(result);

/**---------------------------------------------- */
//METHOD_2
const result_1 = Array.from(duplicate).reduce((acc, cur) => {
  if (!acc.includes(cur)) acc += cur;
  return acc;
}, "");
// console.log(result_1);

/**--------------ARRAY---------------------------- */
const duplicateArray = [1, 2, 3, 6, 9, 3, 6, 9, 5, 6, 4, 3, 5, 8, 7, 8];
const set = [...Array.from(new Set(duplicateArray))];
//OR --> [...new Set(duplicateArray]
console.log(set);
