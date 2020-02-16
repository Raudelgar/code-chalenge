// FACEBOOK LEETCODE
/** 
Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 
Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
*/
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
	if (!s || s === ' ') return false;
	if (s.length < 2) return s.length;

	let longest = Number.MIN_VALUE;
	let hash = new Map();

	for (let i = 0; i < s.length; i++) {
		if (!hash.has(s.charAt(i))) {
			hash.set(s.charAt(i), i);
		} else {
			i = hash.get(s.charAt(i));
			longest = Math.max(hash.size, longest);
			hash.clear();
		}
	}

	return Math.max(hash.size, longest);
};

/** 
Implement atoi which converts a string to an integer.

The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

If no valid conversion could be performed, a zero value is returned.

Note:

Only the space character ' ' is considered as whitespace character.
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. If the numerical value is out of the range of representable values, INT_MAX (231 − 1) or INT_MIN (−231) is returned.
Example 1:

Input: "42"
Output: 42
Example 2:

Input: "   -42"
Output: -42
Explanation: The first non-whitespace character is '-', which is the minus sign.
             Then take as many numerical digits as possible, which gets 42.
Example 3:

Input: "4193 with words"
Output: 4193
Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.
Example 4:

Input: "words and 987"
Output: 0
Explanation: The first non-whitespace character is 'w', which is not a numerical 
             digit or a +/- sign. Therefore no valid conversion could be performed.
Example 5:

Input: "-91283472332"
Output: -2147483648
Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer.
             Thefore INT_MIN (−231) is returned.
*/
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
	if (!str || str === ' ') return 0;
	if (str.length === 1 && isNaN(str)) return 0;

	let num = Number(formatterStr(str));

	if (num < Math.pow(-2, 31)) {
		num = Math.pow(-2, 31);
	} else if (num > Math.pow(2, 31) - 1) {
		num = Math.pow(2, 31) - 1;
	}

	return num;
};

function formatterStr(input) {
	let subStr = input.trim();
	let a = subStr.split(' ');
	let regexNeg = /(-\d+)/g;
	let regexPos = /(\+\d+)/g;
	let isNeg = false;

	//checking for negative
	if (a[0].match(regexNeg)) {
		let tmp = a[0].split('');
		tmp.splice(0, 1);
		a[0] = tmp.join('');

		isNeg = true;
	} else if (a[0].match(regexPos)) {
		let tmp = a[0].split('');
		tmp.splice(0, 1);
		a[0] = tmp.join('');
	}
	subStr = a[0];

	//checking for NaN
	for (let i = 0; i < a[0].length; i++) {
		if (isNaN(a[0][i])) {
			if (i === 0) {
				return 0;
			} else {
				subStr = a[0].slice(0, i);
				break;
			}
		}
	}

	return isNeg ? `-${subStr}` : subStr;
}

/** 
Define a repeatify function on the String object. The function accepts an integer that specifies how many times the string has to be repeated. The function returns the string repeated the number of times specified
*/

String.prototype.repeatify =
	String.prototype.repeatify ||
	function(n) {
		if (!n || n <= 0) return this;
		const copy = this;

		for (let i = 1; i < n; i++) {
			this += copy;
		}

		return this;
	};

const test = 'hello';
test.repeatify(3); //hellohellohello
test.repeatify(); //hello
test.repeatify(0); //hello
test.repeatify(-1); //hello

/** 
The 'this' and call,apply and bind used
*/
var fullname = 'John Doe';
var obj = {
	fullname: 'Colin Ihrig',
	prop: {
		fullname: 'Aurelio De Rosa',
		getFullname: function() {
			return this.fullname;
		}
	}
};

console.log(obj.prop.getFullname()); //Aurelio De Rosa

var test = obj.prop.getFullname;
var test1 = obj.prop.getFullname;
var test2 = obj.prop.getFullname;
//fixing with bind
var test3 = obj.prop.getFullname.bind(obj.prop);

//On 'use strict' will give an error, since 'this' its undefined
console.log(test()); //John Doe

