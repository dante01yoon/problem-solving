// 4. Median of Two Sorted Arrays
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const sumArray = nums1.concat(nums2);
  sumArray.sort((a, b) => b - a)
  const isEven = sumArray.length % 2 === 0;

  if (isEven) {
    if (!sumArray.length) {
      return 0;
    }
    return (sumArray[Math.trunc(sumArray.length / 2) - 1] + sumArray[Math.trunc(sumArray.length / 2)]) / 2
  }
  return sumArray[Math.trunc(sumArray.length / 2)];
};