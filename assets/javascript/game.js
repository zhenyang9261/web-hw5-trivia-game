
var questions = [
    {
        question: "The Alamo, site of the famous battle, is a tourist attraction in what Texas city?",
        answers: ["Austin", "Houston", "San Antonio", "Brownsville"],
        correct: 2
    },
    {
        question: "Which of the following is not a favorable adjective when discussing wine?",
        answers: ["fat", "flinty", "leggy", "vigorous"],
        correct: 0
    },
    {
        question: "What soft-drink company introduced the brand Slice?",
        answers: ["Dr. Pepper", "Coca Cola", "Seven Up", "Pepsico"],
        correct: 1
    },
    {
        question: "Catherine the Great ruled what country?",
        answers: ["England", "France", "Germany", "Russia"],
        correct: 3
    },
    {
        question: "What was the next state after the original 13 to be admitted to the United States?",
        answers: ["Florida", "Kentucky", "Vermont", "West Virginia"],
        correct: 2
    },
    {
        question: "Where was the UN headquarters located prior to them moving to Manhattan's East Side?",
        answers: ["San Francisco", "Long Island, New York", "Geneva, Switzerland", "Paris, France"],
        correct: 1
    },
    {
        question: "Which of the following countries does not border Israel?",
        answers: ["Egypt", "Jordan", "Saudi Arabia", "Syria"],
        correct: 2
    },
    {
        question: "Which one of the following countries is not known as one of the Baltic states?",
        answers: ["Albania", "Estonia", "Latvia", "Lithuania"],
        correct: 0
    },
    {
        question: "Which two planets are most similar in size diameter wise?",
        answers: ["Mars and Mercury", "Venus and Earth", "Uranus and Neptune", "Jupiter and Saturn"],
        correct: 1
    },
    {
        question: "In which century was the greatest number of chemical elements discovered?",
        answers: ["17th", "18th", "19th", "20th"],
        correct: 2
    }
];


var trivia = {

    // Attributes
    currentNo: 0,
    intervalID: 0,
    timeoutID: 0,
    timeRemaining: 10,

    /*
     * Function: to display the result after one question
     * Input param: 
     * - 0: correct answer
     * - 1: wrong answer
     * - 2: time out
     */
    displayResult: function(result) {

        // Stop the count down
        clearInterval(trivia.intervalID);

        // Empty fields
        $(".question").empty();
        $(".answersArea").empty();

        var currentQuestion = questions[trivia.currentNo];

        switch (result) {
            case 0:
                $(".question").text("Yes. Correct Answer!");
                $(".answersArea").empty();
                break;
            case 1:
                $(".question").text("Nope. Wrong Answer!");
                $(".answersArea").text("The correct answer was: " + currentQuestion.answers[currentQuestion.correct]);               
                break;
            case 2:
                $(".question").text("Time out!");
                $(".answersArea").text("The correct answer was: " + currentQuestion.answers[currentQuestion.correct]);
                break;
            default:
                break;
        }

        // Increase current question number
        trivia.currentNo++;

        // Wait for 5 second to display next question
        trivia.timeoutID = setTimeout(trivia.displayQuestion, 5000);
    },

    /*
     * Function: to display question at current position
     */
    displayQuestion: function() {
        
        // Clear time out
        if(trivia.timeoutID != 0) {
            clearTimeout(trivia.timeoutID);
                // Empty fields
            $(".question").empty();
            $(".answersArea").empty();
        }
        
        trivia.timeRemaining = 10;
        
        $(".time").text("Time Remaining: " + trivia.timeRemaining + " seconds.");

        $(".question").text(questions[trivia.currentNo].question);

        for (var i=0; i<questions[trivia.currentNo].answers.length; i++) {

            var answerBtn = $("<div>");
            answerBtn.text(questions[trivia.currentNo].answers[i]);
            answerBtn.attr("value", i);
            answerBtn.attr("class", "answerDiv");
            $(".answersArea").append(answerBtn);
        }

        // Start count down by second
        trivia.intervalID = setInterval(function() {
        
            trivia.timeRemaining--;

            $(".time").text("Time Remaining: " + trivia.timeRemaining + " seconds.");

            if (trivia.timeRemaining === 0) {
                trivia.displayResult(2); 
            }

        }, 1000);

    },

    /*
     * Function: when "Start Game" is clicked
     */
    start: function() {

        // Remove start game button
        $(".start").remove();

        // Display question and answers
        trivia.displayQuestion();

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
console.log(choice);

        // stop timer and count down 
        clearInterval(trivia.intervalID);
        
        var currentQuestion = questions[trivia.currentNo];
console.log("correct answer: " + currentQuestion.correct + "  you chose: " + choice);

        // If the answer is correct, display Yes  
        if (currentQuestion.correct == choice) {
            trivia.displayResult(0);
        }
        // Else the answer is not correct
        else {
            trivia.displayResult(1);
        }
    }
}

$(document).ready(function() {

    // Button Listeners
    $(".start").on("click", function() {
        trivia.start();
    });

    $(document).on("click", ".answerDiv", function() {   
console.log($(trivia).attr("value")); 
        trivia.answer($(this).attr("value"));
    });


}) 

