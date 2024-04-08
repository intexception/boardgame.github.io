import { players } from "./generatePlayers.js";
import { hideAfterAnswerHeader, showAfterAnswerHeader } from "./generateQuestion.js";

var functions = [
    {
        functionName: "moveASquaresFunction",
        functionDescription: "Move another player 1 - 6 squares"
    },
    {
        functionName: "putOnRedFunction",
        functionDescription: "Put another player on red square"
    },
    {
        functionName: "saveFromRedFunction",
        functionDescription: "Save yourself when on red square"
    }
];

function generateFunctions(playerId) {
    var n = Math.floor(Math.random() * functions.length);
    var functionToUse = functions[n];
    return functionToUse;
}
var function_E = document.querySelector(".functions");
function showHideFunctions_E() {
    function_E.classList.toggle("hidden");
}

function showFunctions(playerId) {
    var functionsOfPlayer = players[playerId].functions;
    var moveASquares = 0;
    var putOnRed = 0;
    var saveFromRed = 0;
    for (var i = 0; i < functionsOfPlayer.length; i++) {
        if (functionsOfPlayer[i].functionName == "moveASquaresFunction") {
            moveASquares++;
        } else if (functionsOfPlayer[i].functionName == "putOnRedFunction") {
            putOnRed++;
        } else if (functionsOfPlayer[i].functionName == "saveFromRedFunction") {
            saveFromRed++;
        }
    }

    return `
    <div class="functionsMain" id="functions` + playerId +`">
        <div class="goBackHeader">
            <div class="goBack" onclick="hideFunctions_E();"></div>
        </div>
        <div class="functionUse moveASquares">
            <h3>Move another player 1 - 6 squares</h3>
            <p class="moveASquaresRemaining">` + moveASquares + `</p>
        </div>

        <div class="functionUse putOnRed">
            <h3>Put another player on red square</h3>
            <p class="putOnRedRemaining">` + putOnRed + `</p>
        </div>

        <div class="functionUse saveFromRed">
            <h3>Save yourself when on red square</h3>
            <p class="saveFromRedRemaining">` + saveFromRed + `</p>
        </div>
    </div>`;
}
function showPlayers() {
    for (var i = 0; i < players.length; i++) {
        (function (index) {
            var playerSquare_E = document.getElementById("playerSquare" + index);
            playerSquare_E.innerHTML = "";
            playerSquare_E.style.display = "flex";
            var playerId_E = document.createElement("h3");
            playerId_E.innerHTML = "Player Id: " + players[index].playerId;

            var playerClass_E = document.createElement("h3");
            playerClass_E.innerHTML = "Klasa: " + players[index].classNow;

            var playerPositionNow_E = document.createElement("h3");
            playerPositionNow_E.innerHTML = "Position: " + players[index].positionNow;

            playerSquare_E.appendChild(playerId_E);
            playerSquare_E.appendChild(playerClass_E);
            playerSquare_E.appendChild(playerPositionNow_E);

            var playerFunctions_E = document.createElement("div");
            playerFunctions_E.classList.add("playerFunctions");
            playerFunctions_E.innerHTML = "Show Functions";

            playerFunctions_E.addEventListener("click", function () {
                var playerSquare_Id = index;

                var function_E = document.querySelector(".functions");
                hideAfterAnswerHeader();

                function_E.innerHTML = showFunctions(playerSquare_Id);

                showFunctions_E();
            });

            playerSquare_E.appendChild(playerFunctions_E);
        })(i);
    }
}



var functions_E = document.querySelector(".functions");

function hideFunctions_E() {
    functions_E.classList.add("hidden");
}

function showFunctions_E() {
    functions_E.classList.remove("hidden");
}

function showPlayerSquares() {
    console.log(players);
    players.forEach((player) => {
        var playerSquareId = parseInt(player.playerId);
        var playerSquare_E = document.querySelector("#playerSquare" + playerSquareId);

        playerSquare_E.style.zIndex = "2";
    });
}

function hidePlayerSquares() {
    console.log(players);
    players.forEach((player) => {
        var playerSquareId = parseInt(player.playerId);
        var playerSquare_E = document.querySelector("#playerSquare" + playerSquareId);

        playerSquare_E.style.zIndex = "0";
    });
}

function showPlayerUseFunctions_E() {
    var playerUseFunctionMain_E = document.querySelector(".playerUseFunctionMain");
    playerUseFunctionMain_E.style.display = "flex";
}

function hidePlayerUseFunctions_E() {
    var playerUseFunctionMain_E = document.querySelector(".playerUseFunctionMain");
    playerUseFunctionMain_E.style.display = "none";
    console.log("1");
}

window.hidePlayerSquares = hidePlayerSquares;
window.showPlayerSquares = showPlayerSquares;
export {
    generateFunctions,
    showFunctions,
    showPlayers,
    hidePlayerSquares,
    showPlayerSquares,
    hideFunctions_E,
    showFunctions_E,
    showPlayerUseFunctions_E,
    hidePlayerUseFunctions_E,
    functions,
}