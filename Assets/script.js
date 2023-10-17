var homepage = document.getElementById("homepage")
var quizpage = document.getElementById("quiz")
var startButton = document.getElementById("start")
var questions = [
    {
        question: "What is JavaScript primarily used for in web development?",
        choices: ["Styling web pages", "Creating web layouts", "Adding interactivity to web pages", "Managing databases"],
        answer: ["Adding interactivity to web pages"]
    },
    {
        question: "?",
        choices: [2, 3, 4, 5],
        answer: 4
    }
];

var currentQuestion = 0;
var timerCount = 5;
var isWin = false;
var loseGame

startButton.addEventListener("click", startGame);


function startGame() {
    startTimer();
    //displayQuestion();
    hideInstructions();


}
function hideInstructions() {
    homepage.classList.add("invisible");
    quizpage.classList.remove("invisible");

}

function startTimer() {
    var timerElement = document.createElement("div");
    timerElement.textContent = JSON.stringify(timerCount) + " seconds remaining";
    document.body.appendChild(timerElement);

    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (isWin && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                winGame();
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

/* function displayQuestion() {
    var questionHeader = document.getElementById('question');
    questionHeader.innerText = questions[currentQuestion].question;

    var choicesSection = document.getElementById('choices');
    var questionChoices = questions[currentQuestion].choices;
    for(var i = 0; i < questionChoices.length; i++) {
        var choiceButton = document.createElement('button');
        choiceButton.innerText = questionChoices[i];
        choicesSection.appendChild(document.body.createElement(choiceButton));
        choiceButton.addEventListener("click", checkAnswer)
        
        // add event listener to choices buttons

    }

} */

function checkAnswer(event) {
    var correctAnswer = questions[currentQuestion].answer;
    var userAnswer = event.target.innerText;

    console.log(userAnswer);

    if (userAnswer == correctAnswer) {
        console.log("Correct!")
    } else {
        console.log("incorrect!");
    }
}