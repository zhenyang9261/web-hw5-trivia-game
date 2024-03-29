
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
     * Function: to initialize attributes and clean up html fields at the beginning of a game
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
        $("#image").attr("style", "display:none");
    },

    /*
     * Function: to display the result after each question
     * Input param: 
     * - 0: correct answer
     * - 1: wrong answer
     * - 2: time out
     */
    displayResult: function(result) {

        // Stop the count down
        clearInterval(trivia.intervalID);

        // Empty question and answer fields
        $(".question").empty();
        $(".answersArea").empty();

        var currentQuestion = questions[trivia.currentNo];

        // Display information based on result code input
        switch (result) {
            case 0:  // correct
                $(".question").text("Yes. Correct Answer!");
                $(".answersArea").empty();
                $("#image").attr("src" , "https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif");
                $("#image").attr("alt" , "giphy automated gif - win");
                $("#image").attr("style", "display: inline-block");
                break;
            case 1:  // wrong
                $(".question").text("Nope. Wrong Answer!");
                $(".answersArea").text("The correct answer was: " + currentQuestion.answers[currentQuestion.correct]);     
                $("#image").attr("src" , "https://media.giphy.com/media/WTjnWYENpLxS8JQ5rz/giphy.gif");
                $("#image").attr("alt" , "giphy automated gif - lose");
                $("#image").attr("style", "display: inline-block");
                break;
            case 2:  // time out
                $(".question").text("Time out!");
                $(".answersArea").text("The correct answer was: " + currentQuestion.answers[currentQuestion.correct]);
                $("#image").attr("src" , "https://media.giphy.com/media/14aUO0Mf7dWDXW/giphy.gif");
                $("#image").attr("alt" , "giphy automated gif - time out");
                $("#image").attr("style", "display: inline-block");
                break;
            default:  // this shouldn't happen
                break;
        }

        // Increase current question number
        trivia.currentNo++;

        // If end of questions. Wait for 4 seconds to display summary and restart button
        if (trivia.currentNo === questions.length)
            trivia.timeoutID = setTimeout(trivia.gameover, 4000);
        // Else wait for 3 seconds to display next question
        else
            trivia.timeoutID = setTimeout(trivia.displayQuestion, 4000);
    },

    /*
     * Function: to display current question 
     */
    displayQuestion: function() {
        
        // Clear time out
        clearTimeout(trivia.timeoutID);
                
        // Empty fields
        $(".question").empty();
        $(".answersArea").empty();
        $("#image").attr("style", "display:none");
        
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

            // Decrease 1 (second)
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

        // Initialize object attributes and clean up HTML page fields
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

        // Clear the result image
        $("#image").attr("style", "display:none");
        
        $(".question").text("All Done! Here's how you did:")

        // Display summary info
        $(".answersArea").empty();
        $(".answersArea").append("<p>Correct Answers: " + trivia.correctAnswer + "</p>");
        $(".answersArea").append("<p>Wrong Answers: " + trivia.wrongAnswer + "</p>");
        $(".answersArea").append("<p>Unanswered: " + trivia.unAnswered + "</p>");

        // Display button to restart the game
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

        // If the answer is correct
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

