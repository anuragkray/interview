//To get the second larget number from the array
/**
 *
 * For getting smallest number initilize the value with Infinity not with -Infinity
 * Reverse all the operator jsut opposite.
 */
function getSecondLargestNumber(storage) {
  let first = -Infinity;
  let second = -Infinity;

  //Looping over the array
  for (let item of storage) {
    if (item > first) {
      second = first;
      first = item;
    } else if (item > second && item < first) second = item;
  }
  return second;
}
console.log(getSecondLargestNumber([23, 10, -1, 34, 100, 999]));

//TO GET third largest
function getThirdLargestNumber(storage) {
  let first = -Infinity;
  let second = -Infinity;
  let third = -Infinity;

  //Looping over the array
  for (let item of storage) {
    if (item > first) {
      third = second;
      second = first;
      first = item;
    } else if (item > second && item < first) {
      third = second;
      second = item;
    } else if (item > third && item < second) {
      third = item;
    }
  }
  return third;
}
console.log(getThirdLargestNumber([-5, -90, -2, 34, -1, 84]));
