import type { AlgorithmType, AnimationStep } from '../types';
import { AlgorithmType as AT } from '../types';
import { getBubbleSortAnimations } from './bubbleSort';
import { getSelectionSortAnimations } from './selectionSort';
import { getInsertionSortAnimations } from './insertionSort';
import { getMergeSortAnimations } from './mergeSort';
import { getQuickSortAnimations } from './quickSort';
import { getHeapSortAnimations } from './heapSort';

export const getSortAnimations = (
  algorithm: AlgorithmType,
  array: number[]
): AnimationStep[] => {
  switch (algorithm) {
    case AT.BubbleSort:
      return getBubbleSortAnimations(array);
    case AT.SelectionSort:
        return getSelectionSortAnimations(array);
    case AT.InsertionSort:
        return getInsertionSortAnimations(array);
    case AT.MergeSort:
      return getMergeSortAnimations(array);
    case AT.QuickSort:
        return getQuickSortAnimations(array);
    case AT.HeapSort:
        return getHeapSortAnimations(array);
    default:
      return [];
  }
};