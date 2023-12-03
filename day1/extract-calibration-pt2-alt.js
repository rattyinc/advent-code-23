require('dotenv').config();
// a no regex solution
Array.prototype.first = function() {
    return this[0]
}

Array.prototype.last = function() {
    return this[this.length - 1]
}

const speltNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

let testString = `tre7uchet
8fjhfh2wer4
one156two
8vfvbrnclnmthree8onetwoeightthree`

const extractDoubleDigits = (string) => {
    let indices = [];
    [...string].forEach((char, index) => {
        if (isDigit(char)) {
            indices.push(index)
        }
    })
    speltNumbers.forEach(num => {
        let index = string.indexOf(num);
        while (index >= 0) {
            let numObj = {};
            numObj[index] = num.length;
            indices.push(numObj)
            index = string.indexOf(num, index + 1);
        }
    });
    indices.sort((a, b) => {
        let indA = typeof a == 'object' ? Object.keys(a).first() : a;
        let indB = typeof b == 'object' ? Object.keys(b).first() : b;
        return indA - indB;
    })

    if (indices.length == 1) {
        return Number(`${convertedDigit(getDigit(string, indices.first()))}${convertedDigit(getDigit(string, indices.first()))}`)
    } else if (indices.length > 1) {
        return Number(`${convertedDigit(getDigit(string, indices.first()))}${convertedDigit(getDigit(string, indices.last()))}`)
    } else {
        return 0;
    }
}

const getDigit = (string, object) => {
    if (typeof object == 'number') {
        return string[object];
    } else {
        let index = Object.keys(object).first();
        return string.substr(Number(index), object[`${index}`]);
    }
}

const isDigit = (string) => {
    switch(string) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            return true; 
        default:
            return false;
    }
}

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
        let sum = 0;
        text.split('\n').forEach(line => {
            sum += extractDoubleDigits(line);
        })
        console.log(`Calibration Code: ${sum}`);
    })
})
