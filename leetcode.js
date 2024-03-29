/* 两个大数相加 */
var addStrings = function (num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1,
    add = 0;
  const ans = [];
  while (i >= 0 || j >= 0 || add != 0) {
    const x = i >= 0 ? num1.charAt(i) - "0" : 0;
    const y = j >= 0 ? num2.charAt(j) - "0" : 0;
    const result = x + y + add;
    ans.push(result % 10);
    add = Math.floor(result / 10);
    i -= 1;
    j -= 1;
  }
  return ans.reverse().join("");
};

//自己的
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
var addStrings = function (num1, num2) {
  let a = num1.length - 1,
    b = num2.length - 1;
  let add = 0;
  let r = [];
  while (a >= 0 || b >= 0 || add > 0) {
    let i = a >= 0 ? num1.charAt(a) - "0" : 0;
    let j = b >= 0 ? num2.charAt(b) - "0" : 0;

    let result = i + j + add;

    add = Math.floor(result / 10);
    r.unshift(result % 10);
    a--;
    b--;
  }
  return r.join("");
};
/*
  时间复杂度：竖式加法的次数取决于较大数的位数。
    空间复杂度：O(1)除答案外我们只需要常数空间存放若干变量。在 Java 解法中使用到了 StringBuffer，故 Java 解法的空间复杂度为 O(n)O(n)。
*/

/*
合并两个有序数组
  */
var merge = function (nums1, m, nums2, n) {
  let p1 = m - 1,
    p2 = n - 1;
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
直接对数组 nums1原地修改，不需要额外空间。
*/

var merge = function (nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m, ...nums2);
  nums1.sort((a, b) => a - b);
};
/*
时间复杂度：O((m+n)\log(m+n))O((m+n)log(m+n))。
排序序列长度为 m+nm+n，套用快速排序的时间复杂度即可，平均情况为 O((m+n)\log(m+n))O((m+n)log(m+n))。
空间复杂度：O(\log(m+n))O(log(m+n))。
排序序列长度为 m+nm+n，套用快速排序的空间复杂度即可，平均情况为 O(\log(m+n))O(log(m+n))。
*/

/* 合并两个有序链表 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/* 迭代 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  //链表头
  const preList = new ListNode(-1);
  //指针
  let pre = preList;
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      pre.next = list1;
      list1 = list1.next;
    } else {
      pre.next = list2;
      list2 = list2.next;
    }
    pre = pre.next;
  }
  if (list1 === null) pre.next = list2;
  if (list2 === null) pre.next = list1;
  return preList.next;
};
/*
时间复杂度：O(n + m)O(n+m)，其中 nn 和 mm 分别为两个链表的长度。因为每次循环迭代中，l1 和 l2 只有一个元素会被放进合并链表中， 因此 while 循环的次数不会超过两个链表的长度之和。所有其他操作的时间复杂度都是常数级别的，因此总的时间复杂度为 O(n+m)O(n+m)。
空间复杂度：O(1)O(1)。我们只需要常数的空间存放若干变量。
*/

/* 递归解法 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (list1 === null) return list2;
  if (list2 === null) return list1;
  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};
/*
时间复杂度：O(n + m)O(n+m)，其中 nn 和 mm 分别为两个链表的长度。因为每次调用递归都会去掉 l1 或者 l2 的头节点（直到至少有一个链表为空），函数 mergeTwoList 至多只会递归调用每个节点一次。因此，时间复杂度取决于合并后的链表长度，即 O(n+m)O(n+m)。
空间复杂度：O(n + m)O(n+m)，其中 nn 和 mm 分别为两个链表的长度。递归调用 mergeTwoLists 函数时需要消耗栈空间，栈空间的大小取决于递归调用的深度。结束递归调用时 mergeTwoLists 函数最多调用 n+mn+m 次，因此空间复杂度为 O(n+m)O(n+m)。
*/

/* 判断环形链表 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let p1 = head;
  if (!head || !head.next) return false;
  let p2 = head.next;

  while (p2 && p2.next) {
    if (p2 === p1) {
      return true;
    }
    p2 = p2.next.next;
    p1 = p1.next;
  }
  return false;
};

/* 相交链表 */
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
/* 哈希集合 */
var getIntersectionNode = function (headA, headB) {
  let visited = new Set();
  let p = headA;
  while (p) {
    visited.add(p);
    p = p.next;
  }

  p = headB;
  while (p) {
    if (visited.has(p)) return p;
    p = p.next;
  }
  return null;
};
//O(m+n)
//O(m)

