//两个大数相加
var addStrings = function(num1, num2) {
  let i = num1.length - 1, j = num2.length - 1, add = 0;
  const ans = [];
  while (i >= 0 || j >= 0 || add != 0) {
      const x = i >= 0 ? num1.charAt(i) - '0' : 0;
      const y = j >= 0 ? num2.charAt(j) - '0' : 0;
      const result = x + y + add;
      ans.push(result % 10);
      add = Math.floor(result / 10);
      i -= 1;
      j -= 1;
  }
  return ans.reverse().join('');
};

//俺自己写的捏
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {

  let a = num1.length-1,
  b=num2.length-1;
  let add = 0;
  let r=[];
  while(a>=0||b>=0||add>0){
      let i =a >=0?num1.charAt(a)-'0':0;
      let j =b>=0?num2.charAt(b)-'0':0;
  
      let result = i+j + add;
  
      add =Math.floor(result/10) 
      r.unshift(result%10);
      
      a--;
      b--;
  }
  
  return  r.join('')
  };

    /*
  时间复杂度：竖式加法的次数取决于较大数的位数。
    空间复杂度：O(1)除答案外我们只需要常数空间存放若干变量。在 Java 解法中使用到了 StringBuffer，故 Java 解法的空间复杂度为 O(n)O(n)。
*/

  /*
合并两个有序数组
  */
  var merge = function(nums1, m, nums2, n) {
    let p1 = m - 1, p2 = n - 1;
    let tail = m + n - 1;
    var cur;
    while (p1 >= 0 || p2 >= 0) {
        if (p1 === -1) {
            cur = nums2[p2--];
        } else if (p2 === -1) {
            cur = nums1[p1--];
        } else if (nums1[p1] > nums2[p2]) {
            cur = nums1[p1--];
        } else {
            cur = nums2[p2--];
        }
        nums1[tail--] = cur;
    }
};

/*
时间复杂度：O(m+n)O(m+n)。
指针移动单调递减，最多移动 m+nm+n 次，因此时间复杂度为 O(m+n)O(m+n)。

空间复杂度：O(1)O(1)。
直接对数组 \textit{nums}_1nums 
1
​
  原地修改，不需要额外空间。
*/

var merge = function(nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m, ...nums2);
  nums1.sort((a, b) => a - b);
};

/*
时间复杂度：O((m+n)\log(m+n))O((m+n)log(m+n))。
排序序列长度为 m+nm+n，套用快速排序的时间复杂度即可，平均情况为 O((m+n)\log(m+n))O((m+n)log(m+n))。

空间复杂度：O(\log(m+n))O(log(m+n))。
排序序列长度为 m+nm+n，套用快速排序的空间复杂度即可，平均情况为 O(\log(m+n))O(log(m+n))。
*/

