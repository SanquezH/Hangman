/*
Sanquez Heard
Hangman Project
04/27/2024
*/

//Event listner to display the results of the game.
window.addEventListener("load", populateResults);

//Function to gather query string into an object.
function extractQueryString() {
    let object = {}
    let qString = location.search.slice(1);
    qString = qString.replace(/\+/g, " ");
    qString = decodeURIComponent(qString);

    let formData = qString.split(/&/g);

    for (let items of formData) {
        let fieldValuePair = items.split(/=/);
        let fieldName = fieldValuePair[0];
        let fieldValue = fieldValuePair[1];
        object[fieldName] = fieldValue
    }
    return object
}

//Function to display results of the game.
function populateResults() {
    let results = extractQueryString();
    let message = ""
    let firstPlayerName = results["player1"]
    let secondPlayerName = results["player2"]
    document.getElementById("player1").innerHTML = firstPlayerName
    document.getElementById("player2").innerHTML = secondPlayerName
    document.getElementById("word").innerHTML = results["word"]

    if (results["score"] != '0') {
        message = "Great job " + secondPlayerName + " for guessing the word.<br>Try setting the word this time."
    }
    else {
        message = "It seems the word " + firstPlayerName + " chose was challenging.<br>Don't give up " + secondPlayerName + ", try again."
    }

    document.getElementById("message").innerHTML = message;

    setTimeout(displayWinOrLose, 5000)
}

//Function to display win or lose image.
function displayWinOrLose() {
    let resultInfo = extractQueryString()

    if (resultInfo["score"] != '0') {
        document.write("<img id= 'winnerMessageImage' src='Assets/Images/YouWin.png' alt='You Win Image'>");
        setTimeout(displayWinningResult, 2000)
    }
    else {
        document.write("<img src='Assets/Images/YouLose.png' alt='You Win Image'>");
    }

    setTimeout(resetGame, 4000)
}

//Function to display winning results.
function displayWinningResult() {
    let scoreImage = ['Assets/Images/Rookie.png', 'Assets/Images/Novice.png', 'Assets/Images/GreatJob.png', 'Assets/Images/Superb.png', 'Assets/Images/Professional.png', 'Assets/Images/PerfectScore.png']
    let scoreImageAlt = ['Rookie', 'Novice', 'Great Job', 'Superb', 'Professional', 'Perfect Score']
    let resultInfo = extractQueryString();
    let scoreIndex = parseInt(resultInfo["score"]) - 1
    let image = document.getElementById("winnerMessageImage")
    image.src = scoreImage[scoreIndex]
    image.alt = scoreImageAlt[scoreIndex]
}

//Function to reset the game.
function resetGame() {
    location.href = "http://localhost:8080"
}