import type { AnimationStep } from '../types';

/*
Merge Sort Pseudocode:
1. function mergeSort(array, start, end):
2.   if start >= end: return
3.   middle = floor((start + end) / 2)
4.   mergeSort(array, start, middle)
5.   mergeSort(array, middle + 1, end)
6.   merge(array, start, middle, end)

7. function merge(array, start, middle, end):
8.   ... (setup auxiliary array)
9.   while i <= middle and j <= end:
10.    if aux[i] <= aux[j]:
11.      array[k++] = aux[i++]
12.    else:
13.      array[k++] = aux[j++]
14.  ... (copy remaining elements)
15. (finalize sorted elements)
*/

export function getMergeSortAnimations(array: number[]): AnimationStep[] {
  const animations: AnimationStep[] = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  for (let i = 0; i < array.length; i++) {
    animations.push(['finalize', i, { line: 15 }]);
  }
  return animations;
}

function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: AnimationStep[]
) {
  if (startIdx === endIdx) return; // Line 2
  const middleIdx = Math.floor((startIdx + endIdx) / 2); // Line 3
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations); // Line 4
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations); // Line 5
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations); // Line 6
}

function doMerge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: AnimationStep[]
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) { // Line 9
    animations.push(['compare', i, j, { line: 10 }]);
    animations.push(['revert', i, j, { line: 10 }]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) { // Line 10
      animations.push(['overwrite', k, auxiliaryArray[i], { line: 11 }]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push(['overwrite', k, auxiliaryArray[j], { line: 13 }]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) { // Line 14
    animations.push(['compare', i, i, { line: 14 }]);
    animations.push(['revert', i, i, { line: 14 }]);
    animations.push(['overwrite', k, auxiliaryArray[i], { line: 14 }]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) { // Line 14
    animations.push(['compare', j, j, { line: 14 }]);
    animations.push(['revert', j, j, { line: 14 }]);
    animations.push(['overwrite', k, auxiliaryArray[j], { line: 14 }]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}