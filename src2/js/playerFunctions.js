import { players } from "./generatePlayers.js";
import { showPlayerUseFunctions_E, hidePlayerUseFunctions_E, hideFunctions_E, hidePlayerSquares } from "./generateFunctions.js";
import { playerNow } from "./generateQuestion.js";
import { greenSquares, redSquares } from "./main1.js";
import { generateFunctions, showFunctions } from "./generateFunctions.js";
import { movePlayer } from "./movePlayer.js";

function moveASquares(usedByPlayerId) {
    showPlayerUseFunctions_E();

    console.log("function moveASquares is used");
    var playerUseFunction_E = document.querySelector(".playerUseFunction");

    playerUseFunction_E.innerHTML = "";

    var functionHeader_E = document.createElement("p");
    functionHeader_E.classList.add("functionHeader");


    var goBackHeader_E = document.createElement("div");
    goBackHeader_E.classList.add("goBackHeader");

    var goBack_E = document.createElement("div");
    goBack_E.classList.add("goBack");

    goBackHeader_E.appendChild(goBack_E);
    goBack_E.onclick = "hidePlayerUseFunctions_E();";
    playerUseFunction_E.appendChild(goBackHeader_E);


    var playerIds_E = document.createElement("div");
    playerIds_E.classList.add("playerIds");

    var functionUse_E = document.createElement("div");
    functionUse_E.classList.add("functionUseInput");

    var moveSquares_E = document.createElement("div");
    moveSquares_E.classList.add("moveSquares");

    functionHeader_E.innerHTML = "Move another player 1 - 6 squares";
    playerUseFunction_E.appendChild(functionHeader_E);

    var playerIdNow;
    for (var i = 0; i < players.length; i++) {
        (function (index) {
            var playerId_E = document.createElement("div");
            playerId_E.classList.add("playerIdToSelect");
            playerId_E.innerHTML = "Player " + index;
            playerId_E.id = "playerIdToSelect" + index;

            playerId_E.addEventListener("click", () => {
                playerIdNow = playerId_E.id[16];
                console.log(playerIdNow);
                var allPlayerId_E = document.querySelectorAll(".playerIdToSelect");
                allPlayerId_E.forEach((item) => {
                    item.style.display = "none";
                });
                showSquaresToSelect();
            });
            playerIds_E.appendChild(playerId_E);
        })(i);

    }
    for (var i = 1; i <= 6; i++) {
        (function (index) {
            var moveSquare_E = document.createElement("div");
            moveSquare_E.innerHTML = index;
            moveSquare_E.classList.add("squaresToSelect");
            moveSquare_E.style.width = "80pt";
            moveSquare_E.style.height = "80pt";

            playerIds_E.appendChild(moveSquare_E);

            moveSquare_E.addEventListener("click", () => {
                var n = parseInt(moveSquare_E.innerHTML);

                movePlayer(playerIdNow, n);

                console.log(players);
                var allMoveSquares_E = document.querySelectorAll(".squaresToSelect");
                allMoveSquares_E.forEach((item) => {
                    item.style.display = "none";
                });

                hidePlayerUseFunctions_E();
                hidePlayerSquares();

                var indexOfItem = 0;
                var deletedOne = false;
                usedByPlayerId = parseInt(usedByPlayerId);
                players[usedByPlayerId]["functions"].forEach((item) => {
                    console.log(item.functionName);
                    if (deletedOne == false) {
                        if (item.functionName == "moveASquaresFunction") {
                            players[usedByPlayerId].functions.splice(indexOfItem, 1);
                            //players[usedByPlayerId].functions[indexOfItem] = null;
                            console.log(item.functionName);
                            deletedOne = true;
                            console.log("number of moveASquares - 1");
                        }
                    }
                    indexOfItem++;
                });
                let functions_E = document.querySelector(".functions");

                functions_E.innerHTML = showFunctions(playerNow);
            });
        })(i);
    }
    playerUseFunction_E.appendChild(playerIds_E);
}

