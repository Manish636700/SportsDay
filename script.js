
let scores = {
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0
};


function updateUI(message) {
    let eventLog = document.getElementById("event-log");
    let logEntry = document.createElement("p");
    logEntry.textContent = message;
    eventLog.appendChild(logEntry);
}


function OpeningCeremony(callback) {
    updateUI("Welcome to the Sports Event!");
    let count = 3;
    let interval = setInterval(() => {
        updateUI(`Starting in ${count}...`);
        count--;
        if (count === 0) {
            clearInterval(interval);
            updateUI("Let the games begin!");
            setTimeout(() => callback(Race100M, scores), 1000);
        }
    }, 1000);
}


function Race100M(callback, scores) {
    updateUI("Starting the 100m Race...");
    setTimeout(() => {
        let raceResults = Object.keys(scores).map(color => ({ color, time: (Math.random() * 3 + 10).toFixed(2) }));
        raceResults.sort((a, b) => a.time - b.time);

        updateUI("Race Results: " + JSON.stringify(raceResults));
        updateUI("Previous Scores: " + JSON.stringify(scores));

        scores[raceResults[0].color] += 50;
        scores[raceResults[1].color] += 25;
        
        updateUI("Updated Scores: " + JSON.stringify(scores));
        
        setTimeout(() => callback(LongJump, scores), 2000);
    }, 3000);
}


function LongJump(callback, scores) {
    updateUI("Starting Long Jump...");
    setTimeout(() => {
        let colors = Object.keys(scores);
        let selectedColor = colors[Math.floor(Math.random() * colors.length)];
        
        updateUI("Previous Scores: " + JSON.stringify(scores));
        scores[selectedColor] += 150;
        
        updateUI(`${selectedColor} team performed best in Long Jump!`);
        updateUI("Updated Scores: " + JSON.stringify(scores));
        
        setTimeout(() => callback(HighJump, scores), 2000);
    }, 2000);
}


function HighJump(callback, scores) {
    updateUI("Starting High Jump...");
    setTimeout(() => {
        updateUI("Previous Scores: " + JSON.stringify(scores));
        let userInput = prompt("Enter the color that performed best in High Jump (red, blue, green, yellow):");
        if (userInput && scores.hasOwnProperty(userInput)) {
            scores[userInput] += 100;
        } else {
            updateUI("Invalid input or no points awarded.");
        }
        
        updateUI("Updated Scores: " + JSON.stringify(scores));
        
        setTimeout(() => callback(AwardCeremony, scores), 1000);
    }, 1000);
}


function AwardCeremony(scores) {
    updateUI("Final Scores: " + JSON.stringify(scores));
    let sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    updateUI(`1st Place: ${sortedScores[0][0]} team with ${sortedScores[0][1]} points!`);
    updateUI(`2nd Place: ${sortedScores[1][0]} team with ${sortedScores[1][1]} points!`);
    updateUI(`3rd Place: ${sortedScores[2][0]} team with ${sortedScores[2][1]} points!`);
}


document.body.innerHTML = "<h1>Sports Event</h1><div id='event-log'></div>";


OpeningCeremony(Race100M);
