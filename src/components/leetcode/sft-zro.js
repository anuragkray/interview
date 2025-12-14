/**
 * Input:[1,0,2,0,3,0,0]
 * Output:[1,2,3,0,0,0,0]
 * Two pointer Technique
 * 
 */
const input=[1,0,2,0,3,0,0];
function zeroAtEnd(param){
    let leftPointer=0;
    for(let scan=0;scan<param.length;scan++){
        if(param[scan] !==0){
            [param[leftPointer],param[scan]]=
            [param[scan],param[leftPointer]]
            leftPointer++;
        }
    }
    return param
}
console.log(zeroAtEnd(input))
//OUTPUT : [ 1, 2, 3, 0,0,0,0]
function zeroAtEndOpt(param){

    let leftPointer=0;

    for(let scan=0;scan<param.length;scan++){
        if(param[scan] !== 0){
            if(scan !== leftPointer){
                [param[leftPointer],param[scan]]=
                [param[scan],param[leftPointer]] 
            }
            leftPointer++
        }
    }
    return param;
}
console.log(zeroAtEndOpt(input));
function zeroAtFirstOpt(param){

    let rightPointer=param.length-1;

    for(let scan=param.length-1;scan>=0;scan--){
        if(param[scan] !== 0){
            if(scan !== rightPointer){
                [param[rightPointer],param[scan]]=
                [param[scan],param[rightPointer]] 
            }
            rightPointer--
        }
    }
    return param;
}
console.log(zeroAtFirstOpt(input));
//OUTPUT:[0,0,0,0,1,2,3];
