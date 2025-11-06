//Call By Value : Call by value passes a copy of a variable's value to a function, so any changes inside the function do not affect the original variable
//Call By Referenece : Call by reference passes the memory address of a variable, allowing the function to modify the original variable directly

// Call By Value
function callByValue(parameter){
    parameter=50;
    console.log(parameter);
}
let argument=10;
callByValue(argument);
console.log(argument);
/**
 * Output : 50
 * Output : 10
 */

//Call By Reference
function callByReference(parameter){
    parameter.push(4,5)
    console.log(parameter);
}
let argumentRef=[1,2,3];
callByReference(argumentRef)
console.log(argumentRef);