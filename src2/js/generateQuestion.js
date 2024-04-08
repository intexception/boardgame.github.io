import { greenSquares, redSquares, redOrGreenSquares } from "./main1.js";
import { generateFunctions , showFunctions } from "./generateFunctions.js";
import { questionsElektryk, questionsInformatyk, questionsRobotyk, questionsProgramista } from "./questions.js";
import { players } from "./generatePlayers.js";
import { hideFunctions_E, showFunctions_E } from "./generateFunctions.js";
import { showPlayers } from "./generateFunctions.js";
import { showPlayerSquares, hidePlayerSquares } from "./generateFunctions.js";
import { moveASquares } from "./playerFunctions.js";
import { showFunctionReceived, hideFunctionReceived, functionsReceived} from "./playerFunctions.js";
import { movePlayer } from "./movePlayer.js";

var playerNow = 0;
var T1 = 0;
var T2 = 0;
var T3 = 0;
var T0 = 0;
var F1 = 0;
var F2 = 0;
var F3 = 0;
var F0 = 0;
var srednia = 1.0;
var playerNow = 0;
function generateQuestion() {
    hidePlayerSquares();
    hideFunctions_E();
    hideAfterAnswerHeader();
    var questions_E = document.querySelector(".questions");
    var functions_E = document.querySelector(".functions");
    showPlayers();

    var correctOrFalse_E = document.querySelector(".correctOrFalse");

    console.log(playerNow);

    var player = document.createElement("div");
    player.classList.add("player");
    player.id = "player" + playerNow;
    player.innerHTML = players[playerNow].playerId;

    var positionNow = players[playerNow].positionNow;

    var n = Math.floor(Math.random() * 6) + 1;

    var nextPosition = positionNow + n;

    console.log("Player " + playerNow + " is on " + positionNow + " and is going to" + " square " + nextPosition + " next. N is " + n);


    var whichQuestions;

    if (players[playerNow].profile == "Elektryk") {
        whichQuestions = questionsElektryk;
    } else if (players[playerNow].profile == "Informatyk") {
        whichQuestions = questionsInformatyk;
    } else if (players[playerNow].profile == "Programista") {
        whichQuestions = questionsProgramista;
    } else if (players[playerNow].profile == "Robotyk") {
        whichQuestions = questionsRobotyk;
    }
    var a = Math.floor(Math.random() * whichQuestions.length);

    var questionCenter = document.querySelector(".questionCenter");
    questionCenter.style.display = "flex";

    var questionHeader = document.querySelector(".questionHeader");
    var questionExists = false;

    if (questionExists !== true) { /////////// potam daj while
        for (var property in whichQuestions[a]) {
            if (whichQuestions[a].hasOwnProperty(property) && property === "question") {
                if (whichQuestions[a].question === undefined) {
                    a = Math.floor(Math.random() * whichQuestions.length);
                    console.log(a+" pytanie"+players[playerNow].profile);
                } else {
                    questionExists = true;
                    console.log(a+" pytanie"+players[playerNow].profile);
                    console.log(whichQuestions[a].question)
                }
            } else {
                a = Math.floor(Math.random() * whichQuestions.length);
            }
        }
    }

    questionHeader.innerHTML = whichQuestions[a].question;

    questions_E.innerHTML = "";
    questions_E.appendChild(questionHeader);
    var id = ["A", "B", "C", "D"];
    var i = 0;
    var answers = whichQuestions[a].answers;

    for (var answer in answers) {
        if (answers.hasOwnProperty(answer)) {
            var answerHeader = document.createElement("p");
            answerHeader.classList.add("answerHeader")
            answerHeader.setAttribute("id", id[i]);
            answerHeader.innerHTML = answer + " " + answers[answer];
            questions_E.appendChild(answerHeader);
            i = i + 1;
        }
    }
    var correctHeader_E = "Correct Answer";
    var falseHeader_E = "Incorrect Answer";

    correctOrFalse_E.innerHTML = "";

    var classNow = parseInt(players[playerNow].classNow[0]);
    var profile = players[playerNow].classNow[1];
    var answerHeaders = document.querySelectorAll(".answerHeader");
    answerHeaders.forEach((answerHeader1) => {
        answerHeader1.addEventListener("click", () => {
            if (whichQuestions[a].correctAnswer == answerHeader1.id) {
                console.log("Correct Answer");
                showAfterAnswerHeader();
                correctOrFalse_E.innerHTML = correctHeader_E;

                players[playerNow].points = players[playerNow].points + 5;
                positionNow = movePlayer(playerNow, n);
                if (playerNow == 0) {
                    T0++
                }
                else if (playerNow == 1) {
                    T1++
                }
                else if (playerNow == 2) {
                    T2++
                }
                else if (playerNow == 3) {
                    T3++
                }
            } else if (whichQuestions[a].correctAnswer !== answerHeader1.id) {
                correctOrFalse_E.innerHTML = falseHeader_E;
                positionNow = movePlayer(playerNow, -n);
                console.log("Incorrect " + positionNow);
                if (playerNow == 0) {
                    F0++
                }
                else if (playerNow == 1) {
                    F1++
                }
                else if (playerNow == 2) {
                    F2++
                }
                else if (playerNow == 3) {
                    F3++
                }
            }
            if (playerNow == 0) {
                srednia = T0 / (T0 + F0)
            }
            else if (playerNow == 1) {
                srednia = T1 / (T1 + F1)
            }
            else if (playerNow == 2) {
                srednia = T2 / (T2 + F2)
            }
            else if (playerNow == 3) {
                srednia = T3 / (T3 + F3)
            }
            console.log("srednia "+ srednia
            +" T0 " + T0
            +" T1 "+T1
            +" T2 " +T2
            +" T3 " + T3
            +" F0 " + F0
            +" F1 " + F1
            +" F2 " + F2
            +" F3 " + F3);
            if (players[playerNow].finished === true) {
                drukujSwiadectwo()
            }
            questions_E.innerHTML =
                `
        <div class="questionHeader"></div>
        <div class="questions"></div>
        `;
            questionCenter.style.display = "none";
            questionHeader.innerHTML = "";
                playerNow = playerNow + 1;
                if (playerNow >= players.length) {
                    playerNow = 0;
                }
                if (players[playerNow].finished === false) {

                    var players_E = document.querySelectorAll(".player");

                    players_E.forEach((player1) => {
                        console.log(playerNow);
                        if (player1.id.includes(playerNow)) {
                            player1.style.backgroundColor = "rgb(0, 102, 255)"
                        } else {
                            player1.style.backgroundColor = "green";
                        }
                    });
                }

            showPlayers();
            showPlayerSquares();
            if (redSquares.includes(positionNow)) {
                redSquareRandomChange(playerNow)
                console.log("Player" + playerNow + " is on red square");
            } if (greenSquares.includes(positionNow)) {
                functionsReceived(playerNow);
                functions_E.innerHTML = showFunctions(playerNow);
                showFunctionReceived();
            }
        });
    });

   
}

