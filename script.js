/*
Sanquez Heard
Hangman Project
04/27/2024
*/

//Event listners to allow player 1 to enter the word in secret
document.getElementById("hideWord").addEventListener("click", hideOrRevealWord);
document.getElementById("setWordForm").addEventListener("submit", redirectUser)

//Function to store the word and the first player's name.
function redirectUser(evt) {
    evt.preventDefault();
    wordSet = document.getElementById("word").value
    firstPlayerName = document.getElementById("name").value;
    //Encoding is not necessary since the word and name shall not contain speacial characters or spaces.
    word_cookie_data = "word=" + wordSet + ";path=/;domain=localhost";
    player1_cookie_data = "player1=" + firstPlayerName + ";path=/;domain=localhost"
    document.cookie = word_cookie_data
    document.cookie = player1_cookie_data
    location.href = "http://localhost:8080/play/index.html"
}

//Function that allows the user to hide or reveal the word to guess with a push of a button.
function hideOrRevealWord() {
    let wordInputBox = document.getElementById("word");
    if (wordInputBox.type == "password")
        wordInputBox.type = "text";
    else
        wordInputBox.type = "password";
};