//Fix with call() and apply()
console.log(test1.call(obj.prop)); //Aurelio De Rosa
console.log(test2.apply(obj.prop)); //Aurelio De Rosa

console.log(test3()); //Aurelio De Rosa

/** 
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, two is written as II in Roman numeral, just two one's added together. Twelve is written as, XII, which is simply X + II. The number twenty seven is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

Example 1:

Input: "III"
Output: 3
Example 2:

Input: "IV"
Output: 4
Example 3:

Input: "IX"
Output: 9
Example 4:

Input: "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
Example 5:

Input: "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
*/

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
	if (!s || s === ' ') return 0;

	let romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
	let lessNumMap = { I: ['V', 'X'], X: ['L', 'C'], C: ['D', 'M'] };
	let num = 0;
	let i = 0;

	if (s.length === 1) {
		return romanMap[s];
	}

	while (i < s.length) {
		if (
			lessNumMap[s.charAt(i)] &&
			lessNumMap[s.charAt(i)].includes(s.charAt(i + 1))
		) {
			num += romanMap[s.charAt(i + 1)] - romanMap[s.charAt(i)];
			i += 2;
		} else {
			num += romanMap[s.charAt(i)];
			i += 1;
		}
	}

	return num;
};

const test1 = 'MCMXCIV';
const test2 = 'III';
const test3 = 'DCXXI';

romanToInt(test1); //1994
romanToInt(test2); //3
romanToInt(test3); //621

/*
Given an array nums of n integers, are there elements a, b, c in nums 
such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
Note:
The solution set must not contain duplicate triplets.

Example:

Given array nums = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
	if (!nums && nums.length <= 2) return false;

	//nums.sort((a,b) => a - b);

	let hash = new Map();
	let result = [];

	for (let i = 0, j = 1; j < nums.length; i++, j++) {
		let sum = nums[i] + nums[j];
		let third = sum === 0 ? 0 : -sum;

		if (nums.includes(third)) {
			hash.set(third, [i, j]);
		}
	}

	for (let k = 0; k < nums.length; k++) {
		let tmp = [];
		if (hash.has(nums[k])) {
			let indexs = hash.get(nums[k]);
			if (!indexs.includes(k)) {
				tmp.push(nums[k]);
				for (let index of indexs) {
					tmp.push(nums[index]);
				}
				if (!areEquals(result, tmp)) {
					result.push(tmp);
				}
			}
		}
	}

	return result;
};

function areEquals(result, tmp) {
	let equals = false;
	tmp.sort((a, b) => a - b);

	if (result.length === 0) return equals;

	result.map(re => {
		re.sort((a, b) => a - b);
		equals = re.every((r, i, re) => re[i] === tmp[i]);
	});
	return equals;
}

const test1 = [0, 0, 0, 0];
const test2 = [1, -1, -1, 0];
const test3 = [-1, 0, 1, 2, -1, -4];
const test4 = [-2, 0, 1, 1, 2];

// threeSum(test1);
// threeSum(test2);
threeSum(test3);
// threeSum(test4);

/*
Given an array of distincts integers, return all posible permutations. 
*/
function allPermutations(arr) {
	function permRecursive(a, memo = [], result = []) {
		if (!a.length) {
			result.push([...memo]);
		}
		for (let i = 0; i < a.length; i++) {
			memo.push(a[i]);
			let newArr = a.filter((n, j) => j !== i);
			permRecursive(newArr, memo, result);
			memo.pop();
		}

		return result;
	}
	return permRecursive(arr);
}

const test = [1, 2, 3];
allPermutations(test);

/*
Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

The replacement must be in-place and use only constant extra memory.

Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.

1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1
*/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
	let last = true;
	let completed = false;

	for (let i = nums.length - 2; i >= 0; i--) {
		if (nums[i] >= nums[i + 1]) {
			continue;
		} else {
			for (let j = nums.length - 1; j > i; j--) {
				if (nums[i] < nums[j]) {
					swap(nums, i, j);
					reverse(nums, i + 1);
					last = false;
					completed = true;
					break;
				}
			}

			if (completed) {
				break;
			}
		}
	}

	if (last) {
		nums.sort();
	}

	return nums;
};

