require('dotenv').config();

let testString = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

const findEngineNumbers = (string, prevString, nextString) => {
    let sum = 0;
    let engineNum = '';
    let enginNumFlag = false;
    let symbolIndices = findSymbols(string, prevString, nextString);
    let consoleOut = "";
    [...string].forEach((str, i) => {
        if (str.match(/\d/)) {
            if (!engineNum && isAdjacentToSymbol(i, symbolIndices)) {
                enginNumFlag = true;
            }
            engineNum += str;
            // string is at the end of the line
            if (i + 1 > string.length - 1 && (enginNumFlag || isAdjacentToSymbol(i, symbolIndices))) {
                sum += Number(engineNum);
            }
        } else {
            if (engineNum) {
                if (isAdjacentToSymbol(i - 1, symbolIndices) || enginNumFlag) {
                    // consoleOut += engineNum + ',';
                    sum += Number(engineNum);
                }
            }
            engineNum = '';
            enginNumFlag = false;
        }
    });
    // console.log(consoleOut);
    // console.log(sum);
    return sum;
};

const isAdjacentToSymbol = (i, arr) => {
    let isAdjacent = false;
    arr.forEach(el => {
        if (i == el - 1 || i == el || i == el + 1) {
            isAdjacent =  true;
        }
    })
    return isAdjacent;
}

const findSymbols = (...lines) => {
    let symbolIndicies = [];
    lines.forEach(string => {
        // can be out of bounds so check for truth-type value
        if (string) {
            [...string].forEach((str, i) => {
                if (str.match(/[^\d.\n]/)) {
                    symbolIndicies.push(i);
                }
            })
        }
    })
    return symbolIndicies;
}

const getEngineSum = (string) => {
    let sum = 0;
    let engineArray = string.split(`\n`);
    engineArray.forEach((line, i) => {
        // console.log(line)
        sum += findEngineNumbers(line, engineArray[i - 1], engineArray[i + 1]);
    })
    console.log(`Engine Sum: ${sum}`);
}

// TEST CODE
// getEngineSum(testString);

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
        getEngineSum(text);
    })
})