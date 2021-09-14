// get references to the canvas and context
var canvas = document.getElementById("canvas");
var overlay = document.getElementById("overlay");
var ctx = canvas.getContext("2d");
var ctxo = overlay.getContext("2d");

// style the context
color = '#' + Math.floor(Math.random() * 16777215).toString(16);
ctx.strokeStyle = color;
ctx.lineWidth = 3;
ctxo.strokeStyle = color;
ctxo.lineWidth = 3;

// calculate where the canvas is on the window
// (used to help calculate mouseX/mouseY)
var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = $canvas.scrollLeft();
var scrollY = $canvas.scrollTop();

// this flag is true when the user is dragging the mouse
var isDown = false;

// these vars will hold the starting mouse position
var startX;
var startY;

var prevStartX = 0;
var prevStartY = 0;

var prevWidth  = 0;
var prevHeight = 0;

var screenCount = 0;
var screens = [];

// save previously displayed text
var prevText = "Rectangle Coordinates";

function initScreens() {
    let screenCount = window.prompt('This program aims to semi-automatically discover the mapping of screen space to physical space in the Leeds Studio at the Yale CCAM. To use it, draw rectangles with your mouse covering a single "display" and input the screen number (1 to the number of screens from left to right) on the following prompt. Please enter the number of screens/displays you see in the studio.');
    screens = Array.from({length: screenCount}, (_, index) => 'Screen ' + (index + 1).toString() + ':')
    //screens = Array(screenCount).fill('');
    console.log(screens);
}

window.onload = function() {
    initScreens()
}

function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    // save the starting x/y of the rectangle
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // set a flag indicating the drag has begun
    isDown = true;
}

function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    // the drag is over, clear the dragging flag
    isDown = false;
    ctxo.strokeRect(prevStartX, prevStartY, prevWidth, prevHeight);
    console.log(prevStartX, prevStartY, prevStartX + prevWidth, prevStartY + prevHeight);
	
    //write to display
    let x1 = prevStartX.toString();
    let y1 = prevStartY.toString();
    let x2 = (prevStartX + prevWidth).toString();
    let y2 = (prevStartY + prevHeight).toString();
    
    let screen = prompt("What screen number was that rectangle?", "");

    if (screen != null) {
        let text = prevText + "\n" + screen + ': ' +  x1 +', ' + x2 +', ' + y1 + ', ' + y2;
        prevText = text;
        screens[screen - 1] = 'Screen ' + screen + ': ' + (x2 - x1) + ' x ' + (y2 - y1) + ', x1: ' + x1 +', x2: ' + x2 +', y1: ' + y1 + ', y2: ' + y2;
        console.log(screens);
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
