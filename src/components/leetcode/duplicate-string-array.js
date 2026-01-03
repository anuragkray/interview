
/**
 * Method 1 [Remove duplicate element from string or array]
 * # Input : aabcdebbccdeffgdgeeef
 * # Output : abdfgche
 */

const input = "aabcdebbccdeffgdgeeef";

let output = "";
for (let element of input) {
  if (!output.includes(element)) {
    output += element
  }
}
//OUTPUT_1 : abdfgche

//## Method: 2 [Without Any Inbuilt Methods]

let output_2 = "";
for (let outer = 0; outer < input.length; outer++) {
  for (let inner = outer + 1; inner <= input.length - 1; inner++) {
    if (input[outer] !== input[inner]) {
      output_2 += input[outer];
    }
  }
}
// OUTPUT_2 : abcdefg

//## Using Reduce Methods
const OUTPUT_3 = Array.from(input).reduce((accumulator, current, index, array) => {
  if (!accumulator.includes(current)) {
    accumulator += current
  }
  return accumulator;
}, "");

// OUTPUT_USING_REDUCE_3 : abcdefg

//## Using Flag No In-Built methods
function removeDuplicate(params) {
  let OUTPUT_4 = "";

  for (let outer = 0; outer < params.length; outer++) {
    let flag = false;
    for (let inner = outer + 1; inner <= params.length; inner++) {
      if (params[outer] === params[inner]) {
        flag = true;
        break;
      }
    }
    if (!flag)
      OUTPUT_4 += params[outer];
  }
  return OUTPUT_4
}
// OUTPUT_4 : abcdgef

/**
 * Number related array
 * Input [1,3,4,1,2,5,6,4,9,0,3,6,7,8,2,9,5,6,0]
 * Output [0,1,2,3,4,5,6,7,8,9]
 */
const data = [1,3,4,1,2,5,6,4,9,0,3,6,7,8,2,9,5,6,0]
const filterDuplicate = [...new Set(data)].sort((a,b)=>a-b);

// ## ADVANCE [Remove Complete Duplicate]
const mix_string="abaacdadeaddeaed"
let OUTPUT_5="";
for(let outer=0;outer<mix_string.length;outer++){
  let flag=true;
  // Check the ENTIRE string (both before and after current position)
  for(let inner=0;inner<mix_string.length;inner++){
    if(inner !== outer && mix_string[inner]===mix_string[outer]){
      flag=false;
      break;
    }
  }
  if(flag){
    OUTPUT_5 += mix_string[outer];
  }
}
console.log(OUTPUT_5) // Output: "bc" (only characters that appear exactly once)
