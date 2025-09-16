import { AlgorithmType, Language } from '../types';

export const ALGORITHM_CODE: Record<AlgorithmType, Record<Language, string>> = {
  [AlgorithmType.BubbleSort]: {
    [Language.Python]: `
def bubble_sort(arr):
    n = len(arr) # Line 2
    for i in range(n - 1): # Line 3
        for j in range(n - i - 1): # Line 4
            if arr[j] > arr[j + 1]: # Line 5
                arr[j], arr[j + 1] = arr[j + 1], arr[j] # Line 6`,
    [Language.Java]: `
class Sorter {
    void bubbleSort(int arr[]) {
        int n = arr.length; // Line 2
        for (int i = 0; i < n - 1; i++) { // Line 3
            for (int j = 0; j < n - i - 1; j++) { // Line 4
                if (arr[j] > arr[j + 1]) { // Line 5
                    int temp = arr[j]; // Line 6
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}`,
    [Language.Cpp]: `
void swap(int &a, int &b) {
    int temp = a; a = b; b = temp;
}
void bubbleSort(int arr[], int n) {
    // n is array size // Line 2
    for (int i = 0; i < n - 1; i++) { // Line 3
        for (int j = 0; j < n - i - 1; j++) { // Line 4
            if (arr[j] > arr[j + 1]) { // Line 5
                swap(arr[j], arr[j + 1]); // Line 6
            }
        }
    }
}`,
    [Language.C]: `
void swap(int *xp, int *yp) {
    int temp = *xp; *xp = *yp; *yp = temp;
}
void bubbleSort(int arr[], int n) {
    // n is array size // Line 2
    for (int i = 0; i < n - 1; i++) { // Line 3
        for (int j = 0; j < n - i - 1; j++) { // Line 4
            if (arr[j] > arr[j + 1]) { // Line 5
                swap(&arr[j], &arr[j + 1]); // Line 6
            }
        }
    }
}`
  },
  [AlgorithmType.SelectionSort]: {
    [Language.Python]: `
def selection_sort(arr):
    n = len(arr) # Line 2
    for i in range(n - 1): # Line 3
        min_idx = i # Line 4
        for j in range(i + 1, n): # Line 5
            if arr[j] < arr[min_idx]: # Line 6
                min_idx = j # Line 7
        arr[i], arr[min_idx] = arr[min_idx], arr[i] # Line 8`,
    [Language.Java]: `
class Sorter {
    void selectionSort(int arr[]) {
        int n = arr.length; // Line 2
        for (int i = 0; i < n - 1; i++) { // Line 3
            int min_idx = i; // Line 4
            for (int j = i + 1; j < n; j++) { // Line 5
                if (arr[j] < arr[min_idx]) { // Line 6
                    min_idx = j; // Line 7
                }
            }
            int temp = arr[min_idx]; // Line 8
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
    }
}`,
    [Language.Cpp]: `
void swap(int &a, int &b) {
    int temp = a; a = b; b = temp;
}
void selectionSort(int arr[], int n) {
    // n is array size // Line 2
    for (int i = 0; i < n - 1; i++) { // Line 3
        int min_idx = i; // Line 4
        for (int j = i + 1; j < n; j++) { // Line 5
            if (arr[j] < arr[min_idx]) { // Line 6
                min_idx = j; // Line 7
            }
        }
        swap(arr[i], arr[min_idx]); // Line 8
    }
}`,
    [Language.C]: `
void swap(int *xp, int *yp) {
    int temp = *xp; *xp = *yp; *yp = temp;
}
void selectionSort(int arr[], int n) {
    // n is array size // Line 2
    for (int i = 0; i < n - 1; i++) { // Line 3
        int min_idx = i; // Line 4
        for (int j = i + 1; j < n; j++) { // Line 5
            if (arr[j] < arr[min_idx]) { // Line 6
                min_idx = j; // Line 7
            }
        }
        swap(&arr[i], &arr[min_idx]); // Line 8
    }
}`
  },
    [AlgorithmType.InsertionSort]: {
    [Language.Python]: `
def insertion_sort(arr):
    for i in range(1, len(arr)): # Line 2
        key = arr[i] # Line 3
        j = i - 1 # Line 4
        while j >= 0 and arr[j] > key: # Line 5
            arr[j + 1] = arr[j] # Line 6
            j -= 1 # Line 7
        arr[j + 1] = key # Line 8
`,
    [Language.Java]: `
class Sorter {
    void insertionSort(int arr[]) {
        for (int i = 1; i < arr.length; ++i) { // Line 2
            int key = arr[i]; // Line 3
            int j = i - 1; // Line 4
            while (j >= 0 && arr[j] > key) { // Line 5
                arr[j + 1] = arr[j]; // Line 6
                j = j - 1; // Line 7
            }
            arr[j + 1] = key; // Line 8
        }
    }
}`,
    [Language.Cpp]: `
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) { // Line 2
        int key = arr[i]; // Line 3
        int j = i - 1; // Line 4
        while (j >= 0 && arr[j] > key) { // Line 5
            arr[j + 1] = arr[j]; // Line 6
            j = j - 1; // Line 7
        }
        arr[j + 1] = key; // Line 8
    }
}`,
    [Language.C]: `
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) { // Line 2
        int key = arr[i]; // Line 3
        int j = i - 1; // Line 4
        while (j >= 0 && arr[j] > key) { // Line 5
            arr[j + 1] = arr[j]; // Line 6
            j = j - 1; // Line 7
        }
        arr[j + 1] = key; // Line 8
    }
}`
  },
  [AlgorithmType.MergeSort]: {
    [Language.Python]: `
def merge_sort(arr, start, end): # Line 1
    if start >= end: return # Line 2
    
    middle = (start + end) // 2 # Line 3
    merge_sort(arr, start, middle) # Line 4
    merge_sort(arr, middle + 1, end) # Line 5
    merge(arr, start, middle, end) # Line 6

def merge(arr, start, middle, end): # Line 7
    # ... merge implementation ...
    while i <= middle and j <= end: # Line 9
        if left_arr[i] <= right_arr[j]: # Line 10
            arr[k] = left_arr[i] # Line 11
            i += 1
        else:
            arr[k] = right_arr[j] # Line 13
            j += 1
        k += 1
    # ... copy remaining ... # Line 14`,
    [Language.Java]: `
class Sorter {
    void merge(int arr[], int l, int m, int r) { // Line 7
        int n1 = m - l + 1, n2 = r - m;
        int L[] = new int[n1], R[] = new int[n2];
        for(int i=0; i<n1; ++i) L[i] = arr[l+i];
        for(int j=0; j<n2; ++j) R[j] = arr[m+1+j];
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) { // Line 9
            if (L[i] <= R[j]) { // Line 10
                arr[k++] = L[i++]; // Line 11
            } else {
                arr[k++] = R[j++]; // Line 13
            }
        }
        while (i < n1) arr[k++] = L[i++]; // Line 14
        while (j < n2) arr[k++] = R[j++]; // Line 14
    }
    void mergeSort(int arr[], int l, int r) { // Line 1
        if (l >= r) return; // Line 2
        int m = l + (r - l) / 2; // Line 3
        mergeSort(arr, l, m); // Line 4
        mergeSort(arr, m + 1, r); // Line 5
        merge(arr, l, m, r); // Line 6
    }
}`,
    [Language.Cpp]: `
#include <vector>

void merge(int arr[], int l, int m, int r) { // Line 7
    int n1 = m - l + 1, n2 = r - m;
    std::vector<int> L(n1), R(n2);
    for(int i=0; i<n1; i++) L[i] = arr[l+i];
    for(int j=0; j<n2; j++) R[j] = arr[m+1+j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) { // Line 9
        if (L[i] <= R[j]) { // Line 10
            arr[k++] = L[i++]; // Line 11
        } else {
            arr[k++] = R[j++]; // Line 13
        }
    }
    while (i < n1) arr[k++] = L[i++]; // Line 14
    while (j < n2) arr[k++] = R[j++]; // Line 14
}
void mergeSort(int arr[], int l, int r) { // Line 1
    if (l >= r) return; // Line 2
    int m = l + (r - l) / 2; // Line 3
    mergeSort(arr, l, m); // Line 4
    mergeSort(arr, m + 1, r); // Line 5
    merge(arr, l, m, r); // Line 6
}`,
    [Language.C]: `
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) { // Line 7
    int i, j, k;
    int n1 = m - l + 1, n2 = r - m;
    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));
    for(i=0; i<n1; i++) L[i] = arr[l+i];
    for(j=0; j<n2; j++) R[j] = arr[m+1+j];
    i = 0; j = 0; k = l;
    while (i < n1 && j < n2) { // Line 9
        if (L[i] <= R[j]) { // Line 10
            arr[k++] = L[i++]; // Line 11
        } else {
            arr[k++] = R[j++]; // Line 13
        }
    }
    while (i < n1) arr[k++] = L[i++]; // Line 14
    while (j < n2) arr[k++] = R[j++]; // Line 14
    free(L); free(R);
}
void mergeSort(int arr[], int l, int r) { // Line 1
    if (l >= r) return; // Line 2
    int m = l + (r - l) / 2; // Line 3
    mergeSort(arr, l, m); // Line 4
    mergeSort(arr, m + 1, r); // Line 5
    merge(arr, l, m, r); // Line 6
}`
  },
  [AlgorithmType.QuickSort]: {
    [Language.Python]: `
def quick_sort(arr, low, high): # Line 1
    if low < high: # Line 2
        pi = partition(arr, low, high) # Line 3
        quick_sort(arr, low, pi - 1) # Line 4
        quick_sort(arr, pi + 1, high) # Line 5

def partition(arr, low, high): # Line 6
    pivot = arr[high] # Line 7
    i = low - 1 # Line 8
    for j in range(low, high): # Line 9
        if arr[j] < pivot: # Line 10
            i += 1 # Line 11
            arr[i], arr[j] = arr[j], arr[i] # Line 12
    arr[i + 1], arr[high] = arr[high], arr[i + 1] # Line 13
    return i + 1 # Line 14`,
    [Language.Java]: `
class Sorter {
    void swap(int arr[], int i, int j) {
        int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
    }
    int partition(int arr[], int low, int high) { // Line 6
        int pivot = arr[high]; // Line 7
        int i = (low - 1); // Line 8
        for (int j = low; j < high; j++) { // Line 9
            if (arr[j] < pivot) { // Line 10
                i++; // Line 11
                swap(arr, i, j); // Line 12
            }
        }
        swap(arr, i + 1, high); // Line 13
        return (i + 1); // Line 14
    }
    void quickSort(int arr[], int low, int high) { // Line 1
        if (low < high) { // Line 2
            int pi = partition(arr, low, high); // Line 3
            quickSort(arr, low, pi - 1); // Line 4
            quickSort(arr, pi + 1, high); // Line 5
        }
    }
}`,
    [Language.Cpp]: `
void swap(int &a, int &b) {
    int temp = a; a = b; b = temp;
}
int partition(int arr[], int low, int high) { // Line 6
    int pivot = arr[high]; // Line 7
    int i = (low - 1); // Line 8
    for (int j = low; j < high; j++) { // Line 9
        if (arr[j] < pivot) { // Line 10
            i++; // Line 11
            swap(arr[i], arr[j]); // Line 12
        }
    }
    swap(arr[i + 1], arr[high]); // Line 13
    return (i + 1); // Line 14
}
void quickSort(int arr[], int low, int high) { // Line 1
    if (low < high) { // Line 2
        int pi = partition(arr, low, high); // Line 3
        quickSort(arr, low, pi - 1); // Line 4
        quickSort(arr, pi + 1, high); // Line 5
    }
}`,
    [Language.C]: `
void swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}
int partition(int arr[], int low, int high) { // Line 6
    int pivot = arr[high]; // Line 7
    int i = (low - 1); // Line 8
    for (int j = low; j < high; j++) { // Line 9
        if (arr[j] < pivot) { // Line 10
            i++; // Line 11
            swap(&arr[i], &arr[j]); // Line 12
        }
    }
    swap(&arr[i + 1], &arr[high]); // Line 13
    return (i + 1); // Line 14
}
void quickSort(int arr[], int low, int high) { // Line 1
    if (low < high) { // Line 2
        int pi = partition(arr, low, high); // Line 3
        quickSort(arr, low, pi - 1); // Line 4
        quickSort(arr, pi + 1, high); // Line 5
    }
}`
  },
  [AlgorithmType.HeapSort]: {
    [Language.Python]: `
def heap_sort(arr):
    n = len(arr) # Line 2
    # Build a maxheap.
    for i in range(n // 2 - 1, -1, -1): # Line 4
        heapify(arr, n, i) # Line 5
    # One by one extract elements
    for i in range(n - 1, 0, -1): # Line 7
        arr[i], arr[0] = arr[0], arr[i] # Line 8
        heapify(arr, i, 0) # Line 9

def heapify(arr, n, i): # Line 11
    largest = i # Line 12
    left = 2 * i + 1 # Line 13
    right = 2 * i + 2
    if left < n and arr[left] > arr[largest]: # Line 14
        largest = left
    if right < n and arr[right] > arr[largest]: # Line 15
        largest = right
    if largest != i: # Line 16
        arr[i], arr[largest] = arr[largest], arr[i] # Line 17
        heapify(arr, n, largest) # Line 18`,
    [Language.Java]: `
class Sorter {
    void heapify(int arr[], int n, int i) { // Line 11
        int largest = i; // Line 12
        int l = 2 * i + 1, r = 2 * i + 2; // Line 13
        if (l < n && arr[l] > arr[largest]) largest = l; // Line 14
        if (r < n && arr[r] > arr[largest]) largest = r; // Line 15
        if (largest != i) { // Line 16
            int swap = arr[i]; // Line 17
            arr[i] = arr[largest];
            arr[largest] = swap;
            heapify(arr, n, largest); // Line 18
        }
    }
    public void heapSort(int arr[]) {
        int n = arr.length; // Line 2
        for (int i = n / 2 - 1; i >= 0; i--) // Line 4
            heapify(arr, n, i); // Line 5
        for (int i = n - 1; i > 0; i--) { // Line 7
            int temp = arr[0]; // Line 8
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0); // Line 9
        }
    }
}`,
    [Language.Cpp]: `
void swap(int &a, int &b) {
    int temp = a; a = b; b = temp;
}
void heapify(int arr[], int n, int i) { // Line 11
    int largest = i; // Line 12
    int l = 2 * i + 1, r = 2 * i + 2; // Line 13
    if (l < n && arr[l] > arr[largest]) largest = l; // Line 14
    if (r < n && arr[r] > arr[largest]) largest = r; // Line 15
    if (largest != i) { // Line 16
        swap(arr[i], arr[largest]); // Line 17
        heapify(arr, n, largest); // Line 18
    }
}
void heapSort(int arr[], int n) { // Line 1
    for (int i = n / 2 - 1; i >= 0; i--) // Line 4
        heapify(arr, n, i); // Line 5
    for (int i = n - 1; i > 0; i--) { // Line 7
        swap(arr[0], arr[i]); // Line 8
        heapify(arr, i, 0); // Line 9
    }
}`,
    [Language.C]: `
void swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}
void heapify(int arr[], int n, int i) { // Line 11
    int largest = i; // Line 12
    int l = 2 * i + 1, r = 2 * i + 2; // Line 13
    if (l < n && arr[l] > arr[largest]) largest = l; // Line 14
    if (r < n && arr[r] > arr[largest]) largest = r; // Line 15
    if (largest != i) { // Line 16
        swap(&arr[i], &arr[largest]); // Line 17
        heapify(arr, n, largest); // Line 18
    }
}
void heapSort(int arr[], int n) { // Line 1
    for (int i = n / 2 - 1; i >= 0; i--) // Line 4
        heapify(arr, n, i); // Line 5
    for (int i = n - 1; i > 0; i--) { // Line 7
        swap(&arr[0], &arr[i]); // Line 8
        heapify(arr, i, 0); // Line 9
    }
}`
  },
};
