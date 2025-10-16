/**
 * # Input abccdaaabbdd
 * # Output 1a1b2c1d3a2b2d OR a1b1c2d1a3b2d2
 */
const input = "abccdaaabbdd";

// Method 1: Count first, then character (e.g., 1a1b2c1d3a2b2d)
function characterWithCountSequence(params1){
    let counter=1;
    let result="";
    
    for(let i=0; i<params1.length; i++){
        // If next character is same, increment counter
        if(i < params1.length - 1 && params1[i] === params1[i+1]){
            counter++;
        } else {
            // Different character or end of string, add to result
            result += counter + params1[i];
            counter = 1;
        }
    }
    
    return result;
}
console.log("Method 1 (count+char):", characterWithCountSequence(input));

