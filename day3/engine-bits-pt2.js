require('dotenv').config();

let testString = `
467..114..
...*......
..35..633.
......#...
617*...*..
.....+.58.
..592.....
......755.
...$.*....
.664.598..
..........
......2*2.`

/**
 * 
 * @param {String} string 
 * @param {String} prevString 
 * @param {String} nextString 
 */
const getLineGearRatioSum = (line, prevline, nextline) => {
    let lines = [prevline, line, nextline];
    // get an array of array or array ranges before, on and after the * of numbers
    let numberIndexRanges = getNumberRanges(lines);
    return [...line.matchAll(/\*/g)].reduce((sum, potentialGear) => {
        let validRanges = [];
        numberIndexRanges.forEach(indexRanges => {
            validRanges.push(validAdjacentNumberRange(potentialGear.index, indexRanges));
        });
        if (validRanges.reduce((count, range) => 
            range ? count + range.reduce((cnt, rng) => rng ? ++cnt : cnt, 0) : 
            count
        , 0) == 2) {
            return sum + validRanges.reduce((ratio, range, index) => 
                range ? ratio *= range.reduce((rat, rng) => rat ? rat *= lines[index].substring(rng[0] + 1, rng[1]) : ratio, 1) :
                ratio,
             1);
        } else {
            return sum;
        }
    }, 0);
}

const getNumberRanges = (lines) => {
    let ranges = [];
    let numberRegex = /\d+/dg
    lines.forEach(line => {
        let lineRanges = [];
        ranges.push(lineRanges)
        if (!line) { return; }
        [...line.matchAll(numberRegex)].forEach(match => {
            // get indices for each number and get the index before the start and one after the end
            lineRanges.push([match.indices[0][0] - 1, match.indices[0][1]]);
        })
    });
    return ranges;
}

/**
 * 
 * @param {Number} index 
 * @param {Array} numRanges 
 */
const validAdjacentNumberRange = (index, numRanges) => {
    let validRanges = [];
    numRanges.forEach(range => {
        if (index >= range[0] && index <= range[1]) {
            validRanges.push(range);
        }
    });
    return validRanges.length >= 1 ? validRanges : null;
}

const getGearRatioSum = (string) => {
    let engineArray = string.split(`\n`);
    let gearRatioSum = engineArray.reduce((sum, line, index) => sum + getLineGearRatioSum(line, engineArray[index - 1], engineArray[index + 1]), 0);
    console.log(`Gear Ratio Sum: ${gearRatioSum}`);
}

// TEST CODE
// getGearRatioSum(testString);

fetch('https://adventofcode.com/2023/day/3/input', {
    method: 'GET',
    headers: {
      'Host': 'adventofcode.com',
      'Cookie': process.env.SESSION,
    }
})
.then((response) => { 
    response.text()
    .then((text) => {
        getGearRatioSum(text);
    })
})