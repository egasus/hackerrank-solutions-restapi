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
 * Complete the 'getWinnerTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING competition
 *  2. INTEGER year
 */

const https = require('https');
const axios =  require('axios');

let goals = [];
for (let i = 0; i <= 10; i++)
    goals.push(i);
    

async function getWinnerTotalGoals(competition, year) {
    let ans = 0;
    let winner = "";
    // get winner
    try {
        // let url = `https://jsonmock.hackerrank.com/api/football_competitions?name=${encodeURIComponent(competition.trim()) }&year=${year}`
        // console.log(url);
        const {res} = await axios.get('https://jsonmock.hackerrank.com/api/football_competitions', {
            params: {
                'name': competition,
                'year':year
            },
            paramsSerializer: (params) => {
                // Sample implementation of query string building
                let result = '';
                Object.keys(params).forEach(key => {
                    result += `${key}=${encodeURIComponent(params[key])}&`;
                });
                return result.substring(0, result.length - 1);
            }
        });
        if (res == undefined) {
            return 0
        }
        winner = res.data[0].winner;
    } catch (error){
        console.log(error);
    }
    //
    await Promise.all(
        goals.map(async (goal) => {
            const res = await axios.get("https://jsonmock.hackerrank.com/api/football_matches?competition=" + competition + "&year=" + year + "&team1=" + "winner+&team1goals="+goal);
            ans += res.total * goal;
        })
    );
    await Promise.all(
        goals.map(async (goal) => {
            const res = await axios.get("https://jsonmock.hackerrank.com/api/football_matches?competition=" + competition + "&year=" + year + "&team2=" + "winner+&team2goals="+goal);
            ans += res.total * goal;
        })
    );
    return ans;
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const competition = readLine();

    const year = parseInt(readLine().trim(), 10);

    const result = await getWinnerTotalGoals(competition, year);

    ws.write(result + '\n');

    ws.end();
}
