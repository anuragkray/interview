//Recursion
const name ="print mera naam";

function reverse(param,index=param.length-1){
    if(index<0)
        return "";
    return param[index] + reverse(param,index-1)
}
console.log(reverse(name));
//Output : maan arem tnirp

//Factorial
function factorial(number){
    if(number<=0)
        return 1
    return number * factorial(number-1);
}
console.log(factorial(5));
//Output : 120

//Fibonacci series
function fib(number){
    if(number===0)
        return 0
    if(number===1)
        return 1
    return fib(number-1) + fib(number-2);
}
for(let index=0;index<=5;index++){
    console.log(fib(index));
}