var homepage = document.getElementById("homepage")
var quizpage = document.getElementById("quiz")
var endpage = document.getElementById("end")
var highscores = document.getElementById("highscores-table")
var highscoresLink = document.getElementById("highscore")
var startButton = document.getElementById("start")
var scoreDisplay = document.getElementById("score-display")
var timerElement = document.getElementById("timer-count")
var goBackLink = document.getElementById("go-back");
var playAgain = document.getElementById("play-again")
var tableBody = document.getElementById("table-body")
var clearBtn = document.getElementById("clear")
var score = 0;
var timer;
var gameStage = "homepage"
var questions = [
    {
        question: "What is JavaScript primarily used for in web development?",
        choices: ["Styling web pages", "Creating web layouts", "Adding interactivity to web pages", "Managing databases"],
        answer: 2
    },
    {
        question: " What keyword is used to define a function in JavaScript?",
        choices: ["def", "function", "func", "define"],
        answer: 1
    },
    {
        question: "Which of the following is NOT a valid JavaScript data type?",
        choices: ["Number", "Array", "Character", "Object"],
        answer: 2
    }
];

var currentQuestion = 0;
var timerCount = 10;
var isWin = false;
var loseGame

startButton.addEventListener("click", startGame);
endpage.querySelector("form").addEventListener('submit', (e)=>{
    e.preventDefault();
    
    submitScore(e.target.querySelector('input').value)
})
highscoresLink.addEventListener("click", showHighScoresPage)
goBackLink.addEventListener("click", goBack)
playAgain.addEventListener("click", ()=>{
    document.location.reload()
})
clearBtn.addEventListener("click", ()=>{
    localStorage.setItem("scoresArray", JSON.stringify([]))
    showHighScoresPage()
})

function startGame() {
    gameStage="quizpage"
    startTimer();
    displayQuestion();
    hideInstructions();
    scoreDisplay.textContent = "Score: " + score

}
function hideInstructions() {
    homepage.classList.add("invisible");
    highscores.classList.add("invisible")
    quizpage.classList.remove("invisible");

}

function showHighScoresPage(){
    homepage.classList.add("invisible")
    quizpage.classList.add("invisible")
    endpage.classList.add("invisible")

    //populate table
    const scores = JSON.parse(localStorage.getItem("scoresArray"))
    scores.sort((a,b) => b.score-a.score)
   
    tableBody.innerHTML = ''
    for (let i = 0; i <scores.length; i++){
        var row = document.createElement("tr")
        var initialsCell = document.createElement("td")
        initialsCell.textContent = scores[i].initials
        var scoreCell = document.createElement("td")
        scoreCell.textContent = scores[i].score
        row.append(initialsCell)
        row.append(scoreCell)
       tableBody.append(row)
    }

    highscores.classList.remove("invisible")
    highscoresLink.classList.add("invisible")
    goBackLink.classList.remove("invisible")
}

function goBack(){
    highscores.classList.add("invisible")
    highscoresLink.classList.remove("invisible")
    goBackLink.classList.add("invisible")

    if (gameStage==='homepage'){
        homepage.classList.remove("invisible")
    } else if (gameStage === 'quizpage'){
        quizpage.classList.remove("invisible")
    } else if (gameStage === 'endpage'){
        endpage.classList.remove("invisible")
    }
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
    gameStage="endpage"
    clearInterval(timer)
    endpage.classList.remove("invisible")
    quizpage.classList.add("invisible")
    highscores.classList.add("invisible")
}

function submitScore(initials){
    console.log(initials, score)

    if (localStorage.getItem("scoresArray")){
        // read the existing scores
        var scoresArray = JSON.parse(localStorage.getItem("scoresArray"))
        // push our new score onto the array
        scoresArray.push({initials,score})
        // put the array back in local storage
        localStorage.setItem("scoresArray", JSON.stringify(scoresArray))
    } else {
        localStorage.setItem("scoresArray", JSON.stringify([{initials, score}]))
    }
}