function swap(a, fromIndex, toIndex) {
	a[fromIndex] = a.splice(toIndex, 1, a[fromIndex])[0];
}

function reverse(a, start) {
	let end = a.length - 1;

	while (start < end) {
		swap(a, start, end);
		start += 1;
		end -= 1;
	}
}

// const test1 = [1,2,3]; //[1,3,2]
// const test2 = [3,2,1]; //[1,2,3]
const test3 = [0, 1, 2, 5, 3, 3, 0]; //[0, 1, 3, 0, 2, 3, 5]
// const test4 = [1,3,2]; //[2,1,3]

nextPermutation(test3);

/*
Implementing factorial with regular loop and recursive
*/
//Regular loop
function factorial(n) {
	let factor = 1;
	let len = n;

	for (let i = 1; i <= len; i++) {
		factor *= n;
		n--;
	}

	return factor;
}
//Recursive
function recursiveFactorial(n, factor = 1) {
	if (!n) {
		return factor;
	}
	return recursiveFactorial(n - 1, factor * n);
}

factorial(3); //6
factorial(4); //24
factorial(5); //120

recursiveFactorial(3); //6
recursiveFactorial(4); //24
recursiveFactorial(5); //120

/*
########### ALL PERMUTATIONS OPTIMUS ###################
*/
function allPermutations(nums) {
	let result = [];
	let iter = factorial(nums.length) - 1;

	//first permutation
	result.push([...nums]);
	for (let i = 0; i < iter; i++) {
		let np = nextPermutation(nums);
		result.push(np);
		nums = [...np];
	}

	return result;
}

function factorial(n) {
	let factor = 1;
	let len = n;

	if (n <= 1) {
		return factor;
	}

	for (let i = 1; i <= len; i++) {
		factor *= n;
		n--;
	}

	return factor;
}
function nextPermutation(nums) {
	let last = true;
	let completed = false;

	for (let i = nums.length - 2; i >= 0; i--) {
		if (nums[i] >= nums[i + 1]) {
			continue;
		} else {
			for (let j = nums.length - 1; j > i; j--) {
				if (nums[i] < nums[j]) {
					swap(nums, i, j);
					reverse(nums, i + 1);
					last = false;
					completed = true;
					break;
				}
			}

			if (completed) {
				break;
			}
		}
	}

	if (last) {
		nums.sort();
	}

	return nums;
}

function swap(a, fromIndex, toIndex) {
	a[fromIndex] = a.splice(toIndex, 1, a[fromIndex])[0];
}

function reverse(a, start) {
	let end = a.length - 1;

	while (start < end) {
		swap(a, start, end);
		start += 1;
		end -= 1;
	}
}

// const test1 = [1,2,3]; //[1,3,2]
// const test2 = [3,2,1]; //[1,2,3]
// const test3 = [0,1,2,5,3,3,0]; //[0, 1, 3, 0, 2, 3, 5]
// const test4 = [1,3,2]; //[2,1,3]

const test5 = [1, 3, 2];

allPermutations(test5);

/*
Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

Example 1:

Input: num1 = "2", num2 = "3"
Output: "6"
Example 2:

Input: num1 = "123", num2 = "456"
Output: "56088"
Note:

The length of both num1 and num2 is < 110.
Both num1 and num2 contain only digits 0-9.
Both num1 and num2 do not contain any leading zero, except the number 0 itself.
You must not use any built-in BigInteger library or convert the inputs to integer directly.
*/
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
	let result = Array(num1.length + num2.length).fill(0);

	for (let i = num1.length - 1; i >= 0; i--) {
		let base = 0;
		for (let j = num2.length - 1; j >= 0; j--) {
			result[i + j + 1] += num1[i] * num2[j] + base;
			base = Math.floor(result[i + j + 1] / 10);
			result[i + j + 1] = result[i + j + 1] % 10;
		}
		result[i] = base;
	}

	return result.join('').replace(/^0*(\d)/, '$1');
};

