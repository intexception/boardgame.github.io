import { showFunctions_E, hideFunctions_E } from "./generateFunctions.js";
import { showPlayers } from "./generateFunctions.js";


var players = [];
function Player(playerId, positionNow, points, profile, classNow, functions, finished) {
    this.playerId = playerId;
    this.positionNow = positionNow;
    this.points = points;
    this.profile = profile;
    this.classNow = classNow;
    this.functions = functions;
    this.finished = finished;
}

var profiles = ["Programista", "Informatyk", "Robotyk", "Elektryk"];

var functions_E = document.querySelector(".functions");

function generatePlayers() {
    var a = parseInt(document.querySelector(".howMuchPlayers").value)-1;
    if (a <= 0 || a > 4) {
        console.log("Wrong number of players");
    } else {
        for (var i = 0; i <= a; i++) {
            var n = Math.floor(Math.random() * profiles.length);
            var profile = profiles[n];
            profiles.splice(n, 1);
            var player = new Player(i, 0, 0, profile, 1 + profile[0], [], false);
            players.push(player);
        }
        var start = document.querySelector(".square");
        for (var i = 0; i < players.length; i++) {
            createUserData(players[i]);
            var player = document.createElement("div");
            player.classList.add("player");
            player.id = "player" + i;
            player.innerHTML = i;
            start.appendChild(player);
        }
        var players_E = document.querySelector(".players");
        players_E.style.display = "none";
        var board = document.querySelector(".board");
        var playersCenter = document.querySelector(".playersCenter");
        board.style.display = "block";
        playersCenter.style.display = "none";
        showPlayers();
        hideFunctions_E();
    }
}
function createUserData(user) {
    var main_E = document.createElement("div");
    main_E.classList.add("main_E");

    var userHeader = document.createElement("h1");
    userHeader.innerHTML = user.profile;
}

export {
    createUserData,
    generatePlayers,
    players
}