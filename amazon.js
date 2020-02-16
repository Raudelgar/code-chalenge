///////////////////////////////////////////
/*
AMAZON Assigment Demo
*/

/*
Problem 1.
Received an array with length fixed to 8, and only contains values 0 and 1. If prev and next val are equal, 
ith should be zero, otherwise should be one. Considered -1 index and 8 index as zeros. Iterate days times from 1 to n days.
*/

// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED
function cellCompete(states, days) {
	// WRITE YOUR CODE HERE
	if (days === 0) return false;
	if (states == null || states.length === 0) return false;

	let tmp = [...states];

	while (days > 0) {
		let j = 0;
		for (let i = 0; i < 8; i++) {
			j = i + 1;
			if (i === 0) {
				//left edge cell
				if (states[j] === 0) {
					tmp[i] = 0;
				} else {
					tmp[i] = 1;
				}
			} else if (i === 7) {
				//rigth edge cell
				if (states[i - 1] === 0) {
					tmp[i] = 0;
				} else {
					tmp[i] = 1;
				}
			} else {
				if (states[i - 1] === states[j]) {
					tmp[i] = 0;
				} else {
					tmp[i] = 1;
				}
			}
		}
		days--;
		states = [...tmp];
	}

	return states;
}
// FUNCTION SIGNATURE ENDS

console.log(cellCompete([1, 0, 0, 0, 0, 1, 0, 0], 1));

/*
Problem 2.
Find the Greater Common Divisor. Iterate num times from one to num. The arrray arr is only poisitves numbers 
*/

// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED
function generalizedGCD(num, arr) {
	// WRITE YOUR CODE HERE
	if (num == null || num === 0) return false;
	if (arr == null || arr.length === 0) return false;

	//no need to run the rest
	if (num === 1) {
		return 1;
	}

	let result = 1; // min GCD
	let isFind = false;
	let div = 2; //first test

	while (div <= num) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] % div === 0) {
				isFind = true;
			} else {
				isFind = false;
				break;
			}
		}
		if (isFind) {
			result = div;
		}
		div++;
	}

	return result;
}
// FUNCTION SIGNATURE ENDS
///////////////////////////////////////////
/**
 Problem 3
 Given an array of n positive integers and a positive integer s, find the minimal length of a contiguous subarray 
 of which the sum ≥ s. If there isn't one, return 0 instead.

 Input: s = 7, nums = [2,3,1,2,4,3]
 Output: 2

 Explanation: the subarray [4,3] has the minimal length under the problem constraint.

 */

function minSubLen(nums, s) {
	if (s == null || s === 0) return 0;
	if (nums == null || nums.length === 0) return 0;

	nums.sort((a, b) => a > b);
	let result = 0;
	let len = nums.length;
	let i = 1;

	while (i < len) {
		let sum = nums.reduce((acc, curr) => acc + curr);
		if (sum < s) {
			break;
		} else {
			result = nums.length;
			nums.splice(0, 1);
			i++;
		}
	}

	return result;
}

console.log(minSubLen([2, 3, 1, 2, 4, 3], 7));

/**
 Problem 4
 
 You are given a 2D array of characters, and a target string. Return whether or not the word target 
 word exists in the matrix. Unlike a standard word search, the word must be either going left-to-right, 
 or top-to-bottom in the matrix.

Example:

[['F', 'A', 'C', 'I'],
 ['O', 'B', 'Q', 'P'],
 ['A', 'N', 'O', 'B'],
 ['M', 'A', 'S', 'S']]

Given this matrix, and the target word FOAM, you should return true, as it can be found going up-to-down in the first column.

 */

function findWordMatrix(matrix, word) {
	if (word == null || word === '') return false;
	if (matrix == null || matrix.length === 0) return false;

	//searching only from left-to-right
	for (let i = 0; i < matrix.length; i++) {
		let row = matrix[i].join('');

		if (row === word) {
			return true; //break and return as soon is found
		}
	}

	let c = 0; //column index
	while (c < matrix.length) {
		let col = '';
		for (let i = 0; i < matrix.length; i++) {
			if (i === 0) {
				col = matrix[i][c];
			} else {
				col += matrix[i][c];
			}
		}
		if (col === word) {
			return true; //break and return as soon is found
		}
		c++;
	}

	return false;
}
const matrix = [
	['F', 'A', 'C', 'I'],
	['O', 'B', 'Q', 'P'],
	['A', 'N', 'O', 'B'],
	['M', 'A', 'S', 'S']
];
console.log(findWordMatrix(matrix, 'FOAM'));

