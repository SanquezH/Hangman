/*
Sanquez Heard
Hangman Project
04/27/2024
*/

//Event listners to allow player 2 to enter enter letter guesses
window.addEventListener("load", utilizeCookieData);
document.getElementById("guesWordForm").addEventListener("submit", attemptGuess);

//Function to gather cookie data into an object.
function getCookieData() {
    let fields = {};
    let cookieList = document.cookie.split("; ")
    for (items of cookieList) {
        let cookie = items.split('=')
        let name = cookie[0]
        let value = decodeURIComponent(cookie[1])
        fields[name] = value

    }
    return fields
}

//Function to utilize cookie data to initialize the game.
function utilizeCookieData() {
    if (document.cookie) {
        fields = getCookieData();
        document.getElementById("firstPlayer").innerHTML = fields["player1"] + " has set the word."
        document.getElementById("word").value = fields["word"].toUpperCase()
        document.getElementById("wordProgress").innerHTML = '-'.repeat(fields["word"].length)
    }
    else //If cookies are not available, provide an error message.
        document.write("<p>Error! Cookies could not be obtained due to loss of connection to server.</p>");
}

//Function that allows player 2 to guess the word.
function attemptGuess(evt) {
    evt.preventDefault();
    let notificationMessage = document.getElementById("notification");
    notificationMessage.innerHTML = ""
    let userInput = document.forms["guesWordForm"]["letterGuess"]; //Obtain the user's input
    let guess = userInput.value.toUpperCase();
    userInput.value = ''; //and then clear the input box.
    let previousGuesses = getPreviousGuesses()
    if (previousGuesses.includes(guess) == false) {
        let word = document.getElementById("word").value;
        let wordArray = stringToArray(word);
        if (wordArray.includes(guess)) {
            let wordProgress = document.getElementById("wordProgress")
            let wordProgressCurrentValue = stringToArray(wordProgress.innerHTML)
            for (let index in wordArray) {
                if (guess == wordArray[index]) {
                    wordProgressCurrentValue[index] = wordArray[index]
                }
            }
            let currentProgress = wordProgressCurrentValue.join('')
            wordProgress.innerHTML = currentProgress;
            if (currentProgress == word) {
                submitResults()
            }
        }

        else {
            let stickManParts = ['Assets/Images/7.png', 'Assets/Images/6.png', 'Assets/Images/5.png', 'Assets/Images/4.png', 'Assets/Images/3.png', 'Assets/Images/2.png']; 
            document.getElementById("incorrectGuesses").innerHTML += guess + ' ';
            let lives = document.getElementById("lives")
            livesLeft = parseInt(lives.innerHTML) - 1;
            lives.innerHTML = livesLeft
            if (livesLeft != 0) {
                document.getElementById("stickman").src = stickManParts[livesLeft];
            }

            else {
                submitResults()
            }
        }

    }
    else
        notificationMessage.innerHTML = 'You have already guessed "' + guess + '".<br>Please choose another letter.'

}

//Function that gathers the previous guesses from the HTML page.
function getPreviousGuesses() {
    let previousGuesses = [];
    let wordLength = document.getElementById("word").value.length;
    let wrongGuesses = document.getElementById("incorrectGuesses").innerHTML.split(' ');
    let wordProgress = document.getElementById("wordProgress").innerHTML;

    if (wordProgress != '-'.repeat(wordLength)) {
        for (let correctGuessLetter of wordProgress) {
            if (correctGuessLetter != '-')
                previousGuesses.push(correctGuessLetter)
        }
    }

    if (wrongGuesses != '') {
        for (let incorrectGuessLetter of wrongGuesses)
            previousGuesses.push(incorrectGuessLetter)
    }

    return previousGuesses;
}

//Function to convert string values into an array.
function stringToArray(string) {
    let array = []
    for (let letters of string)
        array.push(letters)

    return array;
}

//Function to submit the results of the game through a query string.
//In addition, prevents the user from altering the game by disabling all input fields and the submit guess button.
function submitResults() {
    document.getElementById("name").disabled = true;
    document.getElementById("letterGuess").disabled = true;
    document.getElementById("submitButton").disabled = true;

    document.getElementById("score").value = document.getElementById("lives").innerHTML
    document.getElementById("player1").value = getCookieData()["player1"]
    document.getElementById("player2").value = document.forms["guesWordForm"]["name"].value;
    document.forms["guesWordForm"].submit()
}