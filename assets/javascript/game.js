
var questions = {
    q1: {
        question: "The Alamo, site of the famous battle, is a tourist attraction in what Texas city?",
        answers: ["Austin", "Houston", "San Antonio", "Brownsville"],
        correct: 2
    },
    q2: {
        question: "Which of the following is not a favorable adjective when discussing wine?",
        answers: ["fat", "flinty", "leggy", "vigorous"],
        correct: 0
    },
    q3: {
        question: "What soft-drink company introduced the brand Slice?",
        answers: ["Dr. Pepper", "Coca Cola", "Seven Up", "Pepsico"],
        correct: 1
    },
    q4: {
        question: "Catherine the Great ruled what country?",
        answers: ["England", "France", "Germany", "Russia"],
        correct: 3
    },
    q5: {
        question: "What was the next state after the original 13 to be admitted to the United States?",
        answers: ["Florida", "Kentucky", "Vermont", "West Virginia"],
        correct: 2
    },
    q6: {
        question: "Where was the UN headquarters located prior to them moving to Manhattan's East Side?",
        answers: ["San Francisco", "Long Island, New York", "Geneva, Switzerland", "Paris, France"],
        correct: 1
    },
    q7: {
        question: "Which of the following countries does not border Israel?",
        answers: ["Egypt", "Jordan", "Saudi Arabia", "Syria"],
        correct: 2
    },
    q8: {
        question: "Which one of the following countries is not known as one of the Baltic states?",
        answers: ["Albania", "Estonia", "Latvia", "Lithuania"],
        correct: 0
    },
    q9: {
        question: "Which two planets are most similar in size diameter wise?",
        answers: ["Mars and Mercury", "Venus and Earth", "Uranus and Neptune", "Jupiter and Saturn"],
        correct: 1
    },
    q10: {
        question: "In which century was the greatest number of chemical elements discovered?",
        answers: ["17th", "18th", "19th", "20th"],
        correct: 2
    }
}


var trivia = {

    // Attributes
    currentNo: 1,
    intervalID: 0,
    timeoutID: 0,
    timeRemaining: 10,

    /*
     * Function: to display question at current position
     */
    display: function() {
        
        // Clear time out
        clearTimeout(this.timeoutID);
        clearInterval(this.intervalID);

        trivia.timeRemaining = 10;
        $(".question").empty();
        $(".answersArea").empty();


        $(".time").text("Time Remaining: " + trivia.timeRemaining + " seconds.");

        var questionNo = "q" + trivia.currentNo;
console.log("questionNO: " + questionNo);

        $(".question").text(questions[questionNo].question);

        for (var i=0; i<questions[questionNo].answers.length; i++) {

            var answerBtn = $("<div>");
            answerBtn.text(questions[questionNo].answers[i]);
            answerBtn.attr("value", i);
            answerBtn.attr("class", "answerDiv");
            $(".answersArea").append(answerBtn);
        }

        // Start count down by second
        this.intervalID = setInterval(function() {
        
            trivia.timeRemaining--;

            $(".time").text("Time Remaining: " + trivia.timeRemaining + " seconds.");

            if (trivia.timeRemaining === 0) {
                trivia.timeout(); 
            }

        }, 1000);

    },

    /*
     * Function: called when time is up and user did not choose any answers
     */
    timeout: function() {
console.log("time out");

        clearInterval(this.intervalID);

        var currentQuestion = questions["q"+this.currentNo];

        // Display time out message
        $(".question").text("Time out!");

        // Display correct answer
        $(".answersArea").text("The correct answer was: " + currentQuestion.answers[currentQuestion.correct]);

        // Increase current question number
        this.currentNo++;

        // Display next question
        this.timeoutID = setTimeout(this.display, 5000);


    },

    /*
     * Function: to display time count down by second
     */
    countdown: function() {

        // Set internal 1 second. Keep updating display

    },

    /*
     * Function: when "Start Game" is clicked
     */
    start: function() {

        // Remove start game button
        $(".start").remove();

        // Display question and answers
        this.display();

    },

    /*
     * Function: when "Start Over" is clicked
     */
    restart: function() {

    },

    /*
     * Function: when an answer is clicked
     */
    answer: function(choice) {
console.log("answered: " + choice);

        // stop timer and count down 
        clearInterval(this.intervalID);
        var currentQuestion = questions["q"+this.currentNo];

        // If the answer is correct, display Yes  
        if (currentQuestion.correct == choice) {
            console.log("correct");
        }
        // Else the answer is not correct
        else {
            $(".question").text("Nope!");
            $(".answersArea").text("The correct answer was: " + currentQuestion.answers[currentQuestion.correct]);
        }
        

        // Increase current question number

        // Display next question

        // Set timer 


    }
}

$(document).ready(function() {

    // Button Listeners
    $(".start").on("click", function() {
        trivia.start();
    });

    $(document).on("click", ".answerDiv", function() {        
console.log("answer clicked");

        trivia.answer($(this).attr("value"));
    });


}) 

