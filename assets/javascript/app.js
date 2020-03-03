gameObject = {
    questionArray: [
        {
            question: "What super villain once broke Batman's back, leaving him crippled and wheelchair-bound?",
            answer: {
                wrong: ["Joker", "Ra's Al Ghul", "Killer Croc"],
                correct: "Bane"
            },
            image: "<img src='assets/images/Bane.gif' class='image'>"
        },
        {
            question:"What was Bat-hound's name?",
            answer:{
                wrong:["Fiddo","Max","Champ"],
                correct:"Ace"
            },
            image:"<img src='assets/images/Ace.gif' class='image'>"
        },
        {
            question:"What were the names of Bruce Wayne's parents?",
            answer:{
                wrong:["Wayne & Alice","George & Elane","James & Elizabeth"],
                correct:"Thomas & Martha"
            },
            image:"<img src='assets/images/Parents.gif' class='image'>"
        },
        {
            question:"Which of the following characters did Bruce Wayne have a son with?",
            answer:{
                wrong:["Catwoman","Poison Ivy","Vesper Fairchild"],
                correct:"Tailia Al Ghul"
            },
            image:"<img src='assets/images/Thailia.gif' class='image'>"
        },
        {
            question:"What former District Attorney became the villain known as Two-Face?",
            answer:{
                wrong:["Jason Blood","Floyd Lawton","Eward Nygma"],
                correct:"Harvey Dent"
            },
            image:"<img src='assets/images/Two-Face.gif' class='image'>"
        },
        {
            question:"Who killed Jason Todd (the second Robin)?",
            answer:{
                wrong:["Two-Face","Batman","Bane"],
                correct:"Joker"
            },
            image:"<img src='assets/images/Joker.gif' class='image'>"
        },
        {
            question:"What Batman villain lost his beloved wife Nora to a terminal illness?",
            answer:{
                wrong:["Scarecrow","Two-Face","Ra's Al Ghul"],
                correct:"Mr.Freeze"
            },
            image:"<img src='assets/images/Mr.Freeze.gif' class='image'>"
        },
        {
            question:"What member of the Batman family became Oracle?",
            answer:{
                wrong:["Catwoman","Batwoman","Huntress"],
                correct:"Batgirl"
            },
            image:"<img src='assets/images/Batgirl.gif' class='image'>"
        },
        {
            question:"What animal masks did the Terrible Trio wear?",
            answer:{
                wrong:["Tiger, Wolf & Bear","Cat, Dog & Mouse","Loin, Ox & Eagle"],
                correct:"Shark, Fox & Vulture"
            },
            image:"<img src='assets/images/Trio.gif' class='image'>"
        },
        {
            question:"What Batman villain was murdered and thrown into Slaughter Swamp?",
            answer:{
                wrong:["Onyx","Jackanapes","Copperhead"],
                correct:"Solomon Grundy"
            },
            image:"<img src='assets/images/Solomon.gif' class='image'>"
        },
    ],

    index: 0,
    right: 0,
    wrong: 0,
    unanswered: 0,
    counter: 0,
    timer: "",
    qCount: 1,

    createElements: function () {
        $("<div/>").attr("id", "introDiv").appendTo("main");
        $("#introDiv").append("Welcome to the Batman Trivia Game! <br><br> Guess the correct answer to each question to win. <br><br> Press 'Start' to begin!")
        $("<div/>").attr("id", "gameStatus").appendTo("main");
        $("<div/>").attr("id", "questionCount").appendTo("#gameStatus");
        $("<div/>").attr("id", "questionsCorrect").appendTo("#questionCount");
        $("#questionsCorrect").text("Correct: ");
        $("<div/>").attr("id", "correct").text("0").appendTo("#questionsCorrect");
        $("<div/>").attr("id", "questionsWrong").appendTo("#questionCount");
        $("#questionsWrong").text("Wrong:");
        $("<div/>").attr("id", "wrong").text("0").appendTo("#questionsWrong");
        $("<div/>").attr("id", "questionsUnanswered").appendTo("#questionCount");
        $("#questionsUnanswered").text("Unanswered: ");
        $("<div/>").attr("id", "unanswered").text("0").appendTo("#questionsUnanswered");
        $("<div/>").attr("id", "timer").css("color", "rgb(232,198,39)").appendTo("main");
        $("<div/>").attr("id", "question").appendTo("main");
        $("<div/>").attr("id", "result").appendTo("main");
        $("<div/>").attr("id", "resultText").appendTo("#result");
        $("<div/>").attr("id", "resultImg").appendTo("#result");
        $("<div/>").attr("id", "buttonContainer").appendTo("main");
        $("<button>", { text: "Start", id: "startBtn", class: "button" }).appendTo("#buttonContainer");
        $("<button>", { text: "Play Again", id: "resetBtn", class: "button" }).appendTo("#buttonContainer");
        $("<button>", { text: "Next Question", id: "nextBtn", class: "button" }).appendTo("#buttonContainer"); // need to remove
    },

    start: function () {
        this.createElements();
        $("#gameStatus, #nextBtn, #resetBtn").hide();
        $("#startBtn").click(function () {
            $("#startBtn").hide();
            $("#introDiv").hide();
            gameObject.nextQuestion();
        });
    },
    startTimer: function () {
        this.counter = 30;
        $("#timer").text("Time Remaining: " + this.counter + " seconds");
        this.timer = setInterval(function () {
            gameObject.counter--;
            $("#timer").text("Time Remaining: " + gameObject.counter + " seconds");
            if (gameObject.counter === 0) {
                clearInterval(gameObject.timer);
                gameObject.timesUp();
            }
            else if (gameObject.counter < 4) {
                $("#timer").css("color", "red");
            }
            else if (gameObject.counter < 6) {
                $("#timer").css("color", "darkorange");
            }
            else if (gameObject.counter < 8) {
                $("#timer").css("color", "orange");
            }
        }, 992);
    },
    displayAnswers: function () {
        let localIndex = 0;
        for (let i = 0; i < 3; i++) {
            $("<button>").attr({
                id: "btn" + localIndex,
                class: "answerBtn"
            }).text(gameObject.questionArray[gameObject.index].answer.wrong[localIndex])
                .data("name", gameObject.questionArray[gameObject.index].answer.wrong[localIndex])
                .appendTo("#buttonContainer");
            localIndex++;
        }
        let randomNumber = Math.floor(Math.random() * Math.floor(3));
        if (randomNumber === 0) {
            $("<button>").attr("class", "answerBtn")
                .text(gameObject.questionArray[gameObject.index].answer.correct)
                .data("name", gameObject.questionArray[gameObject.index].answer.correct)
                .insertBefore("#btn0");
        }
        else {
            $("<button>").attr("class", "answerBtn")
                .text(gameObject.questionArray[gameObject.index].answer.correct)
                .data("name", gameObject.questionArray[gameObject.index].answer.correct)
                .insertAfter("#btn" + randomNumber);
        }
        $(".answerBtn").show();
    },

    answerQuestion: function () {
        $(".answerBtn").click(function () {
            clearInterval(gameObject.timer);
            if ($(this).data("name") === gameObject.questionArray[gameObject.index].answer.correct) {
                gameObject.answerRight();
            }
            else {
                gameObject.answerWrong();
            }
        });
    },

    removeQuestion: function () {
        this.questionArray.splice(this.index, 1);
        this.checkArray();
    },

    timesUp: function () {
        this.unanswered++;
        $("#unanswered").text(this.unanswered);
        $("#question").hide();
        $("#resultText").text("You ran out of time! The correct answer was " + gameObject.questionArray[gameObject.index].answer.correct + ".");
        $("#resultImg").html(gameObject.questionArray[gameObject.index].image);
        this.checkArray();
    },

    answerWrong: function () {
        this.wrong++;
        $("#wrong").text(this.wrong);
        $("#question").hide();
        $("#resultText").text("Wrong! The correct answer was " + gameObject.questionArray[gameObject.index].answer.correct + ".");
        $("#resultImg").html(gameObject.questionArray[gameObject.index].image);
        this.checkArray();
    },

    answerRight: function () {
        this.right++;
        $("#correct").text(this.right);
        $("#question").hide();
        $("#resultText").text("Nice job! " + gameObject.questionArray[gameObject.index].answer.correct + " was the right answer!");
        $("#resultImg").html(gameObject.questionArray[gameObject.index].image);
        this.checkArray();
    },

    checkArray: function () {
        this.qCount++;
        $(".answerBtn").remove();
        $("#gameStatus").show();
        $("#nextBtn").show();
        $("#nextBtn").click(function (e) {
            if (gameObject.qCount === 20) {
                gameObject.endGame();
            }
            else {
                e.stopImmediatePropagation()
                gameObject.removeQuestion();
                gameObject.nextQuestion();
            }
        });
    },

    nextQuestion: function () {
        this.index = Math.floor(Math.random() * (this.questionArray.length))
        $("#timer").css("color", "rgb(232,198,39)")
        $("#resultText, #resultImg").empty();
        $("#gameStatus, #nextBtn").hide();
        $("#question").text(this.questionArray[this.index].question).show();
        this.displayAnswers();
        this.startTimer();
        this.answerQuestion();
    },

    endGame: function () {
        $("#nextBtn").remove();
        $("#timer, #resultText, #resultImg").hide();
        $("#introDiv").text("Here's how you did: ")
        $("#questionsCorrect, #questionsWrong, #questionsUnanswered").css("display", "block");
        $("#correct, #wrong, #unanswered").css("margin", "0");
        $("#gameStatus, #introDiv, #resetBtn").show();
        $("#resetBtn").click(function (e) {
            e.stopImmediatePropagation();
            window.location.reload();
        });
    },
}

gameObject.start();