/* 双指针 */
var getIntersectionNode = function (headA, headB) {
  let p1 = headA,
    p2 = headB;
  while (p1 !== p2) {
    p1 === null ? (p1 = headB) : (p1 = p1.next);
    p2 === null ? (p2 = headA) : (p2 = p2.next);
  }
  return p1;
};
//m+n
//1

/* 有效括号 */
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let hash = new Map([
    [")", "("],
    ["}", "{"],
    ["]", "["],
  ]);

  let zh = [];

  for (let ch of s) {
    if (hash.has(ch)) {
      if (!zh.length || zh[zh.length - 1] !== hash.get(ch)) return false;
      zh.pop();
    } else {
      zh.push(ch);
    }
  }
  return !zh.length;
};
//n
//n+6

/* 最长公共前缀 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let l = strs.length;
  for (j = 0; j < strs[0].length; j++) {
    for (i = 0; i < l - 1; i++) {
      if (strs[i].charAt(j) !== strs[i + 1].charAt(j)) break;
    }
    if (i !== l - 1) break;
  }
  return strs[0].substring(0, j);
};
//mn
//n

/* 二叉树的最大深度 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0;
  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  return Math.max(left, right) + 1;
};
//O(n)，n为二叉树节点个数
//O(height),height为二叉树高度。

/* 二叉搜索树的最近公共祖先 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  while (true) {
    if (root.val < p.val && root.val < q.val) {
      root = root.right;
    } else if (root.val > p.val && root.val > q.val) {
      root = root.left;
    } else break;
  }
  return root;
};
//n
//1

/* 将有序数组转换为二叉搜索树 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  function help(nums, left, right) {
    if (left > right) return null;
    let mid = (left + right) >>> 1;
    return new TreeNode(
      nums[mid],
      help(nums, left, mid - 1),
      help(nums, mid + 1, right)
    );
  }
  return help(nums, 0, nums.length - 1);
};
//n
//log(n)

/* 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
你可以假设数组是非空的，并且给定的数组总是存在多数元素。 */
/* 哈希表 */
//n  n

/* 排序法 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  nums.sort((a, b) => a - b);
  return nums[parseInt(nums.length / 2)];
};
// nlogn;
// logn;

//摩尔投票法
var majorityElement = function (nums) {
  let count = 0,
    more = null;
  for (let i = 0; i < nums.length; i++) {
    if (more === nums[i]) {
      count++;
    } else if (count === 0) {
      more = nums[i];
      count = 1;
    } else {
      count--;
    }
  }
  return more;
};
//   n
//   1

/* 链表反转 */
/* 迭代 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  //注意cur  pre都是相对于原始链表而言的！移动的也是原始链表节点
  let cur = head,
    pre = null;
  while (cur) {
    const nextNode = cur.next;

    //核心改变指向
    cur.next = pre;
    //移动节点
    pre = cur;
    cur = nextNode;
  }
  return pre;
};
//n
//1

/* 递归 */
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }
  let child = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return child;
};
//n
//n

/**
 * 二分算法
 * @param {*} arr
 * @param {*} value
 */
function binarySearch(arr, value) {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);

    if (arr[mid] === value) {
      return mid;
    } else if (arr[mid] > value) {
      max = mid - 1;
    } else {
      min = mid + 1;
    }
  }
  return "Not Found";
}

/* 
给定一个整数数组，求不相邻的子集的最大和。
举例：
输入 [2, 4, 10, 5, 8, 9, 3] <--- array
输出 2+10+8+3=23

f(0) = 原题的答案
f(i) 从i开始到最右边的子集的最大和。

i   i + 1. i + 2 , ....
a.   b.    c ....
f(i) = 包含a，就不可能包含b, a后面得从c开始 array[i] + f(i+2)
f(i) = 包含b  ,f(i+1)

f(i) = Math.max(array[i] + f(i+2), f(i+1))
*/
function subsequence(n, array) {
  //f(i) = Math.max(array[i] + f(i-2), f(i-1))
  let dp = [];
  dp[0] = array[0] > 0 ? array[0] : 0;
  dp[1] = Math.max(array[0], array[1]) > 0 ? Math.max(array[0], array[1]) : 0;
  for (let i = 2; i < array.length; i++) {
    dp[i] = Math.max(array[i] + dp[i - 2], dp[i - 1]);
  }
  return dp[array.length - 1];
}

