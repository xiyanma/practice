//两个大数相加
var addStrings = function (num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1,
    add = 0;
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
var addStrings = function (num1, num2) {

  let a = num1.length - 1,
    b = num2.length - 1;
  let add = 0;
  let r = [];
  while (a >= 0 || b >= 0 || add > 0) {
    let i = a >= 0 ? num1.charAt(a) - '0' : 0;
    let j = b >= 0 ? num2.charAt(b) - '0' : 0;

    let result = i + j + add;

    add = Math.floor(result / 10)
    r.unshift(result % 10);

    a--;
    b--;
  }

  return r.join('')
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


//合并两个有序链表
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
//迭代
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
      list1 = list1.next
    } else {
      pre.next = list2;
      list2 = list2.next
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
//递归解法
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (list1 === null) return list2;
  if (list2 === null) return list1;
  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2)
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next)
    return list2;
  }
};
/*
时间复杂度：O(n + m)O(n+m)，其中 nn 和 mm 分别为两个链表的长度。因为每次调用递归都会去掉 l1 或者 l2 的头节点（直到至少有一个链表为空），函数 mergeTwoList 至多只会递归调用每个节点一次。因此，时间复杂度取决于合并后的链表长度，即 O(n+m)O(n+m)。
空间复杂度：O(n + m)O(n+m)，其中 nn 和 mm 分别为两个链表的长度。递归调用 mergeTwoLists 函数时需要消耗栈空间，栈空间的大小取决于递归调用的深度。结束递归调用时 mergeTwoLists 函数最多调用 n+mn+m 次，因此空间复杂度为 O(n+m)O(n+m)。
*/


//判断环形链表
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
      return true
    }
    p2 = p2.next.next;
    p1 = p1.next;
  }
  return false
};


//相交链表
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
//哈希集合
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
//双指针
var getIntersectionNode = function (headA, headB) {
  let p1 = headA,
    p2 = headB;
  while (p1 !== p2) {
    p1 === null ? p1 = headB : p1 = p1.next;
    p2 === null ? p2 = headA : p2 = p2.next;
  }
  return p1;
};
//m+n
//1