// 3 Lives Math Challenge

var score = 0;
var lives = 3;
var correctAnswer = 0;
var gameOver = false;

// Generate a random math question
function generateQuestion() {
    var num1 = Math.floor(Math.random() * 10) + 1; // 1–10
    var num2 = Math.floor(Math.random() * 10) + 1; // 1–10
    var opNumber = Math.floor(Math.random() * 3);  // 0, 1, or 2
    var operator;
    var questionText;

    if (opNumber === 0) {
        operator = "+";
        correctAnswer = num1 + num2;
    } else if (opNumber === 1) {
        operator = "-";
        correctAnswer = num1 - num2;
    } else {
        operator = "×"; // for display
        correctAnswer = num1 * num2;
    }

    questionText = num1 + " " + operator + " " + num2 + " = ?";
    document.getElementById("question-text").textContent = questionText;
}

// Handle Start Game
function startGame() {
    score = 0;
    lives = 3;
    gameOver = false;

    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
    document.getElementById("feedback").textContent = "";

    document.getElementById("answer-input").disabled = false;
    document.getElementById("check-button").disabled = false;
    document.getElementById("answer-input").value = "";
    document.getElementById("answer-input").focus();

    generateQuestion();
}

// Check player's answer
function checkAnswer() {
    if (gameOver) {
        return;
    }

    var inputElement = document.getElementById("answer-input");
    var answerText = inputElement.value;

    if (answerText === "") {
        document.getElementById("feedback").style.color = "orange";
        document.getElementById("feedback").textContent = "Please enter an answer first.";
        return;
    }

    var userAnswer = Number(answerText);

    if (userAnswer === correctAnswer) {
        score = score + 1;
        document.getElementById("score").textContent = score;
        document.getElementById("feedback").style.color = "green";
        document.getElementById("feedback").textContent = "Correct! Well done.";

        // Win condition
        if (score >= 10) {
            document.getElementById("feedback").style.color = "blue";
            document.getElementById("feedback").textContent =
                "You reached 10 points! You win! 🎉";
            endGame();
            return;
        }

    } else {
        lives = lives - 1;
        document.getElementById("lives").textContent = lives;
        document.getElementById("feedback").style.color = "red";
        document.getElementById("feedback").textContent =
            "Wrong! The correct answer was " + correctAnswer + ".";

        // Lose condition
        if (lives <= 0) {
            document.getElementById("feedback").style.color = "red";
            document.getElementById("feedback").textContent =
                "No lives left. Game over! Final score: " + score + ".";
            endGame();
            return;
        }
    }

    // Prepare for next question
    inputElement.value = "";
    inputElement.focus();
    generateQuestion();
}

// End game: disable input + button
function endGame() {
    gameOver = true;
    document.getElementById("answer-input").disabled = true;
    document.getElementById("check-button").disabled = true;
}
