// Element references required
var canvas = document.getElementById('canvas');
var overlay = document.getElementById('overlay');

// Function to resize the canvas on resize
function resize() {
    console.log('resize');

    // Set the width and height variables to whatever default variables are available
    WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    // Set the size of the canvas and overlay to the calculated width and height
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    overlay.width = WIDTH;
    overlay.height = HEIGHT;				
}

window.onresize = function() {
    resize()
}

window.onload = function() {
    resize()
}