/**
 Problem 5

 You are given a 2D array of integers. Print out the clockwise spiral traversal of 
 the matrix.

Example:

grid = [[1,  2,  3,  4,  5],
        [6,  7,  8,  9,  10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20]]

The clockwise spiral traversal of this array is:

1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12
 */

function spiralClockwise(matrix) {
	if (matrix == null || matrix.length === 0) return false;

	let counter = matrix[0].length * matrix.length;
	let r = matrix[0].length; //row length;=5
	let c = matrix.length; //column length;=4
	let i = 0; //row index
	let j = 0; //column index
	let l = 0; //edge limit
	let print = [];

	while (counter > 0) {
		//left-to-right
		for (; i < r; i++) {
			// console.log(matrix[j][i]);
			print.push(matrix[j][i]);
			counter--;
		}
		r--; //shrinking rows
		j++;

		//top-to-bottom
		for (; j < c; j++) {
			// console.log(matrix[j][r]);
			print.push(matrix[j][r]);
			counter--;
		}

		c--; //shrinking columns

		//right-to-left
		for (i = r - 1; i > l; i--) {
			// console.log(matrix[c][i]);
			print.push(matrix[c][i]);
			counter--;
		}
		//check point
		if (counter === 0) {
			break;
		}
		j = c;

		//bottom-to-top
		for (; j > l; j--) {
			// console.log(matrix[j][i]);
			print.push(matrix[j][i]);
			counter--;
		}
		i++;
		j++;
		l++;
	}

	return print;
}

const grid = [
	[1, 2, 3, 4, 5],
	[6, 7, 8, 9, 10],
	[11, 12, 13, 14, 15],
	[16, 17, 18, 19, 20]
];
const grid1 = [
	[1, 2, 3, 4, 5],
	[6, 7, 8, 9, 10],
	[11, 12, 13, 14, 15],
	[16, 17, 18, 19, 20],
	[21, 22, 23, 24, 25]
];
console.log(spiralClockwise(grid));
console.log(spiralClockwise(grid1));

/**
 You have an array of logs.  Each log is a space delimited string of words.

For each log, the first word in each log is an alphanumeric identifier.  Then, either:

Each word after the identifier will consist only of lowercase letters, or;
Each word after the identifier will consist only of digits.
We will call these two varieties of logs letter-logs and digit-logs.  It is guaranteed that each log has at least one word after its identifier.

Reorder the logs so that all of the letter-logs come before any digit-log.  The letter-logs are ordered lexicographically ignoring identifier, with the identifier used in case of ties.  The digit-logs should be put in their original order.

Return the final order of the logs.
 */

/**
 * @param {string[]} logs
 * @return {string[]}
 */
//my version
var reorderLogFiles = function(logs) {
	if (logs == null) return false;

	let queueLetters = [];
	let digit = [];

	for (let i = 0; i < logs.length; i++) {
		let a = logs[i].split(' ');
		let nan = Number(a[1]).toString();
		//fill each map
		if (!(nan === 'NaN')) {
			digit.push(logs[i]);
		} else {
			let k = a[0];
			a.splice(0, 1);
			let val = a.join(' ');

			if (queueLetters.length === 0) {
				queueLetters.push(logs[i]);
			} else {
				let isNew = true;
				for (let j = 0; j < queueLetters.length; j++) {
					let q = queueLetters[j].split(' ');
					let qk = q[0];
					q.splice(0, 1);
					let qv = q.join(' ');

					if (val < qv) {
						queueLetters.splice(j, 0, logs[i]);
						isNew = false;
						break;
					} else if (val === qv) {
						if (k < qk) {
							queueLetters.splice(j, 0, logs[i]);
							isNew = false;
							break;
						} else {
							queueLetters.splice(j + 1, 0, logs[i]);
							isNew = false;
							break;
						}
					}
				}
				if (isNew) {
					queueLetters.push(logs[i]);
				}
			}
		}
	}

	logs = [...queueLetters, ...digit];

	return logs;
};