//降低空间复杂度 n=>1
function subsequence(n, array) {
  //f(i) = Math.max(array[i] + f(i-2), f(i-1))
  let first = array[0] > 0 ? array[0] : 0;
  let sec = Math.max(array[0], array[1]) > 0 ? Math.max(array[0], array[1]) : 0;
  if (n === 1) {
    return first;
  } else if (n === 2) {
    return sec;
  }
  let third;
  for (let i = 2; i < array.length; i++) {
    third = Math.max(array[i] + first, sec);
    first = sec;
    sec = third;
  }
  return third;
}

/* 
给定一个整数数组，求不相邻Pair最大和。
举例：
输入 [2, 4, 10, 5, 8, 9, 3]
输出 19（即 9 + 10）
*/
void (async function () {
  let n = await readline();
  let a = await readline();
  let arr = a.split(" ").map((x) => parseInt(x));
  var dp = new Array(n + 1);
  for (var i = 0; i <= arr.length; i++) {
    dp[i] = new Array(2).fill(0);
  }
  if (n === 1) return arr[0];
  dp[1][1] = arr[0];
  dp[1][0] = 0;
  for (i = 2; i <= n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
    dp[i][1] = dp[i - 1][0] + arr[i - 1];
  }
  console.log(Math.max(dp[n][0], dp[n][1]));
})();

/* 
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。这部分可以不用输出。
1. 1 阶 + 1 阶
2. 2 阶 
*/
/*  题目三作答：实现下面的爬楼梯计算程序 */
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let f = new Array(n);
  f[0] = 0;
  f[1] = 1;
  for (i = 2; i <= n + 1; i++) {
    f[i] = f[i - 1] + f[i - 2];
  }
  return f[n + 1];
};
climbStairs(3);

/*
给定5个数字（0到9），如（ 0 2 4 5 6） 按要求组成三位数乘二位数的算式，并算出得数。
积最大：
积最小：
写出代码实现。

20，456//min
24，506

20，654
64，520//max

-- 不能0开头
0 2 4 5 6
XXX * XX
620 * 54 = 33480
：
520   64 = 31200

规律：
1.max放最高位
2.max  位同样高，优先给两位数用
3.0不能放在任何数的第一位 */
//todo

/* 
给定一个数组，有一个数字出现了1次，其他所有数字都出现了2次，要求复杂度O(n), 不使用额外O(n)存储。
举例：
输入 [1, 2, 3, 2, 1, 5, 5]
输出 3
*/
// 一个数和0做异或运算，结果仍然是原来的数，即 n^0=n。
//一个数和其自身做异或运算，结果是0，即 n^n=0。
//异或运算满足交换律和结合律，即 abc = a(bc) = (ab)c。
const arr = [1, 2, 3, 2, 1, 5, 5];
let ret = 0;
function fn() {
  for (let i = 0; i < arr.length; i++) {
    ret = arr[i] ^ ret;
  }
  return ret;
}

/* LRU缓存机制
运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制。它应该支持以下操作：
获取数据 get 和 写入数据 put 。
获取数据 get(key) - 如果密钥 (key) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1。
写入数据 put(key, value) - 如果密钥不存在，则写入其数据值。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
示例:
LRUCache cache = new LRUCache( 2 // 缓存容量 ;

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
*/
/* 法一：map */
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.map = new Map();
  this.capacity = capacity;
};

LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  } else return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    this.map.delete(key);
    this.map.set(key, value);
  } else {
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      this.map.delete(this.map.keys().next().value);
    }
  }
};
/* 法二：哈希表+双向链表。注意哈希表用{}存，不要用Set() */
//todo

