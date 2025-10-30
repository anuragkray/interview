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
const arr_bubble_sort = [100, -1, 99, -14, 999, -5];

for (let outer = 0; outer < arr_bubble_sort.length - 1; outer++) {
  for (let inner = 0; inner < arr_bubble_sort.length - outer - 1; inner++) {
    if (arr_bubble_sort[inner] > arr_bubble_sort[inner + 1]) {
      [arr_bubble_sort[inner], arr_bubble_sort[inner + 1]] = [arr_bubble_sort[inner + 1], arr_bubble_sort[inner]];
    }
  }
}

console.log(arr_bubble_sort);
//OUTPUT : [ -14, -5, -1, 99, 100, 999 ]

/* ⚙️ How Insertion Sort Works (Step-by-Step)
  1.Start from the second element (index 1), assuming the first element is already sorted.
  2.Compare the current element with the elements in the sorted portion (left side).
  3.Shift all larger elements one position to the right.
  4.Insert the current element into its correct position.
  5.Repeat until the entire array is sorted.
*/
const arr_for_insertion_sort = [5, 3, 8, 4, 2];

for (let i = 1; i < arr_for_insertion_sort.length; i++) {
  let current = arr_for_insertion_sort[i];
  let j;

  // inner for loop for shifting elements
  for (j = i - 1; j >= 0 && arr_for_insertion_sort[j] > current; j--) {
    arr_for_insertion_sort[j + 1] = arr_for_insertion_sort[j];
  }

  // insert current element at the right position
  arr_for_insertion_sort[j + 1] = current;
}

console.log(arr_for_insertion_sort);

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
