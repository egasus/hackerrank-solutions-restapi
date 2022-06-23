'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


/*
 * Complete the 'getNumDraws' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER year as parameter.
 */

const https = require('https');
const axios =  require('axios');

async function getNumDraws(year) {
    let goals=[];
    let ans=0;
    for(let goal=0;goal<=10;goal++)
    {
        try {
            const {res} = await axios.get(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1goals=`+goal+`&team2goals=`+goal);
            // console.log(data);
            if(res.data.length ==0){
                continue;
            }
            
            goals.push(res.total);
        } catch (error){
            console.log(error);
        }
    }
    await Promise.all(goals).then((array)=>{
        array.forEach( item =>{
            ans+=item;
        })
    })
    return ans;
}
// getDrawnMatches
//     (2011).then((answer) => console.log(answer));
async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const year = parseInt(readLine().trim(), 10);

    const result = await getNumDraws(year);

    ws.write(result + '\n');

    ws.end();
}
