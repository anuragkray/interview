//Method 1 without inbuilt method
/**
 * ALGO : Frequency Counter
 * Time Com : O(n)
 * Space Com : O(n)
 */
function isAnagram(parameter1,parameter2){
    //case 1 : length mismatch
    if(parameter1.length !== parameter2.length){
        return false;
    }
    //case 2 : frequecy counter
    let freq={};
    for(let index of parameter1){
        freq[index] = (freq[index] || 0) + 1
    }
    //Decrese the freq using 2 string
    for(let index of parameter2){
        if(!freq[index]){
            //character not found
            //or overused
            return false
        }
        freq[index]--;
    }
    console.log(freq);
    // { A: 0, n: 0, u: 0, R: 0, a: 0, g: 0 }
    return true;
}
console.log(isAnagram("AnuRag","gnuaaR"))

//Method 2 With Inbuilt
function isAnagram_1(parameter1,parameter2){
    if(parameter1.length !== parameter2.length)
        return false;
    const value1 = parameter1.split("").sort().join("")
    const value2 = parameter2.split("").sort().join("")

    return value1 === value2 ? true : false
}
console.log(isAnagram_1("AnuRag","gnuAaR"));
//OUTPUT : true