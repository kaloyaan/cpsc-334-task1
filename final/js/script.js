// Global variables and setup

// Get global references to the header, the canvas, and the overlay as well as the canvas and overlay context
var canvas = document.getElementById("canvas");
var header = document.querySelector("h1");
var overlay = document.getElementById("overlay");
var ctx = canvas.getContext("2d");
var ctxo = overlay.getContext("2d");

// Style the rectangle borders randomly
color = '#' + Math.floor(Math.random() * 16777215).toString(16);
ctx.strokeStyle = color;
ctx.lineWidth = 5;
ctxo.strokeStyle = color;
ctxo.lineWidth = 5;

// Calculate where the canvas is on the window (used to help calculate mouseX/mouseY)
var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = $canvas.scrollLeft();
var scrollY = $canvas.scrollTop();

// Variables to signal if the mouse is clicked down as well as to store mouse and rectangle positions
var isDown = false;
var startX;
var startY;
var prevStartX = 0;
var prevStartY = 0;
var prevWidth  = 0;
var prevHeight = 0;

// Variable to contain the JSON output (updated dynamically)
var displayOutput = {};



// Initialiazation

// When the page loads, initialize it with instructions
window.onload = function() {
    initScreens()
}

// Function to initialize the program with instructions and a virtual display count
function initScreens() {
    // Prompt the user with instructions and get the number of virtual displays
    window.alert('This program aims to semi-automatically discover the mapping of screen space to physical space in the Leeds Studio at the Yale CCAM. To use it, draw rectangles with your mouse covering a single "display" from top left to bottom right and input the screen number (1 to the number of screens from left to right) on the following prompt.');
    window.alert('Now, cycle to the leftmost desktop (with SHIFT + WIN + LEFT) you wish to address and make sure the window is fullscreened there (by pressing F11). Press F5 to reload and start the program on your desired display. When you have finished this virtual display, press SHIFT + WIN + LEFT to go to the next. When you are completely done, press the "d" key to save a JSON file with the coordinates.');
    // let displayCount = window.prompt('First, please enter the number of virtual desktops you wish to consider. To determine this, make this window full screen by pressing F11 and then cycle through the desktops.');
    
    // // Fill the displayOutput with empty virtual display coordinates
    // for (let i = 1; i <= displayCount; i++) { 
    //     displayOutput['Virtual Display ' + i] = [];
    // }
}



// File saving

// Listen for a "done" keypress of "d" and open the saveFile page when pressed
document.onkeypress = function (e) {
    e = e || window.event;
    if (e.key == 'd') {
        let rectWindow = window.open("saveFile.html", JSON.stringify(displayOutput), "");
    }
};



// Rectangle drawing

// Create listeners for mouse movements/rectangle drawing
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

// Function to deal with pressing the mouse to start drawing a rectangle
function handleMouseDown(e) {
    // Prevent further default action and interaction of the event
    e.preventDefault();
    e.stopPropagation();

    // Save the starting coordinates of the drawn rectangles
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // Indicate that the user has begun drawing the rectangle
    isDown = true;
}

// Function to deal with unpressing the mouse to finish drawing a rectangle
function handleMouseUp(e) {
    // Prevent further default action and interaction of the event
    e.preventDefault();
    e.stopPropagation();

    // When the mouse is unclicked, change the flag variable and draw the corresponding rectangle
    isDown = false;
    ctxo.strokeRect(prevStartX, prevStartY, prevWidth, prevHeight);
	
    // Store the coordinates 
    let x1 = prevStartX.toString();
    let y1 = prevStartY.toString();
    let x2 = (prevStartX + prevWidth).toString();
    let y2 = (prevStartY + prevHeight).toString();
    
    // Prompt the user to input the virtual display and the screen number
    let displayNum = prompt("From which virtual display (from left to right starting at 1) did that rectangle come?", "");
    let screenNum = prompt("From which screen number (from left to right starting at 1, including all virtual displays) did that rectangle come?", "");

    // Modify the displayOutput according to the new rectangle and user input
    if (displayNum != null && screenNum != null) {
        if (!('Virtual Display ' + displayNum in displayOutput)) {
            displayOutput['Virtual Display ' + displayNum] = [];
        }
        displayOutput['Virtual Display ' + displayNum].push({'Screen Number': screenNum, 'width': Math.abs(x2 - x1), 'height': Math.abs(y2 - y1), 'x1': x1, 'x2': x2, 'y1': y1, 'y2': y2});
    }
    
    // Style the rectangle borders randomly
    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctxo.strokeStyle = color;
    ctxo.lineWidth = 5;
}

// Function to deal with the mouse going outside the boundaries
function handleMouseOut(e) {
    // Prevent further default action and interaction of the event
    e.preventDefault();
    e.stopPropagation();

    // Change the flag to signal mouse unpressed
    isDown = false;
}

// Function to deal with the mouse moving and rectangle drawing
function handleMouseMove(e) {
    // Prevent further default action and interaction of the event
    e.preventDefault();
    e.stopPropagation();

    // If we're not dragging, return to end the function
    if (!isDown) {
        return;
    }

    // While dragging, update variables with the current mouse position
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);


    // Calculate current rectangle width/height from start and current positions
    var width = mouseX - startX;
    var height = mouseY - startY;

	// Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a new rectangle from the start position to the current mouse position
    ctx.strokeRect(startX, startY, width, height);
    
    // Set the global previous variables
	prevStartX = startX;
	prevStartY = startY;
	prevWidth  = width;
	prevHeight = height;
}



// References

// Rectangle drawing: https://jsfiddle.net/richardcwc/ukqhf54k/, http://jsfiddle.net/xkmqz9ho/
// Screen resizing: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
// Key pressing: https://stackoverflow.com/questions/16089421/simplest-way-to-detect-keypresses-in-javascript
// File saving: http://jsfiddle.net/UselessCode/qm5AG/, https://stackoverflow.com/questions/26158468/create-json-file-using-blob/26158579
// Classic coloring: https://superuser.com/questions/361297/what-colour-is-the-dark-green-on-old-fashioned-green-screen-computer-displays
