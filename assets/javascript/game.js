
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
    timeRemaining: 10,

    /*
     * Function: to display question at current position
     */
    display: function() {
        

        $(".time").text("Time Remaining: " + trivia.timeRemaining + " seconds.");

        var questionNo = "q" + this.currentNo;

        $(".question").text(questions[questionNo].question);

        for (var i=0; i<questions[questionNo].answers.length; i++) {

            var answerBtn = $("<div>");
            answerBtn.text(questions[questionNo].answers[i]);
            answerBtn.attr("value", questions[questionNo].answers[i]);
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

        // Display time out message

        // Display correct answer

        // Display next question

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
    answer: function() {

        // stop timer and count down 

        // If the answer is correct, display Yes  

        // Else the answer is not correct, display No

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


}) 

