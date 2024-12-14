//Bubble sort
const numberArray = [100,-1,99,-14,999,-5];
for(let firstLoopIndex=0;firstLoopIndex<numberArray.length;firstLoopIndex++){
    for(let secondLoopIndex=0;secondLoopIndex<firstLoopIndex;secondLoopIndex++){
        if(numberArray[firstLoopIndex]<numberArray[secondLoopIndex]){
            [numberArray[firstLoopIndex], numberArray[secondLoopIndex]]=
            [numberArray[secondLoopIndex],numberArray[firstLoopIndex]]
        }
    }
}
console.log(numberArray);

//Selection sort
const numberArray_1 = [100,-1,99,-14,999,-5,500,34];
for(let firstLoopIndex=0;firstLoopIndex<numberArray_1.length;firstLoopIndex++){
    let getElement = numberArray_1[firstLoopIndex];
    for(let secondLoopIndex=0;secondLoopIndex<firstLoopIndex+1;secondLoopIndex++){
        if(getElement<numberArray_1[secondLoopIndex]){
            [numberArray[firstLoopIndex], numberArray[secondLoopIndex]]=
            [numberArray[secondLoopIndex],numberArray[firstLoopIndex]]
        }
    }
}
console.log(numberArray_1);