/* 最长递增子序列 */
/* 贪心+二分查找 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const n = nums.length;
  let d = new Array(n + 1);
  d[1] = nums[0];
  let len = 1;
  for (i = 0; i <= n; i++) {
    if (nums[i] > d[len]) {
      d[++len] = nums[i];
    } else {
      //二分查找
      let pos = 0;
      let left = 1,
        right = len;
      let mid = 0;
      while (left <= right) {
        mid = (left + right) >> 1;
        if (d[mid] < nums[i]) {
          pos = mid;
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      d[pos + 1] = nums[i];
    }
  }
  return len;
};

/* 岛屿数量 */
/* Q1: Number of Islands
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water. */
/* 
Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]Output: 1
Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]Output: 3
*/

/* 硬币 */
/* Given coins of different values [1, 2, 5, 10], how many combinations of coins are there for a given amount N?
 */
/* 
Example:
N = 2
Output = 2 ([1, 1], [2])

N = 5
Output = 4 ([1, 1, 1, 1, 1], [1, 1, 1, 2], [1, 2, 2], [5])
*/

/* 相交链表 */
//哈希表法
/* 双指针交叉法 */
var getIntersectionNode = function (headA, headB) {
  let pA = headA;
  let pB = headB;
  while (pA || pB) {
    if (!pA) pA = headB;
    if (!pB) pB = headA;
    if (pA === pB) return pA;
    pA = pA.next;
    pB = pB.next;
  }
  return null;
};