//better solutiion
/**
 * @param {string[]} logs
 * @return {string[]}
 */
var reorderLogFiles = function(logs) {
	if (logs == null) return false;
	// setup your variables
	let letters = [];
	let digits = [];
	let sortedLetters = [];
	// Iterate through each log
	for (log of logs) {
		// Split the log into an array
		const tempLog = log.split(' ');
		// Check the first character after the identifier. If it's a number then you have a digit-log
		if (!isNaN(tempLog[1])) {
			digits.push(log);
		} else {
			// Otherwise it's a letter-log. Push an object with the identifier and the body as seperate values
			letters.push({
				id: tempLog.slice(0, 1),
				body: tempLog.slice(1).join(' ')
			});
		}
	}
	// For each letter log, sort the body first, then the identifier. I did not see this style sorting in
	// any other examples using this style of sorting.
	letters.sort((log1, log2) => {
		if (log1.body > log2.body) return 1;
		if (log1.body < log2.body) return -1;
		if (log1.id < log2.id) return -1;
		if (log1.id > log2.id) return 1;
	});
	// turn the sorted letters back into logs
	for (letter of letters) {
		sortedLetters.push(`${letter.id} ${letter.body}`);
	}
	// append the digit logs
	return sortedLetters.concat(digits);
};

const logs = [
	'dig1 8 1 5 1',
	'let1 art can',
	'dig2 3 6',
	'let2 own kit dig',
	'let3 art zero'
];
const logs1 = [
	'a1 9 2 3 1',
	'g1 act car',
	'zo4 4 7',
	'ab1 off key dog',
	'a8 act zoo'
];
const logs2 = ['1 n u', 'r 527', 'j 893', '6 14', '6 82'];
const logs3 = [
	'a1 9 2 3 1',
	'g1 act car',
	'zo4 4 7',
	'ab1 off key dog',
	'a8 act zoo',
	'a2 act car'
];
reorderLogFiles(logs3);
// console.log(reorderLogFiles(logs3));

/**
 Given 2 lists a and b. Each element is a pair of integers where the first integer represents 
 the unique id and the second integer represents a value. Your task is to find an element from 
 a and an element form b such that the sum of their values is less or equal to target and as 
 close to target as possible. Return a list of ids of selected elements. If no pair is possible, 
 return an empty list.

Example 1:

Input:
a = [[1, 2], [2, 4], [3, 6]]
b = [[1, 2]]
target = 7

Output: [[2, 1]]

Explanation:
There are only three combinations [1, 1], [2, 1], and [3, 1], which have a total sum of 4, 6 and 8, respectively.
Since 6 is the largest sum that does not exceed 7, [2, 1] is the optimal pair.
Example 2:

Input:
a = [[1, 3], [2, 5], [3, 7], [4, 10]]
b = [[1, 2], [2, 3], [3, 4], [4, 5]]
target = 10

Output: [[2, 4], [3, 2]]

Explanation:
There are two pairs possible. Element with id = 2 from the list `a` has a value 5, and element with id = 4 from the list `b` also has a value 5.
Combined, they add up to 10. Similarily, element with id = 3 from `a` has a value 7, and element with id = 2 from `b` has a value 3.
These also add up to 10. Therefore, the optimal pairs are [2, 4] and [3, 2].
 */

function findIds(A, B, target) {
	if (A == null || B == null) return [];

	A.sort((a, b) => a[1] - b[1]);
	B.sort((a, b) => a[1] - b[1]);

	let res = [];
	let max = -Infinity;
	let l = 0; //start index A
	let r = B.length - 1; //start index B

	while (l < A.length && r >= 0) {
		let sum = A[l][1] + B[r][1];
		if (sum > target) {
			r--;
		} else {
			if (max <= sum) {
				if (max < sum) {
					max = sum;
					res = [];
				}
				res.push([A[l][0], B[r][0]]);
				let i = r - 1;
				while (i >= 0 && B[i][1] === B[i + 1][1]) {
					res.push([A[l][0], B[i][0]]); //duplicate values
					i--;
				}
			}
			l++;
		}
	}
	return res;
}

