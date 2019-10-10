
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
        question: "Which of the following vegetables is not one of the ingredients of V-8 juice?",
        answers: ["Beet", "Carrot", "Spinach", "Cabbage"],
        correct: 3
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
    correctAnswer: 0,
    wrongAnswer: 0,
    unAnswered: 0,

    /*
     * Function: to initialize attributes at the beginning of a game
     */
    init: function() {

        trivia.currentNo = 0;
        trivia.timeRemaining = 10;
        trivia.correctAnswer = 0;
        trivia.wrongAnswer = 0;
        trivia.unAnswered = 0;
        
        clearInterval(trivia.intervalID);
        clearTimeout(trivia.timeoutID);

        $(".question").empty();
        $(".answersArea").empty();
    },

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

        // Display information based on result code input
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

        // End of questions. Wait for 3 second to display summary and restart button
        if (trivia.currentNo === (questions.length - 1))
            trivia.timeoutID = setTimeout(trivia.gameover, 3000);
        // Wait for 3 second to display next question
        else
            trivia.timeoutID = setTimeout(trivia.displayQuestion, 3000);
    },

    /*
     * Function: to display question at current position
     */
    displayQuestion: function() {
        
        // Clear time out
        clearTimeout(trivia.timeoutID);
                
        // Empty fields
        $(".question").empty();
        $(".answersArea").empty();
        
        // Reset time remaining
        trivia.timeRemaining = 10;
        $(".time").text("Time Remaining: " + trivia.timeRemaining + " seconds.");

        // Display questino and multiple choices
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

            // Time out. Display result
            if (trivia.timeRemaining === 0) {
                trivia.unAnswered++;
                trivia.displayResult(2); 
            }
        }, 1000);
    },

    /*
     * Function: when "Start Game" is clicked
     */
    start: function() {

        // Initialize 
        trivia.init();

        // Hide start game button
        $(".start").attr("style", "display:none");

        // Display question and answers
        trivia.displayQuestion();

    },

    /*
     * Function: to call at the end of the game
     */
    gameover: function() {

        $(".question").text("All Done! Here's how you did:")

        $(".answersArea").empty();
        $(".answersArea").append("<p>Correct Answers: " + trivia.correctAnswer + "</p>");
        $(".answersArea").append("<p>Wrong Answers: " + trivia.wrongAnswer + "</p>");
        $(".answersArea").append("<p>Unanswered: " + trivia.unAnswered + "</p>");

        $(".start").text("Restart Game");
        $(".start").attr("style", "display:inline-block");
    },

    /*
     * Function: when an answer is clicked
     */
    answer: function(choice) {

        // stop timer and count down 
        clearInterval(trivia.intervalID);
        
        var currentQuestion = questions[trivia.currentNo];

        // If the answer is correct, display Yes  
        if (currentQuestion.correct == choice) {
            trivia.correctAnswer++;
            trivia.displayResult(0);
        }
        // Else the answer is not correct
        else {
            trivia.wrongAnswer++;
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
        trivia.answer($(this).attr("value"));
    });
}) 

