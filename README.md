# cpsc-334-task1
Code for Task 1 for CPSC334

## Task Description
- Write a program to discover the mapping of screen space to physical space.
- Your program should be semi-automatic in that it may require human input.

## Usage Instructions

### Screen Mapping
- This program aims to semi-automatically discover the mapping of screen space to physical space in the Leeds Studio at the Yale CCAM. To use it, draw rectangles with your mouse covering a single "display" from top left to bottom right and input the screen number (1 to the number of screens from left to right) on the following prompt.
- Now, cycle to the leftmost desktop (with SHIFT + WIN + LEFT) you wish to address and make sure the window is fullscreened there (by pressing F11). Press F5 to reload and start the program on your desired display. When you have finished this virtual display, press SHIFT + WIN + LEFT to go to the next. When you are completely done, press the "d" key to save a JSON file with the coordinates.
### Output
- The output is leedsConfiguration.json, a JSON file with the coordinates detialing the virtual display, screen number, screen dimensions, and the dimensions of the drawn rectangle.

## JavaScript Approach Analysis

### Benefits
- Unlike Python, Javascript can run on anything with a browser.
- Did not have to change system configuration to make program work.
### Detriments
- The current system configruation does not allow us to run across virtual displays.
- The process of utilzing full screen is a bit janky.
- To use all the features of Javascript, would need to run on a server.
- Program is currently running on a file.

## Potential Pitfalls
- Sometimes when drawing a rectangle, a prompt does not immendiately appear. To fix, click the center of the rectangle to initiate the prompt.
- If you draw a rectangle and did not want to save it, you could hit 'cancel' on the prompt.