// console.log(findIds([[1, 2], [2, 4], [3, 6]],[[1, 2]],7));
console.log(
	findIds(
		[
			[1, 3],
			[4, 10],
			[2, 5],
			[3, 7]
		],
		[
			[3, 4],
			[1, 2],
			[2, 3],
			[4, 5]
		],
		10
	)
);

/*
Given n ropes of different lengths, we need to connect these ropes into one rope. We can connect only 2 ropes at a time. The cost required to connect 2 ropes is equal to sum of their lengths. The length of this connected rope is also equal to the sum of their lengths. This process is repeated until n ropes are connected into a single rope. Find the min possible cost required to connect all ropes.

Example 1:

Input: ropes = [8, 4, 6, 12]
Output: 58
Explanation: The optimal way to connect ropes is as follows
1. Connect the ropes of length 4 and 6 (cost is 10). Ropes after connecting: [8, 10, 12]
2. Connect the ropes of length 8 and 10 (cost is 18). Ropes after connecting: [18, 12]
3. Connect the ropes of length 18 and 12 (cost is 30).
Total cost to connect the ropes is 10 + 18 + 30 = 58
Example 2:

Input: ropes = [20, 4, 8, 2]
Output: 54
Example 3:

Input: ropes = [1, 2, 5, 10, 35, 89]
Output: 224
Example 4:

Input: ropes = [2, 2, 3, 3]
Output: 20
*/
function sumRopes(ropes) {
	if (ropes == null) return false;

	let result = [];
	let i = 0;
	let j = 1;
	let len = ropes.length;
	ropes.sort((a, b) => a - b);

	while (len > 0) {
		if (j <= ropes.length - 1) {
			let sum = ropes[i] + ropes[j];
			ropes.shift();
			ropes.splice(0, 1, sum);
			result.push(sum);
		}
		len--;
	}

	return result.reduce((acc, curr) => acc + curr);
}

// console.log(sumRopes([8, 4, 6, 12])); //58
// console.log(sumRopes([20, 4, 8, 2])); //54
// console.log(sumRopes([1, 2, 5, 10, 35, 89])); //224
console.log(sumRopes([2, 2, 3, 3])); //21

/**
 You have a map that marks the location of a treasure island. Some of the map area has jagged rocks and dangerous reefs. Other areas are safe to sail in. There are other explorers trying to find the treasure. So you must figure out a shortest route to the treasure island.

Assume the map area is a two dimensional grid, represented by a matrix of characters. You must start from the top-left corner of the map and can move one block up, down, left or right at a time. The treasure island is marked as X in a block of the matrix. X will not be at the top-left corner. Any block with dangerous rocks or reefs will be marked as D. You must not enter dangerous blocks. You cannot leave the map area. Other areas O are safe to sail in. The top-left corner is always safe. Output the minimum number of steps to get to the treasure.

Example:

Input:
[['O', 'O', 'O', 'O'],
 ['D', 'O', 'D', 'O'],
 ['O', 'O', 'O', 'O'],
 ['X', 'D', 'D', 'O']]

Output: 5
Explanation: Route is (0, 0), (0, 1), (1, 1), (2, 1), (2, 0), (3, 0) The minimum route takes 5 steps.
 */

//Breadth First Search

function treasureIsland(grid) {
	let queue = [];
	let directions = [
		[-1, 0],
		[1, 0],
		[0, 1],
		[0, -1]
	];
	let count = 0;
	queue.push([0, 0]);
	while (queue.length !== 0) {
		count++;
		let size = queue.length;
		for (let i = 0; i < size; i++) {
			let [startR, startC] = queue.shift();
			for (let [dr, dc] of directions) {
				let r = startR + dr;
				let c = startC + dc;
				if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
					if (grid[r][c] === 'X') {
						return count;
					}
					if (grid[r][c] === 'O') {
						grid[r][c] = 'D'; //make sure not going there again
						queue.push([r, c]);
					}
				}
			}
		}
	}
	return -1;
}
let input = [
	['O', 'O', 'O', 'O'],
	['D', 'O', 'D', 'O'],
	['O', 'O', 'O', 'O'],
	['X', 'D', 'D', 'O']
];

