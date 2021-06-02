// add variables in the global scope. 
var currentInd = 0;
var timerElement = document.querySelector(".timer-text"); 
var startBtn = document.querySelector("#start-btn");
var questionEl = document.querySelector("#questions");
var answerEl1 = document.querySelector(".answer1");
var answerEl2 = document.querySelector(".answer2");
var answerEl3 = document.querySelector(".answer3");
var answerEl4 = document.querySelector(".answer4");
var answerBtn = document.querySelectorAll(".answer"); 
var questionResult = document.querySelector("#question-result")
var startQuizEl = document.querySelector("#start-quiz");
var quizEl = document.querySelector("#quiz");
var endGameEl = document.querySelector(".end-game");
var correctEl = document.querySelector(".correct");
var wrongEl = document.querySelector(".wrong");
var scoreEl = document.querySelector("#score");
var correct = 0;
var wrong = 0;
var saveButton = document.querySelector("#save");
var intialsEl = document.querySelector("#intials");

// add a function to display questions. 
function displayQuestion() {
  if (currentInd < questionsArr.length){
  questionEl.textContent = questionsArr[currentInd].question;
  answerEl1.textContent = questionsArr[currentInd].answer1;
  answerEl2.textContent = questionsArr[currentInd].answer2;
  answerEl3.textContent = questionsArr[currentInd].answer3;
  answerEl4.textContent = questionsArr[currentInd].answer4;
  } else{
    endGame();
  }
  ;
};


//create array of objects for questions, answers and correct answer. 
var questionsArr = [
  {
    question: "How many stars are in the United States flag ?",
    answer1 : "50",
    answer2 : "49",
    answer3 : "13",
    answer4 : "27",
    correctAnswer: "50"
  },
  {
    question : "Name the first President of the United States",
    answer1 : "Barack Obama",
    answer2 : "Donald Trump",
    answer3 : "George Washington",
    answer4 : "George Bush",
    correctAnswer: "George Washington",
  },
  {
    question : "What age is legal to start drinking in America",
    answer1 : "17",
    answer2 : "18",
    answer3 : "16",
    answer4 : "21",
    correctAnswer: "21", 
  },
  {
    question : " What state was the last to get added?",
    answer1 : "Hawaii",
    answer2 : "Alaska",
    answer3 : "New York",
    answer4 : "Alabama",
    correctAnswer: "Hawaii", 
  }
];
// add a fuction for correct answer.
function correctAns(){
    questionResult.textContent = "correct answer!!";
    currentInd++;
    correct++;
    correctEl.textContent = correct;
    displayQuestion();
};

// add a function for wrong answer. 
function wrongAns(){
  
    questionResult.textContent = "wrong answer!!";
    currentInd++;
    wrong++;
    wrongEl.textContent = wrong;
    timerCount-= 10; 
    displayQuestion();
   
};


// a fucntion to loop through questions to check answers
answerBtn.forEach(function(ansBtn){
 
  // add an event listner for choosing answers. 
  ansBtn.addEventListener("click", function(event){
    var userAns = event.target.textContent;
 if ( userAns === questionsArr[currentInd].correctAnswer){
  correctAns();
 } else {
  wrongAns();
 }
 })
 });

 // add a function to start game. 
  function startGame() {
    startQuizEl.style.display = "none";
    quizEl.style.display = "block";
    timerCount = 90;
    displayQuestion();
    startTimer()
  };


// add a function to start timer. 
function startTimer() {
  
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount === 0) {
    
        endGame();
      }
    }, 1000);
  };

  // add a function to end quiz. 
  function endGame() {
    startQuizEl.style.display = "none";
    quizEl.style.display = "none";
    endGameEl.style.display = "block";
    clearInterval(timer);
    scoreEl.textContent = "correct : " + correct + ", wrong: " + wrong;
  };

  // add a function to save user's score to local storage. 
  saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    var UserScore = {
      intialsEl: intialsEl.value.trim(),
      correct: correct,
      wrong: wrong
    };
    
    localStorage.setItem("UserScore", JSON.stringify(UserScore));
    scoreMessage();
    
    });
    
    //add a function to display user's intials and score. 
    function scoreMessage() {
      var lastscore = JSON.parse(localStorage.getItem("UserScore"));
      if (lastscore !== null) {
        document.querySelector("#saved-score").textContent = intialsEl.value + 
        " answered  " + correct + " correct and " + wrong + " wrong"
      }
    }
// add an eventlistner to start game. 
  startBtn.addEventListener("click",startGame);
