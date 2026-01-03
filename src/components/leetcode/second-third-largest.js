//To get the second larget number from the array
/**
 *
 * For getting smallest number initilize the value with Infinity not with -Infinity & reverse the operator
 * Reverse all the operator jsut opposite.
 */
function getSecondLargestNumber(storage) {
  let [first, second] = [-Infinity, -Infinity];

  //Looping over the array
  for (let item of storage) {
    if (item > first) {
      [first, second] = [item, first];
    } else if (item > second && item < first) {
      second = item;
    }
  }
  return second;
}
console.log(getSecondLargestNumber([23, 10, -1, 34, -100, 999]));
// OUTPUT : 34

//TO GET third largest
function getThirdLargestNumber(storage) {
 
  let [first,second,third]=[-Infinity,-Infinity,-Infinity]

  //Looping over the array
  for (let item of storage) {
    if (item > first) {
      [first, second, third] = [item, first, second]
    } else if (item > second && item < first) {
      [second,third]=[item,second]
    } else if (item > third && item < second) {
      third = item;
    }
  }
  return third;
}
console.log(getThirdLargestNumber([-5, -90, -2, 34, -1, 84, 90]));
//OUTPUT : 34