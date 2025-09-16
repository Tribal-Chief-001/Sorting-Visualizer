import type { AnimationStep } from '../types';

/*
Insertion Sort Pseudocode:
1. function insertionSort(array):
2.   for i from 1 to n-1:
3.     key = array[i]
4.     j = i - 1
5.     while j >= 0 and array[j] > key:
6.       array[j+1] = array[j]
7.       j = j - 1
8.     array[j+1] = key
9.   (finalize sorted elements)
*/

export function getInsertionSortAnimations(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    const n = array.length;
    for (let i = 1; i < n; i++) { // Line 2
        let key = array[i]; // Line 3
        let j = i - 1; // Line 4
        animations.push(['pivot', i, i, { line: 3 }]);
        
        let lastComparisonJ = -1;
        while (j >= 0 && array[j] > key) { // Line 5
            lastComparisonJ = j;
            animations.push(['compare', j, i, { line: 5 }]);
            animations.push(['revert', j, i, { line: 5 }]);
            animations.push(['overwrite', j + 1, array[j], { line: 6 }]);
            array[j + 1] = array[j];
            j = j - 1; // Line 7
        }
        if (lastComparisonJ !== -1) {
          animations.push(['compare', lastComparisonJ, i, { line: 5 }]);
          animations.push(['revert', lastComparisonJ, i, { line: 5 }]);
        }
        
        animations.push(['overwrite', j + 1, key, { line: 8 }]);
        array[j + 1] = key;
        animations.push(['revert', i, i, { line: 8 }]);
    }
    
    for (let k = 0; k < n; k++) {
        animations.push(['finalize', k, { line: 9 }]);
    }
    
    return animations;
}