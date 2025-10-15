// # INPUT : "Mahakal Mahaveer Bholenath"
// # OUTPUT : "Bholenath Mahaveer Mahaveer"

const name = "Mahakal Mahaveer Bholenath";

// ## Methods 1 [Without Inbuilt Methods]
function keepTheOrderReserve_1(params) {
    let result = "";
    let words = "";

    //looping over the name params
    for (let index = 0; index < params.length; index++) {
        if (params[index] === " ") {
            result = words + " " + result;
            words = ""
        }
        else {
            words += params[index];
        }
    }
    //Reserve the last words
    if (words) {
        result = words + " " + result;
    }
    return result;
}
// OUTPUT : Bholenath Mahaveer Mahakal 

// ## Method 2 [Using Inbuilt Methods]
function keepTheOrderReserve_2(params) {
    //Using Reduce Right
    const split = params.split(" ").
        reduceRight((acc, cur) => {
            acc.push(cur);
            return acc
        }, [])
        .join(" ")
    return split
}
// OUTPUT : Bholenath Mahaveer Mahakal 

// USING For Loop
let reverseString="";
for(let index=name.length-1;index>=0;index--){
    reverseString += name[index];
}
// ## OUTPUT : htanelohB reevahaM lakahaM