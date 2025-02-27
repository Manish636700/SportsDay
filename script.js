
const scores = { Red: 0, Blue: 0, Green: 0, Yellow: 0 };

function OpeningCeremony(callback) {
    console.log("Opening Ceremony Begins!");
    let count = 3;
    const interval = setInterval(() => {
        console.log(`Starting in ${count}...`);
        count--;
        if (count === 0) {
            clearInterval(interval);
            console.log("Let the games begin! Current Scores:", scores);
            setTimeout(() => callback(Race100M, scores), 1000);
        }
    }, 1000);
}

function Race100M(callback, scores) {
    console.log("\nStarting 100M Race...");
    setTimeout(() => {
        let times = {};
        for (let color in scores) {
            times[color] = (Math.random() * 5 + 10).toFixed(2); 
        }
        let sorted = Object.entries(times).sort((a, b) => a[1] - b[1]);
        scores[sorted[0][0]] += 50; 
        scores[sorted[1][0]] += 25; 
        console.log("Race finished! Updated Scores:", scores);
        setTimeout(() => callback(LongJump, scores), 3000);
    }, 3000);
}

function LongJump(callback, scores) {
    console.log("\nStarting Long Jump...");
    setTimeout(() => {
        let colors = Object.keys(scores);
        let winner = colors[Math.floor(Math.random() * colors.length)];
        scores[winner] += 30;
        console.log(`${winner} won the Long Jump! Updated Scores:`, scores);
        setTimeout(() => callback(HighJump, scores), 2000);
    }, 2000);
}

function HighJump(callback, scores) {
    console.log("\nStarting High Jump...");
    let userInput = prompt("Which color achieved the highest jump? (Red, Blue, Green, Yellow)");
    setTimeout(() => {
        if (userInput && scores.hasOwnProperty(userInput)) {
            scores[userInput] += 20;
        } else {
            console.log("Invalid input. No points awarded.");
        }
        console.log("High Jump completed! Updated Scores:", scores);
        setTimeout(() => callback(AwardCeremony, scores), 1500);
    }, 1500);
}

function AwardCeremony(scores) {
    console.log("\nAward Ceremony Begins!");
    let sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    console.log("Final Standings:");
    sortedScores.forEach(([color, score], index) => {
        console.log(`${index + 1}. ${color} - ${score} points`);
    });
}


OpeningCeremony(Race100M);
