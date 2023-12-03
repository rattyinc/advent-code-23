require('dotenv').config();
let gameRegEx = /Game ([0-9]*):[^\n]*/g

let testString = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

const maxBalls = { 'red': 12, 'green': 13, 'blue': 14 }

const isPossible = (string) => {
    return !isImpossible(string, 'red') && 
    !isImpossible(string, 'green') && 
    !isImpossible(string, 'blue'); 
}

const isImpossible = (string, colour) => {
    let regEx = new RegExp(`([0-9]*)\\s${colour}`, 'g');
    let matches = [...string.matchAll(regEx)]
    for (let i = 0; i < matches.length; i++) {
        if (matches[i][1] > maxBalls[colour]) {
            return true;
        }
    }
    return false;
}
// TESTING
// let sum = 0;
// [...testString.matchAll(gameRegEx)].forEach(game => {
//     // the matched string is at 0
//     if (isPossible(game[0])) {
//         sum += Number(game[1]);
//     }
// })
// console.log(`Sum of Games: ${sum}`);

fetch('https://adventofcode.com/2023/day/2/input', {
    method: 'GET',
    headers: {
      'Host': 'adventofcode.com',
      'Cookie': process.env.SESSION,
    }
})
.then((response) => { 
    response.text()
    .then((text) => {
        let sum = 0;
        [...text.matchAll(gameRegEx)].forEach(game => {
            if (isPossible(game[0])) {
                sum += Number(game[1]);
            }
        });
        console.log(`Sum of Games: ${sum}`);
    })
})