function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}
Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}

function loadQuestions() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;

        var choices = quiz.getQuestionByIndex().choices;

        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);

        }
        showProgress();
    }
};

function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;

};

function showScores() {
    var gameOverHTML = "<h1> Result </h1>";
    gameOverHTML += "<h2 id = 'score'> Your Score :  " + quiz.score + ". And Mark Percentage is : " +
        (quiz.score / questions.length * 100) + "%" + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var questions = [
    new Question("JavaScript supports ", ["Functions", "HTML", "CSS", "XHTML"], "Functions"),
    new Question("Which language is used for styling web Pages", ["CSS", "Python", "HTML", "JAVA"], "CSS"),
    new Question("Which is not a Java Scrpt framework", ["PHP", "Python", "HTML", "Django"], "Django"),
    new Question("Which is used to connect to DB", ["Java", "Spring", "ReactJS", "PHP"], "PHP"),
    new Question("ReactJS is  ", ["framework", "Java Script Library", "PHP", "Django"], "Java Script Library")
];

var quiz = new Quiz(questions);

loadQuestions();

