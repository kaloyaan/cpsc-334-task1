// Initialiazation

var button = document.getElementById("startButton");

button.onclick = function() {
    openWin()
}

function openWin() {
    myWindow = window.open("index.html", "", "width=8160, height=768");
}