function losowePrzesunieciePlayera(playerNow) {
    console.log("losowePrzesunieciePlayera " + playerNow)
    let randomMove = Math.floor(Math.random() * 6) + 1;
    let ile = Math.floor(Math.random() * 2) + 1;
    ile = ile * -1
    randomMove = randomMove * ile
    console.log("Franek: wybierz funkcje: movePlayer(" + playerNow + "," + randomMove + ")  ")
    movePlayer(playerNow, randomMove)
}

let playerNotMove = 0;

function zmienPlayerNotMove() {
    console.log("zmienPlayerNotMove(  -1  )")
    playerNotMove = -1
}
function zabierzRuch(playerNow) {
    console.log("zabierzRuch: " + playerNow)
    playerNotMove = playerNow
}
function naStart(playerNow) {
    console.log("Na start: " + playerNow)
    movePlayer(playerNow, -1*players[playerNow].positionNow)
}

function redSquareRandomChange(playerNow) {
    let losuj = Math.floor(Math.random() * 3) + 1;
    console.log("Franek: redSquareRandomChange - wylosowano: " + losuj)
    if (losuj == 1) {
        losowePrzesunieciePlayera(playerNow)
    }
    else if (losuj == 2) {
        zabierzRuch(playerNow)
    }
    else if (losuj == 3) {
        naStart(playerNow)
    }

}

function showAfterAnswerHeader() {
    var correctOrFalse_E = document.querySelector(".correctOrFalse");
    correctOrFalse_E.style.display = "flex";
}
function hideAfterAnswerHeader() {
    var correctOrFalse_E = document.querySelector(".correctOrFalse");
    correctOrFalse_E.style.display = "none";
}
showFunctions
export {
    showAfterAnswerHeader,
    hideAfterAnswerHeader,
    generateQuestion,
    playerNow,
}