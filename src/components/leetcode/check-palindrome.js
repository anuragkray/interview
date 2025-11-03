const paliStr="laal";

//# Without Inbuilt Method
function isPalindrome(parameter){
    let reverse="";
    for(let index=parameter.length-1;index>=0;index--){
        reverse += parameter[index]
    }
   return  parameter===reverse ? true : false
}
console.log(isPalindrome(paliStr));
//OUTPUT : true

//# With Inbuilt Method
function isPalindrome_1(parameter){
    const reverse = parameter.split("").reverse().join("")
    return reverse === parameter ? true : false
}
console.log(isPalindrome_1(paliStr));
//OUTPUT : true