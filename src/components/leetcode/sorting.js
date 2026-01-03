//Bubble sort
/**
 * How Bubble Sort Works (Step-by-Step)
1. Start at the beginning of the array.
2. Compare adjacent elements (element j and j+1).
3. If the left element is greater than the right one, swap them.
4. Continue comparing each adjacent pair until the end of the array — this completes one pass.
5.After the first pass, the largest element "bubbles up" to the end.
6.Repeat the process for the remaining (unsorted) part of the array.

Stop when no swaps are needed — meaning the array is sorted.
 */
const ary_1 = [100, -1, 99, -14, 999, -5];

for (let outer = 0; outer < ary_1.length - 1; outer++) {
  for (let inner = 0; inner < ary_1.length - outer - 1; inner++) {
    if (ary_1[inner] > ary_1[inner + 1]) {
      [ary_1[inner], ary_1[inner + 1]] = [ary_1[inner + 1], ary_1[inner]];
    }
  }
}

console.log(ary_1);
//OUTPUT : [ -14, -5, -1, 99, 100, 999 ]

/* ⚙️ How Insertion Sort Works (Step-by-Step)
  1.Start from the second element (index 1), 
  assuming the first element is already sorted.
  assume like first part is sorted and another is unsorted
  2.Compare the current element with the elements in the sorted portion (left side).
  3.Shift all larger elements one position to the right.
  4.Insert the current element into its correct position.
  5.Repeat until the entire array is sorted.
*/
const ary_2 = [5, 3, 8, 4, 2];
function insrtnSrt(param) {
  for (let i = 1; i < param.length; i++) {
    let current = param[i];
    let prev = i - 1;

    // Shift larger elements to the right
    while (prev >= 0 && param[prev] > current) {
      param[prev + 1] = param[prev];
      prev--;
    }

    // Insert current value at the correct position
    param[prev + 1] = current;
  }

  return param;
}
console.log(insrtnSrt(ary_2));


//Selection sort
/**
 * Selection sort state that pick the
 * smallest number from array and swap
 * it with zero index and continue the
 * Iteration till array sorted.
 */
const ary_3 = [100, -1, 99, -14, 999, -5, 500, 34];

for (let otr = 0; otr < ary_3.length; otr++) {
  //First time consider first
  //index as smallest
  let smlst = otr;
  for (let inr = otr + 1; inr < ary_3.length; inr++) {
    if (ary_3[inr] < ary_3[smlst]) {
      //Find the smallest index
      smlst = inr
    }
  }
  [ary_3[otr], ary_3[smlst]] = [ary_3[smlst], ary_3[otr]]
}
console.log(ary_3);
