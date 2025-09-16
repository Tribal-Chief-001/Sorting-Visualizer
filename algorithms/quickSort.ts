import type { AnimationStep } from '../types';

/*
Quick Sort Pseudocode:
1. function quickSort(array, low, high):
2.   if low < high:
3.     pi = partition(array, low, high)
4.     quickSort(array, low, pi - 1)
5.     quickSort(array, pi + 1, high)

6. function partition(array, low, high):
7.   pivot = array[high]
8.   i = low - 1
9.   for j from low to high-1:
10.    if array[j] < pivot:
11.      i++
12.      swap(array[i], array[j])
13.  swap(array[i+1], array[high])
14.  return i + 1
15. (finalize sorted element)
*/

export function getQuickSortAnimations(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    for(let i=0; i < array.length; i++){
        // This finalization step can't be perfectly mapped to a line, so we use a generic one.
        animations.push(['finalize', i, { line: 15 }]);
    }
    return animations;
}

function quickSortHelper(
    arr: number[],
    low: number,
    high: number,
    animations: AnimationStep[]
) {
    if (low < high) { // Line 2
        const pi = partition(arr, low, high, animations); // Line 3
        quickSortHelper(arr, low, pi - 1, animations); // Line 4
        quickSortHelper(arr, pi + 1, high, animations); // Line 5
    }
}

function partition(
    arr: number[],
    low: number,
    high: number,
    animations: AnimationStep[]
): number {
    const pivot = arr[high]; // Line 7
    animations.push(['pivot', high, high, { line: 7 }]);
    let i = low - 1; // Line 8

    for (let j = low; j < high; j++) { // Line 9
        animations.push(['compare', j, high, { line: 10 }]);
        animations.push(['revert', j, high, { line: 10 }]);
        if (arr[j] < pivot) { // Line 10
            i++; // Line 11
            animations.push(['swap', i, j, { line: 12 }]);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    animations.push(['swap', i + 1, high, { line: 13 }]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    animations.push(['revert', high, high, { line: 13 }]);
    animations.push(['finalize', i + 1, { line: 15 }]);
    return i + 1; // Line 14
}