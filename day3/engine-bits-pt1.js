require('dotenv').config();
let testString = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
let possibleEngineNumbers = [];
let engineArray = testString.split('\n');
console.log(engineArray);

const findEngineNumbers = (string) => {
    let engineNum = '';
    let enginNumFlag = false;
    let symbolIndices = findSymbols(string);
    [...string].forEach((str, i) => {
        if (str.match(/\d/)) {
            if (!engineNum) {
                if (isAdjacentToSymbol(i, symbolIndices)) {
                    enginNumFlag = true;
                }
            }
            engineNum += str;
        } else {
            if (engineNum) {
                if (isAdjacentToSymbol(i - 1, symbolIndices) || enginNumFlag) {
                    console.log(engineNum)
                }
            }
            engineNum = '';
            enginNumFlag = false;
        }
    });
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

const findSymbols = (string) => {
    let symbolIndicies = [];
    [...string].forEach((str, i) => {
        if (str.match(/[^\d\.]/)) {
            symbolIndicies.push(i);
        }
    })
    return symbolIndicies;
}

engineArray.forEach(line => {
    console.log('-------- line ' + line)
    findEngineNumbers(line);
})

// fetch('https://adventofcode.com/2023/day/3/input', {
//     method: 'GET',
//     headers: {
//       'Host': 'adventofcode.com',
//       'Cookie': process.env.SESSION,
//     }
// })
// .then((response) => { 
//     response.text()
//     .then((text) => {
//         let sum = 0;
//         [...text.matchAll(gameRegEx)].forEach(game => {
//             sum += powerBalls(game[0]);
//         })
//         console.log(`Sum of Games: ${sum}`);
//     })
// })