console.log(whichQuestions[a].correctAnswer + " " + answerHeader1.id);

console.log(positionNow);
var squaresToStart = 0;
for (var i = positionNow; i >= 0; i--) {
    squaresToStart = squaresToStart + 1;
}
console.log("Squares to start " + squaresToStart);
var sqauresRemaining = n - squaresToStart;
positionNow = 27 - sqauresRemaining;
players[playerNow].positionNow = positionNow;
console.log(positionNow);
if (players[playerNow].classNow == 1) {
    console.log("1");
}