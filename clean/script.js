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

// Calculate where the canvas is on the window (used to help calculate mouseX/mouseY)
var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = $canvas.scrollLeft();
var scrollY = $canvas.scrollTop();

// A flag that is true when the user is dragging the mouse
var isDown = false;

// Vars that hold the mouse positions and rectangle dimensions
var startX;
var startY;
var prevStartX = 0;
var prevStartY = 0;
var prevWidth  = 0;
var prevHeight = 0;

// Variables to store the number of screens and their coordinates
var screenCount = 0;
var screens = [];

// Save previously displayed text
var prevText = "Display Coordinates";



// Initialiazation

// When the window loads, open fullscreen and run the user setup function
window.onload = function() {
    initScreens();
}

// Prompt the user for the total number of screens and create an array of empty screen dimensions
function initScreens() {
    let screenCount = window.prompt('This program aims to semi-automatically discover the mapping of screen space to physical space in the Leeds Studio at the Yale CCAM. To use it, draw rectangles with your mouse covering a single "display" and input the screen number (1 to the number of screens from left to right) on the following prompt. Please enter the number of screens/displays you see in the studio. Click the canvas to start.');
    screens = Array.from({length: screenCount}, (_, index) => 'Screen ' + (index + 1).toString() + ':')
    header.innerText = screens.join('\n');
}



// Window resizing

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



// Rectangle drawing

// 
function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    // Save the starting x/y of the rectangle
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // Set a flag to indicate that the drag has begun
    isDown = true; 
}

// 
function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;
    ctxo.strokeRect(prevStartX, prevStartY, prevWidth, prevHeight);
    console.log(prevStartX, prevStartY, prevStartX + prevWidth, prevStartY + prevHeight);
	
    // Write to the display
    let x1 = prevStartX.toString();
    let y1 = prevStartY.toString();
    let x2 = (prevStartX + prevWidth).toString();
    let y2 = (prevStartY + prevHeight).toString();
    
    let screen = prompt("What screen number was that rectangle?", "");

    if (screen != null) {
        let text = prevText + "\n" + screen + ': ' +  x1 +', ' + x2 +', ' + y1 + ', ' + y2;
        header.innerText = text;
        prevText = text;
        screens[screen - 1] = 'Screen ' + screen + ': ' + (x2 - x1) + ' x ' + (y2 - y1) + ', x1: ' + x1 +', x2: ' + x2 +', y1: ' + y1 + ', y2: ' + y2;
        console.log(screens);
        header.innerText = screens.join('\n');
    }
    
    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = color;
    ctxo.strokeStyle = color;
}

function handleMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;
}

function handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    // if we're not dragging, just return
    if (!isDown) {
        return;
    }

    // get the current mouse position
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // calculate the rectangle width/height based
    // on starting vs current mouse position
    var width = mouseX - startX;
    var height = mouseY - startY;

		// clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw a new rect from the start position 
    // to the current mouse position
    ctx.strokeRect(startX, startY, width, height);
    
	prevStartX = startX;
	prevStartY = startY;

	prevWidth  = width;
	prevHeight = height;
}

// listen for mouse events
$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});

$("#canvas").mouseout(function (e) {
    handleMouseOut(e);
});