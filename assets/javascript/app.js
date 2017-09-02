 // buttons for test - they are invisible now for production code
 $(document).ready(function() {
    $("#button1").click(game.runTimer.bind(game));
    $("#button2").click(game.stopTimer.bind(game)); 
    $("#button3").click(game.reset.bind(game));
 });

 var questionArray = [
    {
      question: "Who wrote Sense and Sensibilia?", 
      answers: [ 
        { answer: "Jane Austen", isCorrect: false },
        { answer: "Barbara Pym", isCorrect: false },
        { answer: "Ernest Hemmingway", isCorrect: false },
        { answer: "Aristotle", isCorrect: true },
      ],          // answers array
    },            // question object
    {
      question: "On average, an American eats how much cheese in a year?", 
      answers: [ 
        { answer: "10 pounds", isCorrect: false },
        { answer: "20 pounds", isCorrect: false },
        { answer: "30 pounds", isCorrect: true },
        { answer: "40 pounds", isCorrect: false },
      ],          // answers array
    },            // question object
    {
      question: "Approximately 98% of Antarctica's surface is covered in ice.'", 
      answers: [ 
        { answer: "True", isCorrect: true },
        { answer: "False", isCorrect: false },
      ],          // answers array
    },            // question object ];
    {
      question: "In 2004, Mattel announce that Barbie and Ken had broken up.", 
      answers: [ 
        { answer: "True", isCorrect: true },
        { answer: "False", isCorrect: false },
      ],          // answers array
    },            // question object
    {
      question: "About how long are all the blood vessels in the human body combined?", 
      answers: [ 
        { answer: "2 miles", isCorrect: false },
        { answer: "10 miles", isCorrect: false },
        { answer: "2,200 miles", isCorrect: false },
        { answer: "60,00 miles", isCorrect: true },
      ],          // answers array
    },            // question object
    {
      question: "An area of Brooklyn was once overrun by rabbits, nicknamed coneys, which is why that area is now known as Coney Island.", 
      answers: [ 
        { answer: "True", isCorrect: true },
        { answer: "False", isCorrect: false },
      ],          // answers array
    },            // question object
    {
      question: "Fortune cookies were invented in China.", 
      answers: [ 
        { answer: "True", isCorrect: false },
        { answer: "False", isCorrect: true },
      ],          // answers array
    },            // question object
    {
      question: "Originally, Saint Nicholas was the patron saint of...", 
      answers: [ 
        { answer: "dogs", isCorrect: false },
        { answer: "cats", isCorrect: false },
        { answer: "gifts", isCorrect: false },
        { answer: "thieves", isCorrect: true },
      ],          // answers array
    },            // question object
    {
      question: "The Sex Pistols released how many studio albums?", 
      answers: [ 
        { answer: "One", isCorrect: true },
        { answer: "Five", isCorrect: false },
        { answer: "Ten", isCorrect: false },
        { answer: "Over twenty", isCorrect: false },
      ],          // answers array
    },            // question object
    {
      question: "Since 1952, what country has won the most olympic gold medals in soccer?", 
      answers: [ 
        { answer: "Poland", isCorrect: false },
        { answer: "Italy", isCorrect: false },
        { answer: "Spain", isCorrect: false },
        { answer: "Hungary", isCorrect: true },
      ],          // answers array
    },            // question object
    {
      question: "Snakes hear with their:", 
      answers: [ 
        { answer: "ears", isCorrect: false },
        { answer: "eyes", isCorrect: false },
        { answer: "tongues", isCorrect: true },
        { answer: "skin", isCorrect: false },
      ],          // answers array
    },            // question object
    {
      question: "Who eats the most SPAM?", 
      answers: [ 
        { answer: "Hawaiians", isCorrect: true },
        { answer: "Londoners", isCorrect: false },
        { answer: "Koreans", isCorrect: false },
        { answer: "Air Force pilots", isCorrect: false },
      ],          // answers array
    },            // question object
    {
      question: "The country of Bhutan once issued postage stamps that were phonograph records.", 
      answers: [ 
        { answer: "True", isCorrect: true },
        { answer: "False", isCorrect: false },
      ],          // answers array
    },            // question object
];                //questionArray


