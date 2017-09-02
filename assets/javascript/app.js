 // buttons for test - make them invisible for production code
 $(document).ready(function() {
    $("#button1").click(game.runTimer.bind(game));
    $("#button2").click(game.stopTimer.bind(game)); 
    $("#button3").click(game.reset.bind(game));
 });

 var questionArray = [
    {
      question: "Who is the goose?", 
      answers: [ 
        { answer: "the first answer", isCorrect: false },
        { answer: "the second answer", isCorrect: true },
        { answer: "the third answer", isCorrect: false },
        { answer: "the fourth answer", isCorrect: false },
      ],          // answers array
    },            // question object
    {
      question: "What the hell??", 
      answers: [ 
        { answer: "the 1st answer", isCorrect: false },
        { answer: "the 2nd answer", isCorrect: true },
      ],          // answers array
    },            // question object
{
      question: "WTF???", 
      answers: [ 
        { answer: "the real answer", isCorrect: true },
        { answer: "the unreal answer", isCorrect: false },
      ],          // answers array
    },            // question object ];               // question array
];                //questionArray


var globalVar = {};


var game = {
  // --
  // Define the properties of the game here
  // --
  wins: 0,                    // holds number of correct guesses
  losses: 0,                  // holds number of incorrect guesses

  questionSecs: 7,            // time to allow for the user to answer a question
  answerSecs: 5,              // value to use to display the results after a guess            
  timeoutSecs: 7,             // actual timer variable
  intervalId: null,           // timer handle for clearing delay

  currentQuestion: 0,         // index into question array
  quess: "",                  // the current user guess
  rightAnswer: "",            // the current correct choice  
  isQuestion: true,           // state variable to control whether we are asking a question or showing an answer


  // --
  // Define the functions of the game here
  // Are there any re-usable operations that you can break out into a function so you don't write the same code twice?
  // --
  initialize: function() {
    // Function for initializing the game object.  Tasks to run when the game first starts up
    // Initialize variables
    console.log("Initializing the Game");
    this.wins = 0;
    this.losses = 0;
    this.currentQuestion = 0;
    console.log(this.timeoutSecs);
    this.reset();    
  },

  reset: function() {
    // Reset current game - tasks to perform after the user wins or loses a question
    console.log("Resetting the Game Properties");
    this.timeoutSecs = this.questionSecs;
    this.isQuestion = true;
    // Show first question
    this.showQuestion();

    this.showData();
    this.runTimer();
  },

  // Next Question please
  showQuestion: function () {
    // get question and load it up
    $("#question").html(questionArray[this.currentQuestion].question);
    //$("#answers").html(questionArray[this.currentQuestion].answers[0].answer1);
    for (var i = 0; i < questionArray[this.currentQuestion].answers.length; i++) {
      // Find the right answer and save it for later
      if (questionArray[this.currentQuestion].answers[i].isCorrect) {

        console.log("questionArray[this.currentQuestion].answers[i].isCorrect: ", questionArray[this.currentQuestion].answers[i].isCorrect);
        console.log("questionArray[this.currentQuestion].answers[i].answer: ", questionArray[this.currentQuestion].answers[i].answer);

        this.rightAnswer = questionArray[this.currentQuestion].answers[i].answer;
      }
      // now display the answers for the user
      this.showAnswer(questionArray[this.currentQuestion].answers[i]);
    }
  },

  // Show an answer
  showAnswer: function (a) {
    console.log("a: ", a);
    console.log("a.answer: ", a.answer);
    // show the answer
    $("<button>") .html(a.answer)
                  .attr("whichButton", a.answer)
                  .addClass("btn btn-primary")
                  .attr("value", a.isCorrect)
                  .appendTo("#answers")
                  .on("click", function () {

        globalVal = $(this).attr("whichButton");
        //alert("button: ", globalBVal;

                    if ( $(this).attr("value")=='true') {
                      game.wins++;
                      game.congrats();
                    } else {
                      game.losses++;
                      // Could save the bad guess here to display
                      game.sorry();
                    }
                    game.guess = $(this).attr("whichButton"); 
        console.log("this: ", this);
        console.log("this.value: ", this.value);
        console.log($(this).attr("value"));
        //console.log($(this).attr("whichButton"));
        console.log(game.guess);
                  });
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
    this.intervalId = setInterval (function () {
    game.decrement(); 
    }, 1000);
  },

    //  The decrement function.
  decrement: function() {
    console.log("Tick");

    //  Decrease number by one.
    this.timeoutSecs--;
    console.log(this.timeoutSecs);
    //  Show the number for seconds left
    $("#time-left").html("<h3> Time Left: " + this.timeoutSecs + "</h3>");
    //  Once number hits zero...
    if (this.timeoutSecs === 0) {
      this.showData();
      this.stopTimer();

      //console.log("questionArrary.length: ", questionArray.length);
      //console.log("questionArray[this.currentQuestion].answers.lenth: ", questionArray[this.currentQuestion].answers.length);

      // fiigure out what we are supposed to do 
      // if in questions, it timed out so add one wrong answer
      // if just displaying a message, see if game is over and maybe show the next question decide
      if (this.isQuestion) {
        this.isQuestion = false;
        this.losses++;
        this.timeOutSecs = this.answerSecs;
        this.sorry();
        } else {
        this.isQuestion = true;
        this.timeOutSecs = this.questionSecs;
        this.runTimer();
      }

      // either way, see if game is over and show more questions if not
      // see if game is over
      if (this.isQuestion && (this.currentQuestion < questionArray.length-1)) {
        // show the next question
        this.currentQuestion++;
        this.showQuestion();
        } else {
      }
     
      //  ...run the stop function.
      this.stopTimer();
      this.showData();
    }
  },

  stopTimer: function() {
    console.log("stop the timer.");
    clearInterval(this.intervalId);
  },

  congrats: function () {
    $("#question").html("That's Right! The correct answer is: ");
    $("#answers").html(this.rightAnswer);
  },

  sorry: function () {
    $("#question").html("Sorry. The correct answer is: ")
    $("#answers").html(this.rightAnswer);
  },

}



game.initialize();

