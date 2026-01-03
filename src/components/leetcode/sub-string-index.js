//Using matchAll function
/**
 *The matchAll() method of String values returns an 
 iterator of all results matching this string against a regular expression,
  including capturing groups.
  Let Suppose : value:"abc def ghi",regex=/(?<firstname>\w+)(?<middleName>\w+)/ :->[..value.matchAll(regex)]
 */
const sentence = "hare ram hare ram ram ram hare hare";
const matchTheIndex = [...sentence.matchAll("hare")];
const result = matchTheIndex.flatMap((element) => element.index);
console.log(result);

//SECOND_METHOD
const subStr = "hare";
const len = sentence.length;
const subStrLen = subStr.length;
const indexArray = [];
for (let index = 0; index <= len - subStrLen; index++) {
  const piece = sentence.substring(index, index + subStrLen);
  if (piece === subStr) indexArray.push(index);
}
console.log("2IA", indexArray);
