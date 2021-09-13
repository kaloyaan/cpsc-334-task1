// Global variables and setup

// Get global references to the header, the canvas, and the overlay as well as the canvas and overlay context
var body = document.querySelector("body");
var header = document.querySelector("h1");
var canvas = document.getElementById("canvas");
var overlay = document.getElementById("overlay");
var ctx = canvas.getContext("2d");
var ctxo = overlay.getContext("2d");

// Style the rectangle borders randomly
color = '#' + Math.floor(Math.random() * 16777215).toString(16);
ctx.strokeStyle = color;
ctx.lineWidth = 3;
ctxo.strokeStyle = color;
ctxo.lineWidth = 3;



// Initialiazation

// When the window loads, open fullscreen and run the user setup function
window.onload = function() {
    initScreens();
    window.resizeTo(500, 768);
}

window.onclick = function() {
    window.resizeTo(500, 768);
    //requestFullScreen(document.documentElement);
}

function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

// Prompt the user for the total number of screens and create an array of empty screen dimensions
function initScreens() {
    let screenCount = window.prompt('This program aims to semi-automatically discover the mapping of screen space to physical space in the Leeds Studio at the Yale CCAM. To use it, draw rectangles with your mouse covering a single "display" and input the screen number (1 to the number of screens from left to right) on the following prompt. Please enter the number of screens/displays you see in the studio. Click the canvas to start.');
    screens = Array.from({length: screenCount}, (_, index) => 'Screen ' + (index + 1).toString() + ':')
    header.innerText = screens.join('\n');
}



// Handle resizing

// When the window is resized, resize the canvas accordingly
window.onresize = function() {
    resizeCanvas()
}

// Resize the canvas to be the entire screen
function resizeCanvas() {
    WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    overlay.width = WIDTH;
    overlay.height = HEIGHT;                
}



// // Record position of mouse clicks

// // Listen for mouse clicks
// document.addEventListener('click', printMousePos, true);

// // Print the current position of the mouse
// function printMousePos(e) {
//     cursorX = e.pageX;
//     cursorY = e.pageY;
//     $("#cordinates").text("pageX: " + cursorX + ", pageY: " + cursorY);
// }