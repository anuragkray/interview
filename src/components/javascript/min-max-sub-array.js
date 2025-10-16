const array = [2, -1, 4, -2, -3, -6, 4, -1, 8, -3, -2, 3];

//Max_Sub Array: Method_1
function maxSubArray(maxSubParam) {
  const len = maxSubParam.length - 1;
  let maxSum = -Infinity;
  //For tracking index
  let start = 0;
  let end = 0;
  for (let outerIndex = 0; outerIndex < len; outerIndex++) {
    let summation = 0;
    for (let innerIndex = outerIndex; innerIndex < len; innerIndex++) {
      summation += maxSubParam[innerIndex];
      //   maxSum = Math.max(maxSum, summation);
      //If we have to return subArray Element also
      if (summation > maxSum) {
        maxSum = summation;
        start = outerIndex;
        end = innerIndex;
      }
    }
  }
  const subArray = maxSubParam.slice(start, end + 1);
  return { maxSum, subArray };
}

//Max_Sub Array: Method_2

function maxSubArray_2(params) {
  const len = params.length - 1;
  let maxSum = -Infinity;
  let summation = 0;
  let start = 0;
  let end = 0;
  //For updating start
  let tempStart = 0;

  for (let index = 0; index < len; index++) {
    summation += params[index];

    if (summation > maxSum) {
      maxSum = summation;
      start = tempStart;
      end = index;
    }

    // If Sum will less than zero
    if (summation < 0) {
      summation = 0;
      tempStart = index + 1;
    }
  }
  const subArray = params.slice(start, end + 1);
  return { maxSum, subArray };
}
console.log("56:", maxSubArray_2(array));
