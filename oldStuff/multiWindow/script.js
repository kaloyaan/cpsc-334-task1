// Initialiazation

var button = document.getElementById("startButton");
var screens;

button.onclick = function() {
    openWin();
}

function openWin() {
    rectWindow = window.open("rectDrawer.html", "_blank", "location=0");
    //myWindow = window.open("rectDrawer.html", "", "width=8160, height=768");
}

$(window).on("message", function(e) {
    console.log("Orignal:", e.originalEvent);
});