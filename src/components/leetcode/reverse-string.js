const str = "Jay Bholenath Jay Mahakal"

//#Without Inbuit method
function reverse(parameter){
    let reverseString=""
    for(let index=parameter.length-1;index>=0;index--){
        reverseString += parameter[index]
    }
    return reverseString
}
console.log(reverse(str));
//lakahaM yaJ htanelohB yaJ

//#Inbuilt method
function reverse_1(parameter){
    const result = Array.from(parameter).reduceRight((acc,cur)=>{
        acc += cur
        return acc;
    },"")
    return result;
}
console.log(reverse_1(str));
//lakahaM yaJ htanelohB yaJ