console.log(treasureIsland(input));

/**
 You work on a team whose job is to understand the most sought after toys for the holiday season. A teammate of yours has built a webcrawler that extracts a list of quotes about toys from different articles. You need to take these quotes and identify which toys are mentioned most frequently. Write an algorithm that identifies the top N toys out of a list of quotes and list of toys.

Your algorithm should output the top N toys mentioned most frequently in the quotes.

Input:
The input to the function/method consists of five arguments:

numToys, an integer representing the number of toys
topToys, an integer representing the number of top toys your algorithm needs to return;
toys, a list of strings representing the toys,
numQuotes, an integer representing the number of quotes about toys;
quotes, a list of strings that consists of space-sperated words representing articles about toys

Output:
Return a list of strings of the most popular N toys in order of most to least frequently mentioned

Note:
The comparison of strings is case-insensitive. If the value of topToys is more than the number of toys, return the names of only the toys mentioned in the quotes. If toys are mentioned an equal number of times in quotes, sort alphabetically.
 */

function findToy(quotes, toys, topToys, numToys) {
	//combine quotes and split the words
	let words = quotes.join(' ').split(' ');
	let hash = {};

	for (let i = 0; i < words.length; i++) {
		for (let j = 0; j < toys.length; j++) {
			//replace all punctuation marks and make all words lowercase
			let newWords = words[i].replace(/[!']/g, '').toLowerCase();
			//look for the buzz words
			if (newWords.includes(toys[j])) {
				//if words exist in hash, increment, if not, initialize
				hash[newWords] = hash[newWords] + 1 || 1;
			}
		}
	}

	//sort words alphabetically if they have equal appearance
	let sorted = Object.keys(hash).sort(function(a, b) {
		if (hash[b] === hash[a]) {
			return a > b;
		}
		//otherwise, sort by number of appearance
		return hash[b] - hash[a];
	});

	//if toptoys is greater, return every word that appears
	if (topToys > numToys) {
		return sorted;
	}

	//if not return top toys
	else {
		return sorted.slice(0, topToys);
	}
}

const numToys = 6;
const topToys = 2;
const toys = ['elmo', 'elsa', 'legos', 'drone', 'tablet', 'warcraft'];
const numQuotes = 6;
const quotes = [
	"Elmo is the hottest of the season! Elmo will be on every kid's wishlist!",
	'The new Elmo dolls are super high quality',
	'Expect the Elsa dolls to be very popular this year, Elsa!',
	"Elsa and Elmo are the toys I'll be buying for my kids, Elsa is good",
	'For parents of older kids, look into buying them a drone',
	'Warcraft is slowly rising in popularity ahead of the holiday season'
];

findToy(quotes, toys, topToys, numToys); //["elmo", "elsa"]

/**
 Given a 2D grid, each cell is either a zombie 1 or a human 0. Zombies can turn adjacent (up/down/left/right) human beings into zombies every hour. Find out how many hours does it take to infect all humans?
 */
//BFS
function minHours(grid) {
	const rows = grid.length;
	const cols = grid[0].length;
	const dirs = [
		[1, 0],
		[0, 1],
		[0, -1],
		[-1, 0]
	];
	const queue = [];

	let hours = 0;
	let population = rows * cols;

	// Find all walkers....
	grid.forEach((row, r) => {
		row.forEach((person, c) => {
			if (person === 1) {
				// Add zombie to the queue, so she can infect her next victim
				// when its her turn....
				queue.push([r, c]);
			}
		});
	});

	// If everyone has infected, game-over...
	if (queue.length === population) {
		// hours = 0....
		return hours;
	}

	// Find how many humans left...
	population -= queue.length;

	// We have zombies waiting patiently in the queue...
	while (queue.length) {
		// Sorry, kitchen closed...
		if (!population) {
			break;
		}

		// At this point we are t + 1...
		++hours;

		// lop through all zombies in the queue at t + 1
		for (let i = queue.length; i > 0; --i) {
			const zombie = queue.shift();

			// Loop through all possible directions
			dirs.forEach(dir => {
				const target = [zombie[0] + dir[0], zombie[1] + dir[1]];

				// If target exists in row and she's a human
				// turn her...
				if (
					target[0] >= 0 &&
					target[0] < rows &&
					target[1] >= 0 &&
					target[1] < cols &&
					grid[target[0]][target[1]] === 0
				) {
					// Target will try to infect humans at
					// t + 2
					queue.push(target);
					// Mark her as non human
					++grid[target[0]][target[1]];
					// Human population decreased...
					--population;
				}
			});
		}
	}

	// Congrats, it's zombieland now...
	return hours;
}

const grid1 = [
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[0, 1, 0, 1, 1],
	[1, 1, 1, 0, 1]
];

const grid2 = [
	[0, 1, 1, 0, 1],
	[0, 1, 0, 1, 0],
	[0, 0, 0, 0, 1],
	[0, 1, 0, 0, 0]
];

// console.log(`grid1 = ${minHours(grid1)}`); //1
console.log(`grid1 = ${minHours(grid2)}`); //2

/**
 Return all critical connections in the network in any order. (Bridges)
 Return a list of integers representing the critical nodes. Problem: Critical Routers.
 */

var criticalConnections = function(n, connections) {
	let edges = {};
	connections.forEach(([src, dest]) => {
		if (edges[src]) edges[src].push(dest);
		else edges[src] = [dest];

		if (edges[dest]) edges[dest].push(src);
		else edges[dest] = [src];
	});

	let critical = [],
		visited = [],
		dist = [],
		low = [];

	// traverse(0, null, 1, 1);//case no.1 from 0 to n -1
	traverse(1, null, 1, 1); //case no.2 from 1 to n
	return critical;

	function traverse(vert, parent, d, l) {
		visited[vert] = true;
		dist[vert] = d;
		low[vert] = l;

		let neighbours = edges[vert];
		for (let i = 0; i < neighbours.length; i++) {
			let neighbour = neighbours[i];

			if (!visited[neighbour]) {
				traverse(neighbour, vert, d + 1, l + 1);
			}
			if (neighbour !== parent) {
				low[vert] = Math.min(low[vert], low[neighbour]);
				if (low[neighbour] > dist[vert]) {
					// critical.push([vert, neighbour]); //case no.1 & case no.2 bridges
					critical.push(vert); //case no.3 critical nodes
				}
			}
		}
	}
};

//case no.1
// const n = 4;
// const connections = [[0,1],[1,2],[2,0],[1,3]];
//[ [ 1, 3 ] ]

//case no.2
// const n = 5;
// const connections = [[1, 2], [1, 3], [3, 4], [1, 4], [4, 5]];
//[ [ 1, 2 ], [ 4, 5 ] ]

//case no.3
const n = 7; //numNodes
const numEdges = 7;
const connections = [
	[0, 1],
	[0, 2],
	[1, 3],
	[2, 3],
	[2, 5],
	[5, 6],
	[3, 4]
];
//[2, 3, 5]

criticalConnections(n, connections);

/**
 Given an array of strings products and a string searchWord. We want to design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with the searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.
Return list of lists of the suggested products after each character of searchWord is typed. 
 */
/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function(products, searchWord) {
	let result = [];
	let sArr = searchWord.split('');
	let max = 3;
	let s = '';

	for (let c of sArr) {
		s = s === '' ? c : s + c;
		let list = [];
		for (let p of products) {
			if (p.startsWith(s)) {
				list.push(p);
			}
		}
		if (list.length >= max) {
			result.push(list.sort().slice(0, max));
		} else {
			result.push(list.sort());
		}
	}

	return result;
};

const products = ['bags', 'baggage', 'banner', 'box', 'cloths'];
const searchWord = 'bags';
suggestedProducts(products, searchWord);

//Important Note!**
//With Strings if they asked order lexicographically, that means [...].sort();

/** 
 Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
*/
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
	const ROW = grid.length;
	const COL = grid[0].length;
	const directions = [
		[1, 0],
		[0, 1],
		[0, -1],
		[-1, 0]
	];

	let queueWater = [];
	let queueIsland = [];
	let queue = [];
	let num = 0; //how many islands
	let total = ROW * COL;

	//find all islands positions
	grid.forEach((row, r) => {
		row.forEach((isl, c) => {
			if (isl == 1) {
				queue.push([r, c]);
			}
		});
	});

	//is the Ocean?
	if (queue.length === 0) return num;

	//No Water, Big Land
	if (total === queue.length) return num; //which is zero;

	//update total
	total -= queue.length;

	while (queue.length) {
		//ends if all posible island locations was checked
		if (total < 0) {
			breaks;
		}

		for (let i = 0; queue.length; i++) {
			let island = queue.shift();
			let hasWater = 0;
			let edges = 0;

			//loop through all directions
			for (let d of directions) {
				let loc = [island[0] + d[0], island[1] + d[1]];

				if (loc[0] >= 0 && loc[0] < ROW && loc[1] >= 0 && loc[1] < COL) {
					if (grid[loc[0]][loc[1]] == 0) {
						hasWater++;
					} else {
						edges++;
					}
				}
			}
			if (edges <= 1 && hasWater > 0) {
				num++;
			}
			total--;
		}
	}

	return num;
};

const grid = [
	[1, 1, 1, 1, 0],
	[1, 1, 0, 1, 0],
	[1, 1, 0, 0, 0],
	[0, 0, 0, 0, 0]
]; // 1;
// const grid = [
//   [1,1,0,0,0],
//   [1,1,0,0,0],
//   [0,0,1,0,0],
//   [0,0,0,1,1]
// ]; //3

// const grid = [
//     ["1","1","1","1","0"],
//     ["1","1","0","1","0"],
//     ["1","1","0","0","0"],
//     ["0","0","0","0","0"]
//   ];//1

numIslands(grid);

/**
 Treasure Island II (BFS)
 You have a map that marks the locations of treasure islands. Some of the map area has jagged rocks and dangerous reefs. Other areas are safe to sail in. There are other explorers trying to find the treasure. So you must figure out a shortest route to one of the treasure islands.

Assume the map area is a two dimensional grid, represented by a matrix of characters. You must start from one of the starting point (marked as S) of the map and can move one block up, down, left or right at a time. The treasure island is marked as X. Any block with dangerous rocks or reefs will be marked as D. You must not enter dangerous blocks. You cannot leave the map area. Other areas O are safe to sail in. Output the minimum number of steps to get to any of the treasure islands.
 */
function tresureIsland2(grid) {
	if (grid == null || grid.length === 0) return false;

	let queueStart = []; //all start points
	const ROW = grid.length;
	const directions = [
		[-1, 0],
		[1, 0],
		[0, 1],
		[0, -1]
	];

	let min = 0;

	//fill queue with all starts
	grid.forEach((row, r) => {
		row.forEach((col, c) => {
			if (grid[r][c] === 'S') {
				queueStart.push([r, c]);
			}
		});
	});

	while (queueStart.length) {
		min++;
		let len = queueStart.length;
		for (let i = 0; i < len; i++) {
			let [sr, sc] = queueStart.shift();
			for (let [dr, dc] of directions) {
				let r = sr + dr;
				let c = sc + dc;
				if (r >= 0 && r < ROW && c >= 0 && c < grid[r].length) {
					if (grid[r][c] === 'X') {
						return min;
					}
					if (grid[r][c] === 'O') {
						grid[r][c] = 'D';
						queueStart.push([r, c]);
					}
				}
			}
		}
	}
	return -1;
}

const grid = [
	['S', 'O', 'O', 'S', 'S'],
	['D', 'O', 'D', 'O', 'D'],
	['O', 'O', 'O', 'O', 'X'],
	['X', 'D', 'D', 'O', 'O'],
	['X', 'D', 'D', 'D', 'O']
];
// 3
tresureIsland2(grid);

/** 
 A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.
Return a deep copy of the list.

The Linked List is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

val: an integer representing Node.val
random_index: the index of the node (range from 0 to n-1) where random pointer points to, or null if it does not point to any node.
*/

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
	let map = new Map();
	let runner = head;
	let result = new Node(-1);
	let resultHead = result;
	while (runner != null) {
		result.next = new Node(runner.val);
		result = result.next;
		map.set(runner, result);
		runner = runner.next;
	}
	runner = head;
	result = resultHead.next;
	while (runner != null) {
		if (runner.random != null) {
			result.random = map.get(runner.random);
		}
		runner = runner.next;
		result = result.next;
	}
	return resultHead.next;
};