function saveFromRed(playerId, usedByPlayerId) {
    showPlayerUseFunctions_E();
    console.log("function saveFromRed is used");
    var playerUseFunction_E = document.querySelector(".playerUseFunction");

    playerUseFunction_E.innerHTML = "";

    var functionHeader_E = document.createElement("p");
    functionHeader_E.classList.add("functionHeader");

    functionHeader_E.innerHTML = "Save yourself when on red square";

    var goBackHeader_E = document.createElement("div");
    goBackHeader_E.classList.add("goBackHeader");

    var goBack_E = document.createElement("div");
    goBack_E.classList.add("goBack");

    goBackHeader_E.appendChild(goBack_E);
    goBack_E.onclick = "hidePlayerUseFunctions_E();";

    playerUseFunction_E.appendChild(goBackHeader_E);
    playerUseFunction_E.appendChild(functionHeader_E);
    console.log(players[playerId].positionNow);

    var squareIds = document.createElement("div");
    squareIds.classList.add("squareIds");

    for (var i = 0; i < greenSquares.length; i++) {
        (function (index) {
            var squareId_E = document.createElement("div");
            squareId_E.classList.add("squareId");
            squareId_E.innerHTML = greenSquares[i];
            squareIds.appendChild(squareId_E);

            squareId_E.addEventListener("click", () => {
                var positionNow = players[playerId].positionNow;
                var nextPosition = parseInt(squareId_E.innerHTML);
                console.log("Position now: " + positionNow);

                console.log("Player " + playerId + " is going to " + nextPosition);

                players[playerId].positionNow = nextPosition;

                var indexOfItem = 0;
                var deletedOne = false;

                usedByPlayerId = parseInt(usedByPlayerId);
                players[usedByPlayerId]["functions"].forEach((item) => {
                    console.log(item.functionName);
                    if (deletedOne == false) {
                        if (item.functionName == "saveFromRedFunction") {
                            console.log(item.functionName);
                            players[usedByPlayerId].functions.splice(indexOfItem, 1);
                            deletedOne = true;
                            console.log("number of saveFromRed - 1");
                        }
                    }
                    indexOfItem++;
                });
                var squares = document.querySelectorAll(".square");
                squares.forEach((item) => {
                    item.innerHTML = "";
                });
                for (var i = 0; i < players.length; i++) {
                    var squareId = players[i].positionNow;
                    var player = document.createElement("div");
                    player.classList.add("player");
                    player.innerHTML = i;
                    player.id = "player" + playerNow;

                    var square = document.getElementById("square" + squareId);
                    square.appendChild(player);
                }
                hidePlayerUseFunctions_E();

                let functions_E = document.querySelector(".functions");

                functions_E.innerHTML = showFunctions(playerNow);
            });
        })(i);

    }
    playerUseFunction_E.appendChild(squareIds);

    if (redSquares.includes(players[playerId].positionNow)) {
        console.log("1");
    }
}
function functionsReceived(playerId) {
    var functions_E = document.querySelector(".functions");

    console.log("Player" + playerId + " is on green square");
    var functionName = generateFunctions();
    console.log(players);

    players[playerId].functions.push(functionName);

    var functionReceived_E = document.createElement("div");
    functionReceived_E.classList.add("functionReceived");

    var functionReceivedMain_E = document.querySelector(".functionReceivedMain");
    functionReceivedMain_E.innerHTML = "";

    var goBackHeader_E = document.createElement("div");
    goBackHeader_E.classList.add("goBackHeader");

    var goBack_E = document.createElement("div");
    goBack_E.classList.add("goBack");

    (function () {
        goBack_E.addEventListener("click", () => {
            hideFunctionReceived();
        });
    })();

    goBackHeader_E.appendChild(goBack_E);

    functionReceived_E.appendChild(goBackHeader_E);
    var functionHeader_E = document.createElement("h2");
    functionHeader_E.innerHTML = "You get a function " + functionName.functionName;

    functionReceived_E.appendChild(functionHeader_E);
    functionReceivedMain_E.appendChild(functionReceived_E);

    console.log("You get a function " + functionName.functionName);
    functions_E.innerHTML = showFunctions(playerId);
    showFunctionReceived();

}

function showFunctionReceived() {
    var functionReceivedMain_E = document.querySelector(".functionReceivedMain");
    functionReceivedMain_E.style.display = "flex";
}
function hideFunctionReceived() {
    var functionReceivedMain_E = document.querySelector(".functionReceivedMain");
    functionReceivedMain_E.style.display = "none";
}
function showFunctionUseInput() {
    var functionUseInput_E = document.querySelector(".functionUseInput");
    functionUseInput_E.style.display = "block";
}
function hideFunctionUseInput() {
    var functionUseInput_E = document.querySelector(".functionUseInput");
    functionUseInput_E.style.display = "none";
}

function showSquaresToSelect() {
    var allSquaresToSelect_E = document.querySelectorAll(".squaresToSelect");
    allSquaresToSelect_E.forEach((item) => {
        item.style.display = "flex";
    });
}
function hideSquaresToSelect() {
    var allSquaresToSelect_E = document.querySelectorAll(".squaresToSelect");
    allSquaresToSelect_E.forEach((item) => {
        item.style.display = "none";
    });
}
export {
    moveASquares,
    saveFromRed,
    showFunctionUseInput,
    hideFunctionUseInput,
    showSquaresToSelect,
    hideSquaresToSelect,
    functionsReceived,
    hideFunctionReceived,
    showFunctionReceived,
}
