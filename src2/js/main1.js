import { generateQuestion } from "./generateQuestion.js";
import { generatePlayers, players } from "./generatePlayers.js";
import { showPlayers } from "./generateFunctions.js";
import { hideFunctions_E } from "./generateFunctions.js";
import { moveASquares, saveFromRed } from "./playerFunctions.js";
import { hideFunctionReceived, showFunctionReceived } from "./playerFunctions.js";

var board = document.getElementById("board");
var board1 = document.getElementById("board1");
var board2 = document.getElementById("board2");
var board3 = document.getElementById("board3");

var redOrGreenSquares = [];
var redSquares = [5, 10, 24, 20, 27, 36, 45];
var greenSquares = [2, 8, 16, 26, 31, 44, 10];

function Square(squareId, redOrGreen) {
    this.squareId = squareId;
    this.redOrGreen = redOrGreen;
}

window.onload = generate();
function generate() {
    var id = 0;
    var board0_E = document.getElementById("board0");
    var board1_E = document.getElementById("board1");
    var board2_E = document.getElementById("board2");
    var board3_E = document.getElementById("board3");

    for (var i = 0; i < 17; i++) {
        var square_E = document.createElement("div");
        square_E.classList.add("square");
        square_E.id = "square" + id;
        board0_E.appendChild(square_E);
        id = id + 1;
    }
    for (var i = 16; i < 26; i++) {
        var square_E = document.createElement("div");
        square_E.classList.add("square");
        square_E.id = "square" + id;
        board1_E.appendChild(square_E);
        id = id + 1;
    }
    for (var i = 26; i < 43; i++) {
        var square_E = document.createElement("div");
        square_E.classList.add("square");
        square_E.id = "square" + id;
        board2_E.appendChild(square_E);
        id = id + 1;
    }
    id = 52;
    for (var i = 52; i >= 43; i--) {
        var square_E = document.createElement("div");
        square_E.classList.add("square");
        square_E.id = "square" + id;
        board3_E.appendChild(square_E);
        id = id - 1;
    }

    var squares = document.querySelectorAll(".square");

    for (var i = 1; i < squares.length; i++) {
        if (greenSquares.includes(i)) {
            var greenSquare = new Square(i, "green");
            redOrGreenSquares.push(greenSquare);
        }
        if (redSquares.includes(i)) {
            var redSquare = new Square(i, "red");
            redOrGreenSquares.push(redSquare);
        }
    }

    var squares = document.querySelectorAll(".square");

    squares.forEach((square) => {
        var changedSquareId = square.id.substring(6);
        for (var i = 0; i < redOrGreenSquares.length; i++) {
            if (redOrGreenSquares[i].squareId == changedSquareId && redOrGreenSquares[i].redOrGreen == "red") {
                square.classList.add("redSquare");
            } else if (redOrGreenSquares[i].squareId == changedSquareId && redOrGreenSquares[i].redOrGreen == "green") {
                square.classList.add("greenSquare");
            }
        }
    });
}
var functions_E = document.querySelector(".functions");

functions_E.addEventListener("click", function (e) {
    getPlayerFunctions(e);
});

function getPlayerFunctions(e) {
    var target = e.target;

    var functionsMain_E = document.querySelector(".functionsMain");
    var playerId = parseInt(functionsMain_E.id[9]);

    var functionToUse;
    if (target.classList.contains("functionUse")) {
        functionToUse = target.classList;
    } else {
        var function_E2 = target.parentNode;
        functionToUse = function_E2.classList;
    }

    functionToUse = Array.from(functionToUse);

    if (functionToUse.includes("moveASquares") &&
        document.querySelector(".moveASquaresRemaining").innerHTML > 0) {
        moveASquares(playerId);
    }
    if (functionToUse.includes("saveFromRed") &&
        document.querySelector(".saveFromRedRemaining").innerHTML > 0) {
        saveFromRed(playerId, playerId);
        var indexOfItem = 0;
        var deletedOne = false;
        players[playerId]["functions"].forEach((item) => {
            if (deletedOne == false) {
                if (item.functionName == "saveFromRed") {
                    players[playerId].functions.splice(indexOfItem, 1);
                    deletedOne = true;
                    console.log("number of saveFromRed - 1");
                }
            }
            indexOfItem++;
        });
    }

    if (functionToUse.includes("putOnRed") &&
        document.querySelector(".putOnRedRemaining").innerHTML > 0) {
        saveFromRed(playerId, playerId);
        var indexOfItem = 0;
        var deletedOne = false;
        players[playerId]["functions"].forEach((item) => {
            if (deletedOne == false) {
                if (item.functionName == "putOnRed") {
                    console.log(players[playerId].functions);
                    players[playerId].functions.splice(indexOfItem, 1);
                    deletedOne = true;
                    console.log("number of putOnRed - 1");
                }
            }
            indexOfItem++;
        });
    }
}

function updateFunctions_E(functionName) {
    if (functionToUse.includes("saveFromRed") &&
        document.querySelector(".saveFromRedRemaining").innerHTML > 0) {
        saveFromRed(playerId, playerId);
        var indexOfItem = 0;
        var deletedOne = false;
        players[playerId]["functions"].forEach((item) => {
            if (deletedOne == false) {
                if (item.functionName == "saveFromRed") {
                    players[playerId].functions.splice(indexOfItem, 1);
                    deletedOne = true;
                    console.log("number of saveFromRed - 1");
                }
            }
            indexOfItem++;
        });
    }

    if (functionToUse.includes("putOnRed") &&
        document.querySelector(".putOnRedRemaining").innerHTML > 0) {
        saveFromRed(playerId, playerId);
        var indexOfItem = 0;
        var deletedOne = false;
        players[playerId]["functions"].forEach((item) => {
            if (deletedOne == false) {
                if (item.functionName == "putOnRed") {
                    players[playerId].functions.splice(indexOfItem, 1);
                    deletedOne = true;
                    console.log("number of putOnRed - 1");
                }
            }
            indexOfItem++;
        });
    }
}



var impossibleQuestions = [
    {
        question: 'Ile to 100!',
        answers: { A: '12003929', B: '1438212', C: '1', D: '-1' },
        correctAnswer: 'A'
    },
];

function start() {
    var afterMenu = document.querySelector(".afterMenu");
    var mainMenu = document.querySelector(".mainMenuCenter");
    var players_E = document.querySelector(".players");
    var playersCenter = document.querySelector(".playersCenter");
    afterMenu.style.display = "block";
    mainMenu.style.display = "none";
    players_E.style.display = "flex";
    playersCenter.style.display = "flex";
}


function onSquare(a, howMuchSquaresForward) {
    if (a + howMuchSquaresForward > 27) {
        console.log(-1 * (27 - (howMuchSquaresForward + a) + 1));
    } else if (howMuchSquaresForward + a < 0) {
        console.log(27 + howMuchSquaresForward + a + 1);
    }
}
window.start = start;
window.generate = generate;
window.generatePlayers = generatePlayers;
window.generateQuestion = generateQuestion;
window.onSquare = onSquare;
window.showPlayers = showPlayers;
window.hideFunctions_E = hideFunctions_E;
window.hideFunctionReceived = hideFunctionReceived;
window.showFunctionReceived = showFunctionReceived;

export {
    redSquares,
    greenSquares,
    redOrGreenSquares,
    onSquare
}