import type { AnimationStep } from '../types';

/*
Selection Sort Pseudocode:
1. function selectionSort(array):
2.   n = array.length
3.   for i from 0 to n-2:
4.     minIdx = i
5.     for j from i+1 to n-1:
6.       if array[j] < array[minIdx]:
7.         minIdx = j
8.     swap(array[i], array[minIdx])
9.   (finalize sorted element)
*/

export function getSelectionSortAnimations(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    const n = array.length; // Line 2
    for (let i = 0; i < n - 1; i++) { // Line 3
        let minIdx = i; // Line 4
        animations.push(['pivot', i, i, { line: 4 }]);
        for (let j = i + 1; j < n; j++) { // Line 5
            animations.push(['compare', minIdx, j, { line: 6 }]);
            animations.push(['revert', minIdx, j, { line: 6 }]);
            if (array[j] < array[minIdx]) { // Line 6
                minIdx = j; // Line 7
            }
        }
        animations.push(['swap', i, minIdx, { line: 8 }]);
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        animations.push(['finalize', i, { line: 9 }]);
    }
    if (n > 0) {
      animations.push(['finalize', n - 1, { line: 9 }]);
    }
    return animations;
}