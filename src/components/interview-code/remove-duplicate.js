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
