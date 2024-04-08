import { players } from "./generatePlayers.js";

function movePlayer(playerId, n) {
    var allPlayers_E = document.querySelectorAll(".player");

    allPlayers_E.forEach((player) => {
        player.backgroundColor = "rgb(0, 102, 255)";
    });

    var positionNow = players[playerId].positionNow;
    console.log("Position now: " + positionNow);

    console.log("Player " + playerId + " is going forward by " + n);
    positionNow += n;
    if (positionNow < 0) {
        positionNow = 51 + positionNow;
        console.log("Position now: " + positionNow);
    } else if (positionNow + n > 50) {
        positionNow = positionNow - 51;
        if (positionNow < 0) {
            positionNow = 51 + positionNow;
        }
        console.log("Position now: " + positionNow);
    }
    console.log("Position now: " + positionNow);
    players[playerId].positionNow = positionNow;


    var squares = document.querySelectorAll(".square");
    squares.forEach((item) => {
        item.innerHTML = "";
    });
    for (var i = 0; i < players.length; i++) {
        var squareId = players[i].positionNow;
        var player = document.createElement("div");
        player.classList.add("player");
        player.innerHTML = i;
        player.id = "player" + i;

        if (player.id.includes(playerId)) {
            console.log("1");
            player.style.backgroundColor = "rgb(0, 102, 255)"
        }
        var square = document.getElementById("square" + squareId);
        square.appendChild(player);
    }

    return positionNow;
}

export {
    movePlayer
}