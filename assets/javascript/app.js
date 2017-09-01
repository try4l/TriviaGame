 // button for test - make invisible for production code
 $(document).ready(function() {

    $("#button1").click(game.runTimer.bind(game));
    // $("button").on("click", function() {
    //   game.runTimer(); 
    // });

    $("#button2").click(game.stopTimer.bind(game)); 

    $("#button3").click(game.reset.bind(game));
    // $("button").on("click", function() {
    //   game.reset(); 
    // });

 });

 var questionArray = [
    {
      question: "Who is the goose?", 
      answers: [ 
        { answer1: "the first answer", isCorrect: false },
        { answer2: "the second answer", isCorrect: true },
        { answer3: "the third answer", isCorrect: false },
        { answer4: "the fourth answer", isCorrect: false },
      ],          // answers array
    },            // question object
    {
      question: "What the hell??", 
      answers: [ 
        { answer1: "the 1st answer", isCorrect: false },
        { answer2: "the 2nd answer", isCorrect: true },
      ],          // answers array
    },            // question object
{
      question: "WTF???", 
      answers: [ 
        { answer1: "the real answer", isCorrect: true },
        { answer2: "the unreal answer", isCorrect: false },
      ],          // answers array
    },            // question object ];               // question array
];                //questionArray

var game = {
  // --
  // Define the properties of the game here
  // --
  wins: 0,
  losses: 0,
  counter: 0,
  questionSecs: 7,
  answerSecs: 5,
  timeoutSecs: 6,
  currentQuestion: 0,
  isQuestion: true,

  intervalId: null,


  // --
  // Define the functions of the game here
  // Are there any re-usable operations that you can break out into a function so you don't write the same code twice?
  // --
  initialize: function() {
    // Function for initializing the game object.  Tasks to run when the game first starts up
    console.log("Initializing the Game");
    this.wins = 0;
    this.losses = 0;
    this.counter = 0;
    console.log(this.timeoutSecs);
    this.reset();    
  },

  reset: function() {
    // Reset current game - tasks to perform after the user wins or loses
    console.log("Resetting the Game Properties");
    this.timeoutSecs = this.questionSecs;
    this.isQuestion = true;
    this.showNextQuestion;

    this.showData();
  },

  showNextQuestion: function () {
    // get next question and load it up
    $("#question").html(questionArray[this.currentQuestion].question);
    $("#answers").html(questionArray[this.currentQuestion].answers[0].answer1);
    this.currentQuestion++;
  },

  processMove: function(move) {
    console.log("Processing Move");
    console.log("Move: ", move);

    // process the user move and check for the end of game

    // check if guess was correct, update correct and incorrect counters
    // maybe check for end of game

      //this.wins++;
      alert("Congratulations: You WIN!!!");
      //this.reset();
    
    
      //alert("Sorry: You lose.");
      //this.losses++;
      //this.reset();

    this.showData();
  },

  showData: function() {
    console.log(this);
  },

  //  The run function sets an interval
  //  that runs the decrement function once a second.
  runTimer: function() {
    console.log("Run the timer.");
    console.log(this);
    this.stopTimer(); 
    this.intervalId = setInterval(function () {
    game.decrement(); 
    }, 1000);
  },

  // Next Question please



  //  The decrement function.
  decrement: function() {
    console.log("Tick");

    //  Decrease number by one.
    this.timeoutSecs--;
    console.log(this.timeoutSecs);
    //  Show the number for seconds left
    $("#time-left").html("<h2>" + this.timeoutSecs + "</h2>");
    //  Once number hits zero...
    if (this.timeoutSecs === 0) {
      this.showData();
      // fiigure out what we are supposed to do 
      // if in questions, it timed out so add one wrong answer
      // if just displaying a message, see if game is over and maybe show the next quesiton decide
      if (this.isQuestion) {
        isQuestion = false;
        this.losses++;
      } else {
        this.isQuestion = true;
      }
      // either way, show next question and see if game is over
      // see if game is over
      // show the next question
      this.showNextQuestion();
      
      //  ...run the stop function.
      this.stopTimer();
      this.showData();
      //  Alert the user that time is up.
      alert("Time Up!");
    }
  },

  stopTimer: function() {
    console.log("stop the timer.");
    clearInterval(this.intervalId);
  },

};

// Outside of game object... code is loading.. initialize game.
var updateGameDisplay = function (game) {
    console.log("Update Game Display");

    $("#wins").html("Wins: " + game.wins);    
    $("#losses").html("Losses: " + game.losses);

    game.showData();
};


game.initialize();


// $(".crystal-image").on("click", function() {
//   game.showData();
//   var crystalValue = ($(this).attr("data-crystalvalue"));
//   crystalValue = parseInt(crystalValue);

//   // Call function on game object to update the game logic
//   game.processMove(crystalValue);
  
//   // Call function (not on the game object) to update the page elements.  
//   // Elements are updated from the properties of the game object
//   updateGameDisplay(game); 
// });
