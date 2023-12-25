/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let sortedNum = numbers.sort((a,b)=>a-b)

    console.log('largest element is ' + sortedNum.at(sortedNum.length - 1)) 
}

findLargestElement([])

module.exports = findLargestElement;