var globalVar = {};           // For DEBUG - DELETE


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
  gameState: 0,               // state variable is:
                              // 0 game pre-init - waiting for start button
                              // 1 showing a question display
                              // 2 timed out - go show the answer
                              // 3 showing an answer display
                              // 4 game over - waiting for restart button (restart button does not reload the page)
                              // design note: this would probably be cleaner as an object map


  // --
  // Define the functions of the game here
  // Are there any re-usable operations that you can break out into a function so you don't write the same code twice?
  // --
  initialize: function() {
    // Function for initializing the game object.  Things to do when the game first starts up
    console.log("Initializing the Game");
    this.gameState = 0;
    this.wins = 0;
    this.losses = 0;
    this.currentQuestion = 0;
    console.log(this.timeoutSecs);
    $("#time-left").html("<h3> Time Left: " + this.timeoutSecs + "</h3>");
    $("<button>") .html("Start")
                  .addClass("btn btn-primary")
                  .appendTo("#question")
                  .on("click", function () {
                  game.reset();
                  });
    this.showData();    
  },

  reset: function() {
    // Reset current game
    console.log("Resetting the Game Properties");
    this.wins = 0;
    this.losses = 0;
    this.currentQuestion = 0;
    this.gameState = 1;

    // Show first question
    this.showQuestion();
    this.timeoutSecs = this.questionSecs;

    this.showData();
    this.runTimer();
  },

  // Next Question please
  showQuestion: function () {
    this.gameState = 1;
    // get question and load it up
    $("#question").html(questionArray[this.currentQuestion].question);

    $("#answers").html("");
    for (var i = 0; i < questionArray[this.currentQuestion].answers.length; i++) {
      // Find the right answer and save it for later
      if (questionArray[this.currentQuestion].answers[i].isCorrect) {

        //console.log("questionArray[this.currentQuestion].answers[i].isCorrect: ", questionArray[this.currentQuestion].answers[i].isCorrect);
        //console.log("questionArray[this.currentQuestion].answers[i].answer: ", questionArray[this.currentQuestion].answers[i].answer);

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

                  game.stopTimer();
                  game.timeoutSecs = game.answerSecs;   // they guessed so we will show them the answer

                    if ( $(this).attr("value")=='true') {
                      game.wins++;
                      game.congrats();
                    } else {
                      game.losses++;
                      game.sorry();
                    }
                    // Save the guess here
                    game.guess = $(this).attr("whichButton"); 
        console.log("Guess: ", game.guess);
        game.timeoutSecs = game.answerSecs;   // we will be showing the answer
        game.gameState = 3; 
                  });
        game.showData();
        game.runTimer();
  },

  endGame: function() {
    // Function for finalizing the game object.  Things to do when the game ends
    console.log("Game Over");
    $("#question").html("");
    $("#answers").html("");
    $("<button>") .html("Start Over?")
                  .addClass("btn btn-primary")
                  .appendTo("#question")
                  .on("click", function () {
        console.log("this: ", this);
        console.log("this.value: ", this.value);
        console.log($(this).attr("value"));
                  game.reset();
                  });
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
      console.log("this.gameState ", this.gameState);
      console.log("this.previousState ", this.previousState);

      console.log("questionArrary.length: ", questionArray.length);
      console.log("questionArray[this.currentQuestion].answers.lenth: ", questionArray[this.currentQuestion].answers.length);

      // figure out what we are supposed to do
      switch (this.gameState) {
        case 0:
          // 0 game init - waiting for start button
          console.log("Game Reset state");  // next state transition is handled in button logic for Start button
          break;
        case 1:
          // 1 showing a question 
          console.log("Timed Out Showing Question state");
          this.losses++;              // a question timed out so that's one wrong
          this.gameState = 3;         // show the answer now 
          //this.currentQuestion++;
          this.timeoutSecs = this.answerSecs;
          this.sorry();     // tell them what happened
          this.runTimer();
          break;
        case 2:
          // 2 timed out - go show the answer
          console.log("Timed Out Question state");
          this.losses++;    // a question timed out so that's one wrong
          this.gameState = 3;         // show the answer now
          this.timeoutSecs = this.answerSecs;
          this.sorry();     // tell them what happened
          this.runTimer();
          break;
        case 3:
          // 3 showing an answer
          console.log("Timed Out Answer state");
          if (this.currentQuestion == questionArray.length-1) { // check for last question (game over)
            this.gameState = 4;       // time to leave
            this.endGame();
          } else {
            this.timeoutSecs = this.questionSecs;
            this.gameState = 1;       // time to show next question
            this.currentQuestion++;
            this.showQuestion();
            this.runTimer();  
          }
          this.showData();
          break;
        case 4:
          // 4 game over - waiting for restart button click
          console.log("Game Over state");
          // nothing to do here since next state transition handled in button logic for Start Over? button
          alert("Game Over");
          break;
        default:
          // maybe something bad happened
          alert("State Error"); 
          break;
      }

      console.log("this.gameState: ", this.gameState);
      console.log("this.isQuestion ", this.isQuestion);
      console.log("this.currentQuestion ", this.currentQuestion);

      this.showData();
    }
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

  stopTimer: function() {
    console.log("stop the timer.");
    clearInterval(this.intervalId);
  },

  congrats: function () {
    $("#question").html("That's Right! The correct answer is: ");
    $("#answers").empty().html(this.rightAnswer);

    game.timeoutSecs = game.answerSecs;   // someone guessed - we will show the answer
    game.showData();
    game.runTimer();
  },

  sorry: function () {
    $("#question").empty().html("Sorry. The correct answer is: ")
    $("#answers").empty().html(this.rightAnswer);

    game.timeoutSecs = game.answerSecs;   // timeout or bad guess - we will show the answer
    game.showData();
    game.runTimer();
  },

  showData: function() {
    console.log(this);
    $("#wins").html("Correct Answers: ").append(this.wins);
    $("#losses").html("Wrong Answers: ").append(this.losses);
  },

}


game.initialize();

