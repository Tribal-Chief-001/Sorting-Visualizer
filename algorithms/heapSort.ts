import type { AnimationStep } from '../types';

/*
Heap Sort Pseudocode:
1. function heapSort(array):
2.   n = array.length
3.   // Build max heap
4.   for i from floor(n/2)-1 down to 0:
5.     heapify(array, n, i)
6.   // Extract elements from heap
7.   for i from n-1 down to 1:
8.     swap(array[0], array[i])
9.     heapify(array, i, 0)
10. (finalize sorted element)

11. function heapify(array, n, i):
12.   largest = i
13.   left = 2*i + 1, right = 2*i + 2
14.   if left < n and array[left] > array[largest]: largest = left
15.   if right < n and array[right] > array[largest]: largest = right
16.   if largest != i:
17.     swap(array[i], array[largest])
18.     heapify(array, n, largest)
*/

export function getHeapSortAnimations(array: number[]): AnimationStep[] {
    const animations: AnimationStep[] = [];
    const n = array.length; // Line 2

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) { // Line 4
        heapify(array, n, i, animations); // Line 5
    }

    for (let i = n - 1; i > 0; i--) { // Line 7
        animations.push(['swap', 0, i, { line: 8 }]);
        [array[0], array[i]] = [array[i], array[0]];
        animations.push(['finalize', i, { line: 10 }]);
        heapify(array, i, 0, animations); // Line 9
    }
    if (n > 0) {
      animations.push(['finalize', 0, { line: 10 }]);
    }

    return animations;
}

function heapify(
    arr: number[],
    n: number,
    i: number,
    animations: AnimationStep[]
) {
    let largest = i; // Line 12
    const left = 2 * i + 1; // Line 13
    const right = 2 * i + 2; // Line 13

    animations.push(['pivot', i, i, { line: 12 }]);
    animations.push(['revert', i, i, { line: 12 }]);
    
    if (left < n) {
        animations.push(['compare', largest, left, { line: 14 }]);
        animations.push(['revert', largest, left, { line: 14 }]);
        if (arr[left] > arr[largest]) {
            largest = left;
        }
    }

    if (right < n) {
        animations.push(['compare', largest, right, { line: 15 }]);
        animations.push(['revert', largest, right, { line: 15 }]);
        if (arr[right] > arr[largest]) {
            largest = right;
        }
    }

    if (largest !== i) { // Line 16
        animations.push(['swap', i, largest, { line: 17 }]);
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest, animations); // Line 18
    }
}