/** 
 Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

Example:

Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
	const head = new ListNode(0);
	let curr = head;
	while (l1 !== null && l2 !== null) {
		if (l1.val < l2.val) {
			curr.next = l1;
			l1 = l1.next;
			curr = curr.next;
		} else {
			curr.next = l2;
			l2 = l2.next;
			curr = curr.next;
		}
	}
	curr.next = l1 || l2;
	return head.next;
};

/**
 * Prblem no.1 OA
 */
function topNCompetitors(
	numCompetitors,
	topNCompetitors,
	competitors,
	numReviews,
	reviews
) {
	// WRITE YOUR CODE HERE
	let hash = {};

	for (let i = 0; i < reviews.length; i++) {
		for (let j = 0; j < competitors.length; j++) {
			//replace any non-word character and makeit lowerCase
			let newWords = reviews[i].replace(/['!]/g, '').toLowerCase();
			//find the  matches
			if (newWords.includes(competitors[j])) {
				hash[competitors[j]] = hash[competitors[j]] + 1 || 1;
			}
		}
	}

	let sortedWords = Object.keys(hash).sort((a, b) => {
		if (hash[b] === hash[a]) {
			return a > b;
		}
		return hash[b] - hash[a];
	});

	if (topNCompetitors > numCompetitors) {
		return sortedWords;
	} else {
		return sortedWords.slice(0, topNCompetitors);
	}
}

const numComp = 5;
const topNCompe = 2;
const compet = [
	'anacell',
	'betacellular',
	'cetracular',
	'deltacellular',
	'eurocell'
];
const numRev = 5;
const revi = [
	'blajdiow ojdojwoj anacell and jdpojwwpojd anacell',
	'betacellular ihdaooih iasd',
	'deltacellular poajsffpoj betacellular',
	'cetracular ojf[oj[oas eurocell',
	'betacellular ojasfo akff deltacellular'
];

topNCompetitors(numComp, topNCompe, compet, numRev, revi);

/*
Practicle example of the used

//Find the k distinct largest elements in the array
//k = 3
const coordinates = [4, 1, 5, 2, 3, 0, 10,28,77,7,10];

output: [10, 28, 77]

*/

function largestNum(arr, k) {
	if (!arr && !arr.length && !k) return false;

	let shunk = arr.slice(0, k); //first shunk
	let heap = [];
	shunk.forEach(n => insertHeap(heap, n));

	for (let i = k; i < arr.length; i++) {
		if (arr[i] >= heap[0]) {
			updateHeap(heap, arr[i]);
		}
	}

	return heap;
}

function insertHeap(a, val) {
	if (!a.includes(val)) {
		a.push(val);
		bubbleUp(a);
	}
}

function bubbleUp(a) {
	let i = a.length - 1;

	while (i > 0) {
		let element = a[i];
		let parentIndex = Math.floor((i - 1) / 2);
		let parent = a[parentIndex];

		if (parent < element) {
			break; //it's done
		} else {
			//swap parent with element;
			a[i] = a.splice(parentIndex, 1, element)[0];
		}
	}

	bubbleDown(a);
}

function bubbleDown(a) {
	let parentIndex = 0; //starting on the root;

	for (let i = 0; i < a.length; i++) {
		let parent = a[parentIndex];
		let leftIndex = parentIndex * 2 + 1;
		let leftChild = a[leftIndex];
		let rightIndex = parentIndex * 2 + 2;
		let rightChild = a[rightIndex];
		let max =
			leftChild > rightChild
				? { val: leftChild, index: leftIndex }
				: { val: rightChild, index: rightIndex };
		if (parent > max.val) {
			//swap
			a[parentIndex] = a.splice(max.index, 1, parent)[0];
			parentIndex = max.index;
		} else {
			break;
		}
	}
}

function updateHeap(a, val) {
	a.shift(); //removing current root;
	insertHeap(a, val);
}

const cordinates = [4, 1, 5, 2, 3, 0, 10, 28, 77, 7, 10];
const amount = 3;
