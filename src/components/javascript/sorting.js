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
    let getIndex = firstLoopIndex;
    for (
      let secondLoopIndex = firstLoopIndex + 1;
      secondLoopIndex < numberArray_1.length;
      secondLoopIndex++
    ) {
      if (numberArray_1[secondLoopIndex] < numberArray_1[getIndex]) {
        getIndex = secondLoopIndex;
      }
    }
    //Swap inside the first loop
    [numberArray_1[firstLoopIndex], numberArray_1[getIndex]] = [
      numberArray_1[getIndex],
      numberArray_1[firstLoopIndex],
    ];
}
console.log(numberArray_1);
