export enum AlgorithmType {
  BubbleSort = 'Bubble Sort',
  SelectionSort = 'Selection Sort',
  InsertionSort = 'Insertion Sort',
  MergeSort = 'Merge Sort',
  QuickSort = 'Quick Sort',
  HeapSort = 'Heap Sort',
}

export enum ArrayScenario {
    Random = 'Random',
    Sorted = 'Sorted',
    NearlySorted = 'Nearly Sorted',
    Reversed = 'Reversed',
    FewUnique = 'Few Unique',
}

export enum Language {
    Python = 'Python',
    Java = 'Java',
    Cpp = 'C++',
    C = 'C',
}

export interface Complexity {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: {
    worst: string;
  };
  description: string;
}

export interface SortStats {
  comparisons: number;
  arrayWrites: number;
}

export type AnimationStep =
  | ['compare' | 'pivot' | 'revert', number, number, { line: number }]
  | ['swap', number, number, { line: number }]
  | ['overwrite', number, number, { line: number }]
  | ['finalize', number, { line: number }];

export interface ArrayBar {
  value: number;
  color: string;
  className?: string;
}

export interface ComparisonResult {
  algorithm: AlgorithmType;
  stats: SortStats;
  rank: number;
}