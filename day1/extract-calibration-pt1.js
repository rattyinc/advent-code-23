const twoNumbersRegex = /([0-9])[^\n]*([0-9])|[0-9]/g
fetch('https://adventofcode.com/2023/day/1/input', {
    method: 'GET',
    headers: {
      'Host': 'adventofcode.com',
      'Cookie': 'your-session-cookie',
    }
})
.then((response) => { 
    response.text()
    .then((text) => {
        let twoNumbersMatches = [...text.matchAll(twoNumbersRegex)];
        let sum = 0;
        twoNumbersMatches.forEach(match => {
            if (match[1] | match[2]) {
                sum += Number(`${match[1]}${match[2]}`)
            } else {
                sum += Number(`${match[0]}${match[0]}`);
            }
        })
        console.log(`Calibration Code: ${sum}`);
    })
})