/*
Given an array of strings, group anagrams together.

Example:

Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
Note:

All inputs will be in lowercase.
The order of your output does not matter.
*/
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
	if (!strs || !strs.length) return false;

	let hash = {};
	let result = [];

	for (let i = 0; i < strs.length; i++) {
		let ar = [...strs[i]].sort();
		let key = ar.join('');

		if (!hash.hasOwnProperty(key)) {
			hash[key] = [];
			hash[key].push(strs[i]);
		} else {
			hash[key].push(strs[i]);
		}
	}

	for (let k in hash) {
		result.push(hash[k]);
	}

	return result;
};

/*
Given two binary strings, return their sum (also a binary string).

The input strings are both non-empty and contains only characters 1 or 0.

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"
*/
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
	if ((!a && !b && a === ' ') || b === ' ') return false;

	let strA = a
		.split('')
		.reverse()
		.join('');
	let strB = b
		.split('')
		.reverse()
		.join('');
	let sum = [];
	let base = 0;

	for (let i = 0; i < a.length || i < b.length || base > 0; i++) {
		let currA = Number(strA[i] || 0);
		let currB = Number(strB[i] || 0);
		let currSum = currA + currB + base;
		let result = currSum % 2;

		base = currSum > 1 ? 1 : 0;
		sum.push(result);
	}

	return sum.reverse().join('');
};

/*
Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

Example:

Input: S = "ADOBECODEBANC", T = "ABC"
Output: "BANC"
Note:

If there is no such window in S that covers all characters in T, return the empty string "".
If there is such window, you are guaranteed that there will always be only one unique minimum window in S.
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
	if (!s || (!t && s === ' ') || t === ' ' || s.length < t.length) return '';

	if (s === t) {
		return s;
	}

	let start = 0;
	let end = -1;
	let result = '';
	let map = {};

	for (let char of t) {
		map[char] = (map[char] || 0) + 1;
	}
	let count = Object.keys(map).length;

	while (end < s.length) {
		// contract, minimize when meeting the requirement. put back the character
		// into the map when leaving the character.
		if (count === 0) {
			if (!result || result.length > end - start + 1) {
				result = s.slice(start, end + 1);
			}
			if (map[s[start]] !== undefined) {
				map[s[start]]++;
			}
			if (map[s[start]] > 0) {
				count++;
			}
			start++;
		} else {
			// explore, expand
			end++;
			if (map[s[end]] !== undefined) {
				map[s[end]]--;
			}
			if (map[s[end]] === 0) {
				count--;
			}
		}
	}

	return result;
};

const s1 = 'ADOBECODEBANC';
const t1 = 'ABC';
//BANC
const s2 = 'ab';
const t2 = 'a';
//a
const s3 = 'aa';
const t3 = 'aa';
//aa
const s4 = 'abc';
const t4 = 'a';
// a
const s5 = 'a';
const t5 = 'aa';
// ""
const s6 = 'abc';
const t6 = 'b';
// b
const s7 = 'abbc';
const t7 = 'bb';
// bb
const s8 = 'bbaac';
const t8 = 'aba';
// baa

minWindow(s8, t8);

/*
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

Note:

The number of elements initialized in nums1 and nums2 are m and n respectively.
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.
Example:

Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
*/
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
	let s1 = nums1.slice(0, m);
	let s2 = nums2.slice(0, n);

	nums1 = s1.concat(s2).sort((a, b) => a - b);
	console.log(nums1);
};

const nums1 = [-1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0];
const m = 5;
const nums2 = [-1, -1, 0, 0, 1, 2];
const n = 6;

// const nums1 = [1,2,3,0,0,0];
// const m = 3;
// const nums2 = [2,5,6];
// const n = 3;

merge(nums1, m, nums2, n);

