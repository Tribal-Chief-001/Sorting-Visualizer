import type { Complexity } from './types';
import { AlgorithmType } from './types';

export const COLORS = {
  PRIMARY: '#00FF88', // Neon Green
  SECONDARY: '#FF0040', // Electric Red
  ACCENT: '#FFFF00', // Warning Yellow
  SORTED: '#00C4FF', // Light Blue
  FINAL: '#4ade80', // Green-400 for finalized elements
  WHITE: '#FFFFFF',
  BLACK: '#000000',
};

export const ANIMATION_SPEED_MIN = 1;
export const ANIMATION_SPEED_MAX = 300;
export const DEFAULT_ANIMATION_SPEED = 150;

export const ARRAY_SIZE_MIN = 10;
export const ARRAY_SIZE_MAX = 100;
export const ARRAY_SIZE_DEFAULT = 50;

export const ALGORITHM_COMPLEXITIES: Record<AlgorithmType, Complexity> = {
  [AlgorithmType.BubbleSort]: {
    time: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
    space: { worst: 'O(1)' },
    description: 'A simple algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Inefficient for large lists.',
  },
  [AlgorithmType.SelectionSort]: {
    time: { best: 'O(n^2)', average: 'O(n^2)', worst: 'O(n^2)' },
    space: { worst: 'O(1)' },
    description: 'This algorithm divides the list into a sorted and an unsorted part, repeatedly finding the minimum element from the unsorted part and moving it to the sorted part.',
  },
  [AlgorithmType.InsertionSort]: {
    time: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
    space: { worst: 'O(1)' },
    description: 'Builds the final sorted array one item at a time. It is efficient for small datasets or lists that are already substantially sorted.',
  },
  [AlgorithmType.MergeSort]: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: { worst: 'O(n)' },
    description: 'A "divide and conquer" algorithm that divides the array into halves, sorts them recursively, and then merges them. It has a predictable time complexity but requires extra space.',
  },
  [AlgorithmType.QuickSort]: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n^2)' },
    space: { worst: 'O(log n)' },
    description: 'Also a "divide and conquer" algorithm. It picks a "pivot" element and partitions the array around it. It is very fast on average but has a worst-case quadratic complexity.',
  },
  [AlgorithmType.HeapSort]: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: { worst: 'O(1)' },
    description: 'A comparison-based technique based on a Binary Heap data structure. It is similar to selection sort but uses a heap data structure to find the maximum element more quickly.',
  },
};