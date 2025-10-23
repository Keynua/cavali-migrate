/**
 * Splits an array into smaller chunks of a specified size.
 * Useful for batch processing large datasets.
 * 
 * @param arr - Array to split into chunks
 * @param n - Size of each chunk
 * @returns Array of chunks, where each chunk contains up to n elements
 * 
 * @example
 * chunks([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export function chunks<T>(arr: T[], n: number): T[][] {
  const list: T[][] = [];
  for (let i = 0; i < arr.length; i += n) {
    list.push(arr.slice(i, i + n));
  }
  return list;
}