/*
Given a collection with n integers that represent a playlist, generate an unsorted new array,
for N times.

My inspiration : Spotify Problem :)
*/
function unsortedPlayList(arr) {
	let set = new Set();

	while (set.size !== arr.length) {
		let index = Math.floor(Math.random() * arr.length);
		set.add(arr[index]);
	}

	return [...set];
}

const test1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < 10; i++) {
	console.log(unsortedPlayList(test1));
}

/*
Output:
[ 1, 2, 7, 3, 6, 10, 4, 5, 8, 9 ]
[ 3, 10, 5, 7, 8, 1, 9, 2, 6, 4 ]
[ 3, 4, 9, 8, 7, 10, 2, 1, 6, 5 ]
[ 10, 2, 8, 3, 5, 1, 9, 4, 6, 7 ]
[ 6, 3, 1, 5, 2, 10, 8, 7, 9, 4 ]
[ 7, 10, 5, 2, 6, 1, 4, 9, 3, 8 ]
[ 1, 7, 3, 9, 8, 10, 6, 5, 2, 4 ]
[ 5, 3, 2, 6, 10, 1, 7, 9, 8, 4 ]
[ 8, 9, 10, 4, 1, 3, 2, 6, 5, 7 ]
[ 3, 1, 9, 5, 4, 6, 7, 10, 2, 8 ]

*/

/*
Given two strings s and t, determine if they are both one edit distance apart.

Note: 

There are 3 possiblities to satisify one edit distance apart:

Insert a character into s to get t
Delete a character from s to get t
Replace a character of s to get t
Example 1:

Input: s = "ab", t = "acb"
Output: true
Explanation: We can insert 'c' into s to get t.
Example 2:

Input: s = "cab", t = "ad"
Output: false
Explanation: We cannot get t from s by only one step.
Example 3:

Input: s = "1203", t = "1213"
Output: true
Explanation: We can replace '0' with '1' to get t.
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isOneEditDistance = function(s, t) {
	if (!s && !t) return false;
	if (t === s) return false;
	if (s.length > t.length && s.length - t.length > 1) return false;
	if (t.length > s.length && t.length - s.length > 1) return false;

	if (s === '' || (s === ' ' && t.length === 1)) return true;
	if (t === '' || (t === ' ' && s.length === 1)) return true;

	let len;
	let bg; //bigger
	let sm; //smaller

	//instead of calling recursive
	if (t.length <= s.length) {
		len = t.length;
		bg = s;
		sm = t;
	} else {
		len = s.length;
		bg = t;
		sm = s;
	}

	for (let i = 0; i < len; i++) {
		if (sm.charAt(i) !== bg.charAt(i)) {
			if (t.length === s.length) {
				return sm.slice(i + 1) === bg.slice(i + 1);
			} else {
				return sm.slice(i) === bg.slice(i + 1);
			}
		}
	}

	return true;
};

/*
Given a string of integers, represting the code of letters, return all posible letters,
that the given code can represent.

Input: s = "12"
Output: [ 'a', 'b', 'l' ]
Explanation: a -> 1, b -> 2 and l -> 12

*/

function decode(data) {
	if (!data || data === ' ' || isNaN(data)) return false;

	const aplh = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z'
	];

	let result = [];
	let i = 0;
	let j = 2;
	let str = '';

	//by each character
	for (; i < data.length; i++) {
		let n = Number(data.charAt(i));

		if (n !== 0) {
			result.push(aplh[n - 1]);
		}

		//***
		// if (n !== 0) {
		// 	str += aplh[n - 1];
		// }
	}

	//***
	// result.push(str);

	//by pairs
	i = 0;
	while (j <= data.length) {
		let n = Number(data.slice(i, j));

		if (n < 27) {
			result.push(aplh[n - 1]);
		}

		i++;
		j = i + 2;
	}

	return result;
}

const test1 = '12'; //[ 'a', 'b', 'l' ]
const test2 = '458217'; //[ 'd', 'e', 'h', 'b', 'a', 'g', 'u', 'q' ]

decode(test2);

//***Note: Another option of this problem will be if the code string is always two characters max,
// they want a whole word.
