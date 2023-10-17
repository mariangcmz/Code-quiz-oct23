var homepage = document.getElementById("homepage")
var quizpage = document.getElementById("quiz")
var endpage = document.getElementById("end")
var startButton = document.getElementById("start")
var scoreDisplay = document.getElementById("score-display")
var timerElement = document.getElementById("timer-count")
var score = 0;
var timer;
var questions = [
    {
        question: "What is JavaScript primarily used for in web development?",
        choices: ["Styling web pages", "Creating web layouts", "Adding interactivity to web pages", "Managing databases"],
        answer: 2
    },
    {
        question: "question 2?",
        choices: [2, 3, 4, 5],
        answer: 3
    },
    {
        question: "question 3?",
        choices: [2, 3, 4, 5],
        answer: 1
    }
];

var currentQuestion = 0;
var timerCount = 10;
var isWin = false;
var loseGame

startButton.addEventListener("click", startGame);


function startGame() {
    startTimer();
    displayQuestion();
    hideInstructions();
    scoreDisplay.textContent = "Score: " + score

}
function hideInstructions() {
    homepage.classList.add("invisible");
    quizpage.classList.remove("invisible");

}

function startTimer() {
    timerElement.textContent = timerCount + " seconds remaining";
    document.body.appendChild(timerElement);

    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount + " seconds remaining";
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (isWin && timerCount > 0) {
                winGame();
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {

            endGame();
        }
    }, 1000);
}

function displayQuestion() {
    var questionHeader = document.getElementById('question');
    questionHeader.innerText = questions[currentQuestion].question;

    var choicesSection = document.getElementById('choices');
    var questionChoices = questions[currentQuestion].choices;
    choicesSection.innerHTML = ("")
    for (var i = 0; i < questionChoices.length; i++) {
        var choiceButton = document.createElement('button');
        choiceButton.innerText = questionChoices[i];
        choiceButton.dataset.choiceIndex = i;
        choicesSection.appendChild(choiceButton);
        choiceButton.addEventListener("click", checkAnswer)
    }

}

function checkAnswer(e) {
    console.log('check answer', e.target.dataset.choiceIndex)
    var correctAnswer = questions[currentQuestion].answer;
    var userAnswer = e.target.dataset.choiceIndex;

    console.log(userAnswer);

    if (userAnswer == correctAnswer) {
        console.log("Correct!")
        score++
        scoreDisplay.textContent = "Score: " + score
    } else {
        console.log("incorrect!");
        timerCount-=5;
        timerElement.textContent = timerCount + " seconds remaining";
        if (timerCount <= 0){
            timerCount = 0;
            timerElement.textContent = "0 seconds remaining";
            endGame()
        }
    }
    if (currentQuestion >= questions.length - 1) endGame()
    else {
        currentQuestion++
        displayQuestion()
    }


}
function endGame() {
    clearInterval(timer)
    endpage.classList.remove("invisible")
    quizpage.classList.add("invisible")
}