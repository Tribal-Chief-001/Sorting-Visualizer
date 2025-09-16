import type { AnimationStep } from '../types';

/*
Bubble Sort Pseudocode:
1. function bubbleSort(array):
2.   n = array.length
3.   for i from 0 to n-2:
4.     for j from 0 to n-i-2:
5.       if array[j] > array[j+1]:
6.         swap(array[j], array[j+1])
7.   (finalize sorted elements)
*/

export function getBubbleSortAnimations(array: number[]): AnimationStep[] {
  const animations: AnimationStep[] = [];
  const n = array.length; // Line 2
  for (let i = 0; i < n - 1; i++) { // Line 3
    for (let j = 0; j < n - i - 1; j++) { // Line 4
      animations.push(['compare', j, j + 1, { line: 5 }]);
      if (array[j] > array[j + 1]) { // Line 5
        animations.push(['swap', j, j + 1, { line: 6 }]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
      animations.push(['revert', j, j + 1, { line: 5 }]);
    }
    animations.push(['finalize', n - 1 - i, { line: 7 }]);
  }
  if (n > 0) {
      animations.push(['finalize', 0, { line: 7 }]);
  }
  return animations;
}