/* 33.搜索旋转排序数组 */
var search = function (nums, target) {
  const n = nums.length;
  let left = 0,
    right = n - 1;
  if (n === 0) return -1;
  while (left <= right) {
    let mid = (left + right) >> 1;
    if (target === nums[mid]) return mid;
    if (nums[mid] >= nums[0]) {
      //左边连续
      // 不要写成nums[0] <= target < nums[mid]，没有这种语法
      if (nums[0] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      //右边连续
      if (nums[mid] < target && target <= nums[n - 1]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};

/* tb 1 */
/*
问题 1：给定一个 URL，输出该 URL 的参数（URL Query）Map
*/
//应该用split 转数组呀，分割三次：？，&，=，
const urlStr =
  "https://pages.tmall.com/wow/hdwk/act/2020nhj-single?wh_biz=tm&disableNav=YES&disableNav=NO&disableProgress=YES&hd_from=alipay_mayifarm&hd_from_id=100085&sceneId=972&deliveryId=8945&task_type=callapp&sceneCode=FUGUO&implId=other_0_158001_8945_0&query=spm&prismFrom=alipay_mayifarm&slk_gid=gid_er_er%7Cgid_er_evoke_ui_2%7Cgid_er_af_pop%7Cgid_er_sidebar_1&_afc_link=1&utparamcnt=%7B%22_afc_link%22%3A%221%22%7D#state";

function getQuery(url) {
  const retMap = new Map();
  let keyStack = "";
  let valueStack = "";

  for (i = 0; i < urlStr.length; i++) {
    if (
      (i > 0 && urlStr.charAt(i - 1) === "&") ||
      urlStr.charAt(i - 1) === "?" ||
      keyStack.length !== 0
    ) {
      keyStack += urlStr.charAt(i);
    } else if (urlStr.charAt(i - 1) === "=" || valueStack.length !== 0) {
      valueStack += urlStr.charAt(i);
    } else if (urlStr.charAt(i) === "&") {
      retMap.set(keyStack, valueStack);
      keyStack = "";
      valueStack = "";
    }
  }
  return retMap;
}
console.log(getQuery(urlStr));

/*
问题 2：给定一组存在 ${a.b.c} 形式占位符的字符串和一组数据，将字符串中的占位替换成真实的数据并输出;
*/
const data = {
  date: "2022年9月",
  model: "iPhone 14",
  price: { startPrice: 5999 },
};

const tpl =
  "苹果公司在 ${date} 发布了全新的 ${model} 系列手机，起售价格 ${price.startPrice} 元";

// function getTpl(data, tpl) {
//   const retArr = [];
//   let preKeyStack = [];
//   for (i = 0; i < tpl.length; i++) {
//     if (tpl.charAt(i) === '}') {
//       const key = preKeyStack.join('');
//       const value = data[key];
//       retArr.push(value);
//       preKeyStack.splice(0, preKeyStack.length);
//     } else if (i > 0 && tpl.charAt(i - 1) === '{' || preKeyStack.length !== 0) {
//       preKeyStack.push(tpl.charAt(i));
//     } else if (tpl.charAt(i) !== '$' && tpl.charAt(i) !== '{') {
//       retArr.push(tpl.charAt(i))
//     }
//   }
//   return retArr.join('');
// };
// console.log(getTpl(data, tpl));

function getTpl(data, tpl) {
  const result = tpl.replace(/\$\{([^\}]+)\}/g, (match, p1) => {
    const keys = p1.split(".");
    let value = data;
    for (let k of keys) {
      value = value[k];
    }
    return value;
  });
  return result;
}
console.log(getTpl(data, tpl));
/*
正则表达式 `/\$\{([^\}]+)\}/g` 是用来匹配形如 `${变量}` 的占位符的。下面是这个正则表达式的分段解释：

1. `\$`：`\` 是转义符，用来表示特殊字符，这里用来表示特殊字符 `$`。实际需要匹配的就是 `$` 字符。

2. `\{` and `\}`：这两个是匹配字符 `{` 和 `}` 的，`\{` 代表 `{`，`\}` 代表 `}`。

3. `([^\}]+)`：`[^...]` 匹配除了括号里面的任意字符，这里 `^\}` 就对应 `}` 以外的任意字符，`+` 表示前面的字符可以出现一次或多次，所以 `([^\}]+)` 整体代表 `}` 以外的一串字符。

4. `/\$\{([^\}]+)\}/g`：这个正则表达式整体就是用来匹配形如 `${变量}` 的占位符的，其中变量部分可以包含除 `}` 以外的任意字符。后面加上 `g` 是用来表示全局匹配。

所以，如果你的字符串形如 "Hello, ${name}!"，那么这个正则表达式就能匹配中间的 "${name}" 部分。
*/
/* 


3. 字符串匹配，判断文本 t 中是否存在 p。请勿使用 String.prototype.indexOf，正则匹配 等 JavaScript 提供的原生方法
例如，  t = "abcd"   p = 'ab' 字符子串

滑动窗口策略解决。我们可以通过移动一个和 p 等长的窗口，比较窗口和 p 是否相等。
 */
function includes(t, p) {
  const n = t.length,
    m = p.length;
  if (n < m) return false;
  const p_arr = [...p],
    t_arr = [...t];
  for (let i = 0; i < n - m + 1; i++) {
    let flag = true;
    for (let j = 0; j < m; j++) {
      if (t_arr[i + j] !== p_arr[j]) {
        flag = false;
        break;
      }
    }
    if (flag) return true;
  }
  return false;
}

const t = "abcd",
  p = "abcd";
console.log(includes(t, p)); // 输出：true

/* 生成交替二进制字符串的最少操作数
给你一个仅由字符 '0' 和 '1' 组成的字符串 s 。一步操作中，你可以将任一 '0' 变成 '1' ，或者将 '1' 变成 '0' 。
 */
//0开头的操作数+1开头的操作数===s.length
var minOperations = function (s) {
  let headCode = 0;
  let count = 0;
  for (i = 0; i < s.length; i++) {
    if (s.charAt(i) !== String(i % 2)) {
      count++;
    }
  }
  return Math.min(count, s.length - count);
};

/* 查询子字符串出现的位置，返回二维数组 */
//let par = 'abcbbc';
//let child = 'bc';
//ret =[[1,3],[4,6]]
//  par.search(/bc/);
let par = "abcbbc";
let child = "bc";
function fn(par, child) {
  if (typeof par !== "string" || typeof child !== "string") return [];
  const ret = [];
  const n = child.length;
  for (i = 0; i + n < par.length; i + n) {
    if (par.charAt(i) === child.charAt(0)) {
      const str = par.substr(0, n);
      if (str === child) ret.push([i, i + n]);
    }
  }
  return ret;
}
console.log(fn(par, child));

/* 用1-5随机函数实现1-7 */
// 进过论证，这样是不行的。均匀分布不代表随机
const gen = new Array(7).fill(0);
for (let i in Range(0, 100000)) {
  const circle = new Array(35).fill(0);
  for (j in Range(0, 7)) {
    let k = random(0, 4);
    circle[k + 5 * j] = 1;
  }

  for (l in range(0, 5)) {
    for (m in range(0, 7)) {
      if (circle[m + 7 * l] === 1) gen[m] += 1;
    }
  }
}
