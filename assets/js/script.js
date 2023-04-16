var startBtn = document.querySelector("#generate");
var questionElement = document.getElementById("question-text");
var answersElement = document.querySelectorAll(".options");
for (var i = 0; i < 4; i++){
    answersElement[i].addEventListener("click",checkAnswers)
}
//vars for time element
var timerElement = document.querySelector(".timer-count");
var timer;
var timerCount = 100;

//vars for local storage
var participantName = document.getElementById("namebox");
var saveButton = document.getElementById("save");
var savedName = document.getElementById("savedScore");

var questionIndex =0;
var answersIndex;

var questionData = [
    {
    question: "Commonly used data types DO NOT include:",
    answers: [
        "1:strings",
        "2:booleans",
        "3:alerts",
        "4:numbers",
    ],
    correctAnswer: "3"
    },
    {
    question: "The condition in an if/else statement is enclosed within _____.",
    answers: [
        "1:quotes",
        "2:curly brackets",
        "3:parenthesis",
        "4:square brackets",
    ],
    correctAnswer: "3"
    },
    {
    question: "Arrays in JavaScript can be used to store _______.",
    answers: [
        "1:numbers and strings",
        "2:other arrays",
        "3:booleans",
        "4:all of the above",
    ],
    correctAnswer: "4"
    },
    {
    question: "String values must be enclosed within ________ when being assigned to variables.",
    answers: [
        "1:commas",
        "2:curly brackets",
        "3:quotes",
        "4:parentheses",
    ],
    correctAnswer: "3"
    },
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
        "1:JavaScript",
        "2:terminal/bash",
        "3:for loops",
        "4:console.log",
    ],
    correctAnswer: "4"
    },
]

function loadQuestions(){
    var question = questionData[questionIndex].question
  //  var answers = answers[answersIndex]
    
    questionElement.innerText = question;
    for(let i=0;i<4;i++){
      
        answersElement[i].innerText = questionData[questionIndex].answers[i]
    }
   
}


startBtn.addEventListener("click", function(){
    document.querySelector("#start-page").setAttribute("class","hide");
    document.querySelector("#main-quiz").setAttribute("class","show");
    loadQuestions();
    startTimer();

});

function startTimer() {
    timer = setInterval(function(){
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0){
            if(isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }
        if (timerCount === 0){
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

/*function startGame() {
    document.getElementById("generate").click();
    timerCount = 100;
    startTimer();
}*/


function checkAnswers(event) {
    event.preventDefault();
    var userAnswer = event.target.getAttribute("data-value")
    if (userAnswer == questionData[questionIndex].correctAnswer){

    }else{
        timerCount -= 5
    }
    if(questionIndex<questionData.length -1){
        questionIndex ++
        loadQuestions();
    }
}
//local storage scores
saveButton.addEventListener("click", function(event) {
    event.preventDefault();

    var savedScore = {
        participant: participantName.value.trim(),
        score: score.value,
    };

    localStorage.setItem("participantName", JSON.stringify(score));
    renderMessage();
});

function renderMessage(){
    var lastScore = JSON.parse(localStorage.getItem("savedScore"));
    if (lastScore !==null) {
        document.querySelector(".message").textContent = lastScore.student 
        + "-" + lastScore.score
    }
}