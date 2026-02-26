/**
 * Input : "abcbcbdedbc"
 * Output : "abcde"
 */
// Without Inbuilt methods
const data = "abcbcbdedbc";
const withoutInbuiltMethod = (parameter) => {
  const seen = {};
  let result = "";

  for (let item of parameter) {
    if (!seen[item]) {
      seen[item] = true;
      result += item;
    }
  }
  console.log(result);
};
withoutInbuiltMethod(data);

// From Array
const arrayData = [1, 2, 1, 3, 5, 3, 4];
const result = [...new Set(arrayData)];
console.log(result);
