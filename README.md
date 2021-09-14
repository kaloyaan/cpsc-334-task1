# cpsc-334-task1
This repository contains the code for Task 1 for Yale's CPSC334: Creative Embedded Systems in Fall 2021.

## Group
- Alana Liu
- Harry Jain
- Kaloyan Kolev
- Roxanne Harris


## Task Description
- Write a program to discover the mapping of screen space to physical space in the Leeds Studio at the Yale CCAM..
- The program should be semi-automatic in that it may require human input.


## Implementation Details

### Languages
- HTML for the basic UI
- CSS for styling the UI
- JavaScript for the computational aspects

### File Structure
- README.md (read for instructions)
  - This file which describes all aspects of the project and solution
- final (download this file to run the program)
  - index.html contains the UI for the main program (open this in a browser to run the program)
  - saveFile.html contains the UI for the popup to save the JSON file
  - css contains the style sheets for each html file
    - styles.css establishes the style for index.html
    - fileStyles.css estables the style for saveFile.html
  - js contains the scripts that control the rectangle drawing and outputting
    - script.js is the main file that controls input and output
    - fileScript.js contains the logic for saving the JSON file
    - resizeScript.js attempts to resize the Canvas on page resize (defunct)
- oldStuff (defunct)
  - Previous attempts at various parts of our solution


## Usage Instructions

### Screen Mapping
- To create the mapping, use the following steps:
  1. Cycle to the leftmost desktop (with SHIFT + WIN + LEFT) you wish to address and make sure the window is fullscreened there (by pressing F11).
  2. Press F5 to reload and start the program on your desired display.
  3. Draw rectangles with your mouse covering a single "display" from top left to bottom right (visually)
  4. Input the virtual desktop number (1 to the number of desktop from left to right) on the following prompt.
  5. Input the screen number (1 to the number of screens from left to right, irrespective of virtual displays) on the following prompt.
  6. Shift to the next virtual desktop (cycle with SHIFT + WIN + LEFT) and repeat Steps 3-5 for each screen in it.
- When you are completely done with all desired desktops/screens, download a JSON file with the coordinates using the following steps:
  1. Press the "d" key on your keyboard to open a new "save" tab.
  2. Click the "Create file button" to create the JSON file.
  3. Press the "Download" link to download the link to your computer.

### Output
- The output is leedsConfiguration.json, a JSON file with the coordinates detailing the virtual display, screen number, screen dimensions of each screen.


## JavaScript Approach Analysis

### Benefits
- Unlike Python, Javascript can run on anything with a browser.
- We did not have to change system configuration to make program work.
- Nothing had to be hard-coded, so this program could be applied reasonably easily to any extended-display setup.

### Detriments
- The current system configuration does not allow us to run across virtual displays, unlike some natively-run code.
- The process of utilzing full screen is a bit janky.
- To use all the features of Javascript, we would need to run on a server rather than just via files.


## Potential Pitfalls
- Sometimes when drawing a rectangle, a prompt does not immendiately appear. To fix this, click the center of the rectangle to initiate the prompt.
- If you draw a rectangle and did not want to save it, you can hit 'cancel' on the prompt.
