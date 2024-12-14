const name ="Jay Bholenath Nath";

function reverseByWords(nameParams){
    let result="";
    let words="";

    //Looping over the nameParams
    for(let index=0;index<nameParams.length;index++){
        if(nameParams[index]===" "){
            result = words + " " + result;
            words="";
        }else{
            words += nameParams[index];
        }
    }
    //covering the last words
    if(words)
        result = words + " " + result;
    return result;
}
console.log(reverseByWords(name));