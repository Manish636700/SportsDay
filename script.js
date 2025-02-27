
let scores = {
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0
};


function OpeningCeremony(callback) {
    console.log("Welcome to the Sports Event!");
    let count = 3;
    let interval = setInterval(() => {
        console.log(`Starting in ${count}...`);
        count--;
        if (count === 0) {
            clearInterval(interval);
            console.log("Let the games begin!");
            setTimeout(() => callback(Race100M, scores), 1000);
        }
    }, 1000);
}


function Race100M(callback, scores) {
    console.log("Starting the 100m Race...");
    setTimeout(() => {
        let raceResults = Object.keys(scores).map(color => ({ color, time: (Math.random() * 3 + 10).toFixed(2) }));
        raceResults.sort((a, b) => a.time - b.time);

        console.log("Race Results:", raceResults);
        console.log("Previous Scores:", { ...scores });

        scores[raceResults[0].color] += 50;
        scores[raceResults[1].color] += 25;
        
        console.log("Updated Scores:", scores);
        
        setTimeout(() => callback(LongJump, scores), 2000);
    }, 3000);
}


function LongJump(callback, scores) {
    console.log("Starting Long Jump...");
    setTimeout(() => {
        let colors = Object.keys(scores);
        let selectedColor = colors[Math.floor(Math.random() * colors.length)];
        
        console.log("Previous Scores:", { ...scores });
        scores[selectedColor] += 150;
        
        console.log(`${selectedColor} team performed best in Long Jump!`);
        console.log("Updated Scores:", scores);
        
        setTimeout(() => callback(HighJump, scores), 2000);
    }, 2000);
}


function HighJump(callback, scores) {
    console.log("Starting High Jump...");
    setTimeout(() => {
        console.log("Previous Scores:", { ...scores });
        let userInput = prompt("Enter the color that performed best in High Jump (red, blue, green, yellow):");
        if (userInput && scores.hasOwnProperty(userInput)) {
            scores[userInput] += 100;
        } else {
            console.log("Invalid input or no points awarded.");
        }
        
        console.log("Updated Scores:", scores);
        
        setTimeout(() => callback(AwardCeremony, scores), 1000);
    }, 1000);
}


function AwardCeremony(scores) {
    console.log("Final Scores:", scores);
    let sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    console.log(`1st Place: ${sortedScores[0][0]} team with ${sortedScores[0][1]} points!`);
    console.log(`2nd Place: ${sortedScores[1][0]} team with ${sortedScores[1][1]} points!`);
    console.log(`3rd Place: ${sortedScores[2][0]} team with ${sortedScores[2][1]} points!`);
}


OpeningCeremony(Race100M);
