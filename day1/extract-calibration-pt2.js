require('dotenv').config();
const speltNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const digitPattern = `[0-9]|${speltNumbers.join('|')}`;
const twoNumbersRegex = new RegExp(`(${digitPattern})[^\n]*(${digitPattern})\|(${digitPattern})`, 'g');
const convertedDigit = (s) => {
    if (s.length == 1) { return s}
    switch(s) {
        case 'one': return 1;
        case 'two': return 2;
        case 'three': return 3;
        case 'four': return 4;
        case 'five': return 5;
        case 'six': return 6;
        case 'seven': return 7;
        case 'eight': return 8;
        case 'nine': return 9;
    }
}
fetch('https://adventofcode.com/2023/day/1/input', {
    method: 'GET',
    headers: {
      'Host': 'adventofcode.com',
      'Cookie': process.env.SESSION,
    }
})
.then((response) => { 
    response.text()
    .then((text) => {
        let twoNumbersMatches = [...text.matchAll(twoNumbersRegex)];
        let sum = 0;
        twoNumbersMatches.forEach(match => {
            if (match[1] || match[2]) {
                sum +=  Number(`${convertedDigit(match[1])}${convertedDigit(match[2])}`)
            } else {
                sum += Number(`${convertedDigit(match[0])}${convertedDigit(match[0])}`);
            }
        })
        console.log(`Calibration Code: ${sum